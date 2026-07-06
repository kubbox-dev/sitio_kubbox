import React from "react";
import FloatingIconsHero from "../../ui/floating-icons-hero-section";

const IconImage = ({ src, alt, ...props }) => (
  <img src={encodeURI(src)} alt={alt} {...props} />
);

const demoIcons = [
  {
    id: 1,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/facebook.svg"
        alt="Facebook"
        {...props}
      />
    ),
    className: "top-[8%] left-[12%] md:left-[28%]",
  },
  {
    id: 2,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/google ads.svg"
        alt="Google Ads"
        {...props}
      />
    ),
    className: "top-[12%] left-[78%] md:left-[58%]",
  },
  {
    id: 3,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/instagram.svg"
        alt="Instagram"
        {...props}
      />
    ),
    className: "top-[18%] right-[10%] md:right-[24%]",
  },
  {
    id: 4,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/ionic.svg"
        alt="Ionic"
        {...props}
      />
    ),
    className: "top-[35%] left-[2%] md:left-[10%]",
  },
  {
    id: 5,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/laravel.svg"
        alt="Laravel"
        {...props}
      />
    ),
    className: "right-[2%] top-[60%] md:right-[8%]",
  },
  {
    id: 6,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/meta.svg"
        alt="Meta"
        {...props}
      />
    ),
    className: "bottom-[36%] right-[12%] md:right-[28%]",
  },
  {
    id: 7,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/php.svg"
        alt="PHP"
        {...props}
      />
    ),
    className: "bottom-[32%] left-[12%] md:left-[28%]",
  },
  {
    id: 8,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/react.svg"
        alt="React"
        {...props}
      />
    ),
    className: "bottom-[32%] left-[78%] md:left-[56%]",
  },
  {
    id: 9,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/whatsapp.svg"
        alt="WhatsApp"
        {...props}
      />
    ),
    className: "left-[2%] top-[42%] md:left-[6%]",
  },
  {
    id: 10,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/wordpress.svg"
        alt="WordPress"
        {...props}
      />
    ),
    className: "right-[2%] top-[42%] md:right-[6%]",
  },
  {
    id: 11,
    icon: (props) => (
      <IconImage
        src="/images/Nosotros/solucionesIcons/youtube.svg"
        alt="YouTube"
        {...props}
      />
    ),
    className: "bottom-[38%] left-[46%]",
  },
];

export default function ToolsSolutionSection() {
  return (
    <div
      className="relative"
      style={{
        background: "var(--c-bg)",
        boxShadow:
          "0 80px 120px rgba(0,0,0,0.95), 0 -80px 120px rgba(0,0,0,0.95)",
      }}
    >
      <FloatingIconsHero
        disableFade
        disableBg
        className="overflow-visible"
        title={
          <>
            <div className="text-white uppercase">
              CREAMOS SOLUCIONES QUE AYUDAN
            </div>
            <div
              className="uppercase"
              style={{
                WebkitTextStroke: "1.6px rgba(255,255,255,0.95)",
                color: "transparent",
              }}
            >
              A LAS EMPRESAS A CRECER
            </div>
            <div
              className="uppercase font-extrabold"
              style={{ color: "var(--c-lime)" }}
            >
              VENDER MÁS Y EVOLUCIONAR DIGITALMENTE.
            </div>
          </>
        }
        subtitle={
          <>
            <p className="max-w-xl mx-auto text-lg text-muted-foreground">
              No desarrollamos únicamente sitios web o campañas digitales.
            </p>
            <p className="mt-44 max-w-3xl mx-auto text-base text-muted-foreground">
              Creemos que la transformación digital ocurre cuando la tecnología
              se convierte en una herramienta para generar oportunidades de
              negocio.
            </p>
          </>
        }
        icons={demoIcons}
      />

      {/* Fade superior con máscara para cubrir puntas */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-40px",
          right: "-40px",
          height: "clamp(4rem, 12vw, 8rem)",
          background: "linear-gradient(to bottom, var(--c-bg), transparent)",
          pointerEvents: "none",
          zIndex: 20,
          width: "calc(100% + 80px)",
        }}
      />

      {/* Fade inferior con máscara para cubrir puntas */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-40px",
          right: "-40px",
          height: "clamp(4rem, 12vw, 8rem)",
          background: "linear-gradient(to top, var(--c-bg), transparent)",
          pointerEvents: "none",
          zIndex: 20,
          width: "calc(100% + 80px)",
        }}
      />
    </div>
  );
}
