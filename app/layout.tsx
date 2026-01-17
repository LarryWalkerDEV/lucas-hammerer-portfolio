import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { LanguageProvider } from '@/components/shared/LanguageSwitcher'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Lucas Hammerer | Breathwork • Photography • Key Account',
  description: 'Unleash your full potential. M.Sc. Biotechnology, Breathwork Facilitator at Goodlife Breathing, Adventure Photographer, and Key Account Manager.',
  keywords: ['Lucas Hammerer', 'Breathwork', 'Photography', 'Goodlife Breathing', 'Adventure', 'Saubermacher', 'Baufeld-Austria', 'Luke Goodlife'],
  authors: [{ name: 'Lucas Hammerer' }],
  openGraph: {
    title: 'Lucas Hammerer',
    description: 'Unleash your full potential. Breathwork Facilitator • Adventure Photographer • Key Account Manager',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'de_AT',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
