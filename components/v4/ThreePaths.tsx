'use client'

import { motion } from 'framer-motion'
import { Beaker, Wind, Camera } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

export function ThreePaths() {
  const language = useLanguage()
  const t = translations[language]

  const paths = [
    {
      icon: Beaker,
      title: t.about.scientist.title,
      description: t.about.scientist.description,
      color: 'bg-facilitator-primary',
    },
    {
      icon: Wind,
      title: t.about.facilitator.title,
      description: t.about.facilitator.description,
      color: 'bg-facilitator-accent',
    },
    {
      icon: Camera,
      title: t.about.photographer.title,
      description: t.about.photographer.description,
      color: 'bg-facilitator-secondary',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background organic shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-facilitator-secondary/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-facilitator-accent uppercase tracking-[0.2em] text-sm font-medium">
            {language === 'de' ? 'Drei Wege' : 'Three Paths'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-facilitator-text mt-4">
            {language === 'de' ? 'Eine Reise, Drei Perspektiven' : 'One Journey, Three Perspectives'}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {paths.map((path, index) => {
            const Icon = path.icon
            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <motion.div
                  className="relative p-8 rounded-3xl bg-white border border-facilitator-primary/10 shadow-sm hover:shadow-xl transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  {/* Icon circle */}
                  <motion.div
                    className={`w-16 h-16 rounded-full ${path.color} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-facilitator-text mb-3">
                    {path.title}
                  </h3>

                  <p className="text-facilitator-text/60 leading-relaxed">
                    {path.description}
                  </p>

                  {/* Decorative wave */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl overflow-hidden">
                    <motion.div
                      className={`h-full ${path.color}`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
