import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Calendar, FolderKanban, Users, Code2, ChevronDown } from 'lucide-react'
import { SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiFramer, SiFigma } from 'react-icons/si'

import type { ReactNode } from 'react'

const GradientText = ({ children }: { children: ReactNode }) => {
  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
      {children}
    </span>
  )
}

const GlowButton = ({
  variant,
  icon,
  children,
  onClick,
}: {
  variant: 'primary' | 'secondary'
  icon?: ReactNode
  children: ReactNode
  onClick?: () => void
}) => {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition'

  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white shadow-[0_15px_40px_-10px_rgba(139,92,246,.55)]'
      : 'bg-white/5 text-white/90 ring-1 ring-white/10 hover:bg-white/10'

  const glow =
    variant === 'primary'
      ? 'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-[#8B5CF6] before:via-[#06B6D4] before:to-[#8B5CF6] before:opacity-0 before:blur-md before:transition group-hover:before:opacity-40'
      : 'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-[#06B6D4]/40 before:to-[#8B5CF6]/40 before:opacity-0 before:blur-md before:transition group-hover:before:opacity-20'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${base} ${styles} ${glow}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10">{icon}</span>
    </motion.button>
  )
}

const AvailabilityBadge = () => {
  return (
    <motion.div
      className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Available for freelance projects
    </motion.div>
  )
}

const TechBadge = ({ icon, label, delay }: { icon: ReactNode; label: string; delay: number }) => {
  return (
    <motion.div
      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-medium text-white/85 transition hover:border-white/20 hover:bg-white/[0.07]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    >
      {icon}
      {label}
    </motion.div>
  )
}

const StatDivider = () => <span aria-hidden className="hidden h-10 w-px bg-white/10 sm:block" />

const StatItem = ({
  icon,
  accent,
  value,
  label,
}: {
  icon: ReactNode
  accent: 'violet' | 'cyan'
  value: string
  label: string
}) => {
  const accentClasses = accent === 'violet' ? 'bg-[#8B5CF6]/15 text-[#8B5CF6]' : 'bg-[#06B6D4]/15 text-[#06B6D4]'

  return (
    <div className="flex items-center gap-3.5">
      <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentClasses}`}>
        {icon}
      </span>
      <div>
        <div className="text-xl font-bold leading-tight text-white">{value}</div>
        <div className="text-xs text-white/60">{label}</div>
      </div>
    </div>
  )
}

export default function Hero() {
  const handleViewProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToEnd = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-[#050816] pt-[84px]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[#8B5CF6]/25 blur-[120px]" />
        <div className="absolute right-[-15%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[#06B6D4]/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-84px)] max-w-6xl flex-col justify-center px-6 pb-16 pt-8 md:pb-20">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-[100px]">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <div className="flex flex-col gap-5">
                <AvailabilityBadge />

                <h1 className="flex flex-col gap-1.5 text-[36px] leading-[0.95] font-bold tracking-[-1.3px] text-white sm:text-[42px] md:text-[54px]">
                  <span>Frontend Developer</span>
                  <span className="sm:whitespace-nowrap">
                    <GradientText>&amp; UI/UX Designer</GradientText>
                  </span>
                </h1>

                <p className="max-w-[520px] text-base leading-relaxed text-white/75">
                  I build modern, responsive and user-friendly web applications with clean code and great user
                  experience.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <GlowButton variant="primary" onClick={handleViewProjects} icon={<ArrowUpRight className="h-4 w-4" />}>
                    View My Work
                  </GlowButton>
                  <GlowButton variant="secondary" onClick={handleContact} icon={<Mail className="h-4 w-4" />}>
                    Contact Me
                  </GlowButton>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <span className="text-xs font-semibold tracking-[0.14em] text-white/45">
                    TECHNOLOGIES I WORK WITH
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    <TechBadge icon={<SiReact size={17} style={{ color: '#61DAFB' }} />} label="React" delay={0.3} />
                    <TechBadge
                      icon={<SiTypescript size={17} style={{ color: '#3178C6' }} />}
                      label="TypeScript"
                      delay={0.35}
                    />
                    <TechBadge
                      icon={<SiNextdotjs size={17} style={{ color: '#FFFFFF' }} />}
                      label="Next.js"
                      delay={0.4}
                    />
                    <TechBadge
                      icon={<SiTailwindcss size={17} style={{ color: '#06B6D4' }} />}
                      label="Tailwind CSS"
                      delay={0.45}
                    />
                    <TechBadge
                      icon={<SiFramer size={17} style={{ color: '#8B5CF6' }} />}
                      label="Framer Motion"
                      delay={0.5}
                    />
                    <TechBadge icon={<SiFigma size={17} style={{ color: '#FFFFFF' }} />} label="Figma" delay={0.55} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              <motion.div
                className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[24px] shadow-[0_30px_80px_-20px_rgba(0,0,0,.65)]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                <img src="/me.jpeg" alt="Mohamed Youssif" className="h-full w-full object-cover" />
              </motion.div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="mt-16 border-t border-white/10 pt-10 md:mt-20"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:justify-between">
              <StatItem icon={<Calendar className="h-5 w-5" />} accent="violet" value="2+" label="Years Experience" />
              <StatDivider />
              <StatItem icon={<FolderKanban className="h-5 w-5" />} accent="cyan" value="20+" label="Projects Completed" />
              <StatDivider />
              <StatItem icon={<Users className="h-5 w-5" />} accent="violet" value="10+" label="Clients" />
              <StatDivider />
              <StatItem icon={<Code2 className="h-5 w-5" />} accent="cyan" value="10+" label="Technologies" />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          type="button"
          onClick={handleScrollToEnd}
          aria-label="Scroll to the bottom of the page"
          className="mt-12 flex flex-col items-center gap-2 self-center text-white/40 transition hover:text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="text-[11px] font-medium tracking-[0.1em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
