'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Briefcase, Camera, Wind } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

// Animated grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 80%, rgba(212, 175, 55, 0.06) 0%, transparent 40%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}

// Floating role badge
function RoleBadge({
  icon: Icon,
  label,
  delay
}: {
  icon: React.ElementType
  label: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-[#d4af37]/20 rounded-full px-4 py-2"
    >
      <Icon className="w-4 h-4 text-[#d4af37]" />
      <span className="text-sm text-white/80 font-medium">{label}</span>
    </motion.div>
  )
}

export function Hero() {
  const language = useLanguage()
  const t = translations[language]
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const roles = [
    { icon: Briefcase, label: language === 'de' ? 'Sales Lead' : 'Sales Lead' },
    { icon: Wind, label: language === 'de' ? 'Breathwork Coach' : 'Breathwork Coach' },
    { icon: Camera, label: language === 'de' ? 'Fotograf' : 'Photographer' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1a2e]"
    >
      <GridBackground />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        style={{ opacity, y }}
      >
        {/* Text content */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          {/* Name with animated underline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-block text-[#d4af37] uppercase tracking-[0.3em] text-sm font-medium mb-4">
              M.Sc. Biotechnology
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
          >
            Lucas
            <br />
            <span className="relative">
              Hammerer
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#d4af37] to-[#d4af37]/50"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            {language === 'de'
              ? 'Verbinde Wissenschaft mit Wellness. Sales Leader, Breathwork Coach und Fotograf aus Graz.'
              : 'Bridging science and wellness. Sales leader, breathwork coach, and photographer based in Graz.'}
          </motion.p>

          {/* Role badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
          >
            {roles.map((role, index) => (
              <RoleBadge
                key={role.label}
                icon={role.icon}
                label={role.label}
                delay={1 + index * 0.15}
              />
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              className="relative bg-[#d4af37] text-[#1a1a2e] px-8 py-4 rounded-full font-semibold overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.a
              href="https://immobilien-fotograf.wien"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-medium text-white border border-[#d4af37]/40 hover:border-[#d4af37] transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              immobilien-fotograf.wien
            </motion.a>
          </motion.div>
        </div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative order-1 lg:order-2"
        >
          <motion.div
            className="relative aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden"
            style={{ scale: imageScale }}
          >
            {/* Decorative frame */}
            <motion.div
              className="absolute -inset-4 border-2 border-[#d4af37]/30 rounded-3xl"
              animate={{
                borderColor: ['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0.5)', 'rgba(212, 175, 55, 0.3)'],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <Image
              src="/images/lucas-portrait.jpg"
              alt="Lucas Hammerer"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 via-transparent to-transparent" />

            {/* Gold accent corner */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, transparent 50%)',
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Floating credential badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -bottom-4 -left-4 md:left-4 bg-[#1a1a2e]/90 backdrop-blur-sm border border-[#d4af37]/30 rounded-xl p-4 shadow-xl"
          >
            <p className="text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1">
              {language === 'de' ? 'Aktuell' : 'Current'}
            </p>
            <p className="text-white text-sm font-medium">Sales Lead</p>
            <p className="text-white/60 text-xs">Baufeld-Austria GmbH</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="text-xs text-white/40 uppercase tracking-[0.3em]">
            {language === 'de' ? 'Entdecken' : 'Explore'}
          </span>
          <ArrowDown className="w-5 h-5 text-[#d4af37]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
