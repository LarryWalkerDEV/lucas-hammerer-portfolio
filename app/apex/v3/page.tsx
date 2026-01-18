'use client'

import { ApexNavigation } from '@/components/apex/shared/Navigation'
import { ApexFooter } from '@/components/apex/shared/Footer'
import { Hero } from '@/components/apex/v3/Hero'
import { Services } from '@/components/apex/v3/Services'
import { About } from '@/components/apex/v3/About'
import { Process } from '@/components/apex/v3/Process'
import { CTA } from '@/components/apex/v3/CTA'

export default function ApexV3Page() {
  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <ApexNavigation variant="glass" />
      <Hero />
      <Services />
      <About />
      <Process />
      <CTA />
      <ApexFooter variant="gradient" />
    </main>
  )
}
