import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lucky Launch at Lucy',
  description: 'Fun Run dan Pop Up Market di Lucy Curated Compound',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  )
}
