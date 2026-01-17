'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { AnimatedTestimonials, type Testimonial } from '@/components/ui/animated-testimonials'

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria S.',
    role: 'Workshop Participant',
    content: 'The breathwork session with Lucas was deeply calming yet powerful. His gentle guidance and scientific understanding created a truly transformative experience.',
    image: '/images/workshop.webp',
  },
  {
    id: '2',
    name: 'Thomas K.',
    role: 'Ice Bathing Participant',
    content: 'The combination of breathwork and ice bathing at Eisbaden Graz has become an essential part of my wellness routine. Lucas creates such a supportive community.',
    image: '/images/lucas-ted.jpg',
  },
  {
    id: '3',
    name: 'Anna M.',
    role: 'Corporate Client',
    content: 'We brought Lucas in for our team retreat. The peaceful energy he brings transformed our group dynamics. Everyone left feeling renewed.',
    image: '/images/lucas-surfer.jpg',
  },
]

const testimonialsDe: Testimonial[] = [
  {
    id: '1',
    name: 'Maria S.',
    role: 'Workshop Teilnehmerin',
    content: 'Die Atemsession mit Lucas war zutiefst beruhigend und gleichzeitig kraftvoll. Seine sanfte Führung schuf eine wahrhaft transformative Erfahrung.',
    image: '/images/workshop.webp',
  },
  {
    id: '2',
    name: 'Thomas K.',
    role: 'Eisbaden Teilnehmer',
    content: 'Die Kombination aus Atemarbeit und Eisbaden ist ein wesentlicher Teil meiner Wellness-Routine geworden. Lucas schafft eine so unterstützende Gemeinschaft.',
    image: '/images/lucas-ted.jpg',
  },
  {
    id: '3',
    name: 'Anna M.',
    role: 'Firmenkunde',
    content: 'Wir haben Lucas für unser Team-Retreat engagiert. Die friedliche Energie, die er mitbringt, hat unsere Gruppendynamik transformiert.',
    image: '/images/lucas-surfer.jpg',
  },
]

export function Testimonials() {
  const language = useLanguage()
  const t = translations[language]
  const currentTestimonials = language === 'de' ? testimonialsDe : testimonials

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-facilitator-accent uppercase tracking-[0.2em] text-sm font-medium">
            {language === 'de' ? 'Erfahrungen' : 'Experiences'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-facilitator-text mt-4">
            {t.testimonials.heading}
          </h2>
        </motion.div>

        <AnimatedTestimonials
          testimonials={currentTestimonials}
          variant="facilitator"
          autoPlayInterval={6000}
        />
      </div>
    </section>
  )
}
