// index.jsx
import { useMemo } from "react";
import DigitalHeroSection from "../../../components/sections/desarrollo-aplicaciones-moviles/DigitalHeroSection";
import DigitalServicesSection from "../../../components/sections/desarrollo-aplicaciones-moviles/DigitalServicesSection";
import CustomCursor from "../../../components/ui/CustomCursor";
import MorphicBackground from "../../../components/layout/fondo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";

export default function DesarrolloAppsMovilesPage() {
  const structuredData = useMemo(
    () => ({
      "@type": "Service",
      serviceType: "Desarrollo de Aplicaciones Móviles",
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
    title: "Desarrollo de Aplicaciones Móviles",
    description:
      "Diseñamos y desarrollamos aplicaciones móviles para iPhone y Android con experiencias intuitivas, alto desempeño y tecnologías de última generación.",
    path: "/servicios/desarrollo-aplicaciones-moviles/",
    structuredData,
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection title="Apps Móviles" />
        <DigitalServicesSection />
      </main>
    </>
  );
}
