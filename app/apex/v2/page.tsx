'use client'

import { ApexNavigation } from '@/components/apex/shared/Navigation'
import { ApexFooter } from '@/components/apex/shared/Footer'
import { Hero } from '@/components/apex/v2/Hero'
import { Services } from '@/components/apex/v2/Services'
import { Solutions } from '@/components/apex/v2/Solutions'
import { Testimonials } from '@/components/apex/v2/Testimonials'
import { Contact } from '@/components/apex/v2/Contact'

export default function ApexV2Page() {
  return (
    <div className="min-h-screen bg-white">
      <ApexNavigation variant="light" />
      <main>
        <Hero />
        <Services />
        <Solutions />
        <Testimonials />
        <Contact />
      </main>
      <ApexFooter variant="light" />
    </div>
  )
}
