import { getSiteSettings } from '@/lib/server-data'
import ContactClient from './ContactClient'
import { getLocale, buildMetadata } from '@/lib/locale'

export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('contact', locale, {
    openGraph: { images: ['/og-contact.jpg'] },
    twitter: { images: ['/og-contact.jpg'] },
    enPath: '/contact',
    arPath: '/ar/contact',
  })
}

// Force dynamic rendering for SSR (to get latest contact info)
export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  // Fetch site settings on the server
  const settings = await getSiteSettings()
  
  return <ContactClient initialSettings={settings} />
}
