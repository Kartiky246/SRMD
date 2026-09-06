/* ==========================================================================
   ui.js — scroll reveal, back-to-top, enquiry form handling
   The site is static (GitHub Pages), so the enquiry form composes a
   WhatsApp / e-mail message instead of posting to a server.
   ========================================================================== */
(function (ns) {
  'use strict';

  /* Reveal on scroll ------------------------------------------------------- */
  function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 60 + 'ms';
      io.observe(el);
    });
  }

  /* Back to top ------------------------------------------------------------ */
  function backToTop() {
    var btn = document.querySelector('[data-top]');
    if (!btn) { return; }
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
  }

  /* Enquiry form ----------------------------------------------------------- */
  function enquiryForm() {
    var form = document.querySelector('[data-enquiry-form]');
    if (!form) { return; }

    var status = form.querySelector('[data-form-status]');

    function compose() {
      var d = new FormData(form);
      var lines = [
        'Enquiry from ' + ns.company.website,
        '',
        'Name: ' + (d.get('name') || '-'),
        'Phone: ' + (d.get('phone') || '-'),
        'Company: ' + (d.get('company') || '-'),
        'Requirement: ' + (d.get('product') || '-'),
        'Message: ' + (d.get('message') || '-')
      ];
      return lines.join('\n');
    }

    function say(text) {
      if (status) { status.textContent = text; }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) { return; }
      var url = 'https://wa.me/' + ns.company.whatsapp + '?text=' + encodeURIComponent(compose());
      window.open(url, '_blank', 'noopener');
      say('Opening WhatsApp with your enquiry. If it does not open, call us on +91 ' + ns.company.phones[0] + '.');
    });

    var mailBtn = form.querySelector('[data-form-mail]');
    if (mailBtn) {
      mailBtn.addEventListener('click', function () {
        if (!form.reportValidity()) { return; }
        window.location.href = 'mailto:' + ns.company.email +
          '?subject=' + encodeURIComponent('Enquiry - ' + ns.company.name) +
          '&body=' + encodeURIComponent(compose());
        say('Opening your e-mail app with the enquiry ready to send.');
      });
    }
  }

  /* Fill the requirement dropdown from the catalogue ----------------------- */
  function productOptions() {
    var select = document.querySelector('[data-product-options]');
    if (!select) { return; }
    var html = '<option value="">Select a category</option>';
    ns.categories.forEach(function (c) {
      html += '<option value="' + c.title + '">' + c.title + '</option>';
    });
    ns.moreCategories.forEach(function (c) {
      html += '<option value="' + c.title + '">' + c.title + '</option>';
    });
    html += '<option value="Other requirement">Other requirement</option>';
    select.innerHTML = html;
  }

  ns.ui = function () {
    productOptions();
    enquiryForm();
    backToTop();
    reveal();
  };

})(window.SRMD = window.SRMD || {});
