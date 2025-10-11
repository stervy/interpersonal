# Setup Guide

This guide will walk you through setting up the Interpersonal project from scratch.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

That's it! Open [http://localhost:3000](http://localhost:3000) to see your site.

## What's Included

The project comes with:

- ✅ Next.js 14 with App Router configured
- ✅ TypeScript setup
- ✅ Tailwind CSS with custom brand tokens
- ✅ shadcn/ui components pre-installed
- ✅ Contentlayer for MDX blog posts
- ✅ 2 sample blog posts
- ✅ 2 sample practice directory entries
- ✅ All pages implemented (home, practice, blog, about, contact)
- ✅ SEO configuration (metadata, OpenGraph, sitemap, robots.txt)
- ✅ RSS feed for blog
- ✅ Contact form API route

## Project Structure Overview

```
interpersonal/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   └── contact/        # Contact form API
│   │   ├── blog/               # Blog pages
│   │   │   ├── [slug]/         # Dynamic blog post pages
│   │   │   └── page.tsx        # Blog index
│   │   ├── practice/           # Practice directory
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── globals.css         # Global styles & CSS variables
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Home page
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   ├── robots.ts           # robots.txt configuration
│   │   └── rss.xml/            # RSS feed route
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── skeleton.tsx
│   │   ├── container.tsx       # Layout container
│   │   ├── section.tsx         # Section spacing utility
│   │   ├── header.tsx          # Site header with navigation
│   │   ├── footer.tsx          # Site footer
│   │   └── logo.tsx            # Site logo/wordmark
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn helper)
│   └── data/
│       └── practice.json       # Practice directory data
├── content/
│   └── blog/                   # MDX blog posts
│       ├── the-power-of-authentic-relating.mdx
│       └── five-keys-to-effective-communication.mdx
├── contentlayer.config.js      # Contentlayer configuration
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies
```

## Development Workflow

### Starting Development

```bash
npm run dev
```

This starts the development server with:
- Hot reload enabled
- Contentlayer watching for MDX changes
- Available at http://localhost:3000

### Building for Production

```bash
npm run build
```

This will:
1. Process MDX files with Contentlayer
2. Build the Next.js app
3. Generate static pages where possible
4. Output to `.next/` directory

### Testing Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Customization Guide

### 1. Brand Colors

Update in `src/app/globals.css`:

```css
:root {
  --brand: #2F7D73;        /* Primary brand color */
  --brand-ink: #0D1B1E;    /* Dark text color */
  --brand-accent: #D6F1EC; /* Light accent color */
}
```

These are automatically available in Tailwind as `brand`, `brand-ink`, and `brand-accent`.

### 2. Fonts

Configured in `src/app/layout.tsx`:

```typescript
// Body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Heading font
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "600", "700"],
})
```

To use different fonts:
1. Import from `next/font/google`
2. Update the variable names
3. Update CSS variable names in `tailwind.config.ts`

### 3. Site Metadata

Update in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://interpersonal.com"),
  title: {
    default: "Interpersonal - Building Stronger Connections",
    template: "%s | Interpersonal",
  },
  description: "...",
  // ... more metadata
}
```

### 4. Navigation

Update navigation links in `src/components/header.tsx`:

```typescript
const navigation = [
  { name: "Practice", href: "/practice" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]
```

### 5. Footer Links

Update footer links in `src/components/footer.tsx`:

```typescript
const footerLinks = {
  product: [
    { name: "Practice Directory", href: "/practice" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ],
  support: [
    { name: "Contact", href: "/contact" },
    { name: "RSS Feed", href: "/rss.xml" },
  ],
}
```

## Content Management

### Adding Blog Posts

1. Create a new `.mdx` file in `content/blog/`:

```bash
touch content/blog/my-new-post.mdx
```

2. Add frontmatter and content:

```mdx
---
title: "My New Post"
description: "A great post about relationships"
date: "2024-10-11"
author: "Your Name"
tags: ["Tag1", "Tag2"]
---

Your content here with full MDX support...

## Headings work

- Lists work
- **Bold** and *italic* work

[Links work](https://example.com)
```

3. The post will automatically appear on `/blog` and be included in:
   - Blog index page
   - Sitemap
   - RSS feed
   - Home page (if recent)

### Editing Practice Directory

Edit `src/data/practice.json`:

```json
{
  "practices": [
    {
      "id": "unique-id-1",
      "title": "Practice Name",
      "organization": "Organization Name",
      "description": "Brief description...",
      "location": "City, State",
      "cadence": "Weekly on Thursdays, 7-9 PM",
      "tags": ["Tag1", "Tag2"],
      "contact": "email@example.com",
      "website": "https://example.com"
    }
  ]
}
```

**Fields:**
- `id` (required): Unique identifier
- `title` (required): Practice name
- `organization` (required): Organization name
- `description` (required): Brief description
- `location` (required): Location string
- `cadence` (required): Schedule/frequency
- `tags` (required): Array of tags for filtering
- `contact` (optional): Email address
- `website` (optional): Website URL

## Adding New shadcn/ui Components

To add more shadcn/ui components:

```bash
npx shadcn-ui@latest add [component-name]
```

Examples:

```bash
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add form
```

Components will be added to `src/components/ui/`.

## Environment Variables

For local development, create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set environment variables in your hosting platform (Vercel, etc.).

## TypeScript

TypeScript is configured and strict mode is enabled. Key configuration in `tsconfig.json`:

- Path alias: `@/*` → `./src/*`
- Strict mode enabled
- Includes Contentlayer generated types

## Accessibility Features

The site includes:

- ✅ Semantic HTML (header, nav, main, footer, article, section)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus visible states (ring-2 on focus)
- ✅ Color contrast ratios meet WCAG AA
- ✅ Skip links for screen readers

## Performance Optimizations

Included optimizations:

- ✅ Next.js Image optimization (ready to use)
- ✅ Font optimization with `next/font`
- ✅ Automatic code splitting
- ✅ Static generation where possible
- ✅ Lazy loading components

## Next Steps

1. **Customize branding** (colors, fonts, copy)
2. **Add your content** (blog posts, practice entries)
3. **Update metadata** (titles, descriptions, OpenGraph images)
4. **Test locally** (`npm run dev`)
5. **Deploy to Vercel** (see DEPLOYMENT.md)
6. **Set up custom domain**
7. **Add analytics** (optional)
8. **Implement email sending** in contact form (optional)

## Getting Help

- Check the [README.md](./README.md) for overview
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- Review Next.js docs: https://nextjs.org/docs
- Review shadcn/ui docs: https://ui.shadcn.com
- Review Contentlayer docs: https://contentlayer.dev

## Common Tasks

### Change rounded corner radius

Update in `tailwind.config.ts`:

```typescript
--radius: 1rem; // Default (rounded-2xl)
```

### Add a new page

1. Create `src/app/my-page/page.tsx`:

```typescript
export default function MyPage() {
  return <div>My new page</div>
}
```

2. Add to navigation in `src/components/header.tsx`

### Add Google Analytics

Add to `src/app/layout.tsx` in the `<head>`:

```typescript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### Implement email sending in contact form

Update `src/app/api/contact/route.ts` to use a service like:
- Resend
- SendGrid
- Mailgun
- Postmark
- Nodemailer with SMTP

Example with Resend:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { name, email, subject, message } = await request.json()
  
  await resend.emails.send({
    from: 'contact@interpersonal.com',
    to: 'hello@interpersonal.com',
    subject: subject,
    html: `<p>From: ${name} (${email})</p><p>${message}</p>`
  })
  
  return NextResponse.json({ success: true })
}
```

## Troubleshooting

### Contentlayer build fails

**Solution:** Check MDX frontmatter is valid YAML. All required fields must be present.

### Styles not applying

**Solution:** Make sure Tailwind is processing your files. Check `tailwind.config.ts` content array.

### Components not found

**Solution:** Check path alias is working. Import should use `@/` prefix.

### TypeScript errors

**Solution:** Run `npm run build` to regenerate Contentlayer types.

## License

MIT - Feel free to use this starter for your own projects!

