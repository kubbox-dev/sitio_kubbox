import ImageHover from "../../ui/link-hover";

const MODULE_ITEMS = [
  {
    imgUrl: "/images/Servicios/software-a-la-medida/Dashboard de clientes.webp",
    title: "Dashboard de Clientes & Contactos",
  },
  {
    imgUrl: "/images/Servicios/software-a-la-medida/registro de facturas.webp",
    title: "Registro de facturas por compras para premios e incentivos.",
  },
  {
    imgUrl:
      "/images/Servicios/software-a-la-medida/juegos para realizar sorteos.webp",
    title: "Juego para realizar sorteos de campañas.",
  },
  {
    imgUrl:
      "/images/Servicios/software-a-la-medida/plataforma de gestión de vistas.webp",
    title:
      "Plataforma de gestión de visitas y venta. Red de ventas y comercial.",
  },
  {
    imgUrl:
      "/images/Servicios/software-a-la-medida/pregunta por nuestras soluciones.webp",
    title: "Pregunta por nuestras soluciones listas para su uso.",
  },
];

export default function ReadyModules() {
  return (
    <div className="w-full bg-black/40 py-12 md:py-16">
      <div className="w-full px-4 md:px-8">
        <h2
          className="text-center text-[var(--c-lime)] md:text-4xl lg:text-5xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            marginBottom: 0,
          }}
        >
          Módulos listos para tu uso
        </h2>

        <div className="mt-8 flex justify-center md:mt-12">
          <div className="w-full max-w-7xl">
            <ImageHover items={MODULE_ITEMS} />
          </div>
        </div>
      </div>
    </div>
  );
}
