import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const DOT = 6
const RING = 26

export default function CustomCursor() {
  const [isPointer] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : false
  )
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const dotX = useMotionValue(-200)
  const dotY = useMotionValue(-200)
  const ringX = useSpring(dotX, { stiffness: 220, damping: 22 })
  const ringY = useSpring(dotY, { stiffness: 220, damping: 22 })

  useEffect(() => {
    if (!isPointer) return

    const onMove = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onOver = (e) => {
      setHovering(!!e.target.closest('a, button, [role="button"]'))
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
    }
  }, [isPointer, dotX, dotY])

  if (!isPointer) return null

  return (
    <>
      {/* Dot — exact cursor position */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -(DOT / 2),
          left: -(DOT / 2),
          x: dotX,
          y: dotY,
          width: DOT,
          height: DOT,
          borderRadius: '50%',
          background: 'var(--c-lime)',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.5 : hovering ? 2.5 : 1,
        }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />

      {/* Ring — spring-lagged */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -(RING / 2),
          left: -(RING / 2),
          x: ringX,
          y: ringY,
          width: RING,
          height: RING,
          borderRadius: '50%',
          border: '1.5px solid oklch(0.88 0.26 130 / 0.5)',
          pointerEvents: 'none',
          zIndex: 99998,
        }}
        animate={{
          opacity: visible ? 0.85 : 0,
          scale: clicking ? 0.7 : hovering ? 0.55 : 1,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </>
  )
}
