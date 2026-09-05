/* ==========================================================================
   main.js — bootstrap. Loaded last; every other module only registers
   itself on the SRMD namespace.
   ========================================================================== */
(function (ns) {
  'use strict';

  function start() {
    try {
      ns.render();
    } catch (err) {
      /* Content failing to build should never break navigation */
      if (window.console) { console.error('SRMD render failed:', err); }
    }
    ns.nav();
    ns.ui();
    document.documentElement.classList.add('is-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})(window.SRMD = window.SRMD || {});
