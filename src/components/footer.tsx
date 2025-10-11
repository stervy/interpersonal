import Link from "next/link"
import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  product: [
    { name: "Skills & Insights", href: "/blog" },
    { name: "T-Groups", href: "/t-groups" },
    { name: "Professional Support", href: "/practice" },
    { name: "About", href: "/about" },
  ],
  support: [
    { name: "Contact", href: "/contact" },
    { name: "RSS Feed", href: "/rss.xml" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background" role="contentinfo">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <Logo />
              <p className="mt-4 text-sm text-muted-foreground max-w-md">
                Develop essential interpersonal skills through expert insights, practical techniques, and professional support. Master communication, emotional intelligence, and authentic connection.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Interpersonal. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

