import DigitalHeroSection     from '../../../components/sections/desarrollo-digital/DigitalHeroSection'
import DigitalServicesSection from '../../../components/sections/desarrollo-digital/DigitalServicesSection'
import DigitalPlatformsSection from '../../../components/sections/desarrollo-digital/DigitalPlatformsSection'
import CustomCursor      from '../../../components/ui/CustomCursor'
import MorphicBackground from '../../../components/layout/fondo'

export default function DesarrolloDigitalPage() {
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
