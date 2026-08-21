import { useEffect } from 'react'

const STORAGE_KEY = 'scrollY'
const RESTORE_FRAMES = 20

export function useScrollRestoration() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const saved = sessionStorage.getItem(STORAGE_KEY)
    const targetY = saved ? Number(saved) : null

    let cancelled = false
    let rafId: number | null = null

    if (targetY !== null && Number.isFinite(targetY)) {
      let frame = 0
      const restore = () => {
        if (cancelled) return
        window.scrollTo(0, targetY)
        frame += 1
        if (frame < RESTORE_FRAMES) {
          rafId = requestAnimationFrame(restore)
        }
      }
      rafId = requestAnimationFrame(restore)

      const stopOnUserScroll = () => {
        cancelled = true
        if (rafId != null) cancelAnimationFrame(rafId)
      }
      window.addEventListener('wheel', stopOnUserScroll, { passive: true, once: true })
      window.addEventListener('touchmove', stopOnUserScroll, { passive: true, once: true })
    }

    const savePosition = () => {
      sessionStorage.setItem(STORAGE_KEY, String(window.scrollY))
    }
    window.addEventListener('scroll', savePosition, { passive: true })
    window.addEventListener('beforeunload', savePosition)
    window.addEventListener('pagehide', savePosition)

    return () => {
      cancelled = true
      if (rafId != null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', savePosition)
      window.removeEventListener('beforeunload', savePosition)
      window.removeEventListener('pagehide', savePosition)
    }
  }, [])
}
