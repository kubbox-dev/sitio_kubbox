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
          <Route path="/proyectos/:slug" element={<ProyectoPage />} />
          <Route
            path="/proyectos"
            element={<Navigate to={`/proyectos/${defaultSlug}`} replace />}
          />
          {/* Agregar páginas futuras aquí: */}
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
