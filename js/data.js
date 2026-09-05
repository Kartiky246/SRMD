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
    whatsapp: '919467544433',      /* country code + number, digits only */
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
    { no: '07', label: 'Wear Parts',                   href: '#more-categories' },
    { no: '08', label: 'Hydraulic & Lubrication Parts', href: '#more-categories' },
    { no: '09', label: 'Fasteners & Consumables',      href: '#more-categories' },
    { no: '10', label: 'Our Services',                 href: '#services' },
    { no: '11', label: 'Quality Control',              href: '#quality' },
    { no: '12', label: 'Contact Us',                   href: '#contact' }
  ];

  /* Product categories ---------------------------------------------------- */
  ns.categories = [
    {
      id: 'cat-jaw', no: '01', title: 'Jaw Crusher Parts', art: 'jaw',
      items: [
        { name: 'Jaw Plates', icon: 'plate' },
        { name: 'Toggle Plates & Seats', icon: 'toggle' },
        { name: 'Pitman', icon: 'pitman' },
        { name: 'Side Plates', icon: 'frame' },
        { name: 'Flywheel & Pulley', icon: 'pulley' },
        { name: 'Wedges', icon: 'wedge' },
        { name: 'Bearings', icon: 'bearing' },
        { name: 'Shims', icon: 'shim' },
        { name: 'Complete Jaw Crusher Spares', icon: 'package' }
      ],
      points: ['High strength', 'Wear resistant', 'Accurate dimensions', 'Longer life']
    },
    {
      id: 'cat-cone', no: '02', title: 'Cone Crusher Parts', art: 'cone',
      items: [
        { name: 'Mantle', icon: 'mantle' },
        { name: 'Concave', icon: 'concave' },
        { name: 'Bowl Liner', icon: 'ring' },
        { name: 'Main Shaft', icon: 'shaft' },
        { name: 'Thrust Plate', icon: 'thrust' },
        { name: 'Eccentric Assembly', icon: 'eccentric' },
        { name: 'Bronze Bushes', icon: 'bush' },
        { name: 'Dust Seal / O-Rings', icon: 'seal' },
        { name: 'Hydraulic & Lubrication Parts', icon: 'hydraulic' }
      ],
      points: ['Precision engineered', 'High wear resistance', 'Reliable performance']
    },
    {
      id: 'cat-vsi', no: '03', title: 'VSI Crusher Parts', art: 'vsi',
      items: [
        { name: 'Rotor Assembly', icon: 'rotor' },
        { name: 'Tips & Tip Plates', icon: 'tip' },
        { name: 'Distributor Plate', icon: 'distributor' },
        { name: 'Wear Plates', icon: 'wear' },
        { name: 'Cavity Wear Plates', icon: 'plate' },
        { name: 'Shaft', icon: 'shaft' },
        { name: 'Bearings', icon: 'bearing' },
        { name: 'Labyrinth Seal', icon: 'labyrinth' },
        { name: 'Complete VSI Spares', icon: 'package' }
      ],
      points: ['Superior quality', 'High impact strength', 'Maximum durability']
    },
    {
      id: 'cat-screen', no: '04', title: 'Vibrating Screen Parts', art: 'screen',
      items: [
        { name: 'Screen Mesh', icon: 'mesh' },
        { name: 'Exciter Assembly', icon: 'exciter' },
        { name: 'Bearings', icon: 'bearing' },
        { name: 'Springs', icon: 'spring' },
        { name: 'Side Plates', icon: 'frame' },
        { name: 'Deck Components', icon: 'deck' },
        { name: 'Rubber Balls', icon: 'ball' },
        { name: 'Wedge Clamp', icon: 'clamp' },
        { name: 'Screen Spares', icon: 'package' }
      ],
      points: ['High efficiency', 'Smooth operation', 'Long service life']
    },
    {
      id: 'cat-conveyor', no: '05', title: 'Conveyor System', art: 'conveyor',
      items: [
        { name: 'Conveyor Rollers', icon: 'roller' },
        { name: 'Idlers', icon: 'idler' },
        { name: 'Pulley', icon: 'pulley' },
        { name: 'Belts', icon: 'belt' },
        { name: 'Bearings', icon: 'bearing' },
        { name: 'Rubber Components', icon: 'rubber' },
        { name: 'Skirting Rubber', icon: 'skirt' },
        { name: 'Impact Idlers', icon: 'idler' },
        { name: 'Conveyor Accessories', icon: 'package' }
      ],
      points: ['Reliable movement', 'Strong & durable', 'Low maintenance']
    },
    {
      id: 'cat-plant', no: '06', title: 'Crusher Plant Equipment', art: 'plant',
      items: [
        { name: 'Feeders', icon: 'feeder' },
        { name: 'Hoppers', icon: 'hopper' },
        { name: 'Chutes', icon: 'chute' },
        { name: 'Conveyors', icon: 'conveyor' },
        { name: 'Vibrating Screens', icon: 'screen' },
        { name: 'Structural Components', icon: 'structure' },
        { name: 'Hydraulic Systems', icon: 'hydraulic' },
        { name: 'Lubrication Systems', icon: 'lube' },
        { name: 'Electrical Controls', icon: 'electric' }
      ],
      points: ['Complete range of equipment for efficient & reliable crushing operations']
    }
  ];

  /* Further catalogue sections (listed in the printed index) --------------- */
  ns.moreCategories = [
    { no: '07', icon: 'wear',  title: 'Wear Parts',                    text: 'Liners, wear plates and high-impact wear components' },
    { no: '08', icon: 'hydraulic', title: 'Hydraulic & Lubrication Parts', text: 'Power packs, cylinders, pumps, hoses and lube units' },
    { no: '09', icon: 'bolt',  title: 'Fasteners & Consumables',       title_alt: '', text: 'Bolts, nuts, springs, seals and plant consumables' }
  ];

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
