'use client'

import { Navigation } from '@/components/shared/Navigation'
import { ContactSection } from '@/components/shared/ContactSection'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/v4/Hero'
import { About } from '@/components/v4/About'
import { Journey } from '@/components/v4/Journey'
import { Services } from '@/components/v4/Services'
import { Testimonials } from '@/components/v4/Testimonials'

export default function FacilitatorPage() {
  return (
    <div className="theme-facilitator bg-gradient-to-b from-[#F0F7F7] to-[#E8F4F4] min-h-screen">
      <Navigation variant="facilitator" />
      <main>
        <Hero />
        <About />
        <Journey />
        <Services />
        <Testimonials />
        <ContactSection variant="facilitator" />
      </main>
      <Footer variant="facilitator" />
    </div>
  )
}
