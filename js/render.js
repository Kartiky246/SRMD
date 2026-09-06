/* ==========================================================================
   render.js — builds the data-driven sections of the page from data.js.
   Every target element is marked with [data-render="<key>"] in index.html.
   ========================================================================== */
(function (ns) {
  'use strict';

  var icon = ns.icon;

  var PARTS = 'asset/images/parts/';
  var MACHINES = 'asset/images/machines/';

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fill(key, html) {
    var nodes = document.querySelectorAll('[data-render="' + key + '"]');
    for (var i = 0; i < nodes.length; i++) { nodes[i].innerHTML = html; }
    return nodes.length;
  }

  function join(list, fn) { return list.map(fn).join(''); }

  /* Individual blocks ------------------------------------------------------ */

  function trustBar() {
    return join(ns.trust, function (t) {
      return '<div class="trustbar__item">' + icon(t.icon) +
             '<div><strong>' + esc(t.title) + '</strong>' +
             '<span>' + esc(t.text) + '</span></div></div>';
    });
  }

  function aboutText() {
    return join(ns.about.paragraphs, function (p) { return '<p>' + esc(p) + '</p>'; });
  }

  function aboutFeatures() {
    return join(ns.about.features, function (f) {
      return '<div class="feature reveal">' +
             '<span class="icon-badge icon-badge--green">' + icon(f.icon) + '</span>' +
             '<div><h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + '</p></div></div>';
    });
  }

  function stats() {
    return join(ns.about.stats, function (s) {
      return '<div class="stat reveal"><strong>' + esc(s.value) + '</strong>' +
             '<span>' + esc(s.label) + '</span></div>';
    });
  }

  function catalogueIndex() {
    return join(ns.catalogueIndex, function (row) {
      return '<a class="index-item" href="' + esc(row.href) + '">' +
             '<b>' + esc(row.no) + '</b>' + esc(row.label) + '</a>';
    });
  }

  function categoryCard(cat) {
    var items = join(cat.items, function (it) {
      return '<figure class="cat__item">' +
               '<img src="' + PARTS + cat.key + '-' + it.img + '.webp" alt="' + esc(it.name) +
               '" loading="lazy" decoding="async" width="200" height="200">' +
               '<figcaption>' + esc(it.name) + '</figcaption>' +
             '</figure>';
    });
    var points = join(cat.points, function (p) { return '<li>' + esc(p) + '</li>'; });

    return '<article class="cat reveal" id="' + esc(cat.id) + '">' +
             '<h3 class="cat__head">' +
               '<button class="cat__toggle" type="button" aria-controls="' + esc(cat.id) + '-panel">' +
                 '<span class="num-badge">' + esc(cat.no) + '</span>' +
                 '<span class="cat__title">' + esc(cat.title) + '</span>' +
                 '<span class="cat__count">' + cat.items.length + ' parts</span>' +
                 '<svg class="cat__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
                 'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                 '<path d="M6 9l6 6 6-6"/></svg>' +
               '</button>' +
             '</h3>' +
             /* The banner sits outside the panel so a collapsed category still
                shows its machine, instead of collapsing to a bare title bar. */
             '<div class="cat__banner">' +
               '<img src="' + MACHINES + cat.key + '.webp" alt="' + esc(cat.title) +
               '" loading="lazy" decoding="async" width="477" height="171">' +
             '</div>' +
             '<div class="cat__panel" id="' + esc(cat.id) + '-panel">' +
               '<div class="cat__items">' + items + '</div>' +
               '<ul class="cat__foot">' + points + '</ul>' +
             '</div>' +
           '</article>';
  }

  function categories() { return join(ns.categories, categoryCard); }

  function moreCategories() {
    return join(ns.moreCategories, function (c) {
      return '<div class="strip__item reveal">' +
               '<span class="icon-badge">' + icon(c.icon) + '</span>' +
               '<div><h3>' + esc(c.no) + ' &middot; ' + esc(c.title) + '</h3>' +
               '<span>' + esc(c.text) + '</span></div>' +
             '</div>';
    });
  }

  function why() {
    return join(ns.why, function (w) {
      return '<article class="card card--hover why__card reveal">' +
               '<span class="icon-badge icon-badge--solid">' + icon(w.icon) + '</span>' +
               '<h3>' + esc(w.title) + '</h3><p>' + esc(w.text) + '</p>' +
             '</article>';
    });
  }

  function services() {
    return join(ns.services, function (s) {
      return '<article class="card card--hover service reveal">' +
               '<span class="icon-badge icon-badge--green">' + icon(s.icon) + '</span>' +
               '<div><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div>' +
             '</article>';
    });
  }

  function qualitySteps() {
    return join(ns.quality.steps, function (step) {
      return '<li>' + icon('check') + '<span>' + esc(step) + '</span></li>';
    });
  }

  function qualityNote() { return esc(ns.quality.note); }

  /* Contact details are also written into href attributes ------------------ */
  function contactDetails() {
    var c = ns.company;

    var phones = join(c.phones, function (p) {
      return '<a href="tel:+91' + p.replace(/\s/g, '') + '">+91 ' + esc(p) + '</a>';
    });

    return '' +
      '<div class="card contact-card reveal">' +
        '<span class="icon-badge">' + icon('pin') + '</span>' +
        '<div><h3>Locations</h3><p>' + c.locations.map(esc).join(', ') + '</p></div>' +
      '</div>' +
      '<div class="card contact-card reveal">' +
        '<span class="icon-badge icon-badge--green">' + icon('phone') + '</span>' +
        '<div><h3>Call Us</h3>' + phones + '</div>' +
      '</div>' +
      '<div class="card contact-card reveal">' +
        '<span class="icon-badge">' + icon('mail') + '</span>' +
        '<div><h3>Email</h3><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></div>' +
      '</div>' +
      '<div class="card contact-card reveal">' +
        '<span class="icon-badge icon-badge--green">' + icon('clock') + '</span>' +
        '<div><h3>Business Hours</h3><p>' + esc(c.hours) + '</p></div>' +
      '</div>';
  }

  function footerContact() {
    var c = ns.company;
    var phones = join(c.phones, function (p) {
      return '<li><a href="tel:+91' + p.replace(/\s/g, '') + '">+91 ' + esc(p) + '</a></li>';
    });
    return '<li>' + c.locations.map(esc).join(' &middot; ') + '</li>' + phones +
           '<li><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></li>';
  }

  /* Attribute level bindings ---------------------------------------------- */
  function bindLinks() {
    var c = ns.company;
    var wa = 'https://wa.me/' + c.whatsapp;
    var tel = 'tel:+91' + c.phones[0].replace(/\s/g, '');

    document.querySelectorAll('[data-link="whatsapp"]').forEach(function (el) { el.href = wa; });
    document.querySelectorAll('[data-link="tel"]').forEach(function (el) {
      el.href = tel;
      if (el.hasAttribute('data-fill-phone')) { el.textContent = c.phones[0]; }
    });
    document.querySelectorAll('[data-link="mail"]').forEach(function (el) { el.href = 'mailto:' + c.email; });
    document.querySelectorAll('[data-text="phone-primary"]').forEach(function (el) { el.textContent = '+91 ' + c.phones[0]; });
    document.querySelectorAll('[data-text="email"]').forEach(function (el) { el.textContent = c.email; });
    document.querySelectorAll('[data-text="year"]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    document.querySelectorAll('[data-text="company"]').forEach(function (el) { el.textContent = c.name; });
  }

  /* Public entry ----------------------------------------------------------- */
  ns.render = function () {
    fill('trust', trustBar());
    fill('about-text', aboutText());
    fill('about-features', aboutFeatures());
    fill('stats', stats());
    fill('catalogue-index', catalogueIndex());
    fill('categories', categories());
    fill('more-categories', moreCategories());
    fill('why', why());
    fill('services', services());
    fill('quality-steps', qualitySteps());
    fill('quality-note', qualityNote());
    fill('contact-details', contactDetails());
    fill('footer-contact', footerContact());
    bindLinks();
  };

})(window.SRMD = window.SRMD || {});
