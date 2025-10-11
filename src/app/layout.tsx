import type { Metadata } from "next"
import { Inter, Source_Serif_4 } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://interpersonal.com"),
  title: {
    default: "Interpersonal - Building Stronger Connections",
    template: "%s | Interpersonal",
  },
  description:
    "Discover meaningful practices and resources to build stronger interpersonal connections and relationships.",
  keywords: [
    "interpersonal",
    "relationships",
    "communication",
    "connection",
    "practices",
    "therapy",
    "support groups",
  ],
  authors: [{ name: "Interpersonal" }],
  creator: "Interpersonal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://interpersonal.com",
    title: "Interpersonal - Building Stronger Connections",
    description:
      "Discover meaningful practices and resources to build stronger interpersonal connections and relationships.",
    siteName: "Interpersonal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Interpersonal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interpersonal - Building Stronger Connections",
    description:
      "Discover meaningful practices and resources to build stronger interpersonal connections and relationships.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen flex flex-col">
        <TooltipProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  )
}

