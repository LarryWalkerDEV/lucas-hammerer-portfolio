'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

export function Hero() {
  const language = useLanguage()
  const t = translations[language]
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-minimalist-background overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Credential line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-minimalist-muted text-sm tracking-[0.3em] uppercase">
            M.Sc. Biotechnology
          </span>
        </motion.div>

        {/* Name with elegant reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-light text-minimalist-primary mb-6 tracking-tight"
        >
          Lucas Hammerer
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-minimalist-secondary text-lg md:text-xl font-light max-w-xl mx-auto mb-12 leading-relaxed"
        >
          {language === 'de'
            ? 'Sales Lead, Breathwork Facilitator & Fotograf aus Wien'
            : 'Sales Lead, Breathwork Facilitator & Photographer from Vienna'
          }
        </motion.p>

        {/* Minimal role badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {[
            { label: 'Baufeld-Austria', sublabel: 'Sales Lead' },
            { label: 'Goodlife Breathing', sublabel: 'Founder' },
            { label: 'Luke Goodlife', sublabel: 'Photography' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="px-5 py-3 border border-minimalist-border bg-minimalist-surface/50 backdrop-blur-sm"
            >
              <span className="block text-minimalist-primary text-sm font-medium">
                {item.label}
              </span>
              <span className="block text-minimalist-muted text-xs mt-0.5">
                {item.sublabel}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Portrait image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-12"
        >
          <div className="absolute inset-0 border border-minimalist-border" />
          <div className="absolute inset-2">
            <Image
              src="/images/lucas-portrait.jpg"
              alt="Lucas Hammerer"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group cursor-pointer"
      >
        <span className="text-minimalist-muted text-xs tracking-[0.2em] uppercase group-hover:text-minimalist-primary transition-colors">
          {language === 'de' ? 'Entdecken' : 'Explore'}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-minimalist-muted group-hover:text-minimalist-primary transition-colors" />
        </motion.div>
      </motion.button>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-minimalist-border/50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-minimalist-border/50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-minimalist-border/50 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-minimalist-border/50 hidden md:block" />
    </section>
  )
}
