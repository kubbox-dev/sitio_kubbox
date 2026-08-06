// index.jsx
import { useMemo } from "react";
import DigitalHeroSection from "../../../components/sections/google-ads-meta-ads/DigitalHeroSection";
import DigitalServicesSection from "../../../components/sections/google-ads-meta-ads/DigitalServicesSection";
import CustomCursor from "../../../components/ui/CustomCursor";
import MorphicBackground from "../../../components/layout/fondo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";

export default function GoogleAdsMetaAdsPage() {
  const structuredData = useMemo(
    () => ({
      "@type": "Service",
      serviceType: "Google Ads y Meta Ads",
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
    title: "Google Ads y Meta Ads",
    description:
      "Diseñamos campañas publicitarias enfocadas en resultados. Nuestro equipo optimiza permanentemente cada inversión para obtener el mayor retorno posible.",
    path: "/servicios/google-ads-meta-ads/",
    image: "/images/Servicios/google-ads-meta-ads/arriba_5.webp",
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
