'use client'

import { Navigation } from '@/components/shared/Navigation'
import { ContactSection } from '@/components/shared/ContactSection'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/v3/Hero'
import { About } from '@/components/v3/About'
import { Portfolio } from '@/components/v3/Portfolio'
import { Services } from '@/components/v3/Services'
import { Journey } from '@/components/v3/Journey'
import { RetroCarousel, RetroTestimonialCard, RetroTestimonial } from '@/components/ui/retro-testimonial'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { motion } from 'framer-motion'

// Testimonials data for RetroCarousel
const testimonialData: RetroTestimonial[] = [
  {
    name: 'Maria S.',
    designation: 'Workshop Participant',
    description: 'The breathwork session with Lucas was truly transformative. His scientific approach combined with genuine warmth created a safe space for deep exploration.',
    profileImage: '/images/workshop.webp',
  },
  {
    name: 'Thomas K.',
    designation: 'Corporate Wellness Client',
    description: 'We invited Lucas for our company wellness day. The ice bathing experience and breathwork workshop exceeded all expectations. Our team was energized!',
    profileImage: '/images/lucas-ted.jpg',
  },
  {
    name: 'Anna M.',
    designation: 'Photography Client',
    description: 'Lucas captured our surf retreat perfectly. His ability to be in the water with us and catch those genuine moments is unmatched. A true professional.',
    profileImage: '/images/lucas-surfer.jpg',
  },
  {
    name: 'Stefan R.',
    designation: 'Event Organizer - Geco Festival',
    description: 'Working with Lucas on our festival communications was a pleasure. He brought creativity and professionalism to every project. Highly recommended!',
    profileImage: '/images/lucas-about.webp',
  },
  {
    name: 'Julia W.',
    designation: 'Business Portrait Client',
    description: 'The headshots Lucas took for our team are outstanding. He has a unique ability to make people feel comfortable in front of the camera.',
    profileImage: '/images/lucas-portrait.jpg',
  },
]

const testimonialDataDe: RetroTestimonial[] = [
  {
    name: 'Maria S.',
    designation: 'Workshop Teilnehmerin',
    description: 'Die Breathwork-Session mit Lucas war wirklich transformativ. Sein wissenschaftlicher Ansatz kombiniert mit echter Wärme schuf einen sicheren Raum für tiefe Erkundung.',
    profileImage: '/images/workshop.webp',
  },
  {
    name: 'Thomas K.',
    designation: 'Corporate Wellness Kunde',
    description: 'Wir haben Lucas für unseren Firmenwellness-Tag eingeladen. Das Eisbaden und der Breathwork-Workshop haben alle Erwartungen übertroffen. Unser Team war energetisiert!',
    profileImage: '/images/lucas-ted.jpg',
  },
  {
    name: 'Anna M.',
    designation: 'Fotografie Kundin',
    description: 'Lucas hat unser Surf-Retreat perfekt eingefangen. Seine Fähigkeit, mit uns im Wasser zu sein und diese echten Momente einzufangen, ist unübertroffen.',
    profileImage: '/images/lucas-surfer.jpg',
  },
  {
    name: 'Stefan R.',
    designation: 'Event-Organisator - Geco Festival',
    description: 'Die Zusammenarbeit mit Lucas für unsere Festival-Kommunikation war eine Freude. Er brachte Kreativität und Professionalität in jedes Projekt.',
    profileImage: '/images/lucas-about.webp',
  },
  {
    name: 'Julia W.',
    designation: 'Business Portrait Kundin',
    description: 'Die Porträtfotos, die Lucas für unser Team gemacht hat, sind hervorragend. Er hat die einzigartige Fähigkeit, Menschen vor der Kamera entspannt wirken zu lassen.',
    profileImage: '/images/lucas-portrait.jpg',
  },
]

function Testimonials() {
  const language = useLanguage()
  const t = translations[language]
  const testimonials = language === 'de' ? testimonialDataDe : testimonialData

  const cards = testimonials.map((testimonial, index) => (
    <RetroTestimonialCard
      key={testimonial.name}
      testimonial={testimonial}
      index={index}
      variant="adventurer"
      backgroundImage="/images/lucas-hat.jpg"
    />
  ))

  return (
    <section className="py-20 md:py-32 bg-adventurer-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, #FF6B35 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, #00D4AA 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-adventurer-accent to-transparent mb-6"
          />
          <span className="text-adventurer-accent uppercase tracking-[0.3em] text-sm font-medium">
            {language === 'de' ? 'Stimmen' : 'Voices'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-adventurer-text mt-4">
            {t.testimonials.heading}
          </h2>
          <p className="text-adventurer-text/40 mt-4 max-w-xl mx-auto">
            {language === 'de'
              ? 'Erfahrungen von Menschen, die die Reise mitgemacht haben'
              : 'Experiences from people who have joined the journey'}
          </p>
        </motion.div>

        <RetroCarousel items={cards} variant="adventurer" />
      </div>
    </section>
  )
}

export default function AdventurerPage() {
  return (
    <div className="theme-adventurer bg-adventurer-primary min-h-screen">
      <Navigation variant="adventurer" />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Journey />
        <Testimonials />
        <ContactSection variant="adventurer" />
      </main>
      <Footer variant="adventurer" />
    </div>
  )
}
