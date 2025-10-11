import type { Metadata } from "next"
import { Inter, Source_Serif_4 } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TooltipProvider } from "@/components/ui/tooltip"
import { OrganizationSchema, WebsiteSchema } from "@/components/structured-data"
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
    default: "Interpersonal - Master the Art of Human Connection",
    template: "%s | Interpersonal",
  },
  description:
    "Develop essential interpersonal skills through expert insights, practical exercises, and curated resources. Learn communication, emotional intelligence, conflict resolution, and relationship-building skills.",
  keywords: [
    "interpersonal skills",
    "communication skills",
    "emotional intelligence",
    "relationship skills",
    "social skills",
    "active listening",
    "conflict resolution",
    "empathy",
    "connection",
    "personal development",
    "soft skills",
    "people skills",
    "therapy",
    "coaching",
  ],
  authors: [{ name: "Interpersonal" }],
  creator: "Interpersonal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://interpersonal.com",
    title: "Interpersonal - Master the Art of Human Connection",
    description:
      "Develop essential interpersonal skills through expert insights, practical exercises, and curated resources. Learn communication, emotional intelligence, and relationship-building skills.",
    siteName: "Interpersonal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Interpersonal - Interpersonal Skills Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interpersonal - Master the Art of Human Connection",
    description:
      "Develop essential interpersonal skills through expert insights, practical exercises, and curated resources.",
    images: ["/og-image.png"],
    creator: "@interpersonal",
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
  alternates: {
    types: {
      "application/rss+xml": "https://interpersonal.com/rss.xml",
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
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
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

