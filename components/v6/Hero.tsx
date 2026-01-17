'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { ArrowDown, Sparkles, Zap, Camera, Wind, Building2 } from 'lucide-react'
import Image from 'next/image'

// Flip Card Component for expertise areas
function FlipCard({
  frontIcon: FrontIcon,
  frontTitle,
  backDescription,
  delay,
  accentColor,
}: {
  frontIcon: typeof Camera
  frontTitle: string
  backDescription: string
  delay: number
  accentColor: string
}) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -20 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay, duration: 0.8, type: 'spring' }}
      className="relative w-full h-48 cursor-pointer perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <motion.div
            className={`w-16 h-16 rounded-xl flex items-center justify-center ${accentColor}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <FrontIcon className="w-8 h-8 text-black" />
          </motion.div>
          <h3 className="text-white text-lg font-bold tracking-wide text-center">
            {frontTitle}
          </h3>
          <motion.div
            className="absolute bottom-4 text-white/40 text-xs"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Hover to reveal
          </motion.div>
        </div>

        {/* Back face */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl ${accentColor} flex items-center justify-center p-6`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-black text-sm font-medium text-center leading-relaxed">
            {backDescription}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Animated text reveal
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + index * 0.03,
            duration: 0.5,
            type: 'spring',
            stiffness: 100,
          }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// Floating particles background
function FloatingParticles() {
  const particles = [...Array(30)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Gradient mesh background
function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-30"
        style={{
          background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
          left: '10%',
          top: '-20%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)',
          right: '10%',
          bottom: '-10%',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export function Hero() {
  const language = useLanguage()
  const t = translations[language]
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX / innerWidth - 0.5) * 20)
      mouseY.set((clientY / innerHeight - 0.5) * 20)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const expertiseCards = language === 'de'
    ? [
        {
          icon: Camera,
          title: 'Fotografie',
          description: 'Event, Business, Wasser & Reisefotografie seit 2020. Authentische Momente einfangen.',
          color: 'bg-amber-400',
        },
        {
          icon: Wind,
          title: 'Breathwork',
          description: 'GOODLIFE BREATHING - Transformative Atemsessions kombiniert mit Wissenschaft & Musik.',
          color: 'bg-orange-500',
        },
        {
          icon: Building2,
          title: 'Business',
          description: 'Sales Lead bei Baufeld-Austria. Key Account Management im Material Flow Sektor.',
          color: 'bg-red-500',
        },
      ]
    : [
        {
          icon: Camera,
          title: 'Photography',
          description: 'Event, Business, Water & Travel Photography since 2020. Capturing authentic moments.',
          color: 'bg-amber-400',
        },
        {
          icon: Wind,
          title: 'Breathwork',
          description: 'GOODLIFE BREATHING - Transformative breathing sessions combining science & music.',
          color: 'bg-orange-500',
        },
        {
          icon: Building2,
          title: 'Business',
          description: 'Sales Lead at Baufeld-Austria. Key Account Management in Material Flow sector.',
          color: 'bg-red-500',
        },
      ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <GradientMesh />
      <FloatingParticles />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
        style={{ opacity, scale, y, x: springX }}
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-white/60 text-sm tracking-wide">
              {language === 'de' ? 'Kreativ-Agentur Stil Portfolio' : 'Creative Agency Style Portfolio'}
            </span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
        </motion.div>

        {/* Main heading */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-amber-400 text-lg md:text-xl tracking-[0.3em] uppercase font-light">
              Lucas Hammerer
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tight mb-4">
            <AnimatedText text={language === 'de' ? 'KREATIV.' : 'CREATIVE.'} delay={0.9} />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
              <AnimatedText text={language === 'de' ? 'VIELSEITIG.' : 'VERSATILE.'} delay={1.3} />
            </span>
            <br />
            <AnimatedText text={language === 'de' ? 'AUTHENTISCH.' : 'AUTHENTIC.'} delay={1.7} />
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="text-center text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-6"
        >
          M.Sc. Biotechnology (TU Graz, with distinction)
        </motion.p>

        {/* Role subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 text-white/40 text-sm md:text-base">
            <span>Breathwork Facilitator</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Adventure Photographer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>Sales Lead</span>
          </div>
        </motion.div>

        {/* Flip cards grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {expertiseCards.map((card, index) => (
            <FlipCard
              key={card.title}
              frontIcon={card.icon}
              frontTitle={card.title}
              backDescription={card.description}
              delay={2.6 + index * 0.15}
              accentColor={card.color}
            />
          ))}
        </div>

        {/* Featured link - immobilien-fotograf.wien */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2 }}
          className="flex justify-center mb-12"
        >
          <motion.a
            href="https://immobilien-fotograf.wien"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden px-8 py-4 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-sm"
            whileHover={{ scale: 1.05, borderColor: 'rgba(251, 191, 36, 0.6)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <div className="relative flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-white font-medium">
                {language === 'de' ? 'NEU 2026' : 'NEW 2026'}
              </span>
              <span className="text-amber-400 font-bold">immobilien-fotograf.wien</span>
              <motion.span
                className="text-white/40"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &rarr;
              </motion.span>
            </div>
          </motion.a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            className="relative overflow-hidden px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold uppercase tracking-wider text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">
              {language === 'de' ? 'Portfolio Entdecken' : 'Explore Work'}
            </span>
          </motion.button>

          <motion.button
            className="px-10 py-4 rounded-full border border-white/20 text-white/70 font-medium uppercase tracking-wider text-sm hover:border-white/40 hover:text-white transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.hero.cta}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="text-white/30 text-xs uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="w-5 h-5 text-amber-400" />
        </motion.div>
      </motion.div>

      {/* Version indicator */}
      <div className="absolute bottom-8 right-8 z-10 text-[10px] text-white/20 font-mono tracking-wider hidden md:block">
        v6.0 // CREATIVE AGENCY
      </div>
    </section>
  )
}
