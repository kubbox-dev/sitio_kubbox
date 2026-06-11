import { Suspense, lazy } from 'react'
import { cn } from '../../lib/utils'

const Spline = lazy(() => import('@splinetool/react-spline'))

function SplineLoader() {
  return (
    <div className={cn('w-full h-full flex items-center justify-center')}>
      <div style={{
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        border: '2px solid oklch(0.88 0.260 130 / 0.20)',
        borderTopColor: 'var(--c-lime)',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export function SplineScene({ scene, className }) {
  return (
    <Suspense fallback={<SplineLoader />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
