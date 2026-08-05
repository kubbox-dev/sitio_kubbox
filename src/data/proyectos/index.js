import kelloggs from './kelloggs.js'
import armorAll from './armor-all.js'

const projectList = [kelloggs, armorAll]

export const projectsBySlug = Object.fromEntries(projectList.map((p) => [p.slug, p]))
export const defaultSlug = 'kelloggs'
export const getProject = (slug) => projectsBySlug[slug]
export { projectList }
