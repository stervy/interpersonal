import Link from "next/link"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { getAllPosts } from "@/lib/blog"

export const metadata = {
  title: "Blog",
  description: "Insights and perspectives on building interpersonal connections and relationships.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  // Get all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  ).sort()

  return (
    <>
      <Section className="bg-gradient-to-b from-brand-accent/30 to-background pt-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-ink mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights and perspectives on building interpersonal connections and relationships.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          {/* All tags */}
          {allTags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold mb-3">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Posts */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), "MMM d, yyyy")}
                    </time>
                    <span>·</span>
                    <span>{post.author}</span>
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
                <CardContent className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <Badge key={tag} variant="default">
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

