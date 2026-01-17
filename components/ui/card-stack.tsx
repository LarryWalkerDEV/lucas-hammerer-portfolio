'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CardItem {
  id: string
  title: string
  description: string
  image?: string
  icon?: React.ReactNode
}

interface CardStackProps {
  cards: CardItem[]
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator'
  className?: string
}

export function CardStack({ cards, variant = 'explorer', className }: CardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const variantStyles = {
    explorer: {
      card: 'bg-white border-explorer-primary/10 hover:border-explorer-primary/30',
      cardActive: 'bg-explorer-primary text-white',
      title: 'text-explorer-text',
      description: 'text-explorer-text/70',
      icon: 'text-explorer-primary',
    },
    scientist: {
      card: 'bg-white border-scientist-primary/10 hover:border-scientist-secondary/30',
      cardActive: 'bg-scientist-secondary text-white',
      title: 'text-scientist-text',
      description: 'text-scientist-text/70',
      icon: 'text-scientist-secondary',
    },
    adventurer: {
      card: 'bg-adventurer-secondary border-white/10 hover:border-adventurer-accent/30',
      cardActive: 'bg-adventurer-accent text-white',
      title: 'text-adventurer-text',
      description: 'text-adventurer-text/70',
      icon: 'text-adventurer-accent',
    },
    facilitator: {
      card: 'bg-white border-facilitator-primary/10 hover:border-facilitator-primary/30',
      cardActive: 'bg-facilitator-primary text-white',
      title: 'text-facilitator-text',
      description: 'text-facilitator-text/70',
      icon: 'text-facilitator-accent',
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className={cn('grid md:grid-cols-3 gap-6', className)}>
      {cards.map((card, index) => {
        const isActive = activeIndex === index

        return (
          <motion.div
            key={card.id}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'relative p-6 md:p-8 rounded-2xl border cursor-pointer transition-all duration-300',
              isActive ? styles.cardActive : styles.card
            )}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            layout
          >
            {card.image && (
              <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/20"
                  />
                )}
              </div>
            )}

            {card.icon && (
              <div className={cn('mb-4', isActive ? 'text-white' : styles.icon)}>
                {card.icon}
              </div>
            )}

            <h3 className={cn(
              'text-xl md:text-2xl font-medium mb-2',
              isActive ? 'text-white' : styles.title
            )}>
              {card.title}
            </h3>

            <p className={cn(
              'leading-relaxed',
              isActive ? 'text-white/80' : styles.description
            )}>
              {card.description}
            </p>

            <motion.div
              className="mt-4 flex items-center gap-2 font-medium"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
            >
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
