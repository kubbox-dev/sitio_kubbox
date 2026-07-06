import CustomCursor from "../../components/ui/CustomCursor";
import MorphicBackground from "../../components/layout/fondo";
import AboutUsHeroSection from "../../components/sections/nosotros/aboutUsHeroSection";
import TeamWorkSection from "../../components/sections/nosotros/teamWorkSection";
import TrajectorySection from "../../components/sections/nosotros/trajectorySection";
import TecnologyWorkingSection from "../../components/sections/nosotros/tecnologyworkingSection";
import ToolsSolutionSection from "../../components/sections/nosotros/toolsSolutionSection";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

export default function NosotrosPage() {
  useDocumentMeta({
    title: "Nosotros — Kubbox",
    description: "Conoce al equipo y la filosofía de trabajo de Kubbox.",
    path: "/nosotros",
  });

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <AboutUsHeroSection />
        <TeamWorkSection />
        <TrajectorySection />
        <ToolsSolutionSection />
        <TecnologyWorkingSection />
      </main>
    </>
  );
}
