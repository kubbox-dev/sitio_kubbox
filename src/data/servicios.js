/**
 * Datos centralizados de servicios dinámicos de Kubbox.
 * Cada entrada genera una página en /servicios/:slug
 */
export const serviciosData = [
  {
    id: 1,
    slug: "desarrollo-software-medida",
    title: "Desarrollo de Software a la Medida",

    tagline: "Cada empresa tiene procesos únicos.",
    introText:
      "Por eso desarrollamos software completamente personalizado que se adapta a las necesidades específicas de cada organización. Diseñamos soluciones escalables que optimizan procesos, automatizan tareas y mejoran la productividad de los equipos.",

    bullets: [
      {
        label: "Sistemas administrativos",
        icon: "/images/Servicios/software-a-la-medida/Sistemas administrativos.svg",
      },
      {
        label: "Automatización de procesos",
        icon: "/images/Servicios/software-a-la-medida/Automatización de procesos.svg",
      },
      {
        label: "CRM personalizados",
        icon: "/images/Servicios/software-a-la-medida/CRM personalizados.svg",
      },
      {
        label: "Plataformas para fuerza comercial",
        icon: "/images/Servicios/software-a-la-medida/Plataformas para fuerza comercial.svg",
      },
    ],

    statement:
      "Nuestro equipo participa desde la definición del proyecto hasta su implementación y evolución.",
  },
];

export function getServicioBySlug(slug) {
  return serviciosData.find((s) => s.slug === slug) || null;
}
