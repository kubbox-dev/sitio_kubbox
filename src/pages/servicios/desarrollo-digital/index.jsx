import { useMemo } from 'react'
import DigitalHeroSection     from '../../../components/sections/desarrollo-digital/DigitalHeroSection'
import DigitalServicesSection from '../../../components/sections/desarrollo-digital/DigitalServicesSection'
import DigitalPlatformsSection from '../../../components/sections/desarrollo-digital/DigitalPlatformsSection'
import CustomCursor      from '../../../components/ui/CustomCursor'
import MorphicBackground from '../../../components/layout/fondo'
import { useDocumentMeta } from '../../../hooks/useDocumentMeta'

export default function DesarrolloDigitalPage() {
  const structuredData = useMemo(() => ({
    '@type': 'Service',
    serviceType: 'Desarrollo de plataformas y sitios web',
    provider: { '@type': 'LocalBusiness', name: 'Kubbox', url: 'https://kubbox.com/' },
    areaServed: 'Medellín, Colombia',
  }), [])

  useDocumentMeta({
    title: 'Desarrollo Digital',
    description: 'Plataformas, sitios web y productos digitales a la medida. Servicio de desarrollo digital de Kubbox.',
    path: '/servicios/desarrollo-digital/',
    structuredData,
  })

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection />
        <DigitalServicesSection />
        <DigitalPlatformsSection />
      </main>
    </>
  )
}
