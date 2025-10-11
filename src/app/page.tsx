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
              Building Stronger Connections
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Discover meaningful practices, resources, and insights to strengthen your interpersonal relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/practice">
                  Explore Practices <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">Read the Blog</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Practices */}
      <Section>
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-ink mb-2">
                Featured Practices
              </h2>
              <p className="text-muted-foreground">
                Connect with groups and resources in your area
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

      {/* Latest Blog Posts */}
      <Section className="bg-muted/30">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-ink mb-2">
                Latest Posts
              </h2>
              <p className="text-muted-foreground">
                Insights and perspectives on building connections
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

