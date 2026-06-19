import { useParams, Navigate } from 'react-router-dom'
import CustomCursor from '../../components/ui/CustomCursor'
import MorphicBackground from '../../components/layout/fondo'
import ProjectRenderer from '../../components/sections/proyectos/ProjectRenderer'
import { getProject, defaultSlug } from '../../data/proyectos'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <Navigate to={`/proyectos/${defaultSlug}`} replace />

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <ProjectRenderer blocks={project.blocks} />
      </main>
    </>
  )
}
