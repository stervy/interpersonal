import { notFound } from "next/navigation"
import Link from "next/link"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get prev/next posts
  const sortedPosts = getAllPosts()
  const currentIndex = sortedPosts.findIndex((p) => p.slug === params.slug)
  const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null

  return (
    <>
      <Section>
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-brand mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            {/* Post header */}
            <header className="mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-ink mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <time dateTime={post.date}>
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
                <span>·</span>
                <span>{post.author}</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            <Separator className="mb-8" />

            {/* Post content */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={post.content} />
            </div>

            {/* Prev/Next navigation */}
            {(prevPost || nextPost) && (
              <>
                <Separator className="my-12" />
                <nav className="grid gap-4 sm:grid-cols-2" aria-label="Post navigation">
                  {prevPost && (
                    <Link
                      href={prevPost.url}
                      className="group rounded-2xl border p-6 hover:border-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </div>
                      <div className="font-serif font-semibold group-hover:text-brand transition-colors">
                        {prevPost.title}
                      </div>
                    </Link>
                  )}
                  {nextPost && (
                    <Link
                      href={nextPost.url}
                      className="group rounded-2xl border p-6 hover:border-brand transition-colors text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                        <span>Next</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <div className="font-serif font-semibold group-hover:text-brand transition-colors">
                        {nextPost.title}
                      </div>
                    </Link>
                  )}
                </nav>
              </>
            )}
          </article>
        </Container>
      </Section>
    </>
  )
}

