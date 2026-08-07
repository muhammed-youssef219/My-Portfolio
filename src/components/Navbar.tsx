import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Download,
  Menu,
  X,
  User,
  FolderKanban,
  Sparkles,
  MessageCircle,
  Layers,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type SectionId = 'about' | 'projects' | 'skills' | 'contact' | 'footer'

type NavItem = {
  id: SectionId
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'contact', label: 'Contact', icon: MessageCircle },
  { id: 'footer', label: 'Footer', icon: Layers },
]

const BAR_HEIGHT_PX = 84
const SCROLL_OFFSET_PX = BAR_HEIGHT_PX + 16

function scrollToSection(id: SectionId) {
  const el = document.getElementById(id)
  if (!el) return

  const y = window.scrollY + el.getBoundingClientRect().top - SCROLL_OFFSET_PX
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

function useActiveSection(sectionIds: SectionId[]) {
  const [activeId, setActiveId] = useState<SectionId | null>(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        if (visible[0]?.target?.id) {
          const next = visible[0].target.id as SectionId
          setActiveId(next)
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0.05, 0.1, 0.2, 0.35, 0.5, 0.75],
      },
    )

    for (const el of elements) observer.observe(el)

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let rafId: number | null = null

    const onScroll = () => {
      if (rafId != null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        setScrolled((window.scrollY || 0) > threshold)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (rafId != null) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return scrolled
}

function Logo() {
  return (
    <span
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
      style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
        border: '1px solid rgba(255,255,255,.08)',
      }}
    >
      <span className="text-base font-bold tracking-[-0.4px] text-white">M</span>
    </span>
  )
}

function DesktopLinks({ activeId, onSelect }: { activeId: SectionId | null; onSelect: (id: SectionId) => void }) {
  return (
    <ul className="hidden items-center gap-8 md:flex" role="list" aria-label="Primary navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeId
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={`text-sm font-semibold transition hover:text-white ${
                isActive ? 'text-white' : 'text-white/70'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function MobileMenu({
  activeId,
  mobileOpen,
  onOpen,
  onClose,
  onSelect,
}: {
  activeId: SectionId | null
  mobileOpen: boolean
  onOpen: () => void
  onClose: () => void
  onSelect: (id: SectionId) => void
}) {
  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
      >
        <Menu className="h-4 w-4" />
      </button>

      {createPortal(
        <AnimatePresence>
          {mobileOpen ? (
            <>
              <motion.button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="fixed inset-0 z-40 bg-[#020308]/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />

              <motion.div
                className="fixed inset-y-0 right-0 z-50 flex w-[84vw] max-w-[340px] flex-col border-l border-white/10"
                style={{
                  background: 'linear-gradient(180deg, #0b1020 0%, #050816 100%)',
                  boxShadow: '-24px 0 60px rgba(0,0,0,.55)',
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                  <div className="flex items-center gap-3">
                    <Logo />
                    <span className="flex flex-col">
                      <span className="text-sm font-bold leading-tight text-white">Muhammed Youssef</span>
                      <span className="text-xs leading-tight text-white/55">Frontend Developer</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                  {NAV_ITEMS.map((item, i) => {
                    const isActive = item.id === activeId
                    const Icon = item.icon
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => onSelect(item.id)}
                        className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-3.5 text-left text-[15px] font-semibold transition ${
                          isActive
                            ? 'bg-white/[0.08] text-white ring-1 ring-white/10'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 + i * 0.04, ease: 'easeOut' }}
                      >
                        <span
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            isActive
                              ? 'bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] text-white'
                              : 'bg-white/5 text-white/60'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        {item.label}
                      </motion.button>
                    )
                  })}
                </nav>

                <div className="border-t border-white/10 p-4">
                  <a
                    href="/Cv.pdf"
                    download
                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-[0_15px_40px_-10px_rgba(139,92,246,.55)]"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)' }}
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}

export default function Navbar() {
  const navItems = useMemo(() => NAV_ITEMS, [])
  const activeId = useActiveSection(navItems.map((n) => n.id))
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled()

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const onSelect = (id: SectionId) => {
    setMobileOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        height: BAR_HEIGHT_PX,
        background: scrolled ? 'rgba(5,8,22,.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,.08)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        {/* Left: logo + name/title */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            onSelect('about')
          }}
          aria-label="Go to About"
          className="flex items-center gap-3"
        >
          <Logo />
          <span className="hidden flex-col sm:flex">
            <span className="text-[15px] font-bold leading-tight text-white">Muhammed Youssef</span>
            <span className="text-xs leading-tight text-white/55">Frontend Developer</span>
          </span>
        </a>

        {/* Center-right: links */}
        <DesktopLinks activeId={activeId} onSelect={onSelect} />

        {/* Right: CV download (desktop) + mobile menu */}
        <div className="flex items-center gap-3">
          <a
            href="/Cv.pdf"
            download
            className="hidden items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>

          <MobileMenu
            activeId={activeId}
            mobileOpen={mobileOpen}
            onOpen={() => setMobileOpen(true)}
            onClose={() => setMobileOpen(false)}
            onSelect={onSelect}
          />
        </div>
      </div>
    </header>
  )
}
