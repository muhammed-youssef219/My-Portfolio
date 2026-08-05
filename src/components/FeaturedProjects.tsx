import { motion } from 'framer-motion'
import { ExternalLink } from "lucide-react";
import type { ReactNode } from 'react'


type Project = {
  number: string
  title: string
  description: string
  category: string
  tech: string[]
  imageSrc: string
  liveUrl: string
  githubUrl: string
}

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

const CategoryPill = ({ children }: { children: ReactNode }) => {
  return (
    <span className="inline-flex items-center rounded-full border border-[#1E1E1E] bg-[#111111] px-3.5 py-1 text-xs font-semibold text-white/80">
      {children}
    </span>
  )
}

const TechBadge = ({ children }: { children: ReactNode }) => {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  )
}

const LuxuryButton = ({
  variant,
  href,
  children,
  icon,
  target,
  rel,
}: {
  variant: 'primary' | 'secondary'
  href: string
  children: ReactNode
  icon?: ReactNode
  target?: string
  rel?: string
}) => {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]/40'

  const variantClass =
    variant === 'primary'
      ? 'bg-[#111111] text-white ring-1 ring-[#1E1E1E] hover:bg-[#111111]'
      : 'bg-[#0B1020]/50 text-white/90 ring-1 ring-white/10 hover:bg-[#0B1020]/70'

  const sheen =
    variant === 'primary'
      ? 'before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.35),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100'
      : 'before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_20%_0%,rgba(6,182,212,0.25),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100'

  return (
    <a
      href={href}
      target={target ?? '_blank'}
      rel={rel ?? 'noreferrer'}
      className={base + ' ' + variantClass + ' ' + sheen}
    >
      {icon ? <span className="relative z-10">{icon}</span> : null}
      <span className="relative z-10">{children}</span>
      <span
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.20), 0 0 40px rgba(6,182,212,0.10)' }}
      />
    </a>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  return (
    <motion.div
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#1E1E1E] bg-[#111111]"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.04 }}
      whileHover={{ scale: 1.01 }}
    >
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#8B5CF6]/15 blur-[40px] opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-[#06B6D4]/10 blur-[40px] opacity-60" />

      {/* Equal image size + ratio (16:9) */}
      <div className="relative">
        <div className="relative overflow-hidden">
          <motion.img
            src={project.imageSrc}
            alt={project.title}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.04 }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'linear-gradient(135deg, rgba(139,92,246,0.30) 0%, rgba(6,182,212,0.12) 45%, rgba(0,0,0,0) 70%)',
            }}
          />
        </div>
      </div>

      {/* Content stretches to keep equal height */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold tracking-[0.28em] text-white/55">{project.number}</div>
            <CategoryPill>{project.category}</CategoryPill>
          </div>

         
        </div>

        <h3 className="mt-3 text-lg font-bold tracking-[-0.3px] text-white md:text-xl">{project.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">{project.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
        </div>

        <div className="mt-auto pt-4 flex flex-wrap items-center gap-2">
          {index === 5 ? (
            <LuxuryButton
              variant="primary"
              href={'https://www.behance.net/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Behance
            </LuxuryButton>
          ) : (
            <>
              <LuxuryButton
                variant="primary"
                href={project.liveUrl}
                icon={<ExternalLink className="h-4 w-4" />}
              >
                View
              </LuxuryButton>
              <LuxuryButton variant="secondary" href={project.githubUrl}>
                GitHub
              </LuxuryButton>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedProjects() {
  const projects: Project[] = [



    
    {
      number: '',
      title: 'FreshCart – Modern E-Commerce',
      description:
        'A modern and responsive e-commerce frontend application built with React, TypeScript, and Tailwind CSS. FreshCart provides a seamless shopping experience with product browsing, category filtering, search, product details, shopping cart, wishlist, and a responsive checkout flow. The project focuses on clean architecture, reusable components, scalable code, and an optimized user experience across all devices.',
      category: 'Frontend Development',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Router DOM', 'React Hook Form', 'Axios'],
      imageSrc: '/freshcart.png',
      liveUrl: 'https://fresh-cart-ecommerce-uhhb.vercel.app/',
      githubUrl: 'https://github.com/my7422362-wq/FreshCart-ecommerce.git',
    },
    {
      number: '',
      title: 'Modern Real Estate Platform',
      description:
        'Developed a premium real estate web application with a modern, responsive interface using React, TypeScript, Vite, and Tailwind CSS. Implemented dynamic property listings, property details, blog pages, reusable components, client-side routing, responsive design, smooth animations, and optimized performance to create a professional real estate browsing experience.',
      category: 'Frontend Development',
      tech: ['React.js', 'TypeScript', 'JavaScript (ES6+)', ' React Router DOM', 'Framer Motion'],
      imageSrc: '/homeverse.png',
      liveUrl: 'https://homeverse-master-smoky.vercel.app/',
      githubUrl: 'https://github.com/my7422362-wq/Homeverse-Master.git',
    },
    {
      number: '',
      title: 'Kingdom Schools – Modern Educational Platform',
      description:
        'Developed a fully responsive educational website for Kingdom Schools using React, TypeScript, and Tailwind CSS. The application features a modern user interface with smooth navigation, animated sections, reusable components, and optimized performance. The project focuses on delivering an intuitive user experience across all devices while maintaining clean architecture, scalability, and maintainable code. It demonstrates best practices in modern frontend development, including responsive layouts, component reusability, and professional UI design.',
      category: 'Frontend Development',
      tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'React Router DOM', 'React Hook Form', 'Framer Motion' ],
      imageSrc: '/kingdom.png',
      liveUrl: 'https://kingdom-schools.vercel.app/',
      githubUrl: 'https://github.com/my7422362-wq/kingdom-schools.git',
    },


{
      number: '',
      title: 'El Sabah – Corporate Business Website',
      description:
        'A high-performance business website engineered with modern frontend technologies, featuring responsive layouts, reusable components, smooth interactions, and clean, maintainable architecture.',
      category: 'Frontend Development',
      tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'React Router DOM', 'react Hook Form'],
      imageSrc: '/elsabah.png',
      liveUrl: 'https://el-sabah.vercel.app/',
      githubUrl: 'https://github.com/my7422362-wq/El---sabah.git',
    },


    {
      number: '',
      title: 'Trips – Travel & Tourism Platform',
      description:
        'A modern travel platform built with React, TypeScript, and Tailwind CSS, featuring a responsive interface, seamless navigation, reusable components, and an engaging user experience for discovering and exploring destinations.',
      category: 'Frontend Development',
      tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'React Router DOM', 'react Hook Form', 'Framer Motion'],
      imageSrc: '/trip.png',
      liveUrl: 'https://trips-two-hazel.vercel.app/',
      githubUrl: 'https://github.com/my7422362-wq/Trips.git',
    },

    {
      number: '',
      title: 'Medical Clinic',
      description:
        'A fully responsive Medical Clinic web application with a modern UI/UX design that simulates a real-world healthcare platform. It allows patients to browse doctors, view services, and book appointments through a smooth and intuitive user experience. The project focuses on clean architecture, usability, and performance to deliver a production-like interface for clinic management.',
      category: 'UI/UX Design',
      tech: ['Figma', 'Wireframing', 'Prototyping', 'Responsive Design', 'Design System', 'UI/UX Design'],
      imageSrc: '/medical clinic.png',
      liveUrl: 'https://www.behance.net/gallery/245026633/Medical-Clinic-App',
      githubUrl: '',
    },



  ]

  return (
    <section id="projects" className="relative overflow-hidden bg-[#050816] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-14%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
        <div className="absolute right-[-16%] top-[5%] h-[520px] w-[520px] rounded-full bg-[#06B6D4]/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="FEATURED"
          title="Featured Projects"
          subtitle="A collection of projects focused on modern design, clean code, and exceptional user experiences.
."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={`${project.number}-${index}`} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

