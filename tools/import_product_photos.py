"""
import_product_photos.py — turns supplied product photographs into the 54
product tiles in asset/images/parts/.

Source : ../SRMD-product-images/_originals/<Category>/<Product>.webp
         (or any folder given as the first argument, laid out the same way;
         manifest.csv in that folder maps each photo to the tile it replaces)
Output : asset/images/parts/<category key>-<item img>.webp

The tiles are built with the same geometry and encoder settings as
extract_images.py — autocropped, padded onto a 200px square white canvas,
lightly sharpened, WebP quality 80 — so a supplied photograph and a poster
crop are indistinguishable in the grid. The one extra step is
whiten_studio(): the photographs come off a studio sweep that is *near*
white, and .cat__item img is composited with mix-blend-mode: multiply, so
any residual grey would show up as a tinted square on the white card.

    python tools/import_product_photos.py            # all 54
    python tools/import_product_photos.py --only jaw # one category
    python tools/import_product_photos.py --dry-run

Re-runnable: it always rebuilds from the source photographs, never from the
tile it previously wrote, so quality cannot drift across runs.
"""

import argparse
import csv
import os
import sys

import numpy as np
from PIL import Image

import extract_images as ex

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_SRC = os.path.join(os.path.dirname(ROOT), "SRMD-product-images")
OUT_DIR = os.path.join(ROOT, "asset", "images", "parts")

# The sweep is lit brighter than the part but is not paper white, and it
# vignettes into the corners. Mapping the *darkest* background reading to
# white lifts the whole field clean without crushing the part itself.
BG_RING = 0.02        # fraction of the frame treated as guaranteed background
BG_PERCENTILE = 5     # darkest corner of the sweep, not its average
MIN_WHITE_PT = 60.0   # a photo darker than this is not a studio shot


def whiten_studio(img):
    """Lift a near-white studio sweep to pure white, keeping the shadow soft.

    A hard threshold leaves a halo where the contact shadow meets the sweep,
    so this scales the whole image by one white point instead: everything at
    or above the darkest background reading saturates to 255, and the shadow
    survives as a faint gradient that multiply renders as a real shadow.
    """
    a = np.asarray(img.convert("RGB")).astype(np.float32)
    g = a.min(axis=2)
    h, w = g.shape
    r = max(2, int(min(h, w) * BG_RING))
    ring = np.concatenate([g[:r].ravel(), g[-r:].ravel(),
                           g[:, :r].ravel(), g[:, -r:].ravel()])
    white_pt = max(MIN_WHITE_PT, float(np.percentile(ring, BG_PERCENTILE)))
    return Image.fromarray(
        np.clip(a * (255.0 / white_pt), 0, 255).astype(np.uint8))


def make_tile(photo):
    """Same canvas, padding, sharpening and size as extract_images.make_tile."""
    art = ex.autocrop_white(ex.whiten_background(whiten_studio(photo)))
    box = ex.TILE - 2 * ex.PAD * 2
    scale = min(box / float(art.width), box / float(art.height))
    art = art.resize((max(1, int(art.width * scale)),
                      max(1, int(art.height * scale))), Image.LANCZOS)
    art = ex.sharpen(art)
    canvas = Image.new("RGB", (ex.TILE, ex.TILE), "white")
    canvas.paste(art, ((ex.TILE - art.width) // 2, (ex.TILE - art.height) // 2))
    return canvas


def read_manifest(src_root):
    """[(source photo, tile filename, category key)] from the manifest."""
    man = os.path.join(src_root, "manifest.csv")
    if not os.path.exists(man):
        sys.exit("No manifest.csv in " + src_root)
    rows = []
    with open(man, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            # prefer the full-resolution master over the web-sized copy
            master = os.path.join(src_root, "_originals", r["new_file"])
            web = os.path.join(src_root, r["new_file"])
            photo = master if os.path.exists(master) else web
            rows.append((photo, os.path.basename(r["replaces_on_site"]),
                         r["data_js_key"]))
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src", nargs="?", default=DEFAULT_SRC,
                    help="folder of supplied photographs (default: %s)"
                         % os.path.relpath(DEFAULT_SRC, ROOT))
    ap.add_argument("--only", nargs="*", default=[],
                    help="category keys to rebuild (jaw, cone, vsi, screen, "
                         "conveyor, plant)")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    rows = read_manifest(args.src)
    if args.only:
        rows = [r for r in rows if r[2] in args.only]

    before = after = 0
    written = 0
    for photo, tile_name, _key in rows:
        dest = os.path.join(OUT_DIR, tile_name)
        if not os.path.exists(photo):
            print("  !! missing photo, skipped: " + tile_name)
            continue
        old = os.path.getsize(dest) if os.path.exists(dest) else 0
        if args.dry_run:
            print("  %-38s <- %s" % (tile_name, os.path.basename(photo)))
            continue
        with Image.open(photo) as im:
            make_tile(im.convert("RGB")).save(
                dest, format="WEBP", quality=ex.WEBP_Q, method=6)
        new = os.path.getsize(dest)
        before += old
        after += new
        written += 1
        print("  %-38s %5.1f KB -> %5.1f KB" % (tile_name, old / 1024.0,
                                                new / 1024.0))

    if args.dry_run:
        print("\n%d tile(s) would be rebuilt from %s" % (len(rows), args.src))
        return
    print("\n%d tile(s): %.0f KB -> %.0f KB total" %
          (written, before / 1024.0, after / 1024.0))


if __name__ == "__main__":
    main()
