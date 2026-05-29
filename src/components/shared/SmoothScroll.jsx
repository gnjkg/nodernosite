import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const SmoothScroll = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resetToHero = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }

    if (prefersReducedMotion) {
      resetToHero()
      return undefined
    }

    const lenis = new Lenis({
      anchors: false,
      autoRaf: true,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.9,
    })

    window.lenis = lenis
    lenis.scrollTo(0, { immediate: true, force: true })

    requestAnimationFrame(resetToHero)

    return () => {
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return null
}

export default SmoothScroll
