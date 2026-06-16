import { useEffect, useRef } from 'react'

let stylesInjected = false

function injectBlobStyles() {
  if (stylesInjected || typeof document === 'undefined') return
  stylesInjected = true
  const el = document.createElement('style')
  el.textContent = `
    @keyframes blob-1 {
      0%,100%{border-radius:42% 58% 70% 30%/45% 52% 48% 55%}
      33%    {border-radius:74% 26% 44% 56%/38% 31% 69% 62%}
      66%    {border-radius:28% 72% 58% 42%/62% 71% 29% 38%}
    }
    @keyframes blob-2 {
      0%,100%{border-radius:64% 36% 28% 72%/52% 66% 34% 48%}
      50%    {border-radius:36% 64% 72% 28%/48% 34% 66% 52%}
    }
    @keyframes blob-3 {
      0%,100%{border-radius:55% 45% 38% 62%/35% 68% 32% 65%}
      34%    {border-radius:28% 72% 62% 38%/68% 28% 72% 32%}
      67%    {border-radius:72% 28% 45% 55%/42% 62% 38% 58%}
    }
    @keyframes blob-4 {
      0%,100%{border-radius:38% 62% 55% 45%/60% 44% 56% 40%}
      50%    {border-radius:62% 38% 45% 55%/40% 56% 44% 60%}
    }
  `
  document.head.appendChild(el)
}

const PALETTE = [
  'oklch(0.88 0.26 130 / 0.20)',
  'oklch(0.88 0.26 130 / 0.14)',
  'oklch(0.88 0.26 130 / 0.09)',
  'oklch(0.94 0.07 115 / 0.08)',
]

function randomParams() {
  const w = window.innerWidth
  const r = Math.random()

  const size =
    r < 0.35 ? 70  + Math.random() * 60  :   // 70–130 px  (common)
    r < 0.72 ? 130 + Math.random() * 100 :   // 130–230 px (medium)
    r < 0.92 ? 230 + Math.random() * 110 :   // 230–340 px (large)
               340 + Math.random() * 80       // 340–420 px (muy raro, impactante)

  const p = Math.random()
  let baseX, drift
  if (p < 0.40) {
    baseX = -size * 0.25                     // borde izquierdo, parcialmente fuera
    drift = 30 + Math.random() * 50          // deriva hacia el centro
  } else if (p < 0.80) {
    baseX = w - size * 0.75                  // borde derecho, parcialmente fuera
    drift = -(30 + Math.random() * 50)       // deriva hacia el centro
  } else {
    baseX = w * 0.2 + Math.random() * w * 0.6
    drift = (20 + Math.random() * 35) * (Math.random() > 0.5 ? 1 : -1)
  }

  return { size, baseX, drift }
}

class BlobParticle {
  constructor(container) {
    const { size, baseX, drift } = randomParams()

    this.size   = size
    this.baseX  = baseX
    this.y      = window.innerHeight + size
    this.speed  = 0.22 + Math.random() * 0.48
    this.drift  = drift
    this.steps  = window.innerHeight * 0.9
    this.color  = PALETTE[Math.floor(Math.random() * PALETTE.length)]

    const animIdx = Math.ceil(Math.random() * 4)
    const dur     = (9 + Math.random() * 8).toFixed(1)
    const delay   = -(Math.random() * 9).toFixed(1)

    this.el = document.createElement('div')
    this.el.style.cssText = [
      'position:absolute',
      `width:${size}px`,
      `height:${size}px`,
      `background:${this.color}`,
      'pointer-events:none',
      'will-change:transform,border-radius',
      `animation:blob-${animIdx} ${dur}s ease-in-out ${delay}s infinite`,
    ].join(';')

    this._applyTransform()
    container.appendChild(this.el)
  }

  _applyTransform() {
    const x = this.baseX + Math.sin((this.y * Math.PI) / this.steps) * this.drift
    this.el.style.transform = `translate3d(${x}px,${this.y}px,0)`
  }

  tick() {
    this.y -= this.speed
    this._applyTransform()
    if (this.y < -this.size * 2) {
      this.el.remove()
      return false
    }
    return true
  }
}

const SPAWN_INTERVAL = 2800
const MAX_BLOBS = 6

export default function FloatingBubbles() {
  const containerRef  = useRef(null)
  const blobsRef      = useRef([])
  const rafRef        = useRef(null)
  const lastSpawnRef  = useRef(0)
  const pausedRef     = useRef(false)

  useEffect(() => {
    injectBlobStyles()

    const container = containerRef.current
    if (!container) return

    const tick = (now) => {
      if (!pausedRef.current) {
        if (now - lastSpawnRef.current > SPAWN_INTERVAL && blobsRef.current.length < MAX_BLOBS) {
          blobsRef.current.push(new BlobParticle(container))
          lastSpawnRef.current = now
        }
        blobsRef.current = blobsRef.current.filter(b => b.tick())
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const onFocus = () => { pausedRef.current = false }
    const onBlur  = () => { pausedRef.current = true  }
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur',  onBlur)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur',  onBlur)
      blobsRef.current = []
      container.replaceChildren()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
