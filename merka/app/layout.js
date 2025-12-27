import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from './components/Footer'
import { headers } from 'next/headers'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Merka Architecture - Dubai's Premier Architectural Design Studio",
  description: "Leading architectural design studio in Dubai specializing in residential, commercial, and hospitality projects with modern and traditional fusion styles.",
  keywords: "architecture Dubai, architectural design, residential architecture, commercial architecture, Dubai architects",
};

export default async function RootLayout({ children }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {!isAdminRoute && <Header />}
        <main className={!isAdminRoute ? "pt-20" : ""}>
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}