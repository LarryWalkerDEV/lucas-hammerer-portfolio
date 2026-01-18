'use client'

import { motion } from 'framer-motion'
import {
  Stethoscope,
  Building2,
  Factory,
  ShoppingBag,
  Scale,
  Home,
  ArrowUpRight
} from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { apexTranslations } from '@/lib/apex-i18n'

const industryIcons = [Stethoscope, Building2, Factory, ShoppingBag, Scale, Home]

export function Solutions() {
  const language = useLanguage()
  const t = apexTranslations[language]

  return (
    <section id="solutions" className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4 uppercase tracking-wide"
          >
            {language === 'de' ? 'Branchen' : 'Industries'}
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t.solutions.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t.solutions.subtitle}
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.solutions.industries.map((industry, index) => {
            const Icon = industryIcons[index]
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-6 lg:p-8 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                  {/* Icon and Arrow */}
                  <div className="flex items-start justify-between mb-5">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-6 h-6 text-blue-600" />
                    </motion.div>
                    <motion.div
                      className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-blue-600" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {industry.description}
                  </p>

                  {/* Hover gradient */}
                  <div className="mt-5 pt-5 border-t border-gray-50 group-hover:border-blue-50 transition-colors">
                    <span className="text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {language === 'de' ? 'Mehr erfahren' : 'Learn more'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {language === 'de' ? 'Branche nicht aufgelistet?' : "Don't see your industry?"}
              </h3>
              <p className="text-gray-600">
                {language === 'de'
                  ? 'Wir entwickeln individuelle Lösungen für jede Branche.'
                  : 'We build custom solutions for any sector.'}
              </p>
            </div>
            <motion.a
              href="#contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {language === 'de' ? 'Kontaktieren Sie uns' : 'Contact Us'}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
