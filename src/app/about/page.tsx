import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "About",
  description: "Learn more about Interpersonal and our mission to build stronger connections.",
}

export default function AboutPage() {
  return (
    <>
      <Section className="bg-gradient-to-b from-brand-accent/30 to-background pt-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-ink mb-6">
              About Interpersonal
            </h1>
            <p className="text-xl text-muted-foreground">
              We believe that meaningful connections are at the heart of a fulfilling life.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="font-serif text-3xl font-bold text-brand-ink">Our Mission</h2>
            <p>
              Interpersonal is dedicated to helping people build stronger, more meaningful connections
              in their lives. We curate resources, practices, and insights that support authentic relating,
              emotional intelligence, and relationship skills.
            </p>

            <h2 className="font-serif text-3xl font-bold text-brand-ink">What We Offer</h2>
            <p>
              Our platform provides access to a carefully curated directory of relationship practices,
              support groups, and therapy resources. We also publish thoughtful content exploring the
              art and science of human connection.
            </p>

            <h3 className="font-serif text-2xl font-semibold text-brand-ink">Practice Directory</h3>
            <p>
              Find vetted support groups, therapy practices, and interpersonal skill-building workshops
              in your area. Whether you're looking for couples therapy, authentic relating circles, or
              communication training, we help you discover the right resources.
            </p>

            <h3 className="font-serif text-2xl font-semibold text-brand-ink">Blog & Resources</h3>
            <p>
              Our blog features insights from relationship experts, practitioners, and community members
              who are passionate about deepening human connection. We cover topics ranging from communication
              skills to conflict resolution to building intimacy.
            </p>

            <h2 className="font-serif text-3xl font-bold text-brand-ink">Get Involved</h2>
            <p>
              We're always looking to expand our directory and connect with practitioners, facilitators,
              and organizations doing meaningful work in the interpersonal space.
            </p>

            <div className="not-prose flex gap-4 mt-8">
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/practice">Browse Practices</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

