'use client'

import { motion } from 'framer-motion'
import { Workflow, Plug, Code, MessageSquare, Check } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { apexTranslations } from '@/lib/apex-i18n'

const serviceIcons = [Workflow, Plug, Code, MessageSquare]

export function Services() {
  const language = useLanguage()
  const t = apexTranslations[language]

  return (
    <section id="services" className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-6"
          >
            <span className="text-cyan-400 text-sm font-medium">{t.services.heading}</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.services.heading}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.services.items.map((service, index) => {
            const IconComponent = serviceIcons[index] || Workflow
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-8 rounded-2xl bg-[#0f0f0f] border border-white/5 overflow-hidden transition-all duration-500 hover:border-cyan-400/30">
                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
                    }}
                  />

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute top-0 right-0 w-full h-full"
                      style={{
                        background: 'linear-gradient(225deg, rgba(0, 255, 255, 0.2) 0%, transparent 50%)',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-6 inline-flex p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/5 transition-all duration-500"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-500" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + featureIndex * 0.1 }}
                          className="flex items-center gap-3 text-gray-500 group-hover:text-gray-400 transition-colors"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                            <Check className="w-3 h-3 text-cyan-400" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Glow Line */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                    initial={{ width: 0 }}
                    whileHover={{ width: '80%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
