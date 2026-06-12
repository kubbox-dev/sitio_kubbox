import { useEffect, useState } from 'react'

export default function MouseSpotlight({ sectionRef }) {
  const [pos, setPos] = useState(null)

  useEffect(() => {
    const el = sectionRef?.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    const onLeave = () => setPos(null)

    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [sectionRef])

  if (!pos) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, oklch(0.88 0.26 130 / 0.10), transparent 70%)`,
      }}
    />
  )
}
