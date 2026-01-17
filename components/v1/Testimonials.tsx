'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { RetroCarousel, RetroTestimonialCard, type RetroTestimonial } from '@/components/ui/retro-testimonial'
import { Quote, Star } from 'lucide-react'

const testimonials: RetroTestimonial[] = [
  {
    name: 'Maria S.',
    designation: 'Workshop Participant',
    description: 'The breathwork session with Lucas was truly transformative. His scientific approach combined with genuine warmth created a safe space for deep exploration.',
    profileImage: '/images/workshop.webp',
  },
  {
    name: 'Thomas K.',
    designation: 'Corporate Client',
    description: 'We invited Lucas for our company wellness day. The ice bathing experience and breathwork workshop exceeded all expectations. Our team still talks about it!',
    profileImage: '/images/lucas-ted.jpg',
  },
  {
    name: 'Anna M.',
    designation: 'Photography Client',
    description: 'Lucas captured our surf retreat perfectly. His ability to be in the water with us and catch those genuine moments is unmatched.',
    profileImage: '/images/lucas-surfer.jpg',
  },
]

const testimonialsDe: RetroTestimonial[] = [
  {
    name: 'Maria S.',
    designation: 'Workshop Teilnehmerin',
    description: 'Die Atemsession mit Lucas war wirklich transformativ. Sein wissenschaftlicher Ansatz kombiniert mit echter Wärme schuf einen sicheren Raum für tiefe Erkundung.',
    profileImage: '/images/workshop.webp',
  },
  {
    name: 'Thomas K.',
    designation: 'Firmenkunde',
    description: 'Wir haben Lucas für unseren Firmen-Wellness-Tag eingeladen. Das Eisbaden und der Atemworkshop haben alle Erwartungen übertroffen!',
    profileImage: '/images/lucas-ted.jpg',
  },
  {
    name: 'Anna M.',
    designation: 'Fotografie Kundin',
    description: 'Lucas hat unser Surf-Retreat perfekt eingefangen. Seine Fähigkeit, mit uns im Wasser zu sein und echte Momente festzuhalten, ist unübertroffen.',
    profileImage: '/images/lucas-surfer.jpg',
  },
]

export function Testimonials() {
  const language = useLanguage()
  const t = translations[language]

  const currentTestimonials = language === 'de' ? testimonialsDe : testimonials

  return (
    <section className="py-20 md:py-32 bg-explorer-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10">
          <Quote className="w-32 h-32 text-explorer-primary" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 rotate-180">
          <Quote className="w-24 h-24 text-explorer-secondary" />
        </div>
        {/* Floating stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Star className="w-4 h-4 text-explorer-accent fill-explorer-accent/30" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 text-explorer-primary uppercase tracking-[0.2em] text-sm font-medium"
          >
            <span className="w-8 h-px bg-explorer-primary/50" />
            {language === 'de' ? 'Erfahrungen' : 'Experiences'}
            <span className="w-8 h-px bg-explorer-primary/50" />
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-explorer-text mt-4">
            {t.testimonials.heading}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-explorer-text/60 max-w-xl mx-auto"
          >
            {language === 'de'
              ? 'Was Teilnehmer und Kunden über ihre Erfahrungen sagen.'
              : 'What participants and clients say about their experiences.'}
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 md:gap-16 mb-12"
        >
          {[
            { value: '500+', label: language === 'de' ? 'Teilnehmer' : 'Participants' },
            { value: '50+', label: language === 'de' ? 'Workshops' : 'Workshops' },
            { value: '4.9', label: language === 'de' ? 'Bewertung' : 'Rating' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="text-2xl md:text-3xl font-display font-bold text-explorer-primary"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs md:text-sm text-explorer-text/60 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <RetroCarousel
          variant="explorer"
          items={currentTestimonials.map((testimonial, index) => (
            <RetroTestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
              variant="explorer"
              backgroundImage="/images/workshop.webp"
            />
          ))}
        />
      </div>
    </section>
  )
}
