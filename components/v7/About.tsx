'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Beaker, Award, Briefcase, Heart, Target, Users } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'

export function About() {
  const language = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const stats = [
    {
      value: '500+',
      label: language === 'de' ? 'Teilnehmer' : 'Participants',
      description: language === 'de' ? 'in Breathwork Sessions' : 'in Breathwork Sessions',
    },
    {
      value: '10+',
      label: language === 'de' ? 'Jahre Erfahrung' : 'Years Experience',
      description: language === 'de' ? 'in Sales & Business' : 'in Sales & Business',
    },
    {
      value: '2021',
      label: 'GOODLIFE BREATHING',
      description: language === 'de' ? 'Gegrundet' : 'Founded',
    },
  ]

  const qualities = [
    {
      icon: Beaker,
      title: language === 'de' ? 'Wissenschaftlich fundiert' : 'Science-Based',
      description: language === 'de'
        ? 'M.Sc. Biotechnologie mit Auszeichnung - analytisches Denken trifft Praxis.'
        : 'M.Sc. Biotechnology with distinction - analytical thinking meets practice.',
    },
    {
      icon: Target,
      title: language === 'de' ? 'Ergebnisorientiert' : 'Results-Oriented',
      description: language === 'de'
        ? 'Nachweisbare Erfolge in Sales, Transformation und Kreativprojekten.'
        : 'Proven success in sales, transformation, and creative projects.',
    },
    {
      icon: Heart,
      title: language === 'de' ? 'Mit Leidenschaft' : 'Passion-Driven',
      description: language === 'de'
        ? 'Authentische Begeisterung fur Wellness, Fotografie und Business.'
        : 'Authentic enthusiasm for wellness, photography, and business.',
    },
  ]

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 md:py-32 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#d4af37]/3 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{ y: imageY }}
            >
              <Image
                src="/images/lucas-hat.jpg"
                alt="Lucas Hammerer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent" />
            </motion.div>

            {/* Decorative frame */}
            <motion.div
              className="absolute -inset-4 border-2 border-[#d4af37]/20 rounded-3xl -z-10"
              animate={{
                borderColor: ['rgba(212, 175, 55, 0.2)', 'rgba(212, 175, 55, 0.4)', 'rgba(212, 175, 55, 0.2)'],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Stats badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-[#1a1a2e]/90 backdrop-blur-sm border border-[#d4af37]/30 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-[#d4af37]/20 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Award className="w-7 h-7 text-[#d4af37]" />
                </motion.div>
                <div>
                  <p className="text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1">TU Graz</p>
                  <p className="text-white text-sm font-medium">M.Sc. Biotechnology</p>
                  <p className="text-white/50 text-xs">{language === 'de' ? 'Mit Auszeichnung' : 'With Distinction'}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-block text-[#d4af37] uppercase tracking-[0.25em] text-sm font-medium mb-4">
                {language === 'de' ? 'Uber mich' : 'About Me'}
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
                {language === 'de'
                  ? 'Wissenschaft trifft Leidenschaft'
                  : 'Science Meets Passion'}
              </h2>
            </motion.div>

            {/* Bio paragraphs */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6 text-white/70 leading-relaxed"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg"
              >
                {language === 'de'
                  ? 'Mit einem M.Sc. in Biotechnologie (mit Auszeichnung) von der TU Graz bringe ich analytische Prazision in alles, was ich tue - ob im Business, in der Breathwork-Praxis oder hinter der Kamera.'
                  : 'With an M.Sc. in Biotechnology (with distinction) from TU Graz, I bring analytical precision to everything I do - whether in business, breathwork practice, or behind the camera.'}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {language === 'de'
                  ? 'Aktuell leite ich als Sales Lead bei Baufeld-Austria GmbH Key Accounts im Bereich Material Flow Management. Parallel dazu fuhre ich Menschen durch transformative Atemerlebnisse mit GOODLIFE BREATHING und fange authentische Momente als Fotograf ein.'
                  : 'Currently leading key accounts at Baufeld-Austria GmbH in material flow management. In parallel, I guide people through transformative breathing experiences with GOODLIFE BREATHING and capture authentic moments as a photographer.'}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {language === 'de'
                  ? 'Diese einzigartige Kombination aus wissenschaftlichem Denken, Business-Expertise und kreativer Ausdruckskraft ermoglicht mir, Menschen und Unternehmen auf ihrem Weg zu begleiten.'
                  : 'This unique combination of scientific thinking, business expertise, and creative expression allows me to accompany people and companies on their journey.'}
              </motion.p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8 pl-6 border-l-2 border-[#d4af37]"
            >
              <p className="text-xl font-display italic text-white/80">
                {language === 'de'
                  ? '"Entfalte dein volles Potenzial durch Breathwork."'
                  : '"Explore your full potential through Breathwork."'}
              </p>
              <cite className="text-[#d4af37] text-sm font-medium mt-2 block not-italic">
                - GOODLIFE BREATHING
              </cite>
            </motion.blockquote>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="text-center p-8 bg-white/5 backdrop-blur-sm border border-[#d4af37]/10 rounded-2xl hover:border-[#d4af37]/30 transition-colors duration-300"
            >
              <motion.p
                className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-white font-medium mb-1">{stat.label}</p>
              <p className="text-white/50 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Qualities grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h3 className="text-center text-xl font-display font-semibold text-white mb-12">
            {language === 'de' ? 'Was mich auszeichnet' : 'What Sets Me Apart'}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {qualities.map((quality, index) => {
              const Icon = quality.icon
              return (
                <motion.div
                  key={quality.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
                  className="group"
                >
                  <motion.div
                    className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-[#d4af37]/10 h-full hover:border-[#d4af37]/30 transition-colors duration-300"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mb-6"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-7 h-7 text-[#d4af37]" />
                    </motion.div>

                    <h4 className="text-lg font-semibold text-white mb-3">
                      {quality.title}
                    </h4>

                    <p className="text-white/60 leading-relaxed text-sm">
                      {quality.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
