'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  number: string;
  title: string;
  content: string;
  icon?: React.ReactNode;
}

interface UniqueAccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | null;
  className?: string;
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}

const variantStyles = {
  explorer: {
    activeBg: 'bg-explorer-primary',
    activeText: 'text-explorer-background',
    hoverBg: 'bg-explorer-primary/10',
    underline: 'bg-explorer-primary',
    border: 'border-explorer-primary/20',
  },
  scientist: {
    activeBg: 'bg-scientist-primary',
    activeText: 'text-white',
    hoverBg: 'bg-scientist-primary/10',
    underline: 'bg-scientist-primary',
    border: 'border-scientist-primary/10',
  },
  adventurer: {
    activeBg: 'bg-adventurer-accent',
    activeText: 'text-adventurer-primary',
    hoverBg: 'bg-adventurer-accent/10',
    underline: 'bg-adventurer-accent',
    border: 'border-adventurer-accent/20',
  },
  facilitator: {
    activeBg: 'bg-facilitator-primary',
    activeText: 'text-white',
    hoverBg: 'bg-facilitator-primary/10',
    underline: 'bg-facilitator-primary',
    border: 'border-facilitator-primary/20',
  },
};

export function UniqueAccordion({
  items,
  defaultOpen = null,
  className,
  variant = 'adventurer'
}: UniqueAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultOpen || items[0]?.id || null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const styles = variantStyles[variant];

  return (
    <div className={cn('w-full max-w-xl', className)}>
      <div className="space-y-0">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;
          const isLast = index === items.length - 1;

          return (
            <div key={item.id}>
              <motion.button
                onClick={() => setActiveId(isActive ? null : item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-full group relative"
                initial={false}
              >
                <div className="flex items-center gap-6 py-5 px-1">
                  {/* Number with animated circle */}
                  <div className="relative flex items-center justify-center w-10 h-10">
                    <motion.div
                      className={cn('absolute inset-0 rounded-full', styles.activeBg)}
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : isHovered ? 0.85 : 0,
                        opacity: isActive ? 1 : isHovered ? 0.3 : 0,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                    <motion.span
                      className={cn(
                        'relative z-10 text-sm font-medium tracking-wide transition-colors',
                        isActive ? styles.activeText : 'text-muted-foreground'
                      )}
                    >
                      {item.number}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <motion.h3
                    className={cn(
                      'text-2xl font-medium tracking-tight transition-colors',
                      isActive || isHovered ? 'text-foreground' : 'text-muted-foreground'
                    )}
                    animate={{
                      x: isActive || isHovered ? 4 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  {/* Animated indicator */}
                  <div className="ml-auto flex items-center gap-3">
                    <motion.div
                      className="flex items-center justify-center w-8 h-8"
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-foreground"
                        animate={{
                          opacity: isActive || isHovered ? 1 : 0.4,
                        }}
                      >
                        <motion.path
                          d="M8 1V15M1 8H15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>

                {/* Underlines */}
                <motion.div
                  className={cn('absolute bottom-0 left-0 right-0 h-px', styles.border)}
                />
                <motion.div
                  className={cn('absolute bottom-0 left-0 h-px origin-left', styles.underline)}
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: isActive ? 1 : isHovered ? 0.3 : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                />
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
                    <motion.p
                      className="pl-16 pr-12 py-6 text-muted-foreground leading-relaxed"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      {item.content}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UniqueAccordion;
