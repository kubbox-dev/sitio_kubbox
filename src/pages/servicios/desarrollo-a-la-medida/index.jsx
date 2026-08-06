import { useMemo } from "react";
import DigitalHeroSection from "../../../components/sections/desarrollo-a-la-medida/DigitalHeroSection";
import DigitalServicesSection from "../../../components/sections/desarrollo-a-la-medida/DigitalServicesSection";
import ReadyModules from "../../../components/sections/desarrollo-a-la-medida/ReadyModules";
import CustomCursor from "../../../components/ui/CustomCursor";
import MorphicBackground from "../../../components/layout/fondo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";

export default function DesarrolloSoftwareMedidaPage() {
  const structuredData = useMemo(
    () => ({
      "@type": "Service",
      serviceType: "Desarrollo de Software a la Medida",
      provider: {
        "@type": "LocalBusiness",
        name: "Kubbox",
        url: "https://kubbox.com/",
      },
      areaServed: "Medellín, Colombia",
    }),
    [],
  );

  useDocumentMeta({
    title: "Desarrollo de Software a la Medida",
    description:
      "Cada empresa tiene procesos únicos. Por eso desarrollamos software completamente personalizado que se adapta a las necesidades específicas de cada organización.",
    path: "/servicios/desarrollo-a-la-medida/",
    image: "/images/Servicios/software-a-la-medida/arriba_3.webp",
    structuredData,
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection title="Desarrollo de Software a la Medida" />
        <DigitalServicesSection />
        <ReadyModules />
      </main>
    </>
  );
}
