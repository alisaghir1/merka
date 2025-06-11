import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from './components/Footer'

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}