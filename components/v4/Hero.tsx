'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

// Concentric breathing circles - lotus-inspired meditation visualization
function BreathingLotus({
  breathPhase,
  isActive
}: {
  breathPhase: 'inhale' | 'hold' | 'exhale'
  isActive: boolean
}) {
  const petalCount = 8
  const petals = Array.from({ length: petalCount }, (_, i) => i)

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Outermost glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(127, 205, 205, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: breathPhase === 'inhale' ? 1.15 : breathPhase === 'exhale' ? 0.9 : 1,
          opacity: isActive ? 1 : 0.5,
        }}
        transition={{ duration: 4, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Lotus petals container */}
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
        animate={{
          rotate: breathPhase === 'inhale' ? 22.5 : breathPhase === 'exhale' ? -22.5 : 0,
        }}
        transition={{ duration: 4, ease: [0.4, 0, 0.2, 1] }}
      >
        {petals.map((i) => (
          <motion.div
            key={i}
            className="absolute w-full h-full"
            style={{
              rotate: `${(360 / petalCount) * i}deg`,
            }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-32 md:w-20 md:h-40 rounded-full"
              style={{
                background: 'linear-gradient(180deg, rgba(44, 95, 110, 0.3) 0%, rgba(127, 205, 205, 0.15) 100%)',
                transformOrigin: 'bottom center',
              }}
              animate={{
                scaleY: breathPhase === 'inhale' ? 1.3 : breathPhase === 'exhale' ? 0.7 : 1,
                opacity: breathPhase === 'hold' ? 0.8 : 0.5,
              }}
              transition={{ duration: 4, ease: [0.4, 0, 0.2, 1], delay: i * 0.05 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Middle ring */}
      <motion.div
        className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full border-2 border-facilitator-secondary/30"
        animate={{
          scale: breathPhase === 'inhale' ? 1.2 : breathPhase === 'exhale' ? 0.85 : 1,
          borderWidth: breathPhase === 'hold' ? '4px' : '2px',
        }}
        transition={{ duration: 4, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Inner circle */}
      <motion.div
        className="absolute w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(44, 95, 110, 0.4) 0%, rgba(44, 95, 110, 0.1) 100%)',
        }}
        animate={{
          scale: breathPhase === 'inhale' ? 1.25 : breathPhase === 'exhale' ? 0.8 : 1,
        }}
        transition={{ duration: 4, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Core - breathing center */}
      <motion.div
        className="absolute w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-gradient-to-br from-facilitator-primary/60 to-facilitator-secondary/40"
        animate={{
          scale: breathPhase === 'inhale' ? 1.4 : breathPhase === 'exhale' ? 0.7 : 1,
          boxShadow: breathPhase === 'hold'
            ? '0 0 60px rgba(127, 205, 205, 0.5)'
            : '0 0 30px rgba(127, 205, 205, 0.3)',
        }}
        transition={{ duration: 4, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  )
}

// Water ripple effect
function WaterRipples() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden opacity-40">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border border-facilitator-secondary/30"
          style={{
            width: 100 + i * 200,
            height: 50 + i * 100,
          }}
          initial={{ opacity: 0.6, scale: 0.8 }}
          animate={{
            opacity: [0.6, 0.2, 0],
            scale: [0.8, 1.5, 2],
          }}
          transition={{
            duration: 6,
            delay: i * 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// Floating zen stones
function ZenStones() {
  const stones = [
    { x: '10%', y: '70%', size: 12, delay: 0 },
    { x: '85%', y: '65%', size: 8, delay: 1 },
    { x: '20%', y: '80%', size: 10, delay: 2 },
    { x: '75%', y: '75%', size: 14, delay: 0.5 },
  ]

  return (
    <>
      {stones.map((stone, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-facilitator-primary/20"
          style={{
            left: stone.x,
            top: stone.y,
            width: stone.size,
            height: stone.size,
          }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            delay: stone.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

export function Hero() {
  const language = useLanguage()
  const t = translations[language]
  const containerRef = useRef<HTMLElement>(null)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [cycleCount, setCycleCount] = useState(0)
  const [isGuideActive, setIsGuideActive] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Breath cycle: 4s inhale, 4s hold, 4s exhale
  useEffect(() => {
    const phaseDurations = { inhale: 4000, hold: 4000, exhale: 4000 }
    const phases: Array<'inhale' | 'hold' | 'exhale'> = ['inhale', 'hold', 'exhale']
    let currentPhaseIndex = 0

    const runPhase = () => {
      const currentPhase = phases[currentPhaseIndex]
      setBreathPhase(currentPhase)

      if (currentPhase === 'exhale') {
        setCycleCount((c) => c + 1)
      }

      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length
    }

    runPhase()
    const interval = setInterval(runPhase, 4000)
    return () => clearInterval(interval)
  }, [])

  const breathText = {
    inhale: language === 'de' ? 'Einatmen' : 'Breathe In',
    hold: language === 'de' ? 'Halten' : 'Hold',
    exhale: language === 'de' ? 'Ausatmen' : 'Release',
  }

  const breathInstruction = {
    inhale: language === 'de' ? 'Lass die Luft sanft fließen' : 'Let the air flow gently',
    hold: language === 'de' ? 'Ruhe in der Stille' : 'Rest in stillness',
    exhale: language === 'de' ? 'Lass alles los' : 'Let everything go',
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F0F7F7 0%, #E0EFEF 50%, #D8EBEB 100%)',
      }}
    >
      {/* Subtle organic shapes in background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-facilitator-secondary/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-facilitator-primary/10 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Zen stones */}
      <ZenStones />

      {/* Water ripples at bottom */}
      <WaterRipples />

      {/* Main breathing visualization */}
      <BreathingLotus breathPhase={breathPhase} isActive={isGuideActive} />

      {/* Content overlay */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl"
        style={{ opacity, y }}
      >
        {/* Breath phase indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={breathPhase}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-facilitator-primary text-lg md:text-xl font-light tracking-[0.5em] uppercase">
                {breathText[breathPhase]}
              </span>
              <span className="text-facilitator-text/50 text-sm tracking-wide">
                {breathInstruction[breathPhase]}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-facilitator-text leading-tight mb-6"
        >
          {t.hero.tagline.split(' ').map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2 + index * 0.15,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block mr-3 md:mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-lg md:text-xl text-facilitator-text/60 mb-4 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Credentials badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-10"
        >
          {/* M.Sc. Badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-facilitator-primary/30 rounded-full px-4 py-2">
            <span className="text-facilitator-primary text-sm font-semibold">M.Sc. Biotechnology</span>
            <span className="text-facilitator-text/50 text-xs">TU Graz (with distinction)</span>
          </div>

          {/* Goodlife Breathing badge */}
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-facilitator-secondary/20 rounded-full px-5 py-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-facilitator-secondary"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-facilitator-primary text-sm font-medium">
              GOODLIFE BREATHING {language === 'de' ? 'Gründer' : 'Founder'}
            </span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            className="relative bg-facilitator-primary text-white px-10 py-4 rounded-full font-medium overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <motion.span
              className="relative z-10 flex items-center gap-2"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3 }}
            >
              {t.hero.cta}
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-facilitator-secondary"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.button>

          <motion.button
            className="px-8 py-4 rounded-full font-medium text-facilitator-primary hover:text-facilitator-secondary transition-colors duration-500"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsGuideActive(!isGuideActive)}
          >
            {isGuideActive
              ? (language === 'de' ? 'Animation pausieren' : 'Pause Animation')
              : (language === 'de' ? 'Animation fortsetzen' : 'Resume Animation')
            }
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <span className="text-xs text-facilitator-text/40 uppercase tracking-[0.3em] font-light">
            {language === 'de' ? 'Entdecken' : 'Discover'}
          </span>
          <motion.div className="w-px h-12 bg-gradient-to-b from-facilitator-primary/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
