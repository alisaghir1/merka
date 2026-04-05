'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

/**
 * Locale-aware Link that automatically prefixes href with /ar when in Arabic mode.
 * Use this for all internal navigation links. External links and anchor links are passed through unchanged.
 */
export default function LocaleLink({ href, children, ...props }) {
  const { localePath } = useLanguage()

  // Only prefix internal absolute paths (not external URLs, anchors, or mailto/tel)
  const isInternal = typeof href === 'string' && href.startsWith('/') && !href.startsWith('/admin') && !href.startsWith('/api')
  const resolvedHref = isInternal ? localePath(href) : href

  return (
    <Link href={resolvedHref} {...props}>
      {children}
    </Link>
  )
}
