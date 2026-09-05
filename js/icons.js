/* ==========================================================================
   icons.js — inline SVG icon set (stroke based, inherits currentColor)
   Usage: SRMD.icon('gear', 'cat__icon')
   ========================================================================== */
(function (ns) {
  'use strict';

  var P = {
    /* UI + trust */
    shield:   '<path d="M12 3l7 3v5c0 4.4-2.9 8.3-7 10-4.1-1.7-7-5.6-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
    users:    '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 6.2a3 3 0 0 1 0 5.6"/><path d="M17.5 14.4A6 6 0 0 1 21 20"/>',
    rupee:    '<path d="M7 4h10"/><path d="M7 8h10"/><path d="M7 12h5a4 4 0 0 0 0-8"/><path d="M7 12l7 8"/>',
    truck:    '<path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    smile:    '<circle cx="12" cy="12" r="9"/><path d="M8.5 14a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    check:    '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
    checkbox: '<path d="M20 12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10"/><path d="M8.5 11.5l3 3L21 5"/>',
    star:     '<path d="M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9z"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 1.9"/>',
    target:   '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    headset:  '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><path d="M4 13h3v6H5.5A1.5 1.5 0 0 1 4 17.5z"/><path d="M20 13h-3v6h1.5A1.5 1.5 0 0 0 20 17.5z"/><path d="M17 19v.5a2.5 2.5 0 0 1-2.5 2.5H12"/>',
    grid:     '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    tools:    '<path d="M14.5 5.5a3.5 3.5 0 0 0 4.6 4.6L21 12l-9 9-3-3 9-9z"/><path d="M7 3l3 3-3 3-3-3z"/><path d="M4 20l4-4"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 14a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7l-.1-.1a2 2 0 1 1 2.8-2.8L7.4 4A1.6 1.6 0 0 0 10 3V3a2 2 0 1 1 4 0v.1A1.6 1.6 0 0 0 17 4.6l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.2 2.6H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',

    /* Contact */
    phone:    '<path d="M6 3h3l2 5-2.2 1.3a12 12 0 0 0 5.9 5.9L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z"/>',
    mail:     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
    pin:      '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
    globe:    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>',
    whatsapp: '<path d="M20.5 11.6A8.4 8.4 0 0 1 7.9 19l-4.4 1.2 1.2-4.3a8.4 8.4 0 1 1 15.8-4.3z"/><path d="M9 9.4c.3-.7.6-.7.9-.7h.7c.2 0 .5 0 .7.6l.7 1.7c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.3 0 .6a6 6 0 0 0 2.6 2.2c.3.1.5.1.6 0l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5a2 2 0 0 1-1.9 1.8c-.9 0-3.2-.8-4.8-2.6-1.5-1.6-2.3-3.2-2.4-4a2 2 0 0 1 .2-1.3z"/>',
    arrowUp:  '<path d="M12 19V5"/><path d="M6 11l6-6 6 6"/>',
    arrowRight: '<path d="M5 12h13"/><path d="M12 6l6 6-6 6"/>',

    /* Crusher parts + plant */
    plate:    '<path d="M3.5 8.5h17v7h-17z"/><path d="M7 8.5v7M11 8.5v7M15 8.5v7M18 8.5v7"/>',
    toggle:   '<rect x="3.5" y="9" width="17" height="6" rx="1"/><circle cx="7.5" cy="12" r="1.2"/><circle cx="16.5" cy="12" r="1.2"/>',
    pitman:   '<path d="M4.5 17.5l11-11"/><circle cx="4.5" cy="17.5" r="2.6"/><circle cx="16.5" cy="5.5" r="3"/>',
    frame:    '<rect x="3.5" y="6.5" width="17" height="11" rx="1.5"/><path d="M3.5 10h17"/><path d="M8 10v7.5"/>',
    pulley:   '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.4"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/>',
    wedge:    '<path d="M4 18L14 5h5l-5 13z"/>',
    bearing:  '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.4"/><circle cx="12" cy="5.6" r="1.1"/><circle cx="18.4" cy="12" r="1.1"/><circle cx="12" cy="18.4" r="1.1"/><circle cx="5.6" cy="12" r="1.1"/>',
    shim:     '<ellipse cx="12" cy="9" rx="7.5" ry="2.8"/><path d="M4.5 9v4c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8V9"/>',
    package:  '<path d="M12 3l8 4v10l-8 4-8-4V7z"/><path d="M4 7l8 4 8-4"/><path d="M12 11v10"/>',
    mantle:   '<path d="M12 4l6.5 12.5H5.5z"/><path d="M8 16.5h8"/>',
    concave:  '<path d="M4 6c2.5 2.6 5 4 8 4s5.5-1.4 8-4"/><path d="M4 6v3c0 4 3.6 9 8 9s8-5 8-9V6"/>',
    ring:     '<ellipse cx="12" cy="12" rx="8.5" ry="5"/><ellipse cx="12" cy="12" rx="4.5" ry="2.4"/>',
    shaft:    '<path d="M3 11h18v2H3z"/><path d="M6 8.5v7M18 8.5v7"/>',
    thrust:   '<ellipse cx="12" cy="10" rx="8" ry="3.2"/><path d="M4 10v3.5c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V10"/>',
    eccentric:'<circle cx="12" cy="12" r="8.5"/><circle cx="13.8" cy="12" r="4"/>',
    bush:     '<ellipse cx="12" cy="7.5" rx="6.5" ry="2.5"/><path d="M5.5 7.5v9c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-9"/><ellipse cx="12" cy="7.5" rx="3" ry="1.1"/>',
    seal:     '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="5.2"/>',
    hydraulic:'<rect x="3" y="9" width="9" height="6" rx="1"/><path d="M12 12h5"/><circle cx="19" cy="12" r="2.4"/><path d="M6 9V6.5M9 9V6.5"/>',
    rotor:    '<circle cx="12" cy="12" r="8.5"/><path d="M12 12l5-3.5M12 12l-5.5-2.5M12 12l1 6.4"/><circle cx="12" cy="12" r="2"/>',
    tip:      '<path d="M6 19V9l6-5 6 5v10z"/><path d="M6 14h12"/>',
    distributor: '<circle cx="12" cy="12" r="7.5"/><path d="M12 4.5v15M4.5 12h15"/>',
    labyrinth:'<path d="M4 6h16v12H4z"/><path d="M7 6v12M10 6v12M13 6v12M16 6v12"/>',
    mesh:     '<rect x="3.5" y="5.5" width="17" height="13" rx="1"/><path d="M8 5.5v13M13 5.5v13M17 5.5v13M3.5 9.5h17M3.5 14h17"/>',
    exciter:  '<circle cx="8.5" cy="12" r="4"/><circle cx="15.5" cy="12" r="4"/><path d="M8.5 8V6M15.5 8V6"/>',
    spring:   '<path d="M6 4h12"/><path d="M6 20h12"/><path d="M7 6.5l10 3-10 3 10 3"/>',
    deck:     '<path d="M3 8h18M3 12h18M3 16h18"/><path d="M6 6v12M18 6v12"/>',
    ball:     '<circle cx="9" cy="14" r="4.2"/><circle cx="16" cy="9.5" r="3.2"/>',
    clamp:    '<path d="M5 7h14v4H5z"/><path d="M9 11v6M15 11v6"/><path d="M7 17h10"/>',
    roller:   '<rect x="3" y="8" width="18" height="8" rx="4"/><path d="M7 8v8M17 8v8"/>',
    idler:    '<circle cx="6" cy="14" r="3.2"/><circle cx="18" cy="14" r="3.2"/><circle cx="12" cy="10" r="3.2"/>',
    belt:     '<path d="M4 8h16a0 0 0 0 1 0 0v8a0 0 0 0 1 0 0H4z"/><path d="M4 11h16M4 13h16"/>',
    rubber:   '<path d="M5 6h14v3H5z"/><path d="M5 12h14v3H5z"/><path d="M7 18h10"/>',
    skirt:    '<path d="M4 6h16v6H4z"/><path d="M6 12l-1 6M18 12l1 6"/>',
    feeder:   '<path d="M3 6h18l-4 6H7z"/><path d="M7 12v6h10v-6"/>',
    hopper:   '<path d="M3.5 5h17l-5 8v6h-7v-6z"/>',
    chute:    '<path d="M5 4h6l8 12v4h-6L5 8z"/>',
    conveyor: '<path d="M4.5 14.5h15"/><circle cx="4.5" cy="14.5" r="2.6"/><circle cx="19.5" cy="14.5" r="2.6"/><path d="M8 9.5h8l2 2H6z"/>',
    screen:   '<rect x="3" y="7" width="18" height="10" rx="1"/><path d="M3 11h18M3 14h18"/><path d="M6 17v3M18 17v3"/>',
    structure:'<path d="M4 20V5h16v15"/><path d="M4 12h16M4 5l16 7M20 5L4 12"/>',
    lube:     '<path d="M6 10h8l4 3v5H6z"/><path d="M9 10V7h4v3"/><path d="M18 8h2"/>',
    electric: '<rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M13 7l-3 5h4l-3 5"/>',
    bolt:     '<path d="M9 6.5l3-1.7 3 1.7v3.5l-3 1.7-3-1.7z"/><path d="M12 11.5V20"/><path d="M10 20h4"/>',
    wear:     '<path d="M4 16l4-8 4 5 3-4 5 7z"/><path d="M3.5 19.5h17"/>'
  };

  ns.icon = function (name, cls) {
    var d = P[name] || P.settings;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
           (cls ? ' class="' + cls + '"' : '') + '>' + d + '</svg>';
  };

  ns.hasIcon = function (name) { return Object.prototype.hasOwnProperty.call(P, name); };

})(window.SRMD = window.SRMD || {});
