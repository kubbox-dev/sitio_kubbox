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
      },
    },
    {
      type: 'statement',
      props: {
        titleLime: 'El Reto',
        paragraphs: [
          'Dar a conocer la marca y enseñarle a los consumidores cómo aplicar cada producto para el lavado de su auto.',
          'Aumentar la compra de productos en las cadenas participantes y captar información de los consumidores.',
        ],
      },
    },
    {
      type: 'statement',
      props: {
        titleLime: 'La Idea',
        tags: ['Gamificación', 'Retail'],
        image: '/images/NUESTROS PROYECTOS/WEB/Fotos/Armorall/collage_completo.png',
        imageAlt: 'Juego "Limpia y Gana" de Armor All: selección de productos participantes y simulación de lavado de auto',
        paragraphs: [
          'Creamos para nuestro cliente una solución de registro de facturas en los puntos de activación, premiando la compra al instante y con sorteos adicionales.',
        ],
      },
    },
    { type: 'sectionHeading', props: { lime: 'PAÍSES DE', white: 'DESPLIEGUE' } },
    {
      type: 'regionCards',
      props: {
        regions: [
          { name: '🇨🇷 Costa Rica', stats: [] },
          { name: '🇬🇹 Guatemala', stats: [] },
          { name: '🇭🇳 Honduras', stats: [] },
          { name: '🇵🇦 Panamá', stats: [] },
          { name: '🇵🇷 Puerto Rico', stats: [] },
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
      type: 'statGrid',
      props: {
        stats: [
          { icon: '/images/NUESTROS PROYECTOS/WEB/Iconos/Icono usuario.svg', label: 'Usuarios registrados', value: '+2.300' },
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
