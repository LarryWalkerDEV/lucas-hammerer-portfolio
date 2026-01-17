'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Instagram, Linkedin, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from './LanguageSwitcher'
import { translations } from '@/lib/i18n'

interface ContactSectionProps {
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator'
  className?: string
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/lukegoodlife', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/in/lucashammerer', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@lucas-hammerer.at', label: 'Email' },
]

const services = ['Breathwork', 'Photography', 'Speaking', 'Other']
const servicesDe = ['Atemarbeit', 'Fotografie', 'Vorträge', 'Sonstiges']

export function ContactSection({ variant = 'explorer', className }: ContactSectionProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    service: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const language = useLanguage()
  const t = translations[language]

  const variantStyles = {
    explorer: {
      bg: 'bg-explorer-secondary/10',
      input: 'bg-explorer-background border-explorer-primary/20 focus:border-explorer-primary',
      button: 'bg-explorer-primary hover:bg-explorer-primary/90 text-white',
      text: 'text-explorer-text',
      accent: 'text-explorer-primary',
    },
    scientist: {
      bg: 'bg-scientist-primary/5',
      input: 'bg-white border-scientist-primary/20 focus:border-scientist-secondary',
      button: 'bg-scientist-secondary hover:bg-scientist-secondary/90 text-white',
      text: 'text-scientist-text',
      accent: 'text-scientist-secondary',
    },
    adventurer: {
      bg: 'bg-adventurer-secondary',
      input: 'bg-adventurer-primary border-white/10 focus:border-adventurer-accent text-white placeholder:text-white/50',
      button: 'bg-adventurer-accent hover:bg-adventurer-accent/90 text-white',
      text: 'text-adventurer-text',
      accent: 'text-adventurer-accent',
    },
    facilitator: {
      bg: 'bg-facilitator-secondary/10',
      input: 'bg-white border-facilitator-primary/20 focus:border-facilitator-primary',
      button: 'bg-facilitator-accent hover:bg-facilitator-accent/90 text-white',
      text: 'text-facilitator-text',
      accent: 'text-facilitator-primary',
    },
  }

  const styles = variantStyles[variant]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormState({ name: '', email: '', message: '', service: '' })
  }

  const currentServices = language === 'de' ? servicesDe : services

  return (
    <section id="contact" className={cn('py-20 md:py-32', styles.bg, className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={cn('text-3xl md:text-5xl font-display font-semibold mb-4', styles.text)}>
            {t.contact.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn('p-8 rounded-xl text-center', styles.bg)}
              >
                <div className={cn('text-4xl mb-4')}>✓</div>
                <p className={cn('text-lg font-medium', styles.text)}>
                  {language === 'de' ? 'Nachricht gesendet!' : 'Message sent!'}
                </p>
              </motion.div>
            ) : (
              <>
                <div>
                  <input
                    type="text"
                    placeholder={t.contact.name}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors outline-none',
                      styles.input
                    )}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={t.contact.email}
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors outline-none',
                      styles.input
                    )}
                  />
                </div>
                <div>
                  <select
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors outline-none',
                      styles.input
                    )}
                  >
                    <option value="">{t.contact.selectService}</option>
                    {currentServices.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder={t.contact.message}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={4}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border transition-colors outline-none resize-none',
                      styles.input
                    )}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2',
                    styles.button,
                    isSubmitting && 'opacity-70 cursor-not-allowed'
                  )}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t.contact.submit}
                    </>
                  )}
                </motion.button>
              </>
            )}
          </motion.form>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <h3 className={cn('text-lg font-medium mb-4', styles.text)}>
                  {language === 'de' ? 'Folge mir' : 'Follow me'}
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                        variant === 'adventurer'
                          ? 'bg-white/10 hover:bg-adventurer-accent text-white'
                          : 'bg-black/5 hover:bg-black/10'
                      )}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className={cn('p-6 rounded-xl', variant === 'adventurer' ? 'bg-white/5' : 'bg-black/5')}>
                <p className={cn('text-sm leading-relaxed', styles.text)}>
                  {language === 'de'
                    ? 'Basiert in Graz, Österreich. Verfügbar für internationale Projekte und Workshops.'
                    : 'Based in Graz, Austria. Available for international projects and workshops.'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
