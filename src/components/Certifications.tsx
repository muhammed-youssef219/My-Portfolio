import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'

type Certificate = {
  title: string
  issuer: string
  date: string
  detail: string
  fileSrc: string
  thumbnailSrc?: string
}

const CERTIFICATES: Certificate[] = [
  {
    title: 'Web Development using React JS',
    issuer: 'Information Technology Institute (ITI)',
    date: 'Aug 2025 — Sep 2025',
    detail: '120 training hours',
    fileSrc: '/Front-end.jpg.jpeg',
  },
  {
    title: 'UI/UX Design',
    issuer: 'NTI · Digital Egypt Youth Program',
    date: 'Jan 2026 — Feb 2026',
    detail: '120 hours · Score 92%',
    fileSrc: '/UiUx.pdf',
    thumbnailSrc: '/uiux-certificate.png',
  },
  {
    title: 'Software Testing',
    issuer: 'AMIT · Digital Egypt Youth Program',
    date: 'Feb 2026 — Mar 2026',
    detail: '27 training hours',
    fileSrc: '/Software testing .jpg.jpeg',
  },
]

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex items-center gap-3">
        <span className="h-[1px] w-10 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] opacity-80" />
        <span className="text-xs font-semibold tracking-[0.26em] text-white/70">{eyebrow}</span>
      </div>
      <h2 className="text-[40px] leading-[1.06] font-bold tracking-[-1px] text-white md:text-[54px]">{title}</h2>
      <p className="max-w-[720px] text-base leading-relaxed text-white/70 md:text-lg">{subtitle}</p>
    </div>
  )
}

const MetaPill = ({ children }: { children: ReactNode }) => {
  return (
    <span className="inline-flex items-center rounded-full border border-[#1E1E1E] bg-[#111111] px-3.5 py-1 text-xs font-semibold text-white/80">
      {children}
    </span>
  )
}

function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
  return (
    <motion.div
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#1E1E1E] bg-[#111111]"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
    >
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#8B5CF6]/15 blur-[40px] opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-[#06B6D4]/10 blur-[40px] opacity-60" />

      <a
        href={certificate.fileSrc}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${certificate.title} certificate`}
        className="relative flex h-64 items-center justify-center overflow-hidden bg-[#0B1020] p-4"
      >
        <img
          src={certificate.thumbnailSrc ?? certificate.fileSrc}
          alt={certificate.title}
          loading="lazy"
          className="h-full w-full rounded-lg object-contain"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
            <ExternalLink className="h-4 w-4" />
            View Certificate
          </span>
        </div>
      </a>

      <div className="relative flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4]">
            <Award className="h-4 w-4 text-white" />
          </span>
          <MetaPill>{certificate.date}</MetaPill>
        </div>

        <h3 className="mt-3 text-lg font-bold tracking-[-0.3px] text-white">{certificate.title}</h3>
        <p className="mt-1 text-sm text-white/60">{certificate.issuer}</p>
        <p className="mt-3 text-sm text-white/50">{certificate.detail}</p>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative overflow-hidden bg-[#050816] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-14%] top-[10%] h-[520px] w-[520px] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
        <div className="absolute right-[-16%] bottom-[-10%] h-[520px] w-[520px] rounded-full bg-[#06B6D4]/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="CREDENTIALS"
          title="Certifications & Training"
          subtitle="Verified courses and training programs that back up the skills used across these projects."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CERTIFICATES.map((certificate, index) => (
            <CertificateCard key={certificate.title} certificate={certificate} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
