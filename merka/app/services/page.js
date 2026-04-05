import { getServices } from '@/lib/server-data'
import ServicesPageClient from './ServicesPageClient'
import { getLocale, buildMetadata } from '@/lib/locale'

export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('services', locale, {
    openGraph: { images: ['/og-services.jpg'] },
    twitter: { images: ['/og-services.jpg'] },
    enPath: '/services',
    arPath: '/ar/services',
  })
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  // Fetch services on the server
  const services = await getServices({ published: true })
  
  return <ServicesPageClient initialServices={services} />
}
