/* ==========================================================================
   nav.js — mobile menu, sticky header shadow, scroll-spy on nav links
   ========================================================================== */
(function (ns) {
  'use strict';

  ns.nav = function () {
    var header = document.querySelector('[data-header]');
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav]');
    if (!header || !toggle || !nav) { return; }

    var links = Array.prototype.slice.call(nav.querySelectorAll('.nav__link'));
    var scrim = document.querySelector('[data-nav-scrim]');

    function setMenu(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('is-locked', open);
      if (scrim) { scrim.classList.toggle('is-visible', open); }
    }

    if (scrim) { scrim.addEventListener('click', function () { setMenu(false); }); }

    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    /* Close after tapping a link, or on Escape / resize to desktop */
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setMenu(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setMenu(false); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) { setMenu(false); }
    });

    /* Sticky shadow + active section highlight ---------------------------- */
    var sections = links
      .map(function (a) {
        var id = a.getAttribute('href');
        return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    function onScroll() {
      header.classList.toggle('is-stuck', window.scrollY > 8);

      var pos = window.scrollY + (header.offsetHeight + 40);
      var current = null;
      sections.forEach(function (sec) {
        if (sec.offsetTop <= pos) { current = sec.id; }
      });
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
      });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) { return; }
      ticking = true;
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
    }, { passive: true });

    onScroll();
  };

})(window.SRMD = window.SRMD || {});
