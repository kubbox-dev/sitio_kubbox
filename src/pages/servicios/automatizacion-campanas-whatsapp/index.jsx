// index.jsx
import { useMemo } from "react";
import DigitalHeroSection from "../../../components/sections/automatizacion-campanas-whatsapp/DigitalHeroSection";
import DigitalServicesSection from "../../../components/sections/automatizacion-campanas-whatsapp/DigitalServicesSection";
import CustomCursor from "../../../components/ui/CustomCursor";
import MorphicBackground from "../../../components/layout/fondo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";

export default function AutomatizacionWhatsAppPage() {
  const structuredData = useMemo(
    () => ({
      "@type": "Service",
      serviceType: "Automatización y Campañas por WhatsApp",
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
    title: "Automatización y Campañas por WhatsApp",
    description:
      "WhatsApp se ha convertido en uno de los canales comerciales más efectivos para las empresas. Desarrollamos estrategias para automatizar la comunicación con clientes.",
    path: "/servicios/automatizacion-campanas-whatsapp/",
    structuredData,
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection title="Automatización WhatsApp" />
        <DigitalServicesSection />
      </main>
    </>
  );
}
