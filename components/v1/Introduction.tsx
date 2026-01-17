'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { Sparkles, GraduationCap, Heart, Camera } from 'lucide-react'

export function Introduction() {
  const language = useLanguage()
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const highlights = [
    {
      icon: GraduationCap,
      label: language === 'de' ? 'M.Sc. Biotechnologie' : 'M.Sc. Biotechnology',
      value: language === 'de' ? 'TU Graz (mit Auszeichnung)' : 'TU Graz (with distinction)',
      color: 'bg-explorer-primary/10 text-explorer-primary'
    },
    {
      icon: Heart,
      label: language === 'de' ? 'Gründer' : 'Founder',
      value: 'GOODLIFE BREATHING',
      color: 'bg-explorer-secondary/10 text-explorer-secondary'
    },
    {
      icon: Camera,
      label: language === 'de' ? 'Fotograf als' : 'Photographer as',
      value: 'Luke Goodlife',
      color: 'bg-explorer-accent/10 text-explorer-accent'
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-32 bg-explorer-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring', stiffness: 50 }}
            style={{ y: imageY }}
            className="relative"
          >
            {/* Main image container */}
            <motion.div
              className="aspect-[4/5] rounded-3xl overflow-hidden bg-explorer-secondary/10 shadow-2xl"
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('/images/lucas-hat.jpg')`,
                  backgroundColor: '#2D4739',
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute -top-4 -right-4 bg-explorer-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'de' ? 'Seit 2018' : 'Since 2018'}
              </span>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-40 h-40 border-4 border-explorer-accent/30 rounded-3xl -z-10"
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.02, 1, 0.98, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 bg-explorer-primary/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Content with parallax */}
          <motion.div style={{ y: contentY }}>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 text-explorer-primary uppercase tracking-[0.2em] text-sm font-medium"
              >
                <span className="w-8 h-px bg-explorer-primary/50" />
                {language === 'de' ? 'Über Mich' : 'About Me'}
              </motion.span>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-explorer-text mt-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {t.about.heading}
              </motion.h2>

              <motion.p
                className="text-lg text-explorer-text/70 leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {t.about.intro}
              </motion.p>

              {/* Enhanced highlights */}
              <div className="space-y-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-explorer-background/50 border border-transparent hover:border-explorer-primary/20 transition-all duration-300 cursor-default group"
                  >
                    <motion.div
                      className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <span className="text-explorer-text font-medium group-hover:text-explorer-primary transition-colors">
                        {item.label}
                      </span>
                      <span className="text-explorer-text/50 mx-2">•</span>
                      <span className="text-explorer-text/70">{item.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8 p-4 bg-explorer-primary/5 rounded-2xl border border-explorer-primary/10"
              >
                <p className="text-sm text-explorer-text/60 italic">
                  {language === 'de'
                    ? '"Wissenschaft und Intuition verschmelzen, um transformative Erfahrungen zu schaffen."'
                    : '"Science and intuition merge to create transformative experiences."'}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
