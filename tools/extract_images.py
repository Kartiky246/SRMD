"""
extract_images.py — slices the printed catalogue artwork into the individual
images used by the website.

Source : asset/images/source/catalogue.jpg  (the catalogue poster)
NOTE   : about/hero.webp, about/parts-range.webp and about/quality.webp are
         NOT produced here - they are supplied photographs, not poster crops
         (see README), so this script leaves them alone.

Output : asset/images/machines/*.webp  category banner photos
         asset/images/parts/*.webp     54 product tiles (white background)
         asset/images/about/plant-*.webp  the three plant photos

Everything is written as WebP, sized for the largest box it is displayed in on
a 2x screen - shipping a 1536px photo into a 400px slot was the single most
expensive thing on the page.

Re-run it after replacing the source with a higher resolution export:

    python tools/extract_images.py

Geometry is expressed as fractions of the source size, so a larger export of
the same layout works without editing the coordinates.
"""

import os
import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "asset", "images", "source", "catalogue.jpg")

# The layout was measured on the 1024x1536 poster; everything below is scaled
# from that reference so a bigger source file still lines up.
REF_W, REF_H = 1024.0, 1536.0

# --- panel geometry ---------------------------------------------------------
# Column x-ranges shared by the two rows of category panels.
COLS = {
    "left":   (8, 338),
    "mid":    (350, 668),
    "right":  (681, 1010),
}

# Per row: banner box (y0, y1) and item-grid box (y0, y1)
ROW_A = {"banner": (610, 724), "items": (726, 918)}     # panels 01 / 02
ROW_B = {"banner": (984, 1056), "items": (1062, 1218)}  # panels 03 / 04 / 05
ROW_C = {"items": (1277, 1487)}                         # panel 06

PANELS = [
    # key,        column,  row geometry, item names (row-major 3x3)
    ("jaw",   "mid",   ROW_A, ["jaw-plates", "toggle-plates", "pitman",
                               "side-plates", "flywheel-pulley", "wedges",
                               "bearings", "shims", "complete-spares"]),
    ("cone",  "right", ROW_A, ["mantle", "concave", "bowl-liner",
                               "main-shaft", "thrust-plate", "eccentric-assembly",
                               "bronze-bushes", "dust-seal", "hydraulic-parts"]),
    ("vsi",   "left",  ROW_B, ["rotor-assembly", "tips-tip-plates", "distributor-plate",
                               "wear-plates", "cavity-wear-plates", "shaft",
                               "bearings", "labyrinth-seal", "complete-spares"]),
    ("screen", "mid",  ROW_B, ["screen-mesh", "exciter-assembly", "bearings",
                               "springs", "side-plates", "deck-components",
                               "rubber-balls", "wedge-clamp", "screen-spares"]),
    ("conveyor", "right", ROW_B, ["conveyor-rollers", "idlers", "pulley",
                                  "belts", "bearings", "rubber-components",
                                  "skirting-rubber", "impact-idlers", "accessories"]),
    ("plant", None, ROW_C, ["feeders", "hoppers", "chutes",
                            "conveyors", "vibrating-screens", "structural-components",
                            "hydraulic-systems", "lubrication-systems", "electrical-controls"]),
]

# Panel 06 sits in its own narrow column on the last row.
PLANT_COL = (14, 219)

# Stand-alone photographs (x0, y0, x1, y1)
PHOTOS = {
    "about/plant-1": (812, 16, 1016, 134),
    "about/plant-2": (812, 168, 1016, 286),
    "about/plant-3": (812, 306, 1016, 424),
    "machines/plant": (812, 306, 1016, 424),
}

INSET = 7             # px trimmed off each cell edge (borders / separators)
PAD = 6               # white padding kept around an autocropped part
TILE = 200            # tile output size (~108 CSS px on a phone)
BANNER_W = 520        # card banner width
WEBP_Q = 80           # quality for the part tiles
PHOTO_Q = 78          # quality for the large photographs

# The poster is only 1024px wide, so a crop has a hard limit on real detail.
# Enlarging past this multiple of the native crop invents nothing and costs a
# lot of bytes - a photo was 90 KB at 2x and 64 KB at 1.5x, indistinguishable.
MAX_UPSCALE = 1.5

# Longest edge each stand-alone photo is ever displayed at, doubled for 2x
# screens. Anything larger is wasted bytes.
PHOTO_W = {
    "about/plant-1": 330,
    "about/plant-2": 330,
    "about/plant-3": 330,
    "machines/plant": BANNER_W,
}


def scaled(box, w, h):
    sx, sy = w / REF_W, h / REF_H
    return (int(box[0] * sx), int(box[1] * sy), int(box[2] * sx), int(box[3] * sy))


def resize_to_width(img, width):
    """Scale to an output width, never enlarging past MAX_UPSCALE of native."""
    width = min(width, int(img.width * MAX_UPSCALE))
    if img.width == width:
        return img
    h = max(1, int(round(img.height * width / float(img.width))))
    return img.resize((width, h), Image.LANCZOS)


def sharpen(img):
    """Light touch: heavy sharpening adds high-frequency noise that WebP then
    has to spend real bytes encoding (26 KB on a single photo)."""
    return img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=70, threshold=3))


def save(img, rel, quality=PHOTO_Q):
    path = os.path.join(ROOT, "asset", "images", rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.convert("RGB").save(path, format="WEBP", quality=quality, method=6)
    return path


def autocrop_white(img, thr=232):
    """Trim the white margin around a product photo."""
    a = np.asarray(img.convert("L"))
    ys, xs = np.where(a < thr)
    if len(xs) == 0:
        return img
    x0, x1 = int(xs.min()), int(xs.max())
    y0, y1 = int(ys.min()), int(ys.max())
    w, h = img.size
    return img.crop((max(0, x0 - 2), max(0, y0 - 2), min(w, x1 + 3), min(h, y1 + 3)))


def trim_edge_lines(cell, depth=5):
    """Erase the 1px cell separator hairlines that clip into a crop edge.

    A hairline is a near-edge row/column that is darker than its immediate
    neighbours on both sides - a real part never looks like that.
    """
    a = np.asarray(cell.convert("RGB")).copy()
    h, w = a.shape[:2]
    g = a.min(axis=2).astype(int)

    for x in list(range(depth)) + list(range(w - depth, w)):
        if 0 < x < w - 1 and g[:, x].min() < 215 and g[:, x - 1].min() > 228 and g[:, x + 1].min() > 228:
            a[:, x] = 255
        elif x in (0, w - 1) and g[:, x].min() < 215:
            a[:, x] = 255
    g = a.min(axis=2).astype(int)
    for y in list(range(depth)) + list(range(h - depth, h)):
        if 0 < y < h - 1 and g[y].min() < 215 and g[y - 1].min() > 228 and g[y + 1].min() > 228:
            a[y] = 255
        elif y in (0, h - 1) and g[y].min() < 215:
            a[y] = 255
    return Image.fromarray(a)


def whiten_background(img):
    """Flatten the pale panel background to pure white."""
    a = np.asarray(img.convert("RGB")).copy()
    bg = a.min(axis=2) >= 222
    a[bg] = 255
    return Image.fromarray(a)


def photo_region(cell):
    """Drop the caption under a product photo and any banner bleed on top.

    Rows are scored by "ink" (count of dark pixels). A caption is one or two
    short text bands at the bottom of the cell, separated from the photo by
    clean white. JPEG noise means a blank row is "almost" empty, not empty.
    """
    a = np.asarray(cell.convert("L"))
    h, w = a.shape
    ink = (a < 200).sum(1)
    blank = max(1, int(w * 0.03))
    empty = ink <= blank

    # banner bleed: near-full-width dark rows at the very top of the cell
    top = 0
    while top < int(h * 0.3) and ink[top] > w * 0.85:
        top += 1

    caption_max = max(6, int(h * 0.20))   # a caption line is short
    bottom = h
    y = h - 1
    # Peel short bands off the bottom: cell separator lines and one or two
    # caption lines. Stop as soon as a tall band appears - that is the photo.
    for _ in range(4):
        while y > top and empty[y]:
            y -= 1
        if y <= top:
            break
        band_bottom = y
        while y > top and not empty[y]:
            y -= 1
        if band_bottom - y > caption_max:
            bottom = band_bottom + 1       # the photo itself
            break
        if y + 1 < int(h * 0.35):          # never cut into the top third
            break
        bottom = y + 1

    bottom = max(top + 4, bottom)
    return cell.crop((0, top, w, bottom))


def make_tile(cell):
    """Product photo on a clean square white canvas."""
    art = whiten_background(autocrop_white(photo_region(trim_edge_lines(cell))))
    # Tiles always fill their canvas: they are laid out side by side, so a
    # part that stopped short of the edge would look smaller than its neighbours.
    scale = min((TILE - 2 * PAD * 2) / art.width, (TILE - 2 * PAD * 2) / art.height)
    art = art.resize((max(1, int(art.width * scale)), max(1, int(art.height * scale))), Image.LANCZOS)
    art = sharpen(art)
    canvas = Image.new("RGB", (TILE, TILE), "white")
    canvas.paste(art, ((TILE - art.width) // 2, (TILE - art.height) // 2))
    return canvas


def main():
    im = Image.open(SRC).convert("RGB")
    W, H = im.size
    written = []

    # Category banners ------------------------------------------------------
    for key, col, row, _names in PANELS:
        if "banner" not in row:
            continue
        x0, x1 = COLS[col]
        y0, y1 = row["banner"]
        crop = im.crop(scaled((x0, y0, x1, y1), W, H))
        crop = resize_to_width(crop, BANNER_W)
        written.append(save(sharpen(crop), "machines/%s.webp" % key))

    # Product tiles ---------------------------------------------------------
    for key, col, row, names in PANELS:
        x0, x1 = PLANT_COL if col is None else COLS[col]
        y0, y1 = row["items"]
        cw = (x1 - x0) / 3.0
        ch = (y1 - y0) / 3.0
        for i, name in enumerate(names):
            r, c = divmod(i, 3)
            cx0 = x0 + c * cw
            cy0 = y0 + r * ch
            box = scaled((cx0 + INSET, cy0 + 2, cx0 + cw - INSET, cy0 + ch - 2), W, H)
            written.append(save(make_tile(im.crop(box)), "parts/%s-%s.webp" % (key, name), quality=WEBP_Q))

    # Stand-alone photos ----------------------------------------------------
    for rel, box in PHOTOS.items():
        crop = im.crop(scaled(box, W, H))
        crop = resize_to_width(crop, PHOTO_W.get(rel, 800))
        written.append(save(sharpen(crop), rel + ".webp"))

    print("wrote %d files" % len(written))
    for p in written[:5]:
        print("  ", os.path.relpath(p, ROOT))
    print("   ...")


if __name__ == "__main__":
    main()
