import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ISKCON Dhanaupur — Sri Sri Radha ShyamSundar Mandir',
  description: 'Official website of ISKCON Dhanaupur — Sri Sri Radha ShyamSundar Mandir, Dhanaupur, Uttar Pradesh.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
