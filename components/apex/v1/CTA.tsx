'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { apexTranslations } from '@/lib/apex-i18n'

export function CTA() {
  const language = useLanguage()
  const t = apexTranslations[language]

  return (
    <section id="contact" className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Animated Glow Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(0, 255, 255, 0.06)' }}
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'rgba(0, 255, 255, 0.04)' }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Card Container */}
          <div className="relative p-12 md:p-16 rounded-3xl bg-[#0f0f0f] border border-white/10 overflow-hidden">
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-24 h-24">
              <div className="absolute top-4 left-4 w-12 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
              <div className="absolute top-4 left-4 w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24">
              <div className="absolute bottom-4 right-4 w-12 h-px bg-gradient-to-l from-cyan-400 to-transparent" />
              <div className="absolute bottom-4 right-4 w-px h-12 bg-gradient-to-t from-cyan-400 to-transparent" />
            </div>

            {/* Hover Glow Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.05) 0%, transparent 70%)',
              }}
            />

            {/* Content */}
            <div className="relative text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-8"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <span className="text-cyan-400 text-sm font-medium">Free Consultation</span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-bold text-white mb-6"
              >
                {t.cta.heading}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-lg max-w-xl mx-auto mb-10"
              >
                {t.cta.subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href="mailto:hello@apex-research-labs.com"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-black bg-cyan-400 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Button Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />

                  <span className="relative z-10">{t.cta.button}</span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="mt-10 flex flex-wrap justify-center items-center gap-6 text-gray-500 text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>No commitment required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>Response within 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>100% confidential</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Outer Glow Ring */}
          <motion.div
            className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(0, 255, 255, 0.1), transparent)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
