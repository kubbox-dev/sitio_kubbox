import registry from './blocks/registry'

export default function ProjectRenderer({ blocks = [] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const Block = registry[block.type]
        if (!Block) {
          if (import.meta.env.DEV) console.warn(`[ProjectRenderer] tipo de bloque desconocido: "${block.type}"`)
          return null
        }
        return <Block key={i} {...block.props} />
      })}
    </>
  )
}
