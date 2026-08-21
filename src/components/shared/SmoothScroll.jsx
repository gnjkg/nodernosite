import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const SmoothScroll = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const initialHash = window.location.hash
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scrollToInitialHash = (lenis) => {
      if (!initialHash) return false

      const target = document.getElementById(initialHash.slice(1))

      if (!target) return false

      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY)

      if (lenis) {
        lenis.scrollTo(top, { immediate: true, force: true })
      } else {
        window.scrollTo({ top, left: 0, behavior: 'auto' })
      }

      return true
    }

    const resetToHero = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }

    if (prefersReducedMotion) {
      if (scrollToInitialHash()) return undefined

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

    if (initialHash) {
      requestAnimationFrame(() => scrollToInitialHash(lenis))
    } else {
      lenis.scrollTo(0, { immediate: true, force: true })
      requestAnimationFrame(resetToHero)
    }

    return () => {
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return null
}

export default SmoothScroll
