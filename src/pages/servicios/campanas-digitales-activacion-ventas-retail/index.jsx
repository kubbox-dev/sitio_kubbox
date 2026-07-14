// index.jsx
import { useMemo } from "react";
import DigitalHeroSection from "../../../components/sections/campanas-digitales-activacion-ventas-retail/DigitalHeroSection";
import DigitalServicesSection from "../../../components/sections/campanas-digitales-activacion-ventas-retail/DigitalServicesSection";
import CustomCursor from "../../../components/ui/CustomCursor";
import MorphicBackground from "../../../components/layout/fondo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";

export default function CampanasDigitalesPage() {
  const structuredData = useMemo(
    () => ({
      "@type": "Service",
      serviceType: "Campañas Digitales para Activación de Ventas en Retail",
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
    title: "Campañas Digitales para Activación de Ventas en Retail",
    description:
      "Convertimos el interés digital en ventas reales en puntos de venta físicos. Diseñamos estrategias que conectan el mundo digital con el canal tradicional.",
    path: "/servicios/campanas-digitales-activacion-ventas-retail/",
    structuredData,
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection title="Campañas Retail" />
        <DigitalServicesSection />
      </main>
    </>
  );
}
