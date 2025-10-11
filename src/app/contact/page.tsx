import { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Container } from "@/components/container"
import { Section } from "@/components/section"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Interpersonal. Questions about T-groups, adding your practice to our directory, or collaborating? We'd love to hear from you.",
}

export default function ContactPage() {
  return (
    <>
      <Section className="bg-gradient-to-b from-brand-accent/30 to-background pt-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-ink mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Questions about T-groups, adding your practice to our directory, or collaborating? We'd love to hear from you.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  )
}
