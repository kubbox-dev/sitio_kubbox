// index.jsx
import { useMemo } from "react";
import DigitalHeroSection from "../../../components/sections/diseno-desarrollo-sitios-web/DigitalHeroSection";
import DigitalServicesSection from "../../../components/sections/diseno-desarrollo-sitios-web/DigitalServicesSection";
import CustomCursor from "../../../components/ui/CustomCursor";
import MorphicBackground from "../../../components/layout/fondo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";

export default function DisenoDesarrolloSitiosWebPage() {
  const structuredData = useMemo(
    () => ({
      "@type": "Service",
      serviceType: "Diseño y Desarrollo de Sitios Web",
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
    title: "Diseño y Desarrollo de Sitios Web",
    description:
      "Creamos sitios web modernos, rápidos, seguros y completamente personalizados para empresas que buscan fortalecer su presencia digital.",
    path: "/servicios/diseno-desarrollo-sitios-web/",
    structuredData,
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection title="Desarrollo Web" />
        <DigitalServicesSection />
      </main>
    </>
  );
}
