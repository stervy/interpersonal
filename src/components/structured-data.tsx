export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Interpersonal",
    "url": "https://interpersonal.com",
    "logo": "https://interpersonal.com/og-image.png",
    "description": "Develop essential interpersonal skills through expert insights, practical exercises, and curated resources. Learn communication, emotional intelligence, conflict resolution, and relationship-building skills.",
    "sameAs": [
      "https://twitter.com/interpersonal"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": "https://interpersonal.com/contact"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Interpersonal",
    "url": "https://interpersonal.com",
    "description": "Master the art of human connection through interpersonal skills development",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://interpersonal.com/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BlogSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Interpersonal Skills Blog",
    "description": "Expert articles and practical techniques for developing communication, emotional intelligence, and relationship-building skills.",
    "url": "https://interpersonal.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Interpersonal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://interpersonal.com/og-image.png"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ArticleSchemaProps {
  title: string
  description: string
  datePublished: string
  author: string
  url: string
  tags?: string[]
}

export function ArticleSchema({ title, description, datePublished, author, url, tags }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": datePublished,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Interpersonal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://interpersonal.com/og-image.png"
      }
    },
    "url": `https://interpersonal.com${url}`,
    "keywords": tags?.join(", "),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://interpersonal.com${url}`
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

