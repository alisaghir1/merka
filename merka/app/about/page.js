import AboutClient from './AboutClient'

// Static metadata for about page
export const metadata = {
  title: 'About Us | MERKA Architecture',
  description: 'Learn about MERKA Architecture, our vision, mission, and the team behind our innovative architectural designs in the UAE.',
  keywords: 'about MERKA, architecture firm, UAE architects, design philosophy, architectural team',
  openGraph: {
    title: 'About Us | MERKA Architecture',
    description: 'Learn about MERKA Architecture and our design philosophy.',
    images: ['/og-about.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | MERKA Architecture',
    description: 'Learn about MERKA Architecture and our design philosophy.',
    images: ['/og-about.jpg'],
  },
}

export default function AboutPage() {
  return <AboutClient />
}
