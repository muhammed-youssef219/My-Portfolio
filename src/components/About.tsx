import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import {
  SiFigma,
  SiFramer,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'


const GradientBorderCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[var(--card-border)] bg-[var(--surface)] p-8 md:p-10">
      {children}
    </div>
  )
}

const StatCard = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  return (
    <motion.div
      className="group relative rounded-3xl border border-[var(--text)]/10 bg-[var(--text)]/5 p-5 backdrop-blur transition"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      >
      <div className="absolute inset-0 rounded-3xl opacity-0 blur-xl bg-gradient-to-r from-[#64748B]/20 to-[#64748B]/20 transition group-hover:opacity-100" />
      <div className="relative">
        <div className="text-3xl font-bold text-[var(--text)]">{value}</div>
        <div className="mt-1 text-sm text-[var(--text)]/70">{label}</div>
      </div>
    </motion.div>
  )
}

const TechCard = ({ name }: { name: string }) => {
  const icon =
    name === 'React' ? (
      <SiReact size={20} className="text-[#61DAFB] transition-colors duration-250 group-hover:text-[#A6F3FF]" />
    ) : name === 'TypeScript' ? (
      <SiTypescript
        size={20}
        className="text-[#3178C6] transition-colors duration-250 group-hover:text-[#66B6FF]"
      />
    ) : name === 'Tailwind CSS' ? (
      <SiTailwindcss
        size={20}
        className="text-[#64748B] transition-colors duration-250 group-hover:text-[#36E0FF]"
      />
    ) : name === 'Framer Motion' ? (
      <SiFramer
        size={20}
        className="text-[#0055FF] transition-colors duration-250 group-hover:text-[#2F7CFF]"
      />
    ) : name === 'Figma' ? (
      <span className="inline-flex items-center justify-center transition-transform duration-250 group-hover:brightness-110">
        <SiFigma size={20} />
      </span>
    ) : (
      <SiNextdotjs
        size={20}
        className="text-[var(--text)] transition-colors duration-250 group-hover:text-[var(--text)]/90"
      />
    )

  return (
    <motion.div
      className="group relative flex items-center justify-between gap-3 rounded-3xl border border-[var(--text)]/10 bg-[var(--text)]/5 px-5 py-4 backdrop-blur transition"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, type: 'tween' }}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--text)]/5 ring-1 ring-[var(--text)]/10">
          {icon}
        </span>
        <div>
          <div className="text-sm font-semibold text-[var(--text)]/95">{name}</div>
        </div>
      </div>
      <span className="text-[#64748B] opacity-0 transition group-hover:opacity-100">↗</span>

      <div className="pointer-events-none absolute inset-0 opacity-0 blur-xl bg-gradient-to-r from-[#64748B]/20 to-[#64748B]/20 transition group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-[var(--text)]/10 transition group-hover:opacity-100" />
    </motion.div>
  )
}


export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[var(--bg)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[480px] w-[480px] rounded-full bg-[var(--glow-secondary)] blur-[120px]" />
        <div className="absolute right-[-15%] bottom-[-20%] h-[520px] w-[520px] rounded-full bg-[var(--glow-primary)] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20% 0px -10% 0px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-[40px] leading-[1.06] font-bold tracking-[-1px] text-[var(--text)] md:text-[54px]">
                About Me
                <br />
                
              </h2>

              <p className="max-w-[520px] text-base leading-relaxed text-[var(--text)]/75">
               I specialize in developing modern frontend applications and designing intuitive user interfaces that balance aesthetics with functionality. From responsive layouts to smooth interactions, I focus on creating digital experiences that are fast, accessible, and crafted with attention to every detail.

              </p>

              <motion.a
                href="/CV (2).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#64748B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#586479]"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
              >
                <ArrowDownToLine className="h-4 w-4" />
                View CV
              </motion.a>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
            className="flex flex-col gap-8"
          >
            <GradientBorderCard>
              <div className="flex flex-col gap-8">
                {/* Stats */}
                <div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <StatCard value="2+" label="Years Experience" delay={0.05} />
                    <StatCard value="20+" label="Projects" delay={0.12} />
                    <StatCard value="10+" label="Clients" delay={0.19} />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm font-semibold text-[var(--text)]/90">Technologies</div>
                    
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <TechCard name="React" />
                    <TechCard name="TypeScript" />
                    <TechCard name="Tailwind CSS" />
                    <TechCard name="Framer Motion" />
                    <TechCard name="Figma" />
                    <TechCard name="Next.js" />
                  </div>
                </div>
              </div>
            </GradientBorderCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

