// index.jsx
import { useMemo } from "react";
import DigitalHeroSection from "../../../components/sections/hosting-empresarial-registro-dominios/DigitalHeroSection";
import DigitalServicesSection from "../../../components/sections/hosting-empresarial-registro-dominios/DigitalServicesSection";
import CustomCursor from "../../../components/ui/CustomCursor";
import MorphicBackground from "../../../components/layout/fondo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";

export default function HostingEmpresarialPage() {
  const structuredData = useMemo(
    () => ({
      "@type": "Service",
      serviceType: "Hosting Empresarial y Registro de Dominios",
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
    title: "Hosting Empresarial y Registro de Dominios",
    description:
      "Ofrecemos infraestructura tecnológica confiable para alojar sitios web y aplicaciones empresariales. Nos aseguramos de que la infraestructura tecnológica de nuestros clientes sea estable, segura y disponible.",
    path: "/servicios/hosting-empresarial-registro-dominios/",
    structuredData,
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection title="Hosting Empresarial" />
        <DigitalServicesSection />
      </main>
    </>
  );
}
