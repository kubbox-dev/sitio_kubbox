import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
}

const letterVariants = {
  initial: { y: 0, color: 'inherit' },
  animate: {
    y: '-120%',
    color: 'var(--c-muted)',
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
}

export function Textarea({ label, icon: Icon, className = '', value, rows = 5, ...props }) {
  const [isFocused, setIsFocused] = useState(false)
  const showLabel = isFocused || value.length > 0
  const active = isFocused || value.length > 0

  return (
    <div className={cn('relative', className)}>
      {Icon && (
        <Icon
          size={16}
          className="absolute left-0 top-3.5 pointer-events-none transition-colors duration-200"
          style={{ color: active ? 'var(--c-lime)' : 'var(--c-muted)' }}
        />
      )}

      <motion.div
        className={cn('absolute top-3 left-0 pointer-events-none', Icon && 'left-6')}
        style={{ color: 'var(--c-ink)' }}
        variants={containerVariants}
        initial="initial"
        animate={showLabel ? 'animate' : 'initial'}
      >
        {label.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block text-sm"
            variants={letterVariants}
            style={{ willChange: 'transform' }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </motion.div>

      <textarea
        rows={rows}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
        // padding inline porque el preflight de Tailwind resetea padding/margin
        // en <textarea> con más prioridad que las utilidades py-*/pl-* en este setup
        style={{ padding: `0.5rem 0 0.5rem ${Icon ? '1.5rem' : '0'}` }}
        className="relative z-10 outline-none border-b-2 border-[var(--c-ink)]/30 w-full text-base font-medium text-[var(--c-ink)] bg-transparent placeholder-transparent transition-colors duration-200 focus:border-[var(--c-lime)] resize-none"
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 pointer-events-none -z-10"
        style={{ height: '14px', background: 'var(--c-lime)', filter: 'blur(9px)', borderRadius: '50%' }}
        initial={false}
        animate={{ opacity: isFocused ? 0.4 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </div>
  )
}
