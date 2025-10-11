import { getAllPosts } from "@/lib/blog"

export async function GET() {
  const baseUrl = "https://interpersonal.com"
  const posts = getAllPosts()

  const rssItemsXml = posts
    .map((post) => {
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${baseUrl}${post.url}</link>
          <guid>${baseUrl}${post.url}</guid>
          <description><![CDATA[${post.description}]]></description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <author><![CDATA[${post.author}]]></author>
          ${post.tags?.map((tag) => `<category>${tag}</category>`).join("\n          ") || ""}
        </item>
      `.trim()
    })
    .join("\n")

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Interpersonal Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights and perspectives on building interpersonal connections and relationships.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItemsXml}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

