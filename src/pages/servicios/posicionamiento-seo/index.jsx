import { useMemo } from "react";
import DigitalHeroSection from "../../../components/sections/posicionamiento-seo/DigitalHeroSection";
import DigitalServicesSection from "../../../components/sections/posicionamiento-seo/DigitalServicesSection";
import CustomCursor from "../../../components/ui/CustomCursor";
import MorphicBackground from "../../../components/layout/fondo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";

export default function PosicionamientoSEOPage() {
  const structuredData = useMemo(
    () => ({
      "@type": "Service",
      serviceType: "Posicionamiento SEO",
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
    title: "Posicionamiento SEO",
    description:
      "Ayudamos a que las empresas aparezcan cuando sus clientes buscan sus productos o servicios en Google.",
    path: "/servicios/posicionamiento-seo/",
    structuredData,
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection />
        <DigitalServicesSection />
      </main>
    </>
  );
}
