'use client'

import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/v6/Hero'
import { About } from '@/components/v6/About'
import { Portfolio } from '@/components/v6/Portfolio'
import { Contact } from '@/components/v6/Contact'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { motion } from 'framer-motion'

// Services section with creative agency style
function Services() {
  const language = useLanguage()
  const t = translations[language]

  const services = language === 'de'
    ? [
        {
          number: '01',
          title: 'Breathwork Workshops',
          description: 'Transformiere deine korperliche und geistige Leistungsfahigkeit durch wissenschaftlich fundierte Atemsessions.',
          features: ['Einzelsessions', 'Festival Workshops', 'Corporate Wellness', 'Eisbaden Erfahrungen'],
          gradient: 'from-amber-400 to-orange-500',
        },
        {
          number: '02',
          title: 'Fotografie & AI',
          description: 'Authentische Momente einfangen. Event-, Business-, Wasser- und Reisefotografie seit 2020.',
          features: ['Event Fotografie', 'Business Portrats', 'Immobilienfotografie', 'AI-Enhanced'],
          gradient: 'from-orange-500 to-red-500',
        },
        {
          number: '03',
          title: 'Speaking & Vortrage',
          description: 'Inspirierende Vortrage die Wissenschaft, Wellness und Nachhaltigkeit verbinden.',
          features: ['Keynote Vortrage', 'Workshop Moderation', 'Podiumsdiskussionen', 'Festival Sessions'],
          gradient: 'from-red-500 to-purple-500',
        },
      ]
    : [
        {
          number: '01',
          title: 'Breathwork Workshops',
          description: 'Transform your physical and mental performance through scientifically-grounded breathing sessions.',
          features: ['Individual Sessions', 'Festival Workshops', 'Corporate Wellness', 'Ice Bathing Experiences'],
          gradient: 'from-amber-400 to-orange-500',
        },
        {
          number: '02',
          title: 'Photography & AI',
          description: 'Capturing authentic moments. Event, Business, Water & Travel Photography since 2020.',
          features: ['Event Photography', 'Business Portraits', 'Real Estate Photography', 'AI-Enhanced'],
          gradient: 'from-orange-500 to-red-500',
        },
        {
          number: '03',
          title: 'Speaking Engagements',
          description: 'Inspiring talks bridging science, wellness, and sustainability.',
          features: ['Keynote Speeches', 'Workshop Facilitation', 'Panel Discussions', 'Festival Sessions'],
          gradient: 'from-red-500 to-purple-500',
        },
      ]

  return (
    <section id="services" className="py-20 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6"
          />
          <span className="text-amber-400 uppercase tracking-[0.3em] text-sm font-medium">
            {language === 'de' ? 'Was Ich Biete' : 'What I Offer'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            {t.services.heading}
          </h2>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                {/* Number */}
                <motion.div
                  className={`text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} opacity-20 absolute top-4 right-6`}
                  whileHover={{ scale: 1.1 }}
                >
                  {service.number}
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/50 leading-relaxed mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-white/60 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover gradient overlay */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials section
function Testimonials() {
  const language = useLanguage()

  const testimonials = language === 'de'
    ? [
        {
          quote: 'Die Breathwork-Session mit Lucas war wirklich transformativ. Sein wissenschaftlicher Ansatz kombiniert mit echter Warme schuf einen sicheren Raum.',
          author: 'Maria S.',
          role: 'Workshop Teilnehmerin',
        },
        {
          quote: 'Lucas hat unser Surf-Retreat perfekt eingefangen. Seine Fahigkeit, mit uns im Wasser zu sein und echte Momente einzufangen, ist unerreicht.',
          author: 'Anna M.',
          role: 'Fotografie Kundin',
        },
        {
          quote: 'Die Zusammenarbeit mit Lucas war eine Freude. Er brachte Kreativitat und Professionalitat in jedes Projekt.',
          author: 'Stefan R.',
          role: 'Event-Organisator',
        },
      ]
    : [
        {
          quote: 'The breathwork session with Lucas was truly transformative. His scientific approach combined with genuine warmth created a safe space.',
          author: 'Maria S.',
          role: 'Workshop Participant',
        },
        {
          quote: "Lucas captured our surf retreat perfectly. His ability to be in the water with us and catch those genuine moments is unmatched.",
          author: 'Anna M.',
          role: 'Photography Client',
        },
        {
          quote: 'Working with Lucas was a pleasure. He brought creativity and professionalism to every project.',
          author: 'Stefan R.',
          role: 'Event Organizer',
        },
      ]

  return (
    <section className="py-20 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6"
          />
          <span className="text-amber-400 uppercase tracking-[0.3em] text-sm font-medium">
            {language === 'de' ? 'Stimmen' : 'Testimonials'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            {language === 'de' ? 'Was Andere Sagen' : 'What People Say'}
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
            >
              {/* Quote mark */}
              <div className="text-6xl font-serif text-amber-400/20 absolute top-4 left-6">"</div>

              <div className="relative z-10 pt-8">
                <p className="text-white/70 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-black font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-white/40 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function CreativeAgencyPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Custom navigation for v6 */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5"
      >
        <Navigation variant="adventurer" />
      </motion.header>

      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      <Footer variant="adventurer" />
    </div>
  )
}
