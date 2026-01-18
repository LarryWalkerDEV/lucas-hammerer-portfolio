'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Cog, Clock, ThumbsUp } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { apexTranslations } from '@/lib/apex-i18n'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const statsData = [
  { value: 150, suffix: '+', icon: Users, key: 'clients' },
  { value: 500, suffix: '+', icon: Cog, key: 'automations' },
  { value: 2, suffix: 'M+', icon: Clock, key: 'hoursaved' },
  { value: 98, suffix: '%', icon: ThumbsUp, key: 'satisfaction' },
]

export function Stats() {
  const language = useLanguage()
  const t = apexTranslations[language]

  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'rgba(0, 255, 255, 0.03)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon
            const label = t.stats[stat.key as keyof typeof t.stats]

            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative p-8 rounded-2xl bg-[#0f0f0f] border border-white/5 text-center overflow-hidden hover:border-cyan-400/20 transition-all duration-500">
                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.08) 0%, transparent 70%)',
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="inline-flex p-3 rounded-xl bg-cyan-400/5 border border-cyan-400/20 mb-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <IconComponent className="w-6 h-6 text-cyan-400" />
                  </motion.div>

                  {/* Number */}
                  <div className="relative">
                    <motion.div
                      className="text-4xl md:text-5xl font-bold text-white mb-2"
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                    >
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    </motion.div>

                    {/* Glow Effect Behind Number */}
                    <div className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                      <div className="text-4xl md:text-5xl font-bold text-cyan-400">
                        {stat.value}{stat.suffix}
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">
                    {label}
                  </p>

                  {/* Bottom Accent Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-cyan-400/10 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-cyan-400/10 rounded-br-3xl" />
      </div>
    </section>
  )
}
