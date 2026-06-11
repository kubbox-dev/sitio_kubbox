/**
 * Decorative radial glow orb for atmospheric backgrounds.
 * Positioned absolutely — parent must have position: relative/absolute.
 */
export default function GlowOrb({ color = 'lime', size = 400, top, left, right, bottom, opacity = 1, blur = 80 }) {
  const colorMap = {
    lime: 'oklch(0.88 0.260 130)',
    teal: 'oklch(0.72 0.150 190)',
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: colorMap[color],
        filter: `blur(${blur}px)`,
        opacity: opacity * 0.22,
        pointerEvents: 'none',
        top,
        left,
        right,
        bottom,
        zIndex: 0,
      }}
    />
  )
}
