import ImageHover from "../../ui/link-hover";

const MODULE_ITEMS = [
  {
    imgUrl: "/images/Servicios/software-a-la-medida/Dashboard de clientes.png",
    title: "Dashboard de Clientes & Contactos",
  },
  {
    imgUrl: "/images/Servicios/software-a-la-medida/registro de facturas.png",
    title: "Registro de facturas por compras para premios e incentivos.",
  },
  {
    imgUrl:
      "/images/Servicios/software-a-la-medida/juegos para realizar sorteos.png",
    title: "Juego para realizar sorteos de campañas.",
  },
  {
    imgUrl:
      "/images/Servicios/software-a-la-medida/plataforma de gestión de vistas.png",
    title:
      "Plataforma de gestión de visitas y venta. Red de ventas y comercial.",
  },
  {
    imgUrl:
      "/images/Servicios/software-a-la-medida/pregunta por nuestras soluciones.png",
    title: "Pregunta por nuestras soluciones listas para su uso.",
  },
];

export default function ReadyModules() {
  return (
    <div className="w-full bg-black/40 py-12 md:py-16">
      <div className="w-full px-4 md:px-8">
        <h2 className="text-center font-display text-3xl font-bold italic text-[var(--c-lime)] md:text-4xl lg:text-5xl">
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
