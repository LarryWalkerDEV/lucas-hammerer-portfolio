'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Wind, Camera, Building2 } from 'lucide-react'

const credentials = [
  { icon: GraduationCap, label: 'M.Sc. Biotechnology', value: 'TU Graz (with distinction)' },
  { icon: Building2, label: 'Current', value: 'Sales Lead @ Baufeld-Austria' },
  { icon: Wind, label: 'Breathwork', value: 'Goodlife Breathing (since 2021)' },
  { icon: Camera, label: 'Photography', value: 'Luke Goodlife (since 2020)' },
  { icon: Briefcase, label: 'Previous', value: 'Key Account @ Saubermacher' },
]

export function Credentials() {
  return (
    <section className="py-8 bg-scientist-primary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...credentials, ...credentials].map((cred, index) => {
            const Icon = cred.icon
            return (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-3"
              >
                <Icon className="w-5 h-5 text-scientist-secondary" />
                <span className="text-scientist-text font-medium">{cred.label}:</span>
                <span className="text-scientist-text/60">{cred.value}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
