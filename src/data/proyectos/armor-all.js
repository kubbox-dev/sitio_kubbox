export default {
  slug: 'armor-all',
  name: 'Armor All',
  title: 'Limpia y Gana',
  meta: { category: 'Campaña Digital · Centroamérica y Caribe' },
  blocks: [
    {
      type: 'hero',
      props: {
        eyebrowLime: 'NUESTROS',
        eyebrowWhite: 'PROYECTOS',
        logo: '/images/NUESTROS PROYECTOS/WEB/Fotos/Armorall/logo armorall.svg',
        logoAlt: 'Armor All',
      },
    },
    {
      type: 'statement',
      props: {
        titleLime: 'El Reto y La Idea',
        tags: ['Gamificación', 'Retail'],
        image: '/images/NUESTROS PROYECTOS/WEB/Fotos/Armorall/collage_completo.png',
        imageAlt: 'Juego "Limpia y Gana" de Armor All: selección de productos participantes y simulación de lavado de auto',
        paragraphs: [
          'Dar a conocer la marca y enseñarle a los consumidores cómo aplicar cada producto para el lavado de su auto.',
          'Aumentar la compra de productos en las cadenas participantes y captar información de los consumidores.',
          'Creamos para nuestro cliente una solución de registro de facturas en los puntos de activación, premiando la compra al instante y con sorteos adicionales.',
        ],
      },
    },
    { type: 'sectionHeading', props: { lime: 'MECÁNICA DE', white: 'LA CAMPAÑA' } },
    {
      type: 'textPanel',
      props: {
        eyebrow: 'Mecánica',
        text: 'Intervención con comunicación en punto de venta en las cadenas participantes, con registro de facturas y datos del cliente en cada activación.',
      },
    },
    {
      type: 'mediaGallery',
      props: {
        columns: 2,
        items: [
          { src: '/images/NUESTROS PROYECTOS/WEB/Fotos/Armorall/grafica 1 armorall.png', alt: 'Gráfica de usuarios registrados por día durante la campaña' },
          { src: '/images/NUESTROS PROYECTOS/WEB/Fotos/Armorall/grafica 2 armorall.png', alt: 'Gráfica de facturas registradas por día durante la campaña' },
        ],
      },
    },
    {
      type: 'statGrid',
      props: {
        stats: [
          { icon: '/images/NUESTROS PROYECTOS/WEB/Iconos/Icono usuario.svg', label: 'Usuarios registrados', value: '+5.059' },
          { icon: '/images/NUESTROS PROYECTOS/WEB/Iconos/icono code.svg', label: 'Facturas registradas', value: '3.794' },
        ],
      },
    },
    {
      type: 'regionCards',
      props: {
        regions: [
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/Panama.svg', name: 'Panamá', stats: [
            { label: 'Usuarios registrados', value: '1.074' },
          ] },
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/Guatemala.svg', name: 'Guatemala', stats: [
            { label: 'Usuarios registrados', value: '1.067' },
          ] },
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/Honduras.svg', name: 'Honduras', stats: [
            { label: 'Usuarios registrados', value: '1.005' },
          ] },
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/Puerto rico.svg', name: 'Puerto Rico', stats: [
            { label: 'Usuarios registrados', value: '1.033' },
          ] },
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/Costa rica.svg', name: 'Costa Rica', stats: [
            { label: 'Usuarios registrados', value: '880' },
          ] },
        ],
      },
    },
    {
      type: 'statement',
      props: {
        titleLime: 'Servicios',
        paragraphs: [
          'Desarrollo de campaña digital',
          'Diseño y programación del juego de lavado de auto',
          'Premios por acumulación y aciertos',
          'Implementación técnica',
          'Operación y control de campaña',
        ],
      },
    },
  ],
}
