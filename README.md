# Interpersonal

A production-ready Next.js 14 starter for **Interpersonal** (interpersonal.com) — a platform for discovering meaningful practices and resources to build stronger interpersonal connections and relationships.

Built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- ✨ **Next.js 14** with App Router
- 📝 **MDX Blog** powered by Contentlayer
- 🎨 **Tailwind CSS** with custom brand tokens
- 🧩 **shadcn/ui** components
- ♿ **Accessible** with semantic HTML and keyboard navigation
- 🔍 **SEO Optimized** with OpenGraph, sitemap, and RSS feed
- 📱 **Responsive** and mobile-friendly
- 🎯 **Practice Directory** with client-side filtering

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
interpersonal/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── blog/           # Blog pages
│   │   ├── practice/       # Practice directory
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── layout.tsx      # Root layout with fonts & metadata
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── header.tsx     # Site header
│   │   ├── footer.tsx     # Site footer
│   │   └── ...
│   ├── lib/               # Utility functions
│   └── data/              # JSON data files
├── content/
│   └── blog/              # MDX blog posts
├── contentlayer.config.js # Contentlayer configuration
└── tailwind.config.ts     # Tailwind configuration
```

## Content Management

### Adding Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2024-10-11"
author: "Author Name"
tags: ["Tag1", "Tag2"]
---

Your content goes here with full MDX support...
```

### Managing Practice Directory

Edit `src/data/practice.json`:

```json
{
  "practices": [
    {
      "id": "unique-id",
      "title": "Practice Name",
      "organization": "Organization Name",
      "description": "Description...",
      "location": "City, State",
      "cadence": "Weekly on Thursdays, 7-9 PM",
      "tags": ["Tag1", "Tag2"],
      "contact": "email@example.com",
      "website": "https://example.com"
    }
  ]
}
```

## Customization

### Brand Colors

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --brand: #2F7D73;
  --brand-ink: #0D1B1E;
  --brand-accent: #D6F1EC;
}
```

### Fonts

Fonts are configured in `src/app/layout.tsx`:
- **Body**: Inter (Google Fonts)
- **Headings**: Source Serif 4 (Google Fonts)

### Components

All UI components are in `src/components/ui/` and can be customized. They're built with Radix UI primitives and styled with Tailwind CSS.

## Deployment

### Deploy on Vercel

The easiest way to deploy is with [Vercel](https://vercel.com):

1. **Push your code to GitHub**

2. **Import your repository** on Vercel

3. **Configure environment variables** (if needed)

4. **Deploy!**

Vercel will automatically:
- Install dependencies
- Run `contentlayer build` (via postinstall)
- Build the Next.js app
- Deploy to a production URL

### Environment Variables

Update `src/app/layout.tsx` and other files to use your production domain:

```typescript
metadataBase: new URL("https://yourdomain.com")
```

Also update:
- `src/app/sitemap.ts`
- `src/app/rss.xml/route.ts`

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Technologies

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Contentlayer](https://contentlayer.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

## License

MIT

## Support

For questions or issues, please use the [contact form](/contact) or open an issue on GitHub.