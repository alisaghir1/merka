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
  metadataBase: new URL('https://merka-architecture.com'),
  title: "Merka Architecture - Dubai's Premier Architectural Design Studio",
  description: "Leading architectural design studio in Dubai specializing in residential, commercial, and hospitality projects with modern and traditional fusion styles.",
  keywords: "architecture Dubai, architectural design, residential architecture, commercial architecture, Dubai architects",
};

export default async function RootLayout({ children }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${cairo.variable} ${tajawal.variable} antialiased`}>
        <LanguageProvider>
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