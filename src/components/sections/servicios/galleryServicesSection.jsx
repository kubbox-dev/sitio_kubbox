import React from "react";
import { InteractiveFolderGallery } from "../../ui/interactive-folder-gallery";

const serviciosData = [
  {
    id: 1,
    title: "Diseño y Desarrollo de Sitios Web",
    description:
      "Creamos sitios web modernos, rápidos, seguros y completamente personalizados para empresas que buscan fortalecer su presencia digital.",
    icon: "/images/Servicios/Diseño y Desarrollo de Sitios Web.svg",
    bullets: [
      "Sitios web corporativos",
      "Landing Pages de alta conversión",
      "Portales empresariales",
      "Tiendas virtuales",
    ],
  },
  {
    id: 2,
    title: "Desarrollo de Aplicaciones Móviles",
    description:
      "Diseñamos y desarrollamos aplicaciones móviles para iPhone y Android con experiencias intuitivas y alto desempeño.",
    icon: "/images/Servicios/Desarrollo de Aplicaciones Móviles.svg",
    bullets: [
      "Empresas",
      "Comercio electrónico",
      "Logística",
      "Gestión interna",
    ],
  },
  {
    id: 3,
    title: "Campañas Digitales para Activación de Ventas en Retail",
    description:
      "Creamos campañas digitales enfocadas en generar tráfico hacia puntos de venta físicos.",
    icon: "/images/Servicios/Campañas Digitales para Activaciónde Ventas en Retail.svg",
    bullets: [
      "Retail",
      "Cadenas comerciales",
      "Centros comerciales",
      "Marcas de consumo masivo",
    ],
  },
  {
    id: 4,
    title: "Google Ads y Meta Ads",
    description:
      "Diseñamos campañas publicitarias enfocadas en resultados con optimización permanente para el mayor retorno posible.",
    icon: "/images/Servicios/Google Ads y Meta Ads.svg",
    bullets: [
      "Meta Ads (Facebook e Instagram)",
      "Google Search",
      "Generación de leads",
      "Retorno sobre la inversión (ROI)",
    ],
  },
  {
    id: 5,
    title: "Posicionamiento SEO",
    description:
      "Ayudamos a que las empresas aparezcan cuando sus clientes buscan sus productos o servicios en Google.",
    icon: "/images/Servicios/Posicionamiento SEO.svg",
    bullets: [
      "Auditoría SEO",
      "SEO técnico",
      "Optimización de velocidad",
      "SEO local",
      "Monitoreo de resultados",
    ],
  },
  {
    id: 6,
    title: "Automatización y Campañas por WhatsApp",
    description:
      "Facilitamos procesos comerciales mediante campañas masivas, integración con CRM y automatización de comunicación.",
    icon: "/images/Servicios/Automatización y Campañas por WhatsApp.svg",
    bullets: [
      "Campañas masivas",
      "Integración con CRM",
      "Optimización de velocidad",
      "Atención al cliente",
      "Notificaciones automáticas",
    ],
  },
  {
    id: 7,
    title: "Hosting Empresarial y Dominios",
    description:
      "Ofrecemos infraestructura tecnológica confiable para alojar sitios web y aplicaciones empresariales.",
    icon: "/images/Servicios/Hosting Empresarial y Registro de Dominios.svg",
    bullets: [
      "Hosting de alto rendimiento",
      "Copias de seguridad",
      "Monitoreo",
      "Soporte técnico",
    ],
  },
  {
    id: 8,
    title: "Creación y Desarrollo de Marca",
    description:
      "Construimos identidades que conectan, inspiran y perduran en el tiempo, con sistemas de identidad coherentes.",
    icon: "/images/Servicios/Creación y Desarrollo de Marca.svg",
    bullets: [
      "Diseño de logotipo",
      "Sistema de identidad visual",
      "Manual de identidad de marca",
      "Lineamientos para el uso correcto de la marca",
    ],
  },
  {
    id: 9,
    title: "Desarrollo de Software a la Medida",
    description:
      "Cada empresa tiene procesos únicos. Por eso desarrollamos software completamente personalizado que se adapta a las necesidades específicas de cada organización.",
    icon: "/images/Servicios/Desarrollo de software a la medida.svg",
    bullets: [
      "Sistemas administrativos",
      "CRM personalizados",
      "Plataformas para fuerza comercial",
      "Automatización de procesos",
    ],
  },
];

const serviciosPhotos = serviciosData.map((servicio) => ({
  id: servicio.id,
  image: "",
  title: servicio.title,
  description: servicio.description,
  icon: servicio.icon,
  bullets: servicio.bullets,
}));

export default function GalleryServicesSection() {
  return (
    <section
      id="gallery-servicios"
      style={{
        position: "relative",
        paddingBlock: "clamp(2rem, 5vw, 4rem)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--container)",
          marginInline: "auto",
          paddingInline: "var(--container-pad)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <InteractiveFolderGallery
          photos={serviciosPhotos}
          folderName={
            <span style={{ color: "var(--c-lime)" }}>GALERÍA DE SERVICIOS</span>
          }
          dragHintText="Arrastra cualquier servicio hacia abajo para cerrar"
          className="scale-160 [&>div]:min-h-[600px]"
          visibleStack={5}
          maxOpenWidth="90%"
        />
      </div>
    </section>
  );
}
