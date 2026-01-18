'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Search, Lightbulb, Code, Rocket, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { apexTranslations } from '@/lib/apex-i18n'

const processSteps = {
  en: [
    {
      number: '01',
      title: 'Discovery',
      description: 'We analyze your current processes, identify automation opportunities, and understand your unique business challenges.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Our team designs a custom AI roadmap aligned with your goals, timeline, and budget constraints.',
      icon: Lightbulb,
    },
    {
      number: '03',
      title: 'Development',
      description: 'We build and train AI models tailored to your specific use cases using cutting-edge technologies.',
      icon: Code,
    },
    {
      number: '04',
      title: 'Deployment',
      description: 'Seamless integration into your existing systems with comprehensive testing and validation.',
      icon: Rocket,
    },
    {
      number: '05',
      title: 'Optimization',
      description: 'Continuous monitoring, improvements, and scaling based on real-world performance data.',
      icon: CheckCircle,
    },
  ],
  de: [
    {
      number: '01',
      title: 'Analyse',
      description: 'Wir analysieren Ihre aktuellen Prozesse, identifizieren Automatisierungsmoglichkeiten und verstehen Ihre einzigartigen Geschaftsherausforderungen.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Strategie',
      description: 'Unser Team entwirft eine individuelle KI-Roadmap, die auf Ihre Ziele, Zeitplane und Budgetvorgaben abgestimmt ist.',
      icon: Lightbulb,
    },
    {
      number: '03',
      title: 'Entwicklung',
      description: 'Wir erstellen und trainieren KI-Modelle, die auf Ihre spezifischen Anwendungsfalle zugeschnitten sind.',
      icon: Code,
    },
    {
      number: '04',
      title: 'Bereitstellung',
      description: 'Nahtlose Integration in Ihre bestehenden Systeme mit umfassenden Tests und Validierung.',
      icon: Rocket,
    },
    {
      number: '05',
      title: 'Optimierung',
      description: 'Kontinuierliche Uberwachung, Verbesserungen und Skalierung basierend auf realen Leistungsdaten.',
      icon: CheckCircle,
    },
  ],
}

export function Process() {
  const language = useLanguage()
  const steps = processSteps[language]
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-950">
        {/* Gradient mesh */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6"
          >
            {language === 'en' ? 'Our Process' : 'Unser Prozess'}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">
              {language === 'en' ? 'How We ' : 'Wie Wir '}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              {language === 'en' ? 'Work' : 'Arbeiten'}
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {language === 'en'
              ? 'A proven methodology that transforms your vision into reality'
              : 'Eine bewahrte Methodik, die Ihre Vision in die Realitat umsetzt'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 md:-translate-x-1/2 -translate-x-1/2">
                  <motion.div
                    className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(139, 92, 246, 0.4)',
                        '0 0 0 15px rgba(139, 92, 246, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </div>

                {/* Content card */}
                <div className={`pl-20 md:pl-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <step.icon className="w-7 h-7 text-purple-400" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
