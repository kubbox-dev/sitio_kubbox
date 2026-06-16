import ContactHeroSection from '../../components/sections/contacto/ContactHeroSection'
import ContactFormSection from '../../components/sections/contacto/ContactFormSection'
import CustomCursor       from '../../components/ui/CustomCursor'
import MorphicBackground  from '../../components/layout/fondo'

export default function ContactPage() {
  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <ContactHeroSection />
        <ContactFormSection />
      </main>
    </>
  )
}
