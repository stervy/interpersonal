import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "About - Our Mission to Develop Interpersonal Skills",
  description: "Learn about Interpersonal's mission to help people develop essential interpersonal skills through expert insights, practical resources, and professional support.",
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
              We believe that developing strong interpersonal skills is the foundation for a fulfilling life and meaningful relationships.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="font-serif text-3xl font-bold text-brand-ink">Our Mission</h2>
            <p>
              Interpersonal is dedicated to helping people develop essential interpersonal skills that
              transform their relationships and enhance their lives. We provide expert insights, practical
              techniques, and curated resources for building communication skills, emotional intelligence,
              and authentic connection.
            </p>

            <h2 className="font-serif text-3xl font-bold text-brand-ink">What We Offer</h2>
            <p>
              Our platform combines educational content with professional support to accelerate your
              interpersonal skills development. Whether you're looking to improve active listening,
              navigate conflict more effectively, or build deeper relationships, we provide the tools
              and guidance you need.
            </p>

            <h3 className="font-serif text-2xl font-semibold text-brand-ink">Expert Insights & Guides</h3>
            <p>
              Our blog features practical articles on essential interpersonal skills including communication
              techniques, emotional intelligence development, conflict resolution strategies, and authentic
              relating practices. Each piece combines research-backed insights with actionable steps you
              can apply immediately.
            </p>

            <h3 className="font-serif text-2xl font-semibold text-brand-ink">T-Groups & Experiential Learning</h3>
            <p>
              We curate information on intensive T-group programs (Training groups) that offer transformative
              experiential learning. Compare programs like Stanford's T-Group, Leaders in Tech, Juncture, and 
              NTL Institute to find the right intensive experience for accelerating your interpersonal skills development.
            </p>

            <h3 className="font-serif text-2xl font-semibold text-brand-ink">Professional Support Directory</h3>
            <p>
              Connect with therapists, coaches, and facilitators who specialize in interpersonal skills
              development. Find practice groups, workshops, and one-on-one support to accelerate your
              growth in communication, emotional intelligence, and relationship building.
            </p>

            <h2 className="font-serif text-3xl font-bold text-brand-ink">Get Involved</h2>
            <p>
              We're building a community of people committed to developing their interpersonal skills.
              Whether you're a therapist, coach, facilitator, or simply passionate about personal growth,
              we'd love to connect with you.
            </p>

            <div className="not-prose flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild>
                <Link href="/blog">Explore Skills & Insights</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/t-groups">View T-Group Programs</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

