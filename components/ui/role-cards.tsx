'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { Building2, Wind, Camera, GraduationCap, Briefcase } from 'lucide-react'

// Animation phase type
type AnimationPhase = 'scatter' | 'line' | 'circle'

// Card dimensions
const CARD_WIDTH = 80
const CARD_HEIGHT = 110

interface RoleData {
  id: string
  title: string
  titleDe: string
  icon: React.ElementType
  color: string
  bgGradient: string
}

const ROLES: RoleData[] = [
  {
    id: 'scientist',
    title: 'Scientist',
    titleDe: 'Wissenschaftler',
    icon: GraduationCap,
    color: '#4A90A4',
    bgGradient: 'from-scientist-secondary/20 to-scientist-secondary/5',
  },
  {
    id: 'facilitator',
    title: 'Breathwork',
    titleDe: 'Breathwork',
    icon: Wind,
    color: '#E94560',
    bgGradient: 'from-scientist-accent/20 to-scientist-accent/5',
  },
  {
    id: 'photographer',
    title: 'Photographer',
    titleDe: 'Fotograf',
    icon: Camera,
    color: '#1A1A2E',
    bgGradient: 'from-scientist-primary/20 to-scientist-primary/5',
  },
  {
    id: 'sales',
    title: 'Sales Lead',
    titleDe: 'Sales Lead',
    icon: Building2,
    color: '#22c55e',
    bgGradient: 'from-green-500/20 to-green-500/5',
  },
  {
    id: 'account',
    title: 'Key Account',
    titleDe: 'Key Account',
    icon: Briefcase,
    color: '#6366f1',
    bgGradient: 'from-indigo-500/20 to-indigo-500/5',
  },
]

// RoleCard component
function RoleCard({
  role,
  index,
  total,
  target,
}: {
  role: RoleData
  index: number
  total: number
  target: { x: number; y: number; rotation: number; scale: number; opacity: number }
}) {
  const language = useLanguage()
  const Icon = role.icon

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: 'absolute',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front Face */}
        <div
          className={`absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gradient-to-br ${role.bgGradient} border border-white/20 backdrop-blur-sm`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col items-center justify-center h-full p-2">
            <Icon className="w-8 h-8 mb-2" style={{ color: role.color }} />
            <span className="text-[9px] font-bold text-scientist-text/80 uppercase tracking-wider text-center leading-tight">
              {language === 'de' ? role.titleDe : role.title}
            </span>
          </div>
          <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-scientist-primary flex flex-col items-center justify-center p-3 border border-scientist-secondary/30"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-center">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: role.color }}
            >
              <Icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: role.color }}>
              View
            </p>
            <p className="text-[10px] font-medium text-white">Details</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Main component
export function RoleCards({ className }: { className?: string }) {
  const [phase, setPhase] = useState<AnimationPhase>('scatter')
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const language = useLanguage()

  // Container size observer
  useEffect(() => {
    if (!containerRef.current) return

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(containerRef.current)

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    })

    return () => observer.disconnect()
  }, [])

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const normalizedX = (relativeX / rect.width) * 2 - 1
      mouseX.set(normalizedX * 30)
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX])

  // Animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('line'), 300)
    const timer2 = setTimeout(() => setPhase('circle'), 1500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  // Random scatter positions
  const scatterPositions = useMemo(() => {
    return ROLES.map(() => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 300,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }))
  }, [])

  // Parallax value tracking
  const [parallaxValue, setParallaxValue] = useState(0)
  useEffect(() => {
    const unsubscribe = smoothMouseX.on('change', setParallaxValue)
    return () => unsubscribe()
  }, [smoothMouseX])

  const total = ROLES.length

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-64 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {ROLES.map((role, i) => {
          let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 }

          if (phase === 'scatter') {
            target = scatterPositions[i]
          } else if (phase === 'line') {
            const spacing = 90
            const totalWidth = total * spacing
            const lineX = i * spacing - totalWidth / 2 + spacing / 2
            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 }
          } else {
            // Circle/arc formation
            const radius = Math.min(containerSize.width * 0.35, 140)
            const spreadAngle = 180
            const startAngle = 180
            const step = spreadAngle / (total - 1)
            const angle = startAngle + i * step
            const rad = (angle * Math.PI) / 180

            target = {
              x: Math.cos(rad) * radius + parallaxValue,
              y: Math.sin(rad) * radius * 0.6,
              rotation: 0,
              scale: 1,
              opacity: 1,
            }
          }

          return (
            <RoleCard
              key={role.id}
              role={role}
              index={i}
              total={total}
              target={target}
            />
          )
        })}
      </div>

      {/* Center text that appears after animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={phase === 'circle' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute inset-x-0 bottom-4 text-center pointer-events-none"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-scientist-text/50">
          {language === 'de' ? 'Hover zum Erkunden' : 'Hover to explore'}
        </p>
      </motion.div>
    </div>
  )
}

export default RoleCards
