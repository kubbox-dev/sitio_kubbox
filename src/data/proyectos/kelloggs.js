export default {
  slug: 'kelloggs',
  name: "Kellogg's",
  title: 'Códigos Secretos',
  meta: { category: 'Campaña Digital · Centroamérica' },
  blocks: [
    {
      type: 'hero',
      props: {
        eyebrowLime: 'NUESTROS',
        eyebrowWhite: 'PROYECTOS',
        logo: '/images/NUESTROS PROYECTOS/WEB/Logos/Kelloggs logo.svg',
        logoAlt: "Kellogg's",
        art: '/images/NUESTROS PROYECTOS/WEB/Fotos/bob esponja.png',
        artAlt: 'Bob Esponja, personaje de la campaña Códigos Secretos',
      },
    },
    {
      type: 'statement',
      props: {
        titleLime: 'Códigos Secretos',
        tags: ['API', 'WhatsApp'],
        paragraphs: [
          'Desarrollamos una campaña retail con presencia en Costa Rica, Guatemala y El Salvador, diseñada para incentivar la compra en el punto de venta.',
          'El objetivo principal fue doble: generar un incremento directo en las ventas y, simultáneamente, implementar un sistema de captura de datos estratégicos tales como el perfil del consumidor y el ticket promedio. Esto permitió transformar una transacción masiva en información accionable para futuras decisiones de marca.',
        ],
      },
    },
    { type: 'sectionHeading', props: { lime: 'RESULTADOS DE', white: 'LA CAMPAÑA' } },
    {
      type: 'textPanel',
      props: {
        eyebrow: 'Resultados',
        text: 'La campaña logró un incremento sostenido en las ventas y, a la vez, construyó una base de datos accionable de consumidores y ticket promedio en los tres países de Centroamérica.',
      },
    },
    {
      type: 'mediaGallery',
      props: {
        columns: 2,
        items: [
          { src: '/images/NUESTROS PROYECTOS/WEB/Fotos/grafica 1.png', alt: 'Gráfica de usuarios registrados por día durante la campaña' },
          { src: '/images/NUESTROS PROYECTOS/WEB/Fotos/grafica 2.png', alt: 'Gráfica de códigos registrados por día durante la campaña' },
        ],
      },
    },
    {
      type: 'statGrid',
      props: {
        stats: [
          { icon: '/images/NUESTROS PROYECTOS/WEB/Iconos/Icono usuario.svg', label: 'Total usuarios registrados', value: '8.652' },
          { icon: '/images/NUESTROS PROYECTOS/WEB/Iconos/icono code.svg', label: 'Total códigos registrados', value: '24.918' },
          { icon: '/images/NUESTROS PROYECTOS/WEB/Iconos/icono medalla.svg', label: 'Total premios entregados', value: '2.547' },
        ],
      },
    },
    {
      type: 'regionCards',
      props: {
        regions: [
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/Guatemala.svg', name: 'Guatemala', stats: [
            { label: 'Usuarios', value: '3.120' }, { label: 'Códigos', value: '9.840' }, { label: 'Premios', value: '910' },
          ] },
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/El salvador.svg', name: 'El Salvador', stats: [
            { label: 'Usuarios', value: '2.480' }, { label: 'Códigos', value: '7.260' }, { label: 'Premios', value: '720' },
          ] },
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/Costa rica.svg', name: 'Costa Rica', stats: [
            { label: 'Usuarios', value: '3.052' }, { label: 'Códigos', value: '7.818' }, { label: 'Premios', value: '917' },
          ] },
        ],
      },
    },
  ],
}
