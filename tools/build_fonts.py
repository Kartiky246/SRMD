"""
build_fonts.py — self-hosts the three web fonts, subset to the characters this
site actually needs.

Why: loading fonts from fonts.googleapis.com costs two extra DNS+TLS
connections before any text can render, and Google's "latin" slice carries far
more glyphs than a business landing page uses. Self-hosted + subset files are
same-origin (no extra handshakes) and about a third of the size.

Run:  python tools/build_fonts.py        (needs: fonttools, brotli)

Output: asset/fonts/*.woff2  — referenced by the @font-face rules in
        css/base.css. Fonts are OFL licensed, so redistribution is allowed;
        see asset/fonts/OFL.txt.
"""

import hashlib
import os
import re
import urllib.request

from fontTools.subset import main as pyftsubset
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "asset", "fonts")

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

# Only the weights the CSS actually uses.
FAMILIES = {
    "Inter": [400, 600, 700],
    "Barlow Condensed": [600, 700],
    # The wordmark face, matched to the printed visiting card. It sets the
    # company name and nothing else, so it is subset to letters and digits.
    "Orbitron": [700],
}

# Basic latin + the punctuation, symbols and accents a page like this can hit.
UNICODES = ",".join([
    "U+0020-007E",   # basic latin
    "U+00A0-00FF",   # latin-1 supplement (accents, ·, ©, ®, °)
    "U+0131", "U+0152-0153", "U+02BB-02BC", "U+02C6", "U+02DA", "U+02DC",
    "U+2000-206F",   # spaces, dashes, quotes, bullet, ellipsis, dagger
    "U+20AC", "U+20B9",   # euro, rupee
    "U+2122", "U+2212", "U+2215", "U+FEFF", "U+FFFD",
])

# A display face that only ever sets the company name does not need the
# accents, currency symbols and dashes the body text can hit.
WORDMARK_UNICODES = "U+0020,U+0026,U+002C-002E,U+0030-0039,U+0041-005A,U+0061-007A"
NARROW = {"Orbitron"}


def google_css(family, weights):
    q = family.replace(" ", "+") + ":wght@" + ";".join(str(w) for w in weights)
    url = "https://fonts.googleapis.com/css2?family=" + q + "&display=swap"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8")


def latin_sources(css):
    """Map weight -> woff2 URL, keeping only Google's `latin` slice."""
    out = {}
    for block in css.split("@font-face")[1:]:
        m_w = re.search(r"font-weight:\s*(\d+)", block)
        m_u = re.search(r"src:\s*url\((https://[^)]+\.woff2)\)", block)
        m_r = re.search(r"unicode-range:\s*([^;]+);", block)
        if not (m_w and m_u and m_r):
            continue
        # the latin slice is the one that starts at U+0000-00FF
        if "U+0000-00FF" not in m_r.group(1):
            continue
        out[int(m_w.group(1))] = m_u.group(1)
    return out


def main():
    os.makedirs(OUT, exist_ok=True)
    total_before = total_after = 0
    seen = {}

    for family, weights in FAMILIES.items():
        css = google_css(family, weights)
        srcs = latin_sources(css)
        slug = family.lower().replace(" ", "-")

        for w in weights:
            url = srcs.get(w)
            if not url:
                print("  ! no latin slice for %s %d" % (family, w))
                continue
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            raw = urllib.request.urlopen(req, timeout=30).read()

            tmp = os.path.join(OUT, "_tmp.woff2")
            with open(tmp, "wb") as fh:
                fh.write(raw)

            dest = os.path.join(OUT, "%s-%d.woff2" % (slug, w))
            pyftsubset([
                tmp,
                "--unicodes=" + (WORDMARK_UNICODES if family in NARROW else UNICODES),
                "--layout-features=kern,liga,calt",
                "--flavor=woff2",
                "--no-hinting",
                "--desubroutinize",
                "--output-file=" + dest,
            ])
            os.remove(tmp)

            # Google ships Inter as a variable font: every weight URL returns the
            # same file. Emit it once as <family>-variable.woff2 and let the
            # @font-face declare the whole weight range.
            digest = hashlib.md5(raw).hexdigest()
            if digest in seen:
                os.remove(dest)
                print("  %-26s = same file as %s (variable font, skipped)" % (
                    os.path.basename(dest), os.path.basename(seen[digest])))
                continue
            if TTFont(dest).get("fvar"):
                var = os.path.join(OUT, "%s-variable.woff2" % slug)
                os.replace(dest, var)
                dest = var
            seen[digest] = dest

            before, after = len(raw), os.path.getsize(dest)
            total_before += before
            total_after += after
            print("  %-26s %6.1f KB -> %5.1f KB" % (
                os.path.basename(dest), before / 1024, after / 1024))

    print("\ntotal %.1f KB -> %.1f KB (%.0f%% smaller)" % (
        total_before / 1024, total_after / 1024,
        100 * (1 - total_after / float(total_before))))


if __name__ == "__main__":
    main()
