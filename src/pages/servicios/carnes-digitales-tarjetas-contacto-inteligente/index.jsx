// index.jsx
import { useMemo } from "react";
import DigitalHeroSection from "../../../components/sections/carnes-digitales-tarjetas-contacto-inteligente/DigitalHeroSection";
import DigitalServicesSection from "../../../components/sections/carnes-digitales-tarjetas-contacto-inteligente/DigitalServicesSection";
import CustomCursor from "../../../components/ui/CustomCursor";
import MorphicBackground from "../../../components/layout/fondo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";

export default function CarnesDigitalesPage() {
  const structuredData = useMemo(
    () => ({
      "@type": "Service",
      serviceType: "Carnés Digitales y Tarjetas de Contacto Inteligentes",
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
    title: "Carnés Digitales y Tarjetas de Contacto Inteligentes",
    description:
      "Modernizamos la presentación empresarial mediante soluciones digitales que facilitan el intercambio de información y fortalecen la imagen profesional.",
    path: "/servicios/carnes-digitales-tarjetas-contacto-inteligente/",
    image: "/images/Servicios/carnes-digitales/arriba_8.webp",
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
