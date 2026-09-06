# SRMD India Solution — Business Landing Page

Static, responsive single-page website for **SRMD India Solution** (crusher spare
parts & plant equipment). No build step, no framework, no dependencies — it is
plain HTML/CSS/JS and can be hosted directly on GitHub Pages.

## Structure

```
index.html              markup + SEO meta + JSON-LD
css/
  base.css              design tokens (colours, type, spacing), reset, utilities
  layout.css            container, section rhythm, header, footer
  components.css        buttons, cards, chips, product tiles, form, floating buttons
  sections.css          hero, trust bar, about, catalogue, why, services, quality, contact
  responsive.css        all breakpoints (loaded last so it overrides the rest)
js/
  icons.js              inline SVG icon set (UI icons only)
  data.js               ALL site content lives here
  render.js             builds the data-driven sections into [data-render] slots
  nav.js                mobile menu, sticky header, scroll-spy
  accordion.js          collapses the product categories on phones
  ui.js                 scroll reveal, back-to-top, enquiry form
  main.js               bootstrap
asset/images/
  logo.png              logo rendered from the supplied Logo.pdf
  logo-light.png        same logo recoloured for the dark footer
  favicon.png           gear mark
  machines/*.jpg        6 category banner photos
  parts/*.jpg           54 product photos on white
  about/*.jpg           hero collage, plant photos, inspection photo
  source/catalogue.jpg  the printed catalogue artwork (master)
asset/fonts/            self-hosted subset webfonts (woff2)
tools/
  extract_images.py     slices source/catalogue.jpg into the images above
  build_brand.py        logo.svg / logo-light.svg / favicon.png from logo.pdf
  build_fonts.py        downloads + subsets Inter and Barlow Condensed
```

## Performance budget

The whole page, cold, with every image and nothing cached:

| | over the wire |
|---|---|
| HTML + CSS + JS + logos | 37 KB (gzipped by GitHub Pages) |
| Fonts (2 families, subset) | 57 KB |
| All 67 images (WebP) | 284 KB |
| **Full page** | **~382 KB** |
| First screen only | ~180 KB |

Third-party requests: **zero**. Nothing is fetched from Google, a CDN, or an
analytics host, so there is no extra DNS + TLS handshake before text can paint.

Against the GitHub Pages soft limit of 100 GB/month that is roughly **270,000
full page views a month** before bandwidth is a concern - and most visitors cost
far less, because only the images they scroll to are downloaded. The repo is
about 2 MB against a 1 GB limit. Neither limit is a practical risk.

### Rules that keep it that way

- **Images are WebP, sized for the box they are shown in.** The poster is only
  1024px wide, so `extract_images.py` refuses to enlarge a crop past 1.5x its
  native size - past that you pay bytes for detail that does not exist. If you
  drop in your own photograph, save it as WebP no wider than ~1000px.
- **Everything below the first screen is `loading="lazy"`.** A visitor who never
  scrolls past the hero downloads 4 images, not 67.
- **Fonts are self-hosted and subset** to latin + punctuation, and Inter ships
  as one variable file covering every weight. `font-display: swap` means text
  is never invisible while they load.
- **The map is a facade.** Google's embed pulls well over a megabyte and sets
  cookies, so it is never part of the initial load. On desktop `js/ui.js`
  fetches it on its own once the contact section is within 400px of the
  viewport - nobody has to press a button. Below 900px it is never built at
  all: a phone already has a maps app, so that column collapses to a single
  "Get directions" link. The "Show map" button remains as the fallback for
  browsers without `IntersectionObserver`.
- Re-run `python tools/extract_images.py` after touching the source artwork, and
  `tools/build_brand.py` / `tools/build_fonts.py` only if the logo or the font
  choice changes.

### Deliberately not done

- **Bundling / minifying CSS and JS** - all of it gzips to 37 KB across 11 files
  that HTTP/2 fetches in parallel. Bundling would save maybe 10 KB and cost the
  modular structure that makes this site editable.
- **A service worker** - GitHub Pages caps `Cache-Control` at 600s and that
  cannot be changed, so a service worker is the only way to cache longer. Not
  worth the stale-content failure mode for a site that changes rarely.
- **AVIF** - another 15-20% off the images, but it needs a `<picture>` fallback
  for older Safari, doubling the number of image files to maintain.

## Images

Every photograph on the site is cut from the catalogue artwork in
`asset/images/source/catalogue.jpg` by `tools/extract_images.py`. The script
finds each product cell, strips the caption and the panel background, and
writes a square white-background JPEG per part:

```bash
python tools/extract_images.py     # needs pillow + numpy
```

Coordinates are stored as fractions of the reference 1024x1536 poster, so if
you replace the source with a **higher resolution export of the same layout**,
re-running the script produces sharper images with no code changes. That is the
single best upgrade available: the current tiles are limited by the source
being 1024px wide.

Two files are supplied photographs rather than poster crops, and the extractor
deliberately leaves both alone, so re-running it will not overwrite them:

| file | where | encoded at |
| --- | --- | --- |
| `about/hero.webp` | hero panel | 860px wide, quality 72 |
| `about/quality.webp` | Quality Control | 1000px wide, quality 78 |

Both are sized for roughly 2x their slot (the hero renders at 475px, the
quality photo at ~548px). The hero is the LCP image, so it is encoded a notch
softer to hold it near 72 KB - at this size quality 72 and 78 are
indistinguishable on the sky gradient, and 78 costs 25 KB more. To replace
either:

    python -c "from PIL import Image; im=Image.open('new.png').convert('RGB'); \
      w=860; im.resize((w, round(im.height*w/im.width)), Image.LANCZOS) \
      .save('asset/images/about/hero.webp', format='WEBP', quality=72, method=6)"

Then update the `width`/`height` attributes on that `img` in `index.html` to the
new pixel size, so the browser still reserves the right box and nothing shifts
while it loads.

Note that `about/parts-range.webp` — the parts collage in the About section —
*is* a poster crop and is regenerated by the extractor. It used to double as
the hero image; the two were split so the same photograph does not appear
twice on the page.

To use a real photograph for one part instead, just overwrite its file — for
example `asset/images/parts/cone-mantle.jpg` — keeping the name. Nothing in the
code needs to change. Filenames follow `<category key>-<item img>.jpg` from
`js/data.js`.

## Mobile catalogue

Fully expanded, the six product categories are about nine phone screens of
scrolling - roughly 40% of the page. Below 900px each category collapses to its
title bar and opens on tap (`js/accordion.js`); the first one starts open so the
section still shows products. Desktop is unchanged: every card stays expanded
and the title bars are inert.

A collapsed card keeps its machine photo. The `.cat__banner` sits outside
`.cat__panel` precisely so it survives collapsing - a catalogue of six bare navy
bars reads as a broken page, and the photo is what tells someone whether they
are looking at a jaw or a cone. Only the parts grid and the bullet list hide.

That takes the page from 23.6 phone screens to 18.0, and scrolling the whole
collapsed catalogue pulls 15 of the section's 60 images - the six category
photos plus the nine parts in the open card. The markup is identical either
way, so
search engines still index all 54 products. Note that a browser's own "find in
page" does NOT match text inside a collapsed panel - that is a genuine
trade-off of hiding content. Collapsing is switched on by a `js-accordion`
class that JavaScript adds, so with scripting unavailable every card renders
open.

Links to a category (the catalogue index, the footer product list, or a
`#cat-cone` URL) open that card before scrolling to it.

## Editing content

Almost everything — phone numbers, address, product categories, part names,
services, quality steps — is in **`js/data.js`**. Change a value there and the
page updates; no HTML editing needed.

```js
ns.company = {
  phones: ['94675 44433', '85058 88809'],
  email: 'srmdindia@gmail.com',
  whatsapp: '918505888809',   // country code + number, digits only -
                              // must be a number registered on WhatsApp
  ...
};
```

To add a product category, append an object to `ns.categories` with an `id`,
`no`, `title`, an `art` scene name (`jaw`, `cone`, `vsi`, `screen`, `conveyor`,
`plant`), nine `items` and its `points`. Each item's `icon` must be a key from
`js/icons.js` — unknown names fall back to a generic gear icon.

Brand colours are CSS variables at the top of `css/base.css` (`--navy-700`,
`--green-600`, …). Change them in one place to restyle the whole site.

## Enquiry form

The site is static, so the form does not post to a server. On submit it opens
WhatsApp with the enquiry pre-filled; the second button opens the visitor's
e-mail app instead. If you later want enquiries by e-mail without WhatsApp,
point the form at a service such as Formspree and replace the submit handler in
`js/ui.js`.

## Deploying to GitHub Pages

1. Create a repository and push these files to the repository root:
   ```bash
   git init
   git add .
   git commit -m "SRMD India Solution website"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. In the repository: **Settings → Pages → Build and deployment**
   → Source: *Deploy from a branch* → Branch: `main` / `root` → Save.
3. The site goes live at `https://<user>.github.io/<repo>/` in a minute or two.

All asset paths are relative, so it works both at a domain root and in a
`/<repo>/` sub-path. `.nojekyll` is included so GitHub serves every file as-is.

### Custom domain (srmdindia.com)

Add a file named `CNAME` containing `srmdindia.com`, then point the domain's DNS
at GitHub Pages (A records to GitHub's IPs, or a CNAME record for `www`).
The `canonical`, `og:url` and `sitemap.xml` entries already use that domain.

## Local preview

```bash
python -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly from disk also works — the scripts are classic
scripts, not ES modules.

## Notes

- `logo.png` is rendered from the supplied `Logo.pdf` at high resolution;
  `logo-light.png` is the same mark recoloured (navy to white) for the dark
  footer. Regenerate them from a new PDF with pymupdf if the logo ever changes.
- The Google Map is a keyless embed pointing at Ateli Mandi. Replace
  `data-map-src` on `.map-frame` in `index.html` with the "Share > Embed a map"
  link from your exact Google Business location for a precise pin.
