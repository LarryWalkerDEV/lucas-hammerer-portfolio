'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TimelineItem {
  year: string
  title: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator'
  className?: string
}

export function Timeline({ items, variant = 'explorer', className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const variantStyles = {
    explorer: {
      line: 'bg-explorer-primary/20',
      lineActive: 'bg-explorer-primary',
      dot: 'bg-explorer-primary',
      dotBg: 'bg-explorer-accent/20',
      year: 'text-explorer-primary',
      title: 'text-explorer-text',
      description: 'text-explorer-text/70',
    },
    scientist: {
      line: 'bg-scientist-primary/10',
      lineActive: 'bg-scientist-secondary',
      dot: 'bg-scientist-secondary',
      dotBg: 'bg-scientist-secondary/20',
      year: 'text-scientist-secondary',
      title: 'text-scientist-text',
      description: 'text-scientist-text/70',
    },
    adventurer: {
      line: 'bg-white/10',
      lineActive: 'bg-adventurer-accent',
      dot: 'bg-adventurer-accent',
      dotBg: 'bg-adventurer-accent/20',
      year: 'text-adventurer-accent',
      title: 'text-adventurer-text',
      description: 'text-adventurer-text/70',
    },
    facilitator: {
      line: 'bg-facilitator-primary/20',
      lineActive: 'bg-facilitator-primary',
      dot: 'bg-facilitator-accent',
      dotBg: 'bg-facilitator-secondary/30',
      year: 'text-facilitator-accent',
      title: 'text-facilitator-text',
      description: 'text-facilitator-text/70',
    },
  }

  const styles = variantStyles[variant]
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Background line */}
      <div className={cn('absolute left-4 md:left-8 top-0 bottom-0 w-0.5', styles.line)} />

      {/* Animated progress line */}
      <motion.div
        className={cn('absolute left-4 md:left-8 top-0 w-0.5 origin-top', styles.lineActive)}
        style={{ scaleY, height: '100%' }}
      />

      <div className="space-y-12 md:space-y-16">
        {items.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-12 md:pl-20"
          >
            {/* Dot */}
            <div className="absolute left-0 md:left-4">
              <motion.div
                className={cn('w-8 h-8 rounded-full flex items-center justify-center', styles.dotBg)}
                whileInView={{ scale: [0.8, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={cn('w-3 h-3 rounded-full', styles.dot)} />
              </motion.div>
            </div>

            {/* Content */}
            <div>
              <span className={cn('text-sm font-mono font-medium', styles.year)}>
                {item.year}
              </span>
              <h3 className={cn('text-xl md:text-2xl font-medium mt-1', styles.title)}>
                {item.title}
              </h3>
              <p className={cn('mt-2 leading-relaxed', styles.description)}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
