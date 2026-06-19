import kelloggs from './kelloggs'

const projectList = [kelloggs]

export const projectsBySlug = Object.fromEntries(projectList.map((p) => [p.slug, p]))
export const defaultSlug = 'kelloggs'
export const getProject = (slug) => projectsBySlug[slug]
export { projectList }
