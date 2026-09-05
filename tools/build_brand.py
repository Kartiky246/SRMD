"""
build_brand.py — renders the logo assets from the supplied vector artwork.

Source : asset/images/source/logo.pdf
Output : asset/images/logo.svg        header logo (navy + green)
         asset/images/logo-light.svg  footer logo (navy recoloured to white)
         asset/images/favicon.png     48px gear mark for the browser tab

The artwork in the PDF is vector, so the logos ship as SVG: ~6 KB each once
GitHub Pages gzips them, and pin-sharp on every screen density. The earlier
PNG render cost 85 KB and still blurred on retina displays.

Run:  python tools/build_brand.py      (needs: pymupdf, pillow, numpy)
"""

import gzip
import os
import re

import numpy as np
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "asset", "images", "source", "logo.pdf")
OUT = os.path.join(ROOT, "asset", "images")

FAVICON = 48          # px, PNG - SVG favicons are still patchy on Android

NAVY, GREEN = "#003a7e", "#00702e"          # the two colours in the artwork
NAVY_ON_DARK, GREEN_ON_DARK = "#ffffff", "#28c86e"


def render(width):
    """Render the PDF wide enough for `width`, trimmed to the artwork."""
    doc = pymupdf.open(SRC)
    page = doc[0]
    zoom = (width / page.rect.width) * 2.5      # render big, downsample later
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=True)
    img = Image.frombytes("RGBA", (pix.width, pix.height), pix.samples)
    a = np.asarray(img)
    ys, xs = np.where(a[..., 3] > 8)
    img = img.crop((int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1))
    h = max(1, int(round(img.height * width / float(img.width))))
    return img.resize((width, h), Image.LANCZOS)


def svg():
    """Vector export of the artwork, with the Inkscape cruft stripped."""
    doc = pymupdf.open(SRC)
    out = doc[0].get_svg_image(text_as_path=True)
    out = re.sub(r'\s+xmlns:inkscape="[^"]*"', "", out)
    out = re.sub(r'\s+inkscape:[a-zA-Z]+="[^"]*"', "", out)
    out = out.replace("<title>", "<title>SRMD India Solution</title><!--", 1) if "<title>" in out else out
    return out


def write(text, name):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(text)
    print("  %-22s %5.1f KB  (gzips to about %.1f KB)" % (
        name, os.path.getsize(path) / 1024, len(gzip.compress(text.encode(), 9)) / 1024))


def main():
    art = svg()
    write(art, "logo.svg")
    write(art.replace(NAVY, NAVY_ON_DARK).replace(GREEN, GREEN_ON_DARK), "logo-light.svg")

    header = render(420)

    # favicon: the gear mark only, as a small PNG (WebP favicons are patchy)
    h = header.height
    mark = header.crop((0, 0, int(h * 1.05), h))
    mark.thumbnail((FAVICON, FAVICON), Image.LANCZOS)
    sq = Image.new("RGBA", (FAVICON, FAVICON), (0, 0, 0, 0))
    sq.paste(mark, ((FAVICON - mark.width) // 2, (FAVICON - mark.height) // 2), mark)
    path = os.path.join(OUT, "favicon.png")
    sq.save(path, optimize=True)
    print("  %-22s %5.1f KB  (%dx%d)" % ("favicon.png", os.path.getsize(path) / 1024, *sq.size))


if __name__ == "__main__":
    main()
