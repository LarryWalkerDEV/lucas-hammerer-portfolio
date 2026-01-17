'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { Atom, FlaskConical, Microscope, Dna, Beaker, ChevronDown, Building2, Wind, Camera, GraduationCap, Briefcase } from 'lucide-react'
import { RoleCards } from '@/components/ui/role-cards'

// Animated molecule component
function FloatingMolecule({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute text-scientist-secondary/20"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.1, 0.4, 0.1],
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Atom size={size} />
    </motion.div>
  )
}

// DNA strand animation
function DnaStrand({ side }: { side: 'left' | 'right' }) {
  return (
    <motion.div
      className={`absolute ${side === 'left' ? 'left-0' : 'right-0'} top-0 h-full opacity-10`}
      initial={{ y: side === 'left' ? '0%' : '-50%' }}
      animate={{ y: side === 'left' ? '-50%' : '0%' }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    >
      <div className="flex flex-col gap-4">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-1"
            style={{ marginLeft: side === 'left' ? Math.sin(i * 0.5) * 20 : -Math.sin(i * 0.5) * 20 }}
          >
            <div className="w-3 h-3 rounded-full bg-scientist-secondary" />
            <div className="w-8 h-px bg-scientist-primary/50" />
            <div className="w-2 h-2 rounded-full bg-scientist-primary" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Data visualization dots
function DataVisualization() {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-scientist-secondary rounded-full"
          initial={{ height: 4 }}
          animate={{
            height: [4, Math.random() * 30 + 10, 4],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function Hero() {
  const language = useLanguage()
  const t = translations[language]
  const [displayText, setDisplayText] = useState('')
  const [isTypingDone, setIsTypingDone] = useState(false)
  const fullText = t.hero.tagline
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        setIsTypingDone(true)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [fullText])

  const researchAreas = [
    { icon: GraduationCap, label: language === 'de' ? 'M.Sc. Biotech' : 'M.Sc. Biotech' },
    { icon: Building2, label: language === 'de' ? 'Sales Lead' : 'Sales Lead' },
    { icon: Wind, label: 'Breathwork' },
    { icon: Camera, label: language === 'de' ? 'Fotografie' : 'Photography' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-scientist-background via-scientist-background to-scientist-primary/5 overflow-hidden"
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(74, 144, 164, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 144, 164, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* DNA strands */}
      <DnaStrand side="left" />
      <DnaStrand side="right" />

      {/* Floating molecules */}
      <FloatingMolecule delay={0} x="10%" y="20%" size={60} />
      <FloatingMolecule delay={3} x="85%" y="30%" size={40} />
      <FloatingMolecule delay={6} x="15%" y="70%" size={50} />
      <FloatingMolecule delay={9} x="80%" y="75%" size={35} />
      <FloatingMolecule delay={12} x="50%" y="10%" size={45} />

      {/* Data visualization */}
      <DataVisualization />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-scientist-background/50" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl"
        style={{ opacity, y }}
      >
        {/* Research badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-scientist-primary/10 backdrop-blur-sm border border-scientist-primary/20 rounded-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Atom className="w-5 h-5 text-scientist-secondary" />
            </motion.div>
            <span className="text-scientist-text text-sm font-medium tracking-wide">
              M.Sc. Biotechnology • TU Graz (with distinction)
            </span>
            <div className="w-2 h-2 bg-scientist-accent rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-scientist-secondary text-lg md:text-xl uppercase tracking-[0.3em] mb-4 font-light"
        >
          Lucas Hammerer
        </motion.p>

        {/* Main headline with typewriter */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-scientist-text mb-6 min-h-[1.2em]">
          {displayText}
          <motion.span
            animate={{ opacity: isTypingDone ? 0 : [1, 0] }}
            transition={{ repeat: isTypingDone ? 0 : Infinity, duration: 0.6 }}
            className="inline-block w-[3px] h-[0.9em] bg-scientist-secondary ml-2 align-middle"
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: isTypingDone ? 1 : 0, filter: isTypingDone ? 'blur(0px)' : 'blur(10px)' }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-scientist-text/60 mb-10 max-w-2xl mx-auto"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Research areas icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingDone ? 1 : 0, y: isTypingDone ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-6 md:gap-10 mb-10"
        >
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.label}
              className="flex flex-col items-center gap-2 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-scientist-primary/10 border border-scientist-primary/20 flex items-center justify-center group-hover:bg-scientist-secondary/20 group-hover:border-scientist-secondary/40 transition-all duration-300"
                whileHover={{ rotate: 10 }}
              >
                <area.icon className="w-6 h-6 text-scientist-secondary" />
              </motion.div>
              <span className="text-xs text-scientist-text/50 group-hover:text-scientist-secondary transition-colors uppercase tracking-wider">
                {area.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingDone ? 1 : 0, y: isTypingDone ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            className="relative bg-scientist-primary text-white px-8 py-4 rounded-lg font-medium overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="relative z-10">{t.hero.cta}</span>
            <motion.div
              className="absolute inset-0 bg-scientist-secondary"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          <motion.button
            className="px-8 py-4 rounded-lg font-medium border-2 border-scientist-primary/30 text-scientist-text hover:border-scientist-secondary hover:text-scientist-secondary transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {language === 'de' ? 'Forschung ansehen' : 'View Research'}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="text-xs text-scientist-text/40 uppercase tracking-widest font-mono">
            {language === 'de' ? 'Entdecken' : 'Explore'}
          </span>
          <ChevronDown className="w-5 h-5 text-scientist-secondary/50" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-scientist-secondary/50" />
        <div className="w-2 h-2 rounded-full bg-scientist-primary/50" />
        <div className="w-2 h-2 rounded-full bg-scientist-accent/50" />
      </div>
      <div className="absolute top-8 right-8 text-xs text-scientist-text/30 font-mono">
        v2.0 // SCIENTIST
      </div>
    </section>
  )
}
