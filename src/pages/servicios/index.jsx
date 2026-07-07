import CustomCursor from "../../components/ui/CustomCursor";
import MorphicBackground from "../../components/layout/fondo";
import ServiciosHeroSection from "../../components/sections/servicios/servicesHeroSection"; // ← Cambiar el nombre del archivo
import GalleryServicesSection from "../../components/sections/servicios/galleryServicesSection";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

export default function ServiciosPage() {
  useDocumentMeta({
    title: "Servicios — Kubbox",
    description:
      "Descubre todos los servicios digitales que ofrecemos en Kubbox.",
    path: "/servicios",
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <ServiciosHeroSection />
        <GalleryServicesSection />
      </main>
    </>
  );
}
