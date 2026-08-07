import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

const SoftReveal = ({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

const UnderlineLink = ({
  href,
  icon,
  label,
}: {
  href: string
  icon: ReactNode
  label: string
}) => {
  const isExternal = href.startsWith('http')

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}

      className="group relative inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold text-white/80 transition"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <span className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition group-hover:border-white/20">
        <motion.span
          initial={{ rotate: 0, scale: 1, color: '#94A3B8' }}
          whileHover={{ rotate: 0, scale: 1.08 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="text-white/80"
        >
          {icon}
        </motion.span>
      </span>

      <span className="relative z-10">{label}</span>

      {/* underline animation */}
      <span
        aria-hidden
        className="absolute left-0 right-0 -bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
      />
    </motion.a>
  )
}

export default function PremiumFooter() {
  return (
    <footer id="footer" className="bg-[#050816]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          {/* Left */}
          <div className="flex flex-col gap-6">
            

            <div className="flex flex-col gap-3">
              <SoftReveal delay={0.05}>
                <div className="text-sm font-semibold tracking-[0.22em] text-white/60">
                  Frontend Developer & UI/UX Designer
                </div>
              </SoftReveal>

              <SoftReveal delay={0.1}>
                <p className="max-w-[520px] text-base leading-relaxed text-white/70">
                  Building modern digital experiences with clean code and
                  thoughtful design.
                </p>
              </SoftReveal>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <SoftReveal delay={0.12}>
              <div className="text-xs font-semibold tracking-[0.26em] text-white/60">
                SOCIAL
              </div>
            </SoftReveal>

            <SoftReveal delay={0.16}>
              <div className="flex flex-wrap gap-x-3 gap-y-2 sm:gap-x-2 sm:gap-y-2">
                <UnderlineLink
                  href="https://github.com/my7422362-wq"
                  label="GitHub"
                  icon={<FaGithub className="h-4 w-4" />}
                />

                <UnderlineLink
                  href="https://www.linkedin.com/in/muhammed-youssef/"
                  label="LinkedIn"
                  icon={<FaLinkedin className="h-4 w-4" />}
                />

                <UnderlineLink
                  href="mailto:moyoussef2192004@gmail.com"
                  label="Email"
                  icon={<Mail className="h-4 w-4" />}
                />
                <UnderlineLink
                  href="https://wa.me/201013556821"
                  label="WhatsApp"
                  icon={<FaWhatsapp className="h-4 w-4" />}
                />
              </div>
            </SoftReveal>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-sm font-semibold text-white/70"
            >
              © 2026 Muhammed Youssef. All Rights Reserved.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.04 }}
              className="text-sm font-semibold text-white/60"
            >
              Crafted with React, TypeScript & Tailwind CSS.
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

