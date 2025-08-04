import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aizee - Agentic AI untuk Rumah Masa Depan',
  description: 'Aizee membangun ekosistem rumah masa depan yang cerdas, personal, dan manusiawi melalui teknologi Agentic AI dan Internet of Things.',
  keywords: ['smart home', 'agentic AI', 'IoT', 'rumah pintar', 'artificial intelligence', 'home automation'],
  authors: [{ name: 'Aizee Team' }],
  icons: {
    icon: 'https://i.imgur.com/DtxyEY6.png',
    shortcut: 'https://i.imgur.com/DtxyEY6.png',
    apple: 'https://i.imgur.com/DtxyEY6.png',
  },
  openGraph: {
    title: 'Aizee - Agentic AI untuk Rumah Masa Depan',
    description: 'Aizee membangun ekosistem rumah masa depan yang cerdas, personal, dan manusiawi melalui teknologi Agentic AI dan Internet of Things.',
    url: 'https://aizee.com',
    siteName: 'Aizee',
    images: [
      {
        url: 'https://i.imgur.com/DtxyEY6.png',
        width: 1200,
        height: 630,
        alt: 'Aizee - Agentic AI untuk Rumah Masa Depan',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aizee - Agentic AI untuk Rumah Masa Depan',
    description: 'Aizee membangun ekosistem rumah masa depan yang cerdas, personal, dan manusiawi melalui teknologi Agentic AI dan Internet of Things.',
    images: ['https://i.imgur.com/DtxyEY6.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
