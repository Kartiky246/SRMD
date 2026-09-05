/* ==========================================================================
   accordion.js — collapses the six product categories on small screens.

   The catalogue is 9 phone screens tall if every category is expanded, which
   is most of the page. On a phone each card collapses to its title bar and
   opens on tap; on desktop nothing changes and every card stays open.

   Everything stays in the DOM either way, so the products remain indexable.
   Collapsed panels use hidden="until-found", so Chrome and Edge reveal a
   category when the visitor's find-in-page matches text inside it; browsers
   without that feature simply treat the panel as hidden. Collapsing is enabled
   by adding `js-accordion` to <html>, so with JavaScript off - or on a desktop
   width - the cards render fully expanded.
   ========================================================================== */
(function (ns) {
  'use strict';

  var BREAKPOINT = '(max-width: 900px)';

  ns.accordion = function () {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.cat'));
    if (!cards.length) { return; }

    var mq = window.matchMedia(BREAKPOINT);
    var active = false;

    /* Start inert: on desktop these bars toggle nothing, so they should not
       be focusable or announced as buttons. enable() switches them back on. */
    cards.forEach(function (card) {
      var btn = card.querySelector('.cat__toggle');
      if (btn) { btn.disabled = true; }
    });

    function setOpen(card, open) {
      card.classList.toggle('is-open', open);
      var btn = card.querySelector('.cat__toggle');
      var panel = card.querySelector('.cat__panel');
      if (btn) { btn.setAttribute('aria-expanded', String(open)); }
      if (panel) {
        /* "until-found" lets find-in-page reveal a collapsed category.
           Browsers that do not know the value still hide the panel. */
        if (open) { panel.hidden = false; } else { panel.hidden = 'until-found'; }
      }
      syncExpandAll();
    }

    /* Chrome fires this just before it reveals hidden="until-found" content */
    function onBeforeMatch(e) {
      var card = e.target.closest('.cat');
      if (card) {
        card.classList.add('is-open');
        var btn = card.querySelector('.cat__toggle');
        if (btn) { btn.setAttribute('aria-expanded', 'true'); }
        syncExpandAll();
      }
    }

    var expandAll = document.querySelector('[data-expand-all]');

    function allOpen() {
      return cards.every(function (c) { return c.classList.contains('is-open'); });
    }

    function syncExpandAll() {
      if (!expandAll) { return; }
      expandAll.textContent = allOpen() ? 'Collapse all' : 'Expand all';
    }

    if (expandAll) {
      expandAll.addEventListener('click', function () {
        var open = !allOpen();
        cards.forEach(function (card) { setOpen(card, open); });
      });
    }

    function onToggle(e) {
      var card = e.currentTarget.closest('.cat');
      setOpen(card, !card.classList.contains('is-open'));
    }

    function enable() {
      if (active) { return; }
      active = true;
      document.documentElement.classList.add('js-accordion');
      cards.forEach(function (card, i) {
        var btn = card.querySelector('.cat__toggle');
        if (!btn) { return; }
        btn.disabled = false;
        btn.addEventListener('click', onToggle);
        var panel = card.querySelector('.cat__panel');
        if (panel) { panel.addEventListener('beforematch', onBeforeMatch); }
        /* the first category stays open so the section still shows products */
        setOpen(card, i === 0);
      });
      openFromHash();
    }

    function disable() {
      if (!active) { return; }
      active = false;
      document.documentElement.classList.remove('js-accordion');
      cards.forEach(function (card) {
        var btn = card.querySelector('.cat__toggle');
        if (!btn) { return; }
        btn.removeEventListener('click', onToggle);
        btn.disabled = true;              /* nothing to toggle on desktop */
        btn.removeAttribute('aria-expanded');
        card.classList.remove('is-open');
        var panel = card.querySelector('.cat__panel');
        if (panel) {
          panel.removeEventListener('beforematch', onBeforeMatch);
          panel.hidden = false;
        }
      });
    }

    /* A link to #cat-cone should open that card, not scroll to a closed bar. */
    function openFromHash() {
      if (!active) { return null; }
      var id = window.location.hash.slice(1);
      var card = id && document.getElementById(id);
      if (card && card.classList.contains('cat')) {
        setOpen(card, true);
        return card;
      }
      return null;
    }

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#cat-"]');
      if (!link || !active) { return; }
      var card = document.getElementById(link.getAttribute('href').slice(1));
      if (card) { setOpen(card, true); }
    });

    window.addEventListener('hashchange', function () {
      var card = openFromHash();
      if (card) { card.scrollIntoView({ block: 'start' }); }
    });

    function apply() { if (mq.matches) { enable(); } else { disable(); } }

    if (mq.addEventListener) { mq.addEventListener('change', apply); }
    else if (mq.addListener) { mq.addListener(apply); }
    apply();
  };

})(window.SRMD = window.SRMD || {});
