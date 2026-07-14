import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { defaultSlug } from "../data/proyectos";
import ServiciosPage from "../pages/servicios";

const LandingPage = lazy(() => import("../pages/landing"));
const ContactPage = lazy(() => import("../pages/contacto"));
const DesarrolloDigitalPage = lazy(
  () => import("../pages/servicios/desarrollo-digital"),
);
const PosicionamientoSeoPage = lazy(
  () => import("../pages/servicios/posicionamiento-seo"),
);
const DesarrolloSoftwareMedidaPage = lazy(
  () => import("../pages/servicios/desarrollo-a-la-medida"),
);
const HostingEmpresarialPage = lazy(
  () => import("../pages/servicios/hosting-empresarial-registro-dominios"),
);
const DesarrolloAppsMovilesPage = lazy(
  () => import("../pages/servicios/desarrollo-aplicaciones-moviles"),
);
const CampanasDigitalesPage = lazy(
  () =>
    import("../pages/servicios/campanas-digitales-activacion-ventas-retail"),
);
const DisenoDesarrolloSitiosWebPage = lazy(
  () => import("../pages/servicios/diseno-desarrollo-sitios-web"),
);
const AutomatizacionWhatsAppPage = lazy(
  () => import("../pages/servicios/automatizacion-campanas-whatsapp"),
);
const ServicioDinamicoPage = lazy(() => import("../pages/servicios/detalle"));
const ProyectoPage = lazy(() => import("../pages/proyectos"));
const NosotrosPage = lazy(() => import("../pages/nosotros"));
const NotFoundPage = lazy(() => import("../pages/not-found"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          border: "2px solid oklch(0.88 0.260 130 / 0.15)",
          borderTopColor: "var(--c-lime)",
          animation: "page-spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes page-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route
            path="/servicios/desarrollo-digital"
            element={<DesarrolloDigitalPage />}
          />
          <Route
            path="/servicios/posicionamiento-seo"
            element={<PosicionamientoSeoPage />}
          />
          <Route
            path="/servicios/desarrollo-a-la-medida"
            element={<DesarrolloSoftwareMedidaPage />}
          />
          <Route
            path="/servicios/hosting-empresarial-registro-dominios"
            element={<HostingEmpresarialPage />}
          />
          <Route
            path="/servicios/desarrollo-aplicaciones-moviles"
            element={<DesarrolloAppsMovilesPage />}
          />
          <Route
            path="/servicios/campanas-digitales-activacion-ventas-retail"
            element={<CampanasDigitalesPage />}
          />
          <Route
            path="/servicios/diseno-desarrollo-sitios-web"
            element={<DisenoDesarrolloSitiosWebPage />}
          />
          <Route
            path="/servicios/automatizacion-campanas-whatsapp"
            element={<AutomatizacionWhatsAppPage />}
          />
          <Route path="/servicios/:slug" element={<ServicioDinamicoPage />} />
          <Route path="/proyectos/:slug" element={<ProyectoPage />} />
          <Route
            path="/proyectos"
            element={<Navigate to={`/proyectos/${defaultSlug}`} replace />}
          />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
