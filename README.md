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
  icons.js              inline SVG icon set
  illustrations.js      line-art machine scenes used as card / section artwork
  data.js               ALL site content lives here
  render.js             builds the data-driven sections into [data-render] slots
  nav.js                mobile menu, sticky header, scroll-spy
  ui.js                 scroll reveal, back-to-top, enquiry form
  main.js               bootstrap
asset/images/           logo (dark + light), favicon
```

## Editing content

Almost everything — phone numbers, address, product categories, part names,
services, quality steps — is in **`js/data.js`**. Change a value there and the
page updates; no HTML editing needed.

```js
ns.company = {
  phones: ['94675 44433', '85058 88809'],
  email: 'srmdindia@gmail.com',
  whatsapp: '919467544433',   // country code + number, digits only
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

- The logo in `asset/images/` is an SVG rebuild of the supplied artwork. If you
  have the original vector file, replace `smdblogo.svg` (dark background version:
  `smdblogo-light.svg`) keeping the same filenames.
- Product artwork is drawn with SVG line art rather than photographs. Swapping in
  real plant photos later only means replacing the `.cat__banner` contents in
  `js/render.js`.
