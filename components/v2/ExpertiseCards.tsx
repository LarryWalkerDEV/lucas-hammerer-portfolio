'use client'

import { motion } from 'framer-motion'
import { Building2, Wind, Camera, GraduationCap } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

export function ExpertiseCards() {
  const language = useLanguage()
  const t = translations[language]

  const expertise = [
    {
      icon: Building2,
      title: language === 'de' ? 'Der Sales Lead' : 'The Sales Lead',
      description: language === 'de'
        ? 'Aktuell Sales Lead und Key Account bei Baufeld-Austria GmbH fur Material Flow Management. Vorher Key Account bei Saubermacher in der Waste-to-Energy Branche.'
        : 'Currently Sales Lead and Key Account at Baufeld-Austria GmbH for Material Flow Management. Previously Key Account at Saubermacher in the Waste-to-Energy industry.',
      color: 'group-hover:text-[#22c55e]',
      bg: 'group-hover:bg-[#22c55e]/5',
    },
    {
      icon: Wind,
      title: t.about.facilitator.title,
      description: t.about.facilitator.description,
      color: 'group-hover:text-[#E94560]',
      bg: 'group-hover:bg-[#E94560]/5',
    },
    {
      icon: Camera,
      title: t.about.photographer.title,
      description: t.about.photographer.description,
      color: 'group-hover:text-[#4A90A4]',
      bg: 'group-hover:bg-[#4A90A4]/5',
    },
    {
      icon: GraduationCap,
      title: language === 'de' ? 'Der Wissenschaftler' : 'The Scientist',
      description: language === 'de'
        ? 'M.Sc. Biotechnologie von der TU Graz (2012-2015), bestanden mit Auszeichnung. B.Sc. in Chemie und Biotechnologie (2008-2012). Analytisches Denken als Fundament.'
        : 'M.Sc. Biotechnology from TU Graz (2012-2015), passed with distinction. B.Sc. in Chemistry and Biotechnology (2008-2012). Analytical thinking as foundation.',
      color: 'group-hover:text-[#1A1A2E]',
      bg: 'group-hover:bg-[#1A1A2E]/5',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-scientist-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-scientist-secondary uppercase tracking-[0.2em] text-sm font-medium">
            {language === 'de' ? 'Expertise' : 'Expertise'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-scientist-text mt-4">
            {language === 'de' ? 'Vier Disziplinen, Eine Vision' : 'Four Disciplines, One Vision'}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertise.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group p-8 bg-white rounded-xl border border-scientist-primary/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${item.bg}`}
              >
                <div className={`mb-6 transition-colors ${item.color}`}>
                  <Icon className="w-12 h-12" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-semibold text-scientist-text mb-3">
                  {item.title}
                </h3>

                <p className="text-scientist-text/60 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
