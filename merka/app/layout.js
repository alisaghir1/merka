import { Inter, Playfair_Display, Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from './components/Footer'
import { headers } from 'next/headers'
import { LanguageProvider } from '@/lib/LanguageContext'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

// Arabic fonts
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: 'swap',
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://merka.ae'),
}

export default async function RootLayout({ children }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  const locale = headersList.get('x-locale') || 'en'
  const isAdminRoute = pathname.startsWith('/admin')
  const isArabic = locale === 'ar'

  return (
    <html lang={isArabic ? 'ar' : 'en'} dir={isArabic ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PBG87HSDMV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PBG87HSDMV');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${cairo.variable} ${tajawal.variable} antialiased`}>
        <LanguageProvider initialLocale={locale}>
          {!isAdminRoute && <Header />}
          <main className={!isAdminRoute ? "pt-20" : ""}>
            {children}
          </main>
          {!isAdminRoute && <Footer />}
        </LanguageProvider>
      </body>
    </html>
  );
}