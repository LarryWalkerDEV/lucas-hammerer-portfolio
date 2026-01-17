'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  image: string
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[]
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator'
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export function AnimatedTestimonials({
  testimonials,
  variant = 'explorer',
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: AnimatedTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, testimonials.length])

  const variantStyles = {
    explorer: {
      bg: 'bg-explorer-background',
      card: 'bg-white border-explorer-primary/10',
      text: 'text-explorer-text',
      accent: 'text-explorer-primary',
      button: 'bg-explorer-primary hover:bg-explorer-primary/90 text-white',
    },
    scientist: {
      bg: 'bg-scientist-background',
      card: 'bg-white border-scientist-primary/10',
      text: 'text-scientist-text',
      accent: 'text-scientist-secondary',
      button: 'bg-scientist-primary hover:bg-scientist-primary/90 text-white',
    },
    adventurer: {
      bg: 'bg-adventurer-primary',
      card: 'bg-adventurer-secondary border-white/10',
      text: 'text-adventurer-text',
      accent: 'text-adventurer-accent',
      button: 'bg-adventurer-accent hover:bg-adventurer-accent/90 text-white',
    },
    facilitator: {
      bg: 'bg-facilitator-background',
      card: 'bg-white border-facilitator-primary/10',
      text: 'text-facilitator-text',
      accent: 'text-facilitator-primary',
      button: 'bg-facilitator-accent hover:bg-facilitator-accent/90 text-white',
    },
  }

  const styles = variantStyles[variant]

  const navigate = (dir: number) => {
    setDirection(dir)
    setCurrentIndex((prev) => {
      if (dir === 1) {
        return (prev + 1) % testimonials.length
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1
    })
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div className={cn('relative', className)}>
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden min-h-[300px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full"
            >
              <div className={cn('p-8 rounded-2xl border shadow-lg', styles.card)}>
                <Quote className={cn('w-10 h-10 mb-4', styles.accent)} />
                <p className={cn('text-lg md:text-xl leading-relaxed mb-6', styles.text)}>
                  "{testimonials[currentIndex].content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className={cn('font-medium', styles.text)}>
                      {testimonials[currentIndex].name}
                    </p>
                    <p className={cn('text-sm opacity-70', styles.text)}>
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            onClick={() => navigate(-1)}
            className={cn('w-10 h-10 rounded-full flex items-center justify-center', styles.button)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentIndex
                    ? cn('w-8', styles.button)
                    : 'bg-black/20 hover:bg-black/40'
                )}
              />
            ))}
          </div>

          <motion.button
            onClick={() => navigate(1)}
            className={cn('w-10 h-10 rounded-full flex items-center justify-center', styles.button)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
