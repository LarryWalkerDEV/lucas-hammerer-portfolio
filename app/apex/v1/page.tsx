'use client'

import { ApexNavigation } from '@/components/apex/shared/Navigation'
import { ApexFooter } from '@/components/apex/shared/Footer'
import { Hero } from '@/components/apex/v1/Hero'
import { Services } from '@/components/apex/v1/Services'
import { Stats } from '@/components/apex/v1/Stats'
import { CTA } from '@/components/apex/v1/CTA'

export default function ApexV1Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <ApexNavigation variant="dark" />
      <Hero />
      <Stats />
      <Services />
      <CTA />
      <ApexFooter variant="dark" />
    </main>
  )
}
