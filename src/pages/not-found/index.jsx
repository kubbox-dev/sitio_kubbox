import NotFoundSection from '../../components/sections/not-found/NotFoundSection'
import CustomCursor from '../../components/ui/CustomCursor'
import MorphicBackground from '../../components/layout/fondo'

export default function NotFoundPage() {
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
