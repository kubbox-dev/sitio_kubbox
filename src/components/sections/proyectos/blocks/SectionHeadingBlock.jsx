const SOLID_STYLE = {
  color: 'var(--c-lime)',
  WebkitTextFillColor: 'transparent',
  WebkitTextStroke: '1.5px var(--c-lime)',
}
const OUTLINE_STYLE = {
  color: 'transparent',
  WebkitTextStroke: '1.5px oklch(0.98 0 0 / 0.85)',
}

export default function SectionHeadingBlock({ lime, white }) {
  return (
    <div className="mx-auto max-w-[var(--container)] px-[var(--container-pad)] py-[clamp(2.5rem,6vw,4.5rem)] text-center">
      <h2 className="m-0 [font-family:var(--font-display)] text-[clamp(2rem,6vw,3.5rem)] font-black italic uppercase leading-none tracking-[-0.02em]">
        <span style={SOLID_STYLE}>{lime}</span>{' '}
        <span style={OUTLINE_STYLE}>{white}</span>
      </h2>
    </div>
  )
}
