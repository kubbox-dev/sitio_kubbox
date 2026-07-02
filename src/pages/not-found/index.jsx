import NotFoundSection from '../../components/sections/not-found/NotFoundSection'
import CustomCursor from '../../components/ui/CustomCursor'
import MorphicBackground from '../../components/layout/fondo'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Página no encontrada',
    description: 'Esta página no existe, se movió o nunca estuvo aquí.',
    path: '/404',
    noindex: true,
  })

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <NotFoundSection />
      </main>
    </>
  )
}
