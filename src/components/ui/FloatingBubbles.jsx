import { useEffect, useRef } from 'react'

// Brand-adjacent colors: lime, teal, and a lime-teal blend — all very muted
const COLORS = [
  'rgba(212, 238, 60, 0.26)',   // --c-lime
  'rgba(60, 200, 190, 0.20)',   // --c-teal
  'rgba(148, 222, 82, 0.23)',   // lime-teal midpoint
]

const BASE      = 120   // base element size in px
const BLUR      = 42    // gaussian blur → soft, hazy edges
const SCALE_MIN = 1.3
const SCALE_MAX = 3.6   // effective diameter: 156 – 432 px
const VY_MIN    = 0.14  // px/frame   ↓ very slow rise
const VY_MAX    = 0.34
const SPAWN_MS  = 8500  // one new bubble every 8.5 s
const SINE      = 0.14  // horizontal drift amplitude (fraction of viewport width)
const SEED      = 3     // bubbles seeded at page load across the viewport

class Bubble {
  constructor(container, startY) {
    this.container = container
    this.x      = Math.random() * window.innerWidth
    this.y      = startY ?? window.innerHeight + BASE * 4
    this.vy     = VY_MIN + Math.random() * (VY_MAX - VY_MIN)
    this.color  = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.scale  = SCALE_MIN + Math.random() * (SCALE_MAX - SCALE_MIN)
    this.siner  = window.innerWidth * SINE * Math.random()
    this.steps  = window.innerHeight * 2.5
    this.el     = this._build()
  }

  _build() {
    const NS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('viewBox', '0 0 100 100')
    const c = document.createElementNS(NS, 'circle')
    c.setAttribute('cx', '50')
    c.setAttribute('cy', '50')
    c.setAttribute('r', '50')
    c.setAttribute('fill', this.color)
    svg.appendChild(c)
    const x = this.x + Math.sin((this.y * Math.PI) / this.steps) * this.siner
    svg.style.cssText = [
      'position:absolute',
      `width:${BASE}px`,
      `height:${BASE}px`,
      `filter:blur(${BLUR}px)`,
      'will-change:transform',
      `transform:translateX(${x}px) translateY(${this.y}px) scale(${this.scale})`,
    ].join(';')
    this.container.appendChild(svg)
    return svg
  }

  tick() {
    this.y -= this.vy
    const x = this.x + Math.sin((this.y * Math.PI) / this.steps) * this.siner
    this.el.style.transform = `translateX(${x}px) translateY(${this.y}px) scale(${this.scale})`
    return this.y > -(BASE * this.scale + BLUR * 4)
  }

  destroy() { this.el.remove() }
}

export default function FloatingBubbles() {
  const wrapRef   = useRef(null)
  const poolRef   = useRef([])
  const rafRef    = useRef(null)
  const timerRef  = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const onFocus = () => { pausedRef.current = false }
    const onBlur  = () => { pausedRef.current = true  }
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur',  onBlur)

    // seed a few bubbles already visible on load
    for (let i = 0; i < SEED; i++) {
      poolRef.current.push(new Bubble(wrap, Math.random() * window.innerHeight))
    }

    timerRef.current = setInterval(() => {
      if (!pausedRef.current) poolRef.current.push(new Bubble(wrap))
    }, SPAWN_MS)

    const loop = () => {
      poolRef.current = poolRef.current.filter(b => {
        const alive = b.tick()
        if (!alive) b.destroy()
        return alive
      })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(timerRef.current)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur',  onBlur)
      poolRef.current.forEach(b => b.destroy())
      poolRef.current = []
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}
