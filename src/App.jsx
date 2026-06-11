import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

/* ── Lazy-loaded pages (code splitting per route) ─ */
const LandingPage = lazy(() => import('./pages/landing'))

/* ── Full-page loader shown while a route chunk loads */
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--c-bg)',
      }}
    >
      <div
        style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          border: '2px solid oklch(0.88 0.260 130 / 0.15)',
          borderTopColor: 'var(--c-lime)',
          animation: 'page-spin 0.7s linear infinite',
        }}
      />
      <style>{`@keyframes page-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"        element={<LandingPage />} />
          {/* Add future pages here, e.g.:
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/contacto"  element={<ContactPage />} />
          */}
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}
