import { getSiteSettings } from '@/lib/server-data'
import ContactClient from './ContactClient'

// Static metadata for contact page
export const metadata = {
  title: 'Contact Us | MERKA Architecture',
  description: 'Get in touch with MERKA Architecture. We are here to help with your architectural project in the UAE. Contact us for consultations and inquiries.',
  keywords: 'contact MERKA, architecture consultation, Dubai architects contact, UAE architecture firm, project inquiry',
  openGraph: {
    title: 'Contact Us | MERKA Architecture',
    description: 'Get in touch with MERKA Architecture for your next project.',
    images: ['/og-contact.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | MERKA Architecture',
    description: 'Get in touch with MERKA Architecture for your next project.',
    images: ['/og-contact.jpg'],
  },
}

// Force dynamic rendering for SSR (to get latest contact info)
export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  // Fetch site settings on the server
  const settings = await getSiteSettings()
  
  return <ContactClient initialSettings={settings} />
}
