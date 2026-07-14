/**
 * Datos centralizados de servicios dinámicos de Kubbox.
 * Cada entrada genera una página en /servicios/:slug
 */
export const serviciosData = [
  // {
  //   id: 1,
  //   slug: "desarrollo-software-medida",
  //   title: "Desarrollo de Software a la Medida",
  //   tagline: "Cada empresa tiene procesos únicos.",
  //   introText:
  //     "Por eso desarrollamos software completamente personalizado que se adapta a las necesidades específicas de cada organización. Diseñamos soluciones escalables que optimizan procesos, automatizan tareas y mejoran la productividad de los equipos.",
  //   bullets: [
  //     {
  //       label: "Sistemas administrativos",
  //       icon: "/images/Servicios/software-a-la-medida/Sistemas administrativos.svg",
  //     },
  //     {
  //       label: "Automatización de procesos",
  //       icon: "/images/Servicios/software-a-la-medida/Automatización de procesos.svg",
  //     },
  //     {
  //       label: "CRM personalizados",
  //       icon: "/images/Servicios/software-a-la-medida/CRM personalizados.svg",
  //     },
  //     {
  //       label: "Plataformas para fuerza comercial",
  //       icon: "/images/Servicios/software-a-la-medida/Plataformas para fuerza comercial.svg",
  //     },
  //   ],
  //   statement:
  //     "Nuestro equipo participa desde la definición del proyecto hasta su implementación y evolución.",
  // },
  // {
  //   id: 2,
  //   slug: "posicionamiento-seo",
  //   title: "Posicionamiento SEO",
  //   tagline:
  //     "Ayudamos a que las empresas aparezcan cuando sus clientes buscan sus productos o servicios en Google.",
  //   introText:
  //     "Nuestro servicio de SEO combina estrategia, contenido, optimización técnica y análisis permanente para mejorar el posicionamiento orgánico y aumentar el tráfico de calidad.",
  //   bullets: [
  //     {
  //       label: "Optimización de velocidad",
  //       icon: "/images/Servicios/posicionamiento-SEO/Optimización de velocidad.svg",
  //     },
  //     {
  //       label: "Auditoría SEO",
  //       icon: "/images/Servicios/posicionamiento-SEO/Auditoria seo.svg",
  //     },
  //     {
  //       label: "Estrategia de palabras clave",
  //       icon: "/images/Servicios/posicionamiento-SEO/Estrategia de palabras clave.svg",
  //     },
  //     {
  //       label: "Monitoreo de resultados",
  //       icon: "/images/Servicios/posicionamiento-SEO/monitoreo de resultado.svg",
  //     },
  //   ],
  //   statement:
  //     "El objetivo es aumentar la visibilidad de la empresa y generar oportunidades comerciales de forma sostenida.",
  // },
  // {
  //   id: 3,
  //   slug: "hosting-empresarial-registro-dominios",
  //   title: "Hosting Empresarial y Registro de Dominios",
  //   tagline: "Infraestructura tecnológica confiable para tu negocio.",
  //   introText:
  //     "Ofrecemos infraestructura tecnológica confiable para alojar sitios web y aplicaciones empresariales. Nos aseguramos de que la infraestructura tecnológica de nuestros clientes sea estable, segura y disponible.",
  //   bullets: [
  //     {
  //       label: "Soporte técnico",
  //       icon: "/images/Servicios/hosting-empresarial/soporte técnico.svg",
  //     },
  //     {
  //       label: "Certificados SSL",
  //       icon: "/images/Servicios/hosting-empresarial/Certificados ssl.svg",
  //     },
  //     {
  //       label: "Copias de seguridad",
  //       icon: "/images/Servicios/hosting-empresarial/Copias de seguridad.svg",
  //     },
  //     {
  //       label: "Registro de dominios",
  //       icon: "/images/Servicios/hosting-empresarial/Registro de dominios nacionales e internacionales.svg",
  //     },
  //   ],
  //   statement:
  //     "Nos aseguramos de que la infraestructura tecnológica de nuestros clientes sea estable, segura y disponible.",
  // },
  // {
  //   id: 4,
  //   slug: "desarrollo-aplicaciones-moviles",
  //   title: "Desarrollo de Aplicaciones Móviles",
  //   tagline:
  //     "Apps nativas y multiplataforma con experiencias intuitivas y alto desempeño.",
  //   introText:
  //     "Diseñamos y desarrollamos aplicaciones móviles para iPhone y Android con experiencias intuitivas, alto desempeño y tecnologías de última generación. Cada aplicación es desarrollada pensando en la experiencia del usuario, la seguridad y la escalabilidad del negocio.",
  //   bullets: [
  //     {
  //       label: "Automatización de procesos",
  //       icon: "/images/Servicios/aplicaciones-moviles/Automatización de procesos.svg",
  //     },
  //     {
  //       label: "Comercio electrónico",
  //       icon: "/images/Servicios/aplicaciones-moviles/Comercio electronico.svg",
  //     },
  //     {
  //       label: "Apps para equipos comerciales",
  //       icon: "/images/Servicios/aplicaciones-moviles/Equipos comerciales.svg",
  //     },
  //     {
  //       label: "Fidelización de clientes",
  //       icon: "/images/Servicios/aplicaciones-moviles/Fidelización de clientes.svg",
  //     },
  //   ],
  //   statement:
  //     "Cada aplicación es desarrollada pensando en la experiencia del usuario, la seguridad y la escalabilidad del negocio.",
  // },
  // {
  //   id: 5,
  //   slug: "campanas-digitales-activacion-ventas-retail",
  //   title: "Campañas Digitales para Activación de Ventas en Retail",
  //   tagline:
  //     "Convertimos el interés digital en ventas reales en puntos de venta físicos.",
  //   introText:
  //     "Uno de nuestros mayores diferenciales es la creación de campañas digitales enfocadas en generar tráfico hacia puntos de venta físicos. Diseñamos estrategias que conectan el mundo digital con el canal tradicional para incrementar visitas, impulsar compras y fortalecer la relación entre las marcas y sus consumidores.",
  //   bullets: [
  //     {
  //       label: "Cadenas comerciales",
  //       icon: "/images/Servicios/campanas-digitales/Cadenas comerciales.svg",
  //     },
  //     {
  //       label: "Centros comerciales",
  //       icon: "/images/Servicios/campanas-digitales/centros comerciales.svg",
  //     },
  //     {
  //       label: "Grandes superficies",
  //       icon: "/images/Servicios/campanas-digitales/Grandes superficies.svg",
  //     },
  //     {
  //       label: "Marcas de consumo masivo",
  //       icon: "/images/Servicios/campanas-digitales/Marcas de consumo masivo.svg",
  //     },
  //   ],
  //   statement:
  //     "Integramos pauta digital, geolocalización, redes sociales, WhatsApp y páginas de aterrizaje para convertir el interés digital en ventas reales.",
  // },
];

export function getServicioBySlug(slug) {
  return serviciosData.find((s) => s.slug === slug) || null;
}
