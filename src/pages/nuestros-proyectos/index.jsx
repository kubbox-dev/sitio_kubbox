import CustomCursor from "../../components/ui/CustomCursor";
import MorphicBackground from "../../components/layout/fondo";
import OurProjectsHero from "../../components/sections/nuestros-proyectos/OurProjectsHero";
import GalleryProjects from "../../components/sections/nuestros-proyectos/GalleryProjects"; // 👈 Importación
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

export default function ProyectosPage() {
  useDocumentMeta({
    title: "Nuestros Proyectos — Kubbox",
    description: "Conoce los proyectos y casos de éxito de Kubbox.",
    path: "/proyectos",
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <OurProjectsHero />
        <GalleryProjects /> {/* 👈 Componente agregado */}
      </main>
    </>
  );
}
