'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  id: string
  number: string
  title: string
  content: string
  features?: string[]
}

interface AccordionProps {
  items: AccordionItem[]
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator'
  className?: string
}

export function Accordion({ items, variant = 'explorer', className }: AccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id || null)

  const variantStyles = {
    explorer: {
      border: 'border-explorer-primary/20',
      number: 'bg-explorer-primary text-white',
      numberInactive: 'bg-explorer-secondary/10 text-explorer-secondary',
      title: 'text-explorer-text',
      content: 'text-explorer-text/70',
      line: 'bg-explorer-primary',
    },
    scientist: {
      border: 'border-scientist-primary/10',
      number: 'bg-scientist-secondary text-white',
      numberInactive: 'bg-scientist-primary/5 text-scientist-primary/50',
      title: 'text-scientist-text',
      content: 'text-scientist-text/70',
      line: 'bg-scientist-secondary',
    },
    adventurer: {
      border: 'border-white/10',
      number: 'bg-adventurer-accent text-white',
      numberInactive: 'bg-white/5 text-white/50',
      title: 'text-adventurer-text',
      content: 'text-adventurer-text/70',
      line: 'bg-adventurer-accent',
    },
    facilitator: {
      border: 'border-facilitator-primary/20',
      number: 'bg-facilitator-accent text-white',
      numberInactive: 'bg-facilitator-primary/10 text-facilitator-primary/50',
      title: 'text-facilitator-text',
      content: 'text-facilitator-text/70',
      line: 'bg-facilitator-primary',
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className={cn('w-full max-w-2xl', className)}>
      {items.map((item) => {
        const isActive = activeId === item.id

        return (
          <div key={item.id} className={cn('border-b', styles.border)}>
            <motion.button
              onClick={() => setActiveId(isActive ? null : item.id)}
              className="w-full py-6 flex items-center gap-6 group"
              initial={false}
            >
              {/* Number */}
              <motion.div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  isActive ? styles.number : styles.numberInactive
                )}
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
              >
                {item.number}
              </motion.div>

              {/* Title */}
              <motion.h3
                className={cn(
                  'flex-1 text-left text-xl md:text-2xl font-medium transition-all',
                  styles.title
                )}
                animate={{
                  x: isActive ? 4 : 0,
                }}
              >
                {item.title}
              </motion.h3>

              {/* Icon */}
              <motion.div
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {isActive ? (
                  <Minus className={cn('w-6 h-6', styles.title)} />
                ) : (
                  <Plus className={cn('w-6 h-6 opacity-50', styles.title)} />
                )}
              </motion.div>
            </motion.button>

            {/* Content */}
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2, delay: 0.1 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.1 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pl-18 pb-6">
                    <div className={cn('ml-[72px]', styles.content)}>
                      <p className="leading-relaxed mb-4">{item.content}</p>
                      {item.features && (
                        <ul className="grid grid-cols-2 gap-2 mt-4">
                          {item.features.map((feature, index) => (
                            <motion.li
                              key={feature}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div className={cn('w-1.5 h-1.5 rounded-full', styles.line)} />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated Line */}
            <motion.div
              className={cn('h-0.5 origin-left', styles.line)}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
        )
      })}
    </div>
  )
}
