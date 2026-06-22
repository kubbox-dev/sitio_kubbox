import ContactHeroSection from '../../components/sections/contacto/ContactHeroSection'
import ContactFormSection from '../../components/sections/contacto/ContactFormSection'
import CustomCursor       from '../../components/ui/CustomCursor'
import MorphicBackground  from '../../components/layout/fondo'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

export default function ContactPage() {
  useDocumentMeta({
    title: 'Contacto',
    description: 'Escríbenos y hablemos de tu próximo proyecto digital. Kubbox, agencia de marketing en Envigado, Medellín.',
    path: '/contacto',
  })

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
