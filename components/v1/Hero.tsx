'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Wind, Camera, Mic } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

// Floating particle component for organic feel
function FloatingParticle({ delay, size, duration }: { delay: number; size: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-explorer-primary/20"
      style={{ width: size, height: size }}
      initial={{
        x: Math.random() * 100 - 50,
        y: '100%',
        opacity: 0
      }}
      animate={{
        x: [Math.random() * 100 - 50, Math.random() * 200 - 100],
        y: '-100%',
        opacity: [0, 0.6, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut'
      }}
    />
  )
}

// Breathing circle animation
function BreathingOrb({ size, delay, color }: { size: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function Hero() {
  const language = useLanguage()
  const t = translations[language]
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 30,
        y: (clientY / innerHeight - 0.5) * 30,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const services = [
    { icon: Wind, label: language === 'de' ? 'Atemarbeit' : 'Breathwork' },
    { icon: Camera, label: language === 'de' ? 'Fotografie' : 'Photography' },
    { icon: Mic, label: language === 'de' ? 'Vorträge' : 'Speaking' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-explorer-background via-explorer-secondary/10 to-explorer-primary/20" />

        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 50%, rgba(196, 112, 74, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 80% 80%, rgba(45, 71, 57, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse 50% 60% at 20% 30%, rgba(232, 184, 109, 0.15) 0%, transparent 50%)
            `,
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />

        {/* Breathing orbs */}
        <div className="absolute inset-0 flex items-center justify-center">
          <BreathingOrb size={600} delay={0} color="rgba(196, 112, 74, 0.1)" />
          <BreathingOrb size={400} delay={1} color="rgba(45, 71, 57, 0.15)" />
          <BreathingOrb size={200} delay={2} color="rgba(232, 184, 109, 0.1)" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <FloatingParticle
              key={i}
              delay={i * 0.5}
              size={Math.random() * 8 + 4}
              duration={Math.random() * 10 + 15}
            />
          ))}
        </div>

        {/* Subtle grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl"
        style={{ opacity }}
      >
        {/* Credential badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="inline-flex items-center gap-2 bg-explorer-primary/10 backdrop-blur-sm border border-explorer-primary/20 rounded-full px-4 py-2 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-explorer-accent animate-pulse" />
          <span className="text-explorer-primary text-sm font-medium tracking-wide">
            M.Sc. Biotechnology • TU Graz (with distinction)
          </span>
        </motion.div>

        {/* Name with animated reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-explorer-secondary text-lg md:text-xl uppercase tracking-[0.4em] mb-4 font-light"
        >
          Lucas Hammerer
        </motion.p>

        {/* Main headline with word-by-word animation */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-explorer-text mb-6 leading-tight"
        >
          {t.hero.tagline.split(' ').map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 30, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.7 + index * 0.12,
                type: 'spring',
                stiffness: 100,
                damping: 15
              }}
              className="inline-block mr-3 md:mr-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle with fade */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg md:text-xl text-explorer-text/70 mb-8 max-w-2xl mx-auto"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Service icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex items-center justify-center gap-8 mb-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.label}
              className="flex flex-col items-center gap-2 group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <div className="w-12 h-12 rounded-full bg-explorer-primary/10 border border-explorer-primary/20 flex items-center justify-center group-hover:bg-explorer-primary/20 group-hover:border-explorer-primary/40 transition-all duration-300">
                <service.icon className="w-5 h-5 text-explorer-primary" />
              </div>
              <span className="text-xs text-explorer-text/60 group-hover:text-explorer-primary transition-colors">
                {service.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            className="relative bg-explorer-primary text-white px-8 py-4 rounded-full font-medium overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="relative z-10">{t.hero.cta}</span>
            <motion.div
              className="absolute inset-0 bg-explorer-secondary"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="px-8 py-4 rounded-full font-medium border-2 border-explorer-primary/30 text-explorer-text hover:border-explorer-primary hover:bg-explorer-primary/5 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {language === 'de' ? 'Entdecken' : 'Explore'}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="text-xs text-explorer-text/40 uppercase tracking-widest">
            {language === 'de' ? 'Scrollen' : 'Scroll'}
          </span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-explorer-primary/30 flex items-start justify-center p-1"
          >
            <motion.div
              className="w-1.5 h-3 rounded-full bg-explorer-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-explorer-primary/20 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-explorer-primary/20 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-explorer-primary/20 rounded-bl-lg hidden md:block" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-explorer-primary/20 rounded-br-lg hidden md:block" />
    </section>
  )
}
