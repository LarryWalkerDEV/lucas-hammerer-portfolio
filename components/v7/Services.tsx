'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, Home, Wind, Camera, Briefcase, Minus, Plus, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/shared/LanguageSwitcher'

interface ServiceItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  link?: string
  icon: React.ElementType
}

function ServiceRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
}: {
  data: ServiceItem
  index: number
  isActive: boolean
  setActiveId: (id: string | null) => void
  isMobile: boolean
  isAnyActive: boolean
}) {
  const isDimmed = isAnyActive && !isActive
  const Icon = data.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        y: 0,
        backgroundColor: isActive && isMobile ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
      }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={() => isMobile && setActiveId(isActive ? null : data.id)}
      className={cn(
        'group relative border-t border-[#d4af37]/10 transition-colors duration-500 last:border-b',
        isMobile ? 'cursor-pointer' : 'cursor-default'
      )}
    >
      <div className="relative z-10 flex flex-col py-8 md:flex-row md:items-center md:justify-between md:py-10">
        <div className="flex items-center gap-6 md:gap-10 pl-4 md:pl-0 transition-transform duration-500 group-hover:translate-x-4">
          <motion.div
            className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center"
            animate={{
              scale: isActive ? 1.1 : 1,
              backgroundColor: isActive ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.1)',
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon className={cn(
              'w-5 h-5 transition-colors duration-300',
              isActive ? 'text-[#d4af37]' : 'text-[#d4af37]/60'
            )} />
          </motion.div>

          <div>
            <span className="font-mono text-xs text-[#d4af37]/50 block mb-1">
              0{index + 1}
            </span>
            <h3 className={cn(
              'text-2xl md:text-4xl font-medium tracking-tight transition-colors duration-300 text-white',
              'opacity-70 group-hover:opacity-100'
            )}>
              {data.title}
            </h3>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between pl-[4.5rem] pr-4 md:mt-0 md:justify-end md:gap-8 md:pl-0 md:pr-0">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#d4af37]/60 group-hover:text-[#d4af37] transition-colors">
            {data.subtitle}
          </span>

          {/* Mobile Toggle */}
          <div className="block md:hidden text-[#d4af37]/50">
            {isActive ? <Minus size={18} /> : <Plus size={18} />}
          </div>

          {/* Desktop Arrow */}
          <motion.div
            animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
            className="hidden md:block text-[#d4af37]"
          >
            {data.link ? (
              <ExternalLink size={24} strokeWidth={1.5} />
            ) : (
              <ArrowUpRight size={24} strokeWidth={1.5} />
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Accordion */}
      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#d4af37]/5"
          >
            <div className="p-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 to-transparent" />
              </div>
              <p className="text-sm text-white/70 mb-4">{data.description}</p>
              {data.link && (
                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#d4af37] text-sm font-medium hover:underline"
                >
                  {data.link.replace('https://', '')}
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Services() {
  const language = useLanguage()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return
    mouseX.set(e.clientX + 20)
    mouseY.set(e.clientY + 20)
  }

  const services: ServiceItem[] = [
    {
      id: 'real-estate',
      title: language === 'de' ? 'Immobilienfotografie' : 'Real Estate Photography',
      subtitle: language === 'de' ? 'Wien & Umgebung' : 'Vienna & Region',
      description: language === 'de'
        ? 'Professionelle Immobilienfotografie fur Makler und Eigentumer. Hochwertige Aufnahmen, die Ihre Immobilie optimal prasentieren.'
        : 'Professional real estate photography for agents and owners. High-quality images that showcase your property at its best.',
      image: '/images/lucas-portrait.jpg',
      link: 'https://immobilien-fotograf.wien',
      icon: Home,
    },
    {
      id: 'breathwork',
      title: 'Goodlife Breathing',
      subtitle: language === 'de' ? 'Seit 2021' : 'Since 2021',
      description: language === 'de'
        ? 'Entfalte dein volles Potenzial durch wissenschaftlich fundierte Atemtechniken. Einzelsessions, Workshops und Corporate Wellness.'
        : 'Explore your full potential through scientifically-grounded breathing techniques. Individual sessions, workshops, and corporate wellness.',
      image: '/images/workshop.webp',
      icon: Wind,
    },
    {
      id: 'photography',
      title: language === 'de' ? 'Portrait & Event' : 'Portrait & Event',
      subtitle: 'Luke Goodlife',
      description: language === 'de'
        ? 'Authentische Portraits und Event-Dokumentation. Business, Lifestyle und kreative Projekte seit 2020.'
        : 'Authentic portraits and event documentation. Business, lifestyle, and creative projects since 2020.',
      image: '/images/lucas-surfer.jpg',
      icon: Camera,
    },
    {
      id: 'consulting',
      title: language === 'de' ? 'Business Consulting' : 'Business Consulting',
      subtitle: language === 'de' ? 'B2B Sales' : 'B2B Sales',
      description: language === 'de'
        ? 'Strategische Beratung fur Key Account Management und Material Flow. Erfahrung aus der Waste-to-Energy und Nachhaltigkeitsbranche.'
        : 'Strategic consulting for key account management and material flow. Experience from waste-to-energy and sustainability sectors.',
      image: '/images/lucas-ted.jpg',
      icon: Briefcase,
    },
  ]

  const activeService = services.find((s) => s.id === activeId)

  return (
    <section
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#1a1a2e] px-6 py-24 md:px-12"
    >
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.03),transparent_50%)]" />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block text-[#d4af37] uppercase tracking-[0.25em] text-sm font-medium mb-4"
            >
              {language === 'de' ? 'Angebote' : 'Services'}
            </motion.span>
            <h2 className="text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl">
              {language === 'de' ? 'Was ich' : 'What I'}{' '}
              <span className="text-[#d4af37]">{language === 'de' ? 'anbiete' : 'Offer'}</span>
            </h2>
          </div>
          <div className="h-px flex-1 bg-[#d4af37]/10 mx-8 hidden md:block" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            {language === 'de' ? 'Hover fur Details' : 'Hover for Details'}
          </p>
        </motion.header>

        {/* Services list */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceRow
              key={service.id}
              data={service}
              index={index}
              isActive={activeId === service.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
            />
          ))}
        </div>

        {/* Featured link to immobilien-fotograf.wien */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://immobilien-fotograf.wien"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10 border border-[#d4af37]/30 rounded-full px-8 py-4 text-white font-medium hover:border-[#d4af37] transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-5 h-5 text-[#d4af37]" />
            <span>
              {language === 'de'
                ? 'Neu 2026: immobilien-fotograf.wien'
                : 'New 2026: immobilien-fotograf.wien'}
            </span>
            <ExternalLink className="w-4 h-4 text-[#d4af37]" />
          </motion.a>
        </motion.div>
      </div>

      {/* Desktop Floating Cursor Image */}
      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {activeId && activeService && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative h-56 w-72 overflow-hidden rounded-xl border border-[#d4af37]/20 bg-[#1a1a2e] shadow-2xl"
              >
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/50 to-transparent" />

                <div className="absolute bottom-0 w-full p-4">
                  <p className="text-sm text-white/80 line-clamp-2">{activeService.description}</p>
                  {activeService.link && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                      <span className="text-xs text-[#d4af37]">{activeService.link.replace('https://', '')}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}
