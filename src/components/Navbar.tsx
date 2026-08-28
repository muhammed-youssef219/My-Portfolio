import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Download,
  Menu,
  X,
  Home,
  User,
  FolderKanban,
  Sparkles,
  Award,
  MessageCircle,
  Layers,
  Sun,
  Moon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

type SectionId = 'home' | 'about' | 'projects' | 'skills' | 'certifications' | 'contact' | 'footer'

type NavItem = {
  id: SectionId
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'certifications', label: 'Certifications', icon: Award },
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
        background: '#64748B',
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
              className={`text-sm font-semibold transition hover:text-[var(--text)] ${
                isActive ? 'text-[var(--text)]' : 'text-[var(--text)]/70'
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

function ThemeToggle({ theme, onToggle, className }: { theme: 'light' | 'dark'; onToggle: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex items-center justify-center rounded-xl border border-[var(--text)]/10 bg-[var(--text)]/5 text-[var(--text)] transition hover:bg-[var(--text)]/10 ${className ?? ''}`}
    >
      {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  )
}

function MobileMenu({
  activeId,
  mobileOpen,
  onOpen,
  onClose,
  onSelect,
  theme,
  onToggleTheme,
}: {
  activeId: SectionId | null
  mobileOpen: boolean
  onOpen: () => void
  onClose: () => void
  onSelect: (id: SectionId) => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
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
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--text)]/10 bg-[var(--text)]/5 text-[var(--text)]"
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
                className="fixed inset-0 z-40 bg-[var(--mobile-backdrop)] backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />

              <motion.div
                className="fixed inset-y-0 right-0 z-50 flex w-[84vw] max-w-[340px] flex-col border-l border-[var(--text)]/10"
                style={{
                  background: 'var(--mobile-menu-bg)',
                  boxShadow: '-24px 0 60px rgba(0,0,0,.35)',
                  willChange: 'transform',
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.9 }}
              >
                <div className="flex items-center justify-between border-b border-[var(--text)]/10 px-5 py-5">
                  <div className="flex items-center gap-3">
                    <Logo />
                    <span className="flex flex-col">
                      <span className="text-sm font-bold leading-tight text-[var(--text)]">Muhammed Youssef</span>
                      <span className="text-xs leading-tight text-[var(--text)]/55">Frontend Developer</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThemeToggle theme={theme} onToggle={onToggleTheme} className="h-10 w-10" />
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close menu"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--text)]/10 bg-[var(--text)]/5 text-[var(--text)]/80 transition hover:bg-[var(--text)]/10 hover:text-[var(--text)]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
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
                            ? 'bg-[var(--text)]/[0.08] text-[var(--text)] ring-1 ring-[var(--text)]/10'
                            : 'text-[var(--text)]/70 hover:bg-[var(--text)]/5 hover:text-[var(--text)]'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 + i * 0.04, ease: 'easeOut' }}
                      >
                        <span
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            isActive
                              ? 'bg-gradient-to-br from-[#64748B] to-[#64748B] text-white'
                              : 'bg-[var(--text)]/5 text-[var(--text)]/60'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        {item.label}
                      </motion.button>
                    )
                  })}
                </nav>

                <div className="border-t border-[var(--text)]/10 p-4">
                  <a
                    href="/CV (2).pdf"
                    download
                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-[0_15px_40px_-10px_rgba(100,116,139,.55)]"
                    style={{ background: '#64748B' }}
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
  const { theme, toggleTheme } = useTheme()

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
        background: scrolled ? 'var(--nav-scrolled)' : 'var(--nav-idle)',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        {/* Left: logo + name/title */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            onSelect('home')
          }}
          aria-label="Go to Home"
          className="flex items-center gap-3"
        >
          <Logo />
          <span className="hidden flex-col sm:flex">
            <span className="text-[15px] font-bold leading-tight text-[var(--text)]">Muhammed Youssef</span>
            <span className="text-xs leading-tight text-[var(--text)]/55">Frontend Developer</span>
          </span>
        </a>

        {/* Center-right: links */}
        <DesktopLinks activeId={activeId} onSelect={onSelect} />

        {/* Right: theme toggle + CV download (desktop) + mobile menu */}
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={toggleTheme} className="hidden h-11 w-11 md:inline-flex" />

          <a
            href="/CV (2).pdf"
            download
            className="hidden items-center gap-2 rounded-xl bg-[#64748B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#586479] md:inline-flex"
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
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        </div>
      </div>
    </header>
  )
}
