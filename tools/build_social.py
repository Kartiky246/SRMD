"""
build_social.py — the two raster brand assets that only exist for other
people's software to read.

Output: asset/images/logo-512.png   the logo on white, for the Organization
                                    "logo" property in the JSON-LD. Google's
                                    structured-data crawler wants a raster it
                                    can crop into a knowledge panel, so the
                                    SVG the page itself uses is not enough.
        asset/images/og-cover.jpg   1200x630 social card for og:image and
                                    twitter:image. Facebook, LinkedIn, X and
                                    WhatsApp all want ~1.91:1 and several of
                                    them still will not decode WebP, which is
                                    why this one file is a JPEG.

The card is typographic rather than photographic on purpose: every photograph
in the repo is sized for its slot on the page, so filling 1200x630 with one
would mean upscaling it ~1.4x. A share card is read at thumbnail size, where a
crisp wordmark beats a soft photo.

Run:  python tools/build_social.py     (needs: pymupdf, pillow)
"""

import io
import os
import re
import urllib.request

import pymupdf
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "asset", "images")
LOGO_PDF = os.path.join(IMG, "source", "logo.pdf")
CACHE = os.path.join(ROOT, "tools", "_orbitron.ttf")

NAVY_DARK = (6, 22, 48)
NAVY = (13, 42, 94)
NAVY_LIT = (18, 58, 126)
GREEN = (23, 169, 79)
WHITE = (255, 255, 255)

NAME_A, NAME_B = "SRMD INDIA ", "SOLUTION"
TAGLINE = "Crusher Spare Parts & Plant Equipment"
DOMAIN = "srmdindia.com"


def orbitron(size):
    """PIL cannot read the woff2 the site ships, so fetch the ttf once."""
    if not os.path.exists(CACHE):
        css = urllib.request.urlopen(urllib.request.Request(
            "https://fonts.googleapis.com/css2?family=Orbitron:wght@700",
            headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read().decode()
        url = re.findall(r"src:\s*url\((https://[^)]+)\)", css)[-1]
        with open(CACHE, "wb") as fh:
            fh.write(urllib.request.urlopen(url, timeout=30).read())
    return ImageFont.truetype(CACHE, size)


def inter(size):
    for name in ("seguisb.ttf", "segoeuib.ttf", "arialbd.ttf", "arial.ttf"):
        path = os.path.join(os.environ.get("WINDIR", "C:/Windows"), "Fonts", name)
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def render_logo(width, light=False):
    """Rasterise the vector logo at `width` px, returned RGBA."""
    doc = pymupdf.open(LOGO_PDF)
    page = doc[0]
    zoom = (width / page.rect.width) * 2.0
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=True)
    img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGBA")
    img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    if light:
        # the wordmark's navy reads as a hole on a navy card - lift it to white
        px = img.load()
        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = px[x, y]
                if a and not (g > r + 20 and g > b + 20):      # keep the green
                    px[x, y] = (255, 255, 255, a)
    return img


def build_logo_png(size=512):
    logo = render_logo(int(size * 0.86))
    card = Image.new("RGB", (size, size), WHITE)
    card.paste(logo, ((size - logo.width) // 2, (size - logo.height) // 2), logo)
    out = os.path.join(IMG, "logo-512.png")
    card.save(out, "PNG", optimize=True)
    return out, card.size


def build_og_card(w=1200, h=630):
    # Diagonal navy wash, as on the hero section.
    card = Image.new("RGB", (w, h))
    px = card.load()
    for y in range(h):
        for x in range(w):
            t = (x / w * 0.65 + y / h * 0.35)
            px[x, y] = tuple(round(NAVY_DARK[i] + (NAVY_LIT[i] - NAVY_DARK[i]) * t)
                             for i in range(3))

    # The hero's grid, drawn on its own layer and masked so it fades out to the
    # right - at full strength across the whole card it reads as a table.
    grid = Image.new("L", (w, h), 0)
    g = ImageDraw.Draw(grid)
    for x in range(0, w, 64):
        g.line([(x, 0), (x, h)], fill=255, width=1)
    for y in range(0, h, 64):
        g.line([(0, y), (w, y)], fill=255, width=1)
    fade = Image.linear_gradient("L").rotate(90, expand=True).resize((w, h))
    grid = Image.composite(grid, Image.new("L", (w, h), 0), fade.point(lambda v: 255 - v))
    card.paste(Image.new("RGB", (w, h), WHITE), (0, 0), grid.point(lambda v: v // 18))
    d = ImageDraw.Draw(card)

    logo = render_logo(300, light=True)
    card.paste(logo, (72, 74), logo)

    size = 74
    f = orbitron(size)
    while d.textlength(NAME_A + NAME_B, font=f) > w - 144 and size > 20:
        size -= 2
        f = orbitron(size)
    y = 250
    d.text((72, y), NAME_A, font=f, fill=WHITE)
    d.text((72 + d.textlength(NAME_A, font=f), y), NAME_B, font=f, fill=GREEN)

    d.text((72, y + size + 46), TAGLINE, font=inter(38), fill=(206, 219, 240))
    d.line([(72, h - 118), (72 + 96, h - 118)], fill=GREEN, width=5)
    d.text((72, h - 96), DOMAIN, font=inter(34), fill=WHITE)

    out = os.path.join(IMG, "og-cover.jpg")
    card.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    return out, card.size


def main():
    for path, dim in (build_logo_png(), build_og_card()):
        print("  %-34s %dx%d  %.1f KB" % (
            os.path.relpath(path, ROOT), dim[0], dim[1],
            os.path.getsize(path) / 1024))


if __name__ == "__main__":
    main()
