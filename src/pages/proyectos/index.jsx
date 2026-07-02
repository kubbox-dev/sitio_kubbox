import { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import CustomCursor from '../../components/ui/CustomCursor'
import MorphicBackground from '../../components/layout/fondo'
import ProjectRenderer from '../../components/sections/proyectos/ProjectRenderer'
import { getProject, defaultSlug } from '../../data/proyectos'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  const structuredData = useMemo(() => project ? {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://kubbox.com/' },
      { '@type': 'ListItem', position: 2, name: project.name, item: `https://kubbox.com/proyectos/${slug}/` },
    ],
  } : undefined, [project, slug])

  useDocumentMeta({
    title: project ? `${project.title} · ${project.name}` : 'Proyecto',
    description: project ? `${project.name} — ${project.meta.category}. Caso de éxito de Kubbox.` : 'Caso de éxito de Kubbox.',
    path: `/proyectos/${slug}/`,
    structuredData,
  })

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
