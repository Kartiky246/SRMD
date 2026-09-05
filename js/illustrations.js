/* ==========================================================================
   illustrations.js — line-art machine scenes used as section / card art.
   Pure SVG, theme colours, no external images.
   Usage: SRMD.art('jaw')
   ========================================================================== */
(function (ns) {
  'use strict';

  /* Strokes inherit the parent text colour so a scene works on light and
     dark panels alike; the green accent stays fixed to the brand colour. */
  var GREEN = '#17a94f';

  function wrap(inner, w, h) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid meet" ' +
           'role="img" aria-hidden="true" fill="none" stroke="currentColor" ' +
           'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }

  var SCENES = {
    /* Jaw crusher: body, flywheel, feed hopper */
    jaw: wrap(
      '<path d="M40 130h240" stroke-width="3"/>' +
      '<path d="M96 130V54l38-22h74l30 22v76z" fill="#fff" fill-opacity=".65"/>' +
      '<path d="M118 60h84l-14 44h-56z" stroke="' + GREEN + '"/>' +
      '<path d="M134 104h52l-10 26h-32z"/>' +
      '<circle cx="76" cy="86" r="26"/><circle cx="76" cy="86" r="7"/>' +
      '<path d="M76 60v-8M76 112v8M50 86h-8M102 86h8"/>' +
      '<path d="M232 66h34v64h-34z" fill="#fff" fill-opacity=".5"/>' +
      '<path d="M232 82h34M232 98h34M232 114h34"/>', 320, 150),

    /* Cone crusher: bowl + mantle */
    cone: wrap(
      '<path d="M40 130h240" stroke-width="3"/>' +
      '<path d="M92 44h136l-18 30H110z" fill="#fff" fill-opacity=".6"/>' +
      '<path d="M110 74h100l-16 30h-68z" stroke="' + GREEN + '"/>' +
      '<path d="M126 104h68v26h-68z" fill="#fff" fill-opacity=".5"/>' +
      '<path d="M160 44v-16M138 28h44"/>' +
      '<circle cx="160" cy="118" r="6"/>' +
      '<path d="M60 130V96h26v34M60 108h26"/>' +
      '<path d="M234 130V96h26v34M234 108h26"/>', 320, 150),

    /* VSI: rotor housing */
    vsi: wrap(
      '<path d="M40 130h240" stroke-width="3"/>' +
      '<path d="M104 130V60h112v70z" fill="#fff" fill-opacity=".6"/>' +
      '<path d="M132 60V38h56v22" stroke="' + GREEN + '"/>' +
      '<circle cx="160" cy="94" r="26"/><circle cx="160" cy="94" r="8"/>' +
      '<path d="M160 68l18 14M160 68l-20 12M142 108l36-6"/>' +
      '<path d="M78 130V84h26v46M216 130V84h26v46"/>', 320, 150),

    /* Vibrating screen: inclined decks + springs */
    screen: wrap(
      '<path d="M40 130h240" stroke-width="3"/>' +
      '<path d="M70 96l180-46 12 26L82 122z" fill="#fff" fill-opacity=".6"/>' +
      '<path d="M78 100l176-44M84 114l176-44" stroke="' + GREEN + '"/>' +
      '<path d="M76 122l-6 8 8 4-8 4 8 4M244 84l6-8 8 4-8 4 8 4"/>' +
      '<circle cx="204" cy="66" r="12"/>' +
      '<path d="M90 130v-8M250 118v12"/>', 320, 150),

    /* Conveyor belt on trusses */
    conveyor: wrap(
      '<path d="M40 130h240" stroke-width="3"/>' +
      '<path d="M56 108l190-56" stroke="' + GREEN + '"/>' +
      '<path d="M62 122L252 66"/>' +
      '<circle cx="56" cy="115" r="13"/><circle cx="252" cy="59" r="13"/>' +
      '<circle cx="120" cy="100" r="5"/><circle cx="170" cy="86" r="5"/><circle cx="215" cy="72" r="5"/>' +
      '<path d="M96 130V112M150 130V98M204 130V84"/>', 320, 150),

    /* Full plant: hopper, tower, stockpile */
    plant: wrap(
      '<path d="M20 132h280" stroke-width="3"/>' +
      '<path d="M52 132V72h56v60z" fill="#fff" fill-opacity=".6"/>' +
      '<path d="M52 72l28-26 28 26" stroke="' + GREEN + '"/>' +
      '<path d="M52 96h56M80 96v36"/>' +
      '<path d="M140 132V56h48v76z" fill="#fff" fill-opacity=".5"/>' +
      '<path d="M140 80h48M164 56V38"/>' +
      '<path d="M196 120l64-34" stroke="' + GREEN + '"/><circle cx="262" cy="84" r="9"/>' +
      '<path d="M216 132l30-26 30 26z" fill="#fff" fill-opacity=".4"/>', 320, 150),

    /* Wide about-panel scene */
    site: wrap(
      '<path d="M16 176h368" stroke-width="3"/>' +
      '<path d="M48 176V86h74v90z" fill="#fff" fill-opacity=".6"/>' +
      '<path d="M48 86l37-30 37 30" stroke="' + GREEN + '"/>' +
      '<path d="M48 116h74M85 116v60"/>' +
      '<path d="M150 176V62h66v114z" fill="#fff" fill-opacity=".5"/>' +
      '<path d="M150 96h66M183 62V40M164 40h38"/>' +
      '<path d="M224 158l106-56" stroke="' + GREEN + '"/>' +
      '<circle cx="334" cy="100" r="12"/><circle cx="222" cy="162" r="12"/>' +
      '<path d="M258 176V146M296 176V126"/>' +
      '<path d="M280 176l40-32 40 32z" fill="#fff" fill-opacity=".4"/>', 400, 190),

    /* Quality / inspection scene */
    quality: wrap(
      '<circle cx="150" cy="92" r="58" stroke="' + GREEN + '"/>' +
      '<path d="M124 92l18 18 36-38"/>' +
      '<path d="M226 60h108v104H226z" fill="#fff" fill-opacity=".08"/>' +
      '<path d="M226 88h108M226 116h108M226 144h108"/>' +
      '<path d="M40 168h300" stroke-width="3"/>' +
      '<path d="M60 168v-38h34v38" />', 380, 190)
  };

  ns.art = function (name) { return SCENES[name] || SCENES.plant; };

})(window.SRMD = window.SRMD || {});
