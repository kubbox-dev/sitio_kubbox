import { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getServicioBySlug } from '../../data/servicios'
import DigitalHeroSection from '../../components/sections/desarrollo-digital/DigitalHeroSection'
import DigitalServicesSection from '../../components/sections/desarrollo-digital/DigitalServicesSection'
import CustomCursor from '../../components/ui/CustomCursor'
import MorphicBackground from '../../components/layout/fondo'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

export default function ServicioDinamicoPage() {
  const { slug } = useParams()
  const servicio = getServicioBySlug(slug)

  // Si el slug no existe, redirige a la galería de servicios
  if (!servicio) {
    return <Navigate to="/servicios" replace />
  }

  const structuredData = useMemo(() => ({
    '@type': 'Service',
    name: servicio.title,
    provider: { '@type': 'LocalBusiness', name: 'Kubbox', url: 'https://kubbox.com/' },
    areaServed: 'Medellín, Colombia',
  }), [servicio.title])

  useDocumentMeta({
    title: `${servicio.title} — Kubbox`,
    description: servicio.introText,
    path: `/servicios/${servicio.slug}/`,
    structuredData,
  })

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection title={servicio.title} />
        <DigitalServicesSection
          tagline={servicio.tagline}
          introText={servicio.introText}
          bullets={servicio.bullets}
          statement={servicio.statement}
        />
      </main>
    </>
  )
}
