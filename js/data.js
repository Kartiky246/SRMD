/* ==========================================================================
   data.js — single source of truth for all site content.
   Edit this file to update the website; nothing else needs to change.
   ========================================================================== */
(function (ns) {
  'use strict';

  ns.company = {
    name: 'SRMD India Solution',
    tagline: 'Quality & Trusted Solution',
    address: 'Ateli Mandi - 123021, Haryana, India',
    phones: ['94675 44433', '85058 88809'],
    email: 'srmdindia@gmail.com',
    website: 'srmdindia.com',
    /* Country code + number, digits only. This must be a number that is
       actually registered on WhatsApp - 94675 44433 is not, so chats open on
       85058 88809. Calls still go to the first number in `phones`. */
    whatsapp: '918505888809',
    hours: 'Mon - Sat, 9:00 AM - 7:00 PM'
  };

  /* Hero + trust strip ---------------------------------------------------- */
  ns.trust = [
    { icon: 'shield', title: 'Quality Assurance', text: '100% quality tested products' },
    { icon: 'users',  title: 'Expert Team',       text: 'Experienced professionals' },
    { icon: 'rupee',  title: 'Competitive Prices', text: 'Best value on every order' },
    { icon: 'truck',  title: 'Timely Delivery',   text: 'Fast & reliable dispatch' }
  ];

  /* About ----------------------------------------------------------------- */
  ns.about = {
    paragraphs: [
      'SRMD India Solution is a leading name in the field of crusher spare parts and equipment. We provide high quality, reliable and cost-effective solutions for stone crushing and mineral processing industries.',
      'Our products are manufactured using premium grade raw materials and advanced technology to deliver perfect fit, long life and optimum performance.',
      'We are committed to provide Quality & Trusted Solution to our valuable clients.'
    ],
    features: [
      { icon: 'shield', title: 'Quality Assurance',     text: '100% quality tested products' },
      { icon: 'users',  title: 'Expert Team',           text: 'Experienced professionals' },
      { icon: 'smile',  title: 'Customer Satisfaction', text: 'Our topmost priority' },
      { icon: 'truck',  title: 'Pan India Supply',      text: 'Fast & reliable delivery' }
    ],
    stats: [
      { value: '12+',  label: 'Product Categories' },
      { value: '150+', label: 'Spare Parts Supplied' },
      { value: 'Pan India', label: 'Delivery Network' },
      { value: '100%', label: 'Quality Tested' }
    ]
  };

  /* Catalogue index (matches the printed catalogue) ----------------------- */
  ns.catalogueIndex = [
    { no: '01', label: 'Jaw Crusher Parts',            href: '#cat-jaw' },
    { no: '02', label: 'Cone Crusher Parts',           href: '#cat-cone' },
    { no: '03', label: 'VSI Crusher Parts',            href: '#cat-vsi' },
    { no: '04', label: 'Vibrating Screen Parts',       href: '#cat-screen' },
    { no: '05', label: 'Conveyor System',              href: '#cat-conveyor' },
    { no: '06', label: 'Crusher Plant Equipment',      href: '#cat-plant' },
    { no: '07', label: 'Our Services',                 href: '#services' },
    { no: '08', label: 'Quality Control',              href: '#quality' },
    { no: '09', label: 'Contact Us',                   href: '#contact' }
  ];

  /* Product categories -----------------------------------------------------
     Item images live at  asset/images/parts/<key>-<img>.webp
     Banner photos at     asset/images/machines/<key>.webp
     Both are cut from the printed catalogue by tools/extract_images.py    */
  ns.categories = [
    {
      id: 'cat-jaw', no: '01', key: 'jaw', title: 'Jaw Crusher Parts',
      items: [
        { name: 'Jaw Plates', img: 'jaw-plates' },
        { name: 'Toggle Plates & Seats', img: 'toggle-plates' },
        { name: 'Pitman', img: 'pitman' },
        { name: 'Side Plates', img: 'side-plates' },
        { name: 'Flywheel & Pulley', img: 'flywheel-pulley' },
        { name: 'Wedges', img: 'wedges' },
        { name: 'Bearings', img: 'bearings' },
        { name: 'Shims', img: 'shims' },
        { name: 'Complete Jaw Crusher Spares', img: 'complete-spares' }
      ],
      points: ['High strength', 'Wear resistant', 'Accurate dimensions', 'Longer life']
    },
    {
      id: 'cat-cone', no: '02', key: 'cone', title: 'Cone Crusher Parts',
      items: [
        { name: 'Mantle', img: 'mantle' },
        { name: 'Concave', img: 'concave' },
        { name: 'Bowl Liner', img: 'bowl-liner' },
        { name: 'Main Shaft', img: 'main-shaft' },
        { name: 'Thrust Plate', img: 'thrust-plate' },
        { name: 'Eccentric Assembly', img: 'eccentric-assembly' },
        { name: 'Bronze Bushes', img: 'bronze-bushes' },
        { name: 'Dust Seal / O-Rings', img: 'dust-seal' },
        { name: 'Hydraulic & Lubrication Parts', img: 'hydraulic-parts' }
      ],
      points: ['Precision engineered', 'High wear resistance', 'Reliable performance']
    },
    {
      id: 'cat-vsi', no: '03', key: 'vsi', title: 'VSI Crusher Parts',
      items: [
        { name: 'Rotor Assembly', img: 'rotor-assembly' },
        { name: 'Tips & Tip Plates', img: 'tips-tip-plates' },
        { name: 'Distributor Plate', img: 'distributor-plate' },
        { name: 'Wear Plates', img: 'wear-plates' },
        { name: 'Cavity Wear Plates', img: 'cavity-wear-plates' },
        { name: 'Shaft', img: 'shaft' },
        { name: 'Bearings', img: 'bearings' },
        { name: 'Labyrinth Seal', img: 'labyrinth-seal' },
        { name: 'Complete VSI Spares', img: 'complete-spares' }
      ],
      points: ['Superior quality', 'High impact strength', 'Maximum durability']
    },
    {
      id: 'cat-screen', no: '04', key: 'screen', title: 'Vibrating Screen Parts',
      items: [
        { name: 'Screen Mesh', img: 'screen-mesh' },
        { name: 'Exciter Assembly', img: 'exciter-assembly' },
        { name: 'Bearings', img: 'bearings' },
        { name: 'Springs', img: 'springs' },
        { name: 'Side Plates', img: 'side-plates' },
        { name: 'Deck Components', img: 'deck-components' },
        { name: 'Rubber Balls', img: 'rubber-balls' },
        { name: 'Wedge Clamp', img: 'wedge-clamp' },
        { name: 'Screen Spares', img: 'screen-spares' }
      ],
      points: ['High efficiency', 'Smooth operation', 'Long service life']
    },
    {
      id: 'cat-conveyor', no: '05', key: 'conveyor', title: 'Conveyor System',
      items: [
        { name: 'Conveyor Rollers', img: 'conveyor-rollers' },
        { name: 'Idlers', img: 'idlers' },
        { name: 'Pulley', img: 'pulley' },
        { name: 'Belts', img: 'belts' },
        { name: 'Bearings', img: 'bearings' },
        { name: 'Rubber Components', img: 'rubber-components' },
        { name: 'Skirting Rubber', img: 'skirting-rubber' },
        { name: 'Impact Idlers', img: 'impact-idlers' },
        { name: 'Conveyor Accessories', img: 'accessories' }
      ],
      points: ['Reliable movement', 'Strong & durable', 'Low maintenance']
    },
    {
      id: 'cat-plant', no: '06', key: 'plant', title: 'Crusher Plant Equipment',
      items: [
        { name: 'Feeders', img: 'feeders' },
        { name: 'Hoppers', img: 'hoppers' },
        { name: 'Chutes', img: 'chutes' },
        { name: 'Conveyors', img: 'conveyors' },
        { name: 'Vibrating Screens', img: 'vibrating-screens' },
        { name: 'Structural Components', img: 'structural-components' },
        { name: 'Hydraulic Systems', img: 'hydraulic-systems' },
        { name: 'Lubrication Systems', img: 'lubrication-systems' },
        { name: 'Electrical Controls', img: 'electrical-controls' }
      ],
      points: ['Complete range of equipment for efficient & reliable crushing operations']
    }
  ];

  /* Further catalogue sections (listed in the printed index) --------------- */
  ns.moreCategories = [];

  /* Why choose us --------------------------------------------------------- */
  ns.why = [
    { icon: 'grid',     title: 'Wide Range',        text: 'Complete range of spare parts & equipment under one roof.' },
    { icon: 'star',     title: 'Premium Quality',   text: 'Best quality raw material & advanced manufacturing.' },
    { icon: 'target',   title: 'Exact Fit',         text: '100% accurate dimensions for perfect performance.' },
    { icon: 'rupee',    title: 'Competitive Prices', text: 'Best quality at most competitive prices.' },
    { icon: 'clock',    title: 'On Time Delivery',  text: 'Timely dispatch & fast delivery across India.' },
    { icon: 'headset',  title: 'After Sales Support', text: 'Dedicated support for complete satisfaction.' }
  ];

  /* Services -------------------------------------------------------------- */
  ns.services = [
    { icon: 'package',  title: 'Spare Parts Supply',   text: 'Wide range of crusher spare parts.' },
    { icon: 'settings', title: 'Equipment Supply',     text: 'Complete range of crushing & processing equipment.' },
    { icon: 'tools',    title: 'Site Support',         text: 'Installation guidance & technical support.' },
    { icon: 'wear',     title: 'Maintenance Support',  text: 'Regular maintenance & trouble shooting.' },
    { icon: 'target',   title: 'Customised Solutions', text: 'As per your requirements.' },
    { icon: 'truck',    title: 'Pan India Dispatch',   text: 'Fast & reliable delivery across India.' }
  ];

  /* Quality control ------------------------------------------------------- */
  ns.quality = {
    steps: [
      'Raw Material Inspection',
      'In-Process Inspection',
      'Dimensional Check',
      'Performance Testing',
      'Final Quality Check'
    ],
    note: 'We ensure that every product meets international quality standards and customer expectations.'
  };

})(window.SRMD = window.SRMD || {});
