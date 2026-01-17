'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, delay: 0.5 })
    return controls.stop
  }, [count, value])

  return (
    <motion.span>
      {rounded.get()}{suffix}
    </motion.span>
  )
}

export function About() {
  const language = useLanguage()
  const t = translations[language]

  const stats = [
    { value: 2015, label: language === 'de' ? 'M.Sc. abgeschlossen' : 'M.Sc. Completed', suffix: '' },
    { value: 500, label: language === 'de' ? 'Workshops geleitet' : 'Workshops Led', suffix: '+' },
    { value: 10000, label: language === 'de' ? 'Fotos aufgenommen' : 'Photos Captured', suffix: '+' },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-scientist-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-scientist-primary/5">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('/images/lucas-about.webp')`,
                  backgroundColor: '#1A1A2E',
                }}
              />
            </div>

            {/* Stats overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl"
            >
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-scientist-secondary">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-scientist-text/60 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-scientist-secondary uppercase tracking-[0.2em] text-sm font-medium">
              {language === 'de' ? 'Über mich' : 'About'}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-scientist-text mt-4 mb-6">
              {t.about.heading}
            </h2>

            <p className="text-lg text-scientist-text/70 leading-relaxed mb-8">
              {t.about.intro}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: language === 'de' ? 'Sales Leadership' : 'Sales Leadership', desc: language === 'de' ? 'Key Account @ Baufeld-Austria' : 'Key Account @ Baufeld-Austria' },
                { title: 'Breathwork', desc: language === 'de' ? 'Goodlife Breathing seit 2021' : 'Goodlife Breathing since 2021' },
                { title: language === 'de' ? 'Fotografie' : 'Photography', desc: language === 'de' ? 'Luke Goodlife seit 2020' : 'Luke Goodlife since 2020' },
                { title: language === 'de' ? 'Wissenschaft' : 'Science', desc: 'M.Sc. Biotechnology, TU Graz' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-scientist-primary/5 rounded-lg"
                >
                  <h3 className="font-medium text-scientist-text">{item.title}</h3>
                  <p className="text-sm text-scientist-text/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
