'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  image?: string;
  status?: 'completed' | 'current' | 'upcoming';
  category?: string;
}

interface ModernTimelineProps {
  items: TimelineItem[];
  className?: string;
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}

const variantStyles = {
  explorer: {
    line: 'bg-explorer-primary',
    card: 'bg-explorer-background/80 border-explorer-primary/20',
    cardHover: 'hover:border-explorer-primary/40',
    title: 'text-explorer-text group-hover:text-explorer-primary',
    progress: {
      completed: 'bg-explorer-secondary',
      current: 'bg-explorer-primary',
      upcoming: 'bg-explorer-accent',
    },
    badge: {
      completed: 'bg-explorer-secondary/10 text-explorer-secondary',
      current: 'bg-explorer-primary/10 text-explorer-primary',
      upcoming: 'bg-explorer-accent/10 text-explorer-accent',
    },
  },
  scientist: {
    line: 'bg-scientist-primary',
    card: 'bg-white/80 border-scientist-primary/10',
    cardHover: 'hover:border-scientist-secondary/40',
    title: 'text-scientist-text group-hover:text-scientist-secondary',
    progress: {
      completed: 'bg-green-500',
      current: 'bg-scientist-secondary',
      upcoming: 'bg-scientist-accent',
    },
    badge: {
      completed: 'bg-green-100 text-green-800',
      current: 'bg-blue-100 text-blue-800',
      upcoming: 'bg-amber-100 text-amber-800',
    },
  },
  adventurer: {
    line: 'bg-adventurer-accent',
    card: 'bg-adventurer-secondary/50 border-adventurer-accent/20',
    cardHover: 'hover:border-adventurer-accent/40',
    title: 'text-adventurer-text group-hover:text-adventurer-accent',
    progress: {
      completed: 'bg-adventurer-highlight',
      current: 'bg-adventurer-accent',
      upcoming: 'bg-adventurer-text/30',
    },
    badge: {
      completed: 'bg-adventurer-highlight/20 text-adventurer-highlight',
      current: 'bg-adventurer-accent/20 text-adventurer-accent',
      upcoming: 'bg-adventurer-text/10 text-adventurer-text/60',
    },
  },
  facilitator: {
    line: 'bg-facilitator-primary',
    card: 'bg-white/80 border-facilitator-primary/20',
    cardHover: 'hover:border-facilitator-primary/40',
    title: 'text-facilitator-text group-hover:text-facilitator-primary',
    progress: {
      completed: 'bg-green-500',
      current: 'bg-facilitator-primary',
      upcoming: 'bg-facilitator-accent',
    },
    badge: {
      completed: 'bg-green-100 text-green-800',
      current: 'bg-facilitator-primary/10 text-facilitator-primary',
      upcoming: 'bg-facilitator-accent/10 text-facilitator-accent',
    },
  },
};

const getStatusIcon = (status: TimelineItem['status']) => {
  switch (status) {
    case 'completed':
      return CheckCircle;
    case 'current':
      return Clock;
    default:
      return Circle;
  }
};

export function ModernTimeline({ items, className, variant = 'adventurer' }: ModernTimelineProps) {
  const styles = variantStyles[variant];

  if (!items || items.length === 0) {
    return (
      <div className={cn('w-full max-w-4xl mx-auto px-4 py-8', className)}>
        <p className="text-center text-muted-foreground">No timeline items to display</p>
      </div>
    );
  }

  return (
    <section className={cn('w-full max-w-4xl mx-auto px-4 sm:px-6 py-8', className)}>
      <div className="relative">
        {/* Background line */}
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />

        {/* Animated progress line */}
        <motion.div
          className={cn('absolute left-4 sm:left-6 top-0 w-px origin-top', styles.line)}
          initial={{ scaleY: 0 }}
          whileInView={{
            scaleY: 1,
            transition: {
              duration: 1.2,
              ease: 'easeOut',
              delay: 0.2,
            },
          }}
          viewport={{ once: true }}
        />

        <div className="space-y-8 sm:space-y-12 relative">
          {items.map((item, index) => {
            const IconComponent = getStatusIcon(item.status);
            const statusKey = item.status || 'upcoming';

            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }}
                viewport={{ once: true, margin: '-30px' }}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Avatar / Icon */}
                  <motion.div
                    className="relative flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-background shadow-lg relative z-10">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/70" />
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className="flex-1 min-w-0"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={cn(
                        'border transition-all duration-300 hover:shadow-md relative rounded-xl backdrop-blur-sm p-4 sm:p-6',
                        styles.card,
                        styles.cardHover
                      )}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3
                            className={cn(
                              'text-lg sm:text-xl font-semibold mb-1 transition-colors duration-300',
                              styles.title
                            )}
                          >
                            {item.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            {item.category && <span className="font-medium">{item.category}</span>}
                            {item.category && item.date && (
                              <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                            )}
                            {item.date && <time dateTime={item.date}>{item.date}</time>}
                          </div>
                        </div>

                        <span
                          className={cn(
                            'w-fit text-xs font-medium px-2.5 py-0.5 rounded-full border border-current/20',
                            styles.badge[statusKey]
                          )}
                        >
                          {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Progress bar */}
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={cn('h-full rounded-full', styles.progress[statusKey])}
                          initial={{ width: 0 }}
                          animate={{
                            width:
                              item.status === 'completed'
                                ? '100%'
                                : item.status === 'current'
                                ? '65%'
                                : '25%',
                          }}
                          transition={{
                            duration: 1.2,
                            delay: index * 0.2 + 0.8,
                            ease: 'easeOut',
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* End dot */}
        <motion.div
          className="absolute left-4 sm:left-6 -bottom-6 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.4,
              delay: items.length * 0.1 + 0.3,
              type: 'spring',
              stiffness: 400,
            },
          }}
          viewport={{ once: true }}
        >
          <div className={cn('w-3 h-3 rounded-full shadow-sm', styles.line)} />
        </motion.div>
      </div>
    </section>
  );
}

export default ModernTimeline;
