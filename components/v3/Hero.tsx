'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { Compass, Mountain, Wind, Camera, MapPin } from 'lucide-react'

// Animated mountain silhouette layer
function MountainLayer({
  className,
  delay,
  yOffset,
  color
}: {
  className?: string
  delay: number
  yOffset: number
  color: string
}) {
  const path = `M0,${100 - yOffset}
    Q50,${60 - yOffset} 100,${80 - yOffset}
    T200,${50 - yOffset}
    T300,${70 - yOffset}
    T400,${40 - yOffset}
    T500,${65 - yOffset}
    T600,${35 - yOffset}
    T700,${55 - yOffset}
    T800,${30 - yOffset}
    L800,100 L0,100 Z`

  return (
    <motion.svg
      viewBox="0 0 800 100"
      className={`absolute bottom-0 left-0 w-full ${className}`}
      preserveAspectRatio="none"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: 'easeOut' }}
    >
      <motion.path
        d={path}
        fill={color}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.3, duration: 2 }}
      />
    </motion.svg>
  )
}

// Animated compass decoration
function CompassRose({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
      animate={{ opacity: 0.15, rotate: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 1.5, type: 'spring' }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="relative"
      >
        <svg width="200" height="200" viewBox="0 0 200 200" className="text-adventurer-accent">
          {/* Outer ring */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

          {/* Cardinal directions */}
          {[0, 90, 180, 270].map((angle, i) => (
            <g key={angle} transform={`rotate(${angle} 100 100)`}>
              <line x1="100" y1="10" x2="100" y2="30" stroke="currentColor" strokeWidth="2" />
              <text
                x="100"
                y="45"
                textAnchor="middle"
                fill="currentColor"
                fontSize="12"
                fontWeight="bold"
              >
                {['N', 'E', 'S', 'W'][i]}
              </text>
            </g>
          ))}

          {/* Degree marks */}
          {[...Array(36)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="5"
              x2="100"
              y2={i % 3 === 0 ? 15 : 10}
              stroke="currentColor"
              strokeWidth={i % 3 === 0 ? 1 : 0.5}
              opacity={i % 3 === 0 ? 0.5 : 0.3}
              transform={`rotate(${i * 10} 100 100)`}
            />
          ))}

          {/* Compass needle */}
          <polygon
            points="100,20 95,100 100,90 105,100"
            fill="currentColor"
            opacity="0.8"
          />
          <polygon
            points="100,180 95,100 100,110 105,100"
            fill="currentColor"
            opacity="0.3"
          />

          {/* Center circle */}
          <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.6" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// Topographic contour lines background
function TopographicLines() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="topo-lines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {[...Array(5)].map((_, i) => (
              <ellipse
                key={i}
                cx="50"
                cy="50"
                rx={20 + i * 15}
                ry={15 + i * 12}
                fill="none"
                stroke="#FF6B35"
                strokeWidth="0.5"
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-lines)" />
      </svg>
    </div>
  )
}

// Floating coordinate markers
function CoordinateMarker({ x, y, label, delay }: { x: string; y: string; label: string; delay: number }) {
  return (
    <motion.div
      className="absolute flex items-center gap-2 text-adventurer-accent/30"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
    >
      <MapPin className="w-3 h-3" />
      <span className="text-xs font-mono tracking-wider">{label}</span>
    </motion.div>
  )
}

// Animated grid overlay
function AdventureGrid() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 107, 53, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 107, 53, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </motion.div>
  )
}

// Parallax stars/particles
function StarField() {
  const stars = [...Array(50)].map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 60,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-adventurer-text"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: star.delay,
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const mountainY1 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const mountainY2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const mountainY3 = useTransform(scrollYProgress, [0, 1], [0, 150])

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX / innerWidth - 0.5) * 30)
      mouseY.set((clientY / innerHeight - 0.5) * 30)
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const expertiseAreas = [
    { icon: Mountain, label: language === 'de' ? 'Abenteuer' : 'Adventure' },
    { icon: Wind, label: language === 'de' ? 'Atemarbeit' : 'Breathwork' },
    { icon: Camera, label: language === 'de' ? 'Fotografie' : 'Photography' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-adventurer-primary"
    >
      {/* Star field background */}
      <StarField />

      {/* Topographic pattern */}
      <TopographicLines />

      {/* Grid overlay */}
      <AdventureGrid />

      {/* Compass decoration */}
      <CompassRose className="top-20 right-20 hidden lg:block" />

      {/* Coordinate markers */}
      <CoordinateMarker x="10%" y="20%" label="47.0707 N" delay={2} />
      <CoordinateMarker x="85%" y="70%" label="15.4395 E" delay={2.3} />

      {/* Parallax mountain layers */}
      <motion.div className="absolute inset-0 z-10" style={{ y: mountainY3 }}>
        <MountainLayer
          delay={0.3}
          yOffset={10}
          color="rgba(26, 26, 26, 0.3)"
          className="h-40"
        />
      </motion.div>
      <motion.div className="absolute inset-0 z-20" style={{ y: mountainY2 }}>
        <MountainLayer
          delay={0.6}
          yOffset={20}
          color="rgba(26, 26, 26, 0.6)"
          className="h-48"
        />
      </motion.div>
      <motion.div className="absolute inset-0 z-30" style={{ y: mountainY1 }}>
        <MountainLayer
          delay={0.9}
          yOffset={30}
          color="#1A1A1A"
          className="h-56"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-adventurer-primary via-transparent to-adventurer-primary/50 z-[35]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_70%)] z-[36]" />

      {/* Content */}
      <motion.div
        className="relative z-40 text-center px-4 max-w-5xl"
        style={{ opacity, x: springX, y: springY }}
      >
        {/* Explorer badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 100 }}
          className="inline-flex flex-col items-center gap-3 mb-8"
        >
          <div className="inline-flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Compass className="w-5 h-5 text-adventurer-accent" />
            </motion.div>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-adventurer-accent to-transparent" />
            <span className="text-adventurer-text/60 text-sm uppercase tracking-[0.4em] font-light">
              Lucas Hammerer
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-adventurer-accent to-transparent" />
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <Compass className="w-5 h-5 text-adventurer-accent" />
            </motion.div>
          </div>
          {/* Education Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, type: 'spring', stiffness: 100 }}
            className="flex items-center gap-2 px-4 py-1.5 bg-adventurer-secondary/80 border border-adventurer-accent/30 rounded-full backdrop-blur-sm"
          >
            <span className="text-adventurer-accent text-xs font-medium tracking-wide">
              M.Sc. Biotechnology
            </span>
            <span className="text-adventurer-text/40 text-xs">|</span>
            <span className="text-adventurer-text/50 text-xs">
              TU Graz (with distinction)
            </span>
          </motion.div>
        </motion.div>

        {/* Main headline with staggered reveal */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black text-adventurer-text leading-[0.9] tracking-tight"
          >
            {t.hero.tagline.split(' ').map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="inline-block mr-4 md:mr-6"
                initial={{ y: 100, opacity: 0, rotateX: -45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  delay: 1.5 + index * 0.15,
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="h-1 w-32 mx-auto bg-gradient-to-r from-adventurer-accent via-adventurer-highlight to-adventurer-accent mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="text-lg md:text-xl text-adventurer-text/50 mb-10 max-w-2xl mx-auto font-light tracking-wide"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Expertise icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          className="flex items-center justify-center gap-8 md:gap-12 mb-12"
        >
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.label}
              className="flex flex-col items-center gap-3 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-adventurer-secondary/50 border border-adventurer-accent/20 flex items-center justify-center group-hover:bg-adventurer-accent/20 group-hover:border-adventurer-accent/50 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ rotate: 5 }}
              >
                <area.icon className="w-6 h-6 text-adventurer-accent" />
              </motion.div>
              <span className="text-xs text-adventurer-text/40 uppercase tracking-[0.2em] group-hover:text-adventurer-accent transition-colors">
                {area.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            className="relative overflow-hidden bg-adventurer-accent text-adventurer-primary px-10 py-4 font-bold uppercase tracking-[0.2em] text-sm group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="relative z-10">{t.hero.cta}</span>
            <motion.div
              className="absolute inset-0 bg-adventurer-highlight"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="px-10 py-4 font-medium uppercase tracking-[0.2em] text-sm border border-adventurer-text/20 text-adventurer-text/70 hover:border-adventurer-accent hover:text-adventurer-accent transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {language === 'de' ? 'Entdecken' : 'Explore'}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="text-[10px] text-adventurer-text/30 uppercase tracking-[0.4em] font-mono">
            {language === 'de' ? 'Scroll' : 'Scroll'}
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-adventurer-accent via-adventurer-accent/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-px bg-adventurer-accent/50" />
          <div className="w-2 h-2 border border-adventurer-accent/50 rotate-45" />
        </div>
        <div className="w-px h-8 bg-adventurer-accent/50 mt-2" />
      </div>
      <div className="absolute top-8 right-8 z-40">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 border border-adventurer-accent/50 rotate-45" />
          <div className="w-8 h-px bg-adventurer-accent/50" />
        </div>
        <div className="w-px h-8 bg-adventurer-accent/50 mt-2 ml-auto" />
      </div>
      <div className="absolute bottom-8 left-8 z-40 hidden md:block">
        <div className="w-px h-8 bg-adventurer-accent/50 mb-2" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-px bg-adventurer-accent/50" />
          <div className="w-2 h-2 border border-adventurer-accent/50 rotate-45" />
        </div>
      </div>
      <div className="absolute bottom-8 right-8 z-40 hidden md:block">
        <div className="w-px h-8 bg-adventurer-accent/50 mb-2 ml-auto" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 border border-adventurer-accent/50 rotate-45" />
          <div className="w-8 h-px bg-adventurer-accent/50" />
        </div>
      </div>

      {/* Version indicator */}
      <div className="absolute bottom-8 right-8 z-40 text-[10px] text-adventurer-text/20 font-mono tracking-wider hidden md:block">
        v3.0 // ADVENTURER
      </div>
    </section>
  )
}
