// index.jsx
import { useMemo } from "react";
import DigitalHeroSection from "../../../components/sections/creacion-desarrollo-marca/DigitalHeroSection";
import DigitalServicesSection from "../../../components/sections/creacion-desarrollo-marca/DigitalServicesSection";
import DesignElements from "../../../components/sections/creacion-desarrollo-marca/DesignElements";
import OurFeatures from "../../../components/sections/creacion-desarrollo-marca/OurFeatures";
import SentenseValue from "../../../components/sections/creacion-desarrollo-marca/SentenseValue";
import SouvenirsCorporative from "../../../components/sections/creacion-desarrollo-marca/SouvenirsCorporative";
import SouvenirCarrouselProducts from "../../../components/sections/creacion-desarrollo-marca/SouvenirCarrouselProducts"; // 👈 Importa el nuevo componente
import CustomCursor from "../../../components/ui/CustomCursor";
import MorphicBackground from "../../../components/layout/fondo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";

export default function CreacionDesarrolloMarcaPage() {
  const structuredData = useMemo(
    () => ({
      "@type": "Service",
      serviceType: "Creación y Desarrollo de Marca",
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
    title: "Creación y Desarrollo de Marca",
    description:
      "Construimos marcas que conectan, diferencian y generan confianza. Desarrollamos identidades de marca sólidas, coherentes y estratégicas.",
    path: "/servicios/creacion-desarrollo-marca/",
    structuredData,
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection />
        <DigitalServicesSection />
        <DesignElements />
        <SentenseValue />
        <OurFeatures />
        <SouvenirsCorporative />
        <SouvenirCarrouselProducts /> {/* 👈 Agregado como último componente */}
      </main>
    </>
  );
}
