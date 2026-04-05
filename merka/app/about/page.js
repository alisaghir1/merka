import AboutClient from './AboutClient'
import { getLocale, buildMetadata } from '@/lib/locale'

export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('about', locale, {
    openGraph: { images: ['/og-about.jpg'] },
    twitter: { images: ['/og-about.jpg'] },
    enPath: '/about',
    arPath: '/ar/about',
  })
}

export default function AboutPage() {
  return <AboutClient />
}
