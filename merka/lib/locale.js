import { headers } from 'next/headers'

/**
 * Get the current locale from the request headers (set by middleware).
 * For use in server components and generateMetadata functions.
 */
export async function getLocale() {
  const headersList = await headers()
  return headersList.get('x-locale') || 'en'
}

/**
 * SEO metadata for each page in both languages.
 */
export const pageMetadata = {
  home: {
    en: {
      title: 'MERKA Architecture | Premium Architectural Design in UAE',
      description: 'MERKA Architecture offers premium architectural design services in the UAE. We specialize in residential, commercial, and hospitality projects with innovative design solutions.',
      keywords: 'architecture, design, UAE, Dubai, Abu Dhabi, residential, commercial, hospitality, interior design',
    },
    ar: {
      title: 'ميركا للعمارة | تصميم معماري متميز في الإمارات',
      description: 'تقدم ميركا للعمارة خدمات تصميم معماري متميزة في الإمارات العربية المتحدة. نحن متخصصون في المشاريع السكنية والتجارية والضيافة مع حلول تصميم مبتكرة.',
      keywords: 'عمارة, تصميم, الإمارات, دبي, أبوظبي, سكني, تجاري, ضيافة, تصميم داخلي',
    },
  },
  about: {
    en: {
      title: 'About Us | MERKA Architecture',
      description: 'Learn about MERKA Architecture, our vision, mission, and the team behind our innovative architectural designs in the UAE.',
      keywords: 'about MERKA, architecture firm, UAE architects, design philosophy, architectural team',
    },
    ar: {
      title: 'من نحن | ميركا للعمارة',
      description: 'تعرف على ميركا للعمارة، رؤيتنا ورسالتنا والفريق وراء تصاميمنا المعمارية المبتكرة في الإمارات العربية المتحدة.',
      keywords: 'عن ميركا, شركة عمارة, مهندسون معماريون الإمارات, فلسفة التصميم, فريق معماري',
    },
  },
  services: {
    en: {
      title: 'Our Services | MERKA Architecture',
      description: 'Explore our comprehensive architectural services including conceptual design, schematic design, construction drawings, and more.',
      keywords: 'architectural services, design services, construction drawings, UAE architecture, Dubai design',
    },
    ar: {
      title: 'خدماتنا | ميركا للعمارة',
      description: 'استكشف خدماتنا المعمارية الشاملة بما في ذلك التصميم المفاهيمي، التصميم التخطيطي، رسومات البناء، والمزيد.',
      keywords: 'خدمات معمارية, خدمات تصميم, رسومات بناء, عمارة الإمارات, تصميم دبي',
    },
  },
  projects: {
    en: {
      title: 'Our Projects | MERKA Architecture',
      description: 'Explore our portfolio of architectural projects including residential, commercial, and hospitality designs in the UAE.',
      keywords: 'architecture projects, UAE projects, Dubai architecture, residential design, commercial architecture',
    },
    ar: {
      title: 'مشاريعنا | ميركا للعمارة',
      description: 'استكشف محفظة مشاريعنا المعمارية بما في ذلك التصاميم السكنية والتجارية ومشاريع الضيافة في الإمارات.',
      keywords: 'مشاريع معمارية, مشاريع الإمارات, عمارة دبي, تصميم سكني, عمارة تجارية',
    },
  },
  blog: {
    en: {
      title: 'Blog | MERKA Architecture',
      description: 'Stay updated with the latest insights, trends, and news from MERKA Architecture. Explore our articles on architecture, design, and the UAE construction industry.',
      keywords: 'architecture blog, design insights, UAE architecture news, MERKA blog, architectural trends',
    },
    ar: {
      title: 'المدونة | ميركا للعمارة',
      description: 'ابقَ على اطلاع بأحدث الرؤى والاتجاهات والأخبار من ميركا للعمارة. استكشف مقالاتنا حول العمارة والتصميم وصناعة البناء في الإمارات.',
      keywords: 'مدونة عمارة, رؤى تصميم, أخبار عمارة الإمارات, مدونة ميركا, اتجاهات معمارية',
    },
  },
  contact: {
    en: {
      title: 'Contact Us | MERKA Architecture',
      description: 'Get in touch with MERKA Architecture. We are here to help with your architectural project in the UAE. Contact us for consultations and inquiries.',
      keywords: 'contact MERKA, architecture consultation, Dubai architects contact, UAE architecture firm, project inquiry',
    },
    ar: {
      title: 'اتصل بنا | ميركا للعمارة',
      description: 'تواصل مع ميركا للعمارة. نحن هنا لمساعدتك في مشروعك المعماري في الإمارات. اتصل بنا للاستشارات والاستفسارات.',
      keywords: 'تواصل ميركا, استشارة معمارية, اتصل بمعماريي دبي, شركة عمارة الإمارات, استفسار مشروع',
    },
  },
  stylesTypologies: {
    en: {
      title: 'Architectural Styles & Typologies | MERKA Architecture',
      description: 'Explore various architectural styles and building typologies. From modern minimalism to traditional designs, discover the diversity of architectural expression.',
      keywords: 'architectural styles, building typologies, modern architecture, traditional design, contemporary architecture, UAE design',
    },
    ar: {
      title: 'الأساليب والتصنيفات المعمارية | ميركا للعمارة',
      description: 'استكشف مختلف الأساليب المعمارية وتصنيفات المباني. من الحداثة البسيطة إلى التصاميم التقليدية، اكتشف تنوع التعبير المعماري.',
      keywords: 'أساليب معمارية, تصنيفات مباني, عمارة حديثة, تصميم تقليدي, عمارة معاصرة, تصميم الإمارات',
    },
  },
}

/**
 * Build Next.js metadata object for a given page and locale.
 */
export function buildMetadata(page, locale, overrides = {}) {
  const meta = pageMetadata[page]?.[locale] || pageMetadata[page]?.en
  if (!meta) return overrides

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      ...overrides.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      ...overrides.twitter,
    },
    alternates: {
      canonical: overrides.canonical,
      languages: {
        'en': overrides.enPath || '/',
        'ar': overrides.arPath || '/ar',
      },
    },
    ...overrides,
  }
}
