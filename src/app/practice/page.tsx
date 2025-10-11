import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { PracticeDirectory } from "@/components/practice-directory"
import practiceData from "@/data/practice.json"

export const metadata = {
  title: "Professional Support & Practice Groups",
  description: "Find therapists, coaches, and practice groups to develop your interpersonal skills. Connect with professionals specializing in communication, emotional intelligence, and relationship building.",
}

export default function PracticePage() {

  return (
    <>
      <Section className="bg-gradient-to-b from-brand-accent/30 to-background pt-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-ink mb-4">
              Professional Support & Practice
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with therapists, coaches, and practice groups to accelerate your interpersonal skills development. Find professionals specializing in communication, emotional intelligence, and relationship building.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <PracticeDirectory practices={practiceData.practices} />
        </Container>
      </Section>
    </>
  )
}

