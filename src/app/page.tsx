import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import practiceData from "@/data/practice.json"
import { getAllPosts } from "@/lib/blog"

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3)

  const featuredPractices = practiceData.practices.slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-brand-accent/30 to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-brand-ink mb-6">
              Master the Art of Human Connection
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Develop essential interpersonal skills through expert insights, practical resources, and proven techniques for better communication and deeper relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/blog">
                  Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/t-groups">Explore T-Groups</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Skills Section */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-ink mb-4">
              Essential Interpersonal Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Build the foundation for meaningful relationships and effective communication
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="font-serif text-xl font-semibold mb-3">Active Listening</h3>
              <p className="text-muted-foreground">
                Learn to truly hear and understand others, building trust and deeper connections through present, empathetic listening.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="font-serif text-xl font-semibold mb-3">Emotional Intelligence</h3>
              <p className="text-muted-foreground">
                Develop awareness of your emotions and others', improving your ability to navigate social situations with grace.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="font-serif text-xl font-semibold mb-3">Conflict Resolution</h3>
              <p className="text-muted-foreground">
                Master techniques for addressing disagreements constructively, turning conflicts into opportunities for growth.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="font-serif text-xl font-semibold mb-3">Authentic Relating</h3>
              <p className="text-muted-foreground">
                Practice showing up genuinely in relationships, fostering vulnerability and deeper human connection.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="font-serif text-xl font-semibold mb-3">Nonviolent Communication</h3>
              <p className="text-muted-foreground">
                Express needs clearly and compassionately while understanding others without judgment or blame.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="font-serif text-xl font-semibold mb-3">Boundary Setting</h3>
              <p className="text-muted-foreground">
                Learn to communicate your limits clearly and respectfully, maintaining healthy relationships.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Support & Practice Section */}
      <Section className="bg-muted/30">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-ink mb-2">
                Professional Support & Practice
              </h2>
              <p className="text-muted-foreground">
                Find therapists, coaches, and practice groups to accelerate your growth
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/practice">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPractices.map((practice) => (
              <Card key={practice.id}>
                <CardHeader>
                  <CardTitle>{practice.title}</CardTitle>
                  <CardDescription>{practice.organization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {practice.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {practice.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>{practice.location}</p>
                    <p>{practice.cadence}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* T-Groups Highlight */}
      <Section className="bg-gradient-to-r from-brand/5 to-brand-accent/20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-ink mb-4">
                  Ready for Deep Transformation?
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  T-groups (Training groups) offer intensive experiential learning that accelerates 
                  interpersonal skills development through group dynamics, real-time feedback, and 
                  deep self-exploration.
                </p>
                <p className="text-muted-foreground mb-6">
                  Programs like Stanford's T-Group, Leaders in Tech, and Juncture provide transformative 
                  experiences for developing emotional intelligence, authentic leadership, and group facilitation skills.
                </p>
                <Button asChild size="lg">
                  <Link href="/t-groups">
                    Explore T-Group Programs <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-serif text-xl font-semibold mb-4">What You'll Gain:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Deep self-awareness and understanding of your impact on others</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Enhanced emotional intelligence and empathy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Authentic leadership and group facilitation skills</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm">Lasting community with fellow participants</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Latest Blog Posts */}
      <Section>
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-ink mb-2">
                Latest Insights & Guides
              </h2>
              <p className="text-muted-foreground">
                Expert advice and practical techniques for developing interpersonal skills
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/blog">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Card key={post.slug}>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), "MMM d, yyyy")}
                    </time>
                  </div>
                  <CardTitle>
                    <Link 
                      href={post.url} 
                      className="hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}

