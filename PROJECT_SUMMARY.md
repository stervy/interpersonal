# Interpersonal - Project Summary

## Overview

A production-ready Next.js 14 application for **Interpersonal.com** — a platform for discovering meaningful practices and resources to build stronger interpersonal connections and relationships.

**Status:** ✅ Complete and ready to deploy

## Technology Stack

- **Framework:** Next.js 14.0.4 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.3 with custom brand tokens
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Content:** Contentlayer 0.3.4 for MDX blog posts
- **Icons:** Lucide React
- **Fonts:** Inter (body), Source Serif 4 (headings)
- **Date Handling:** date-fns 3.0

## Project Structure

```
interpersonal/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/
│   │   │   └── contact/route.ts      # Contact form API (returns 202)
│   │   ├── blog/
│   │   │   ├── [slug]/page.tsx       # Individual blog post pages
│   │   │   └── page.tsx              # Blog index with tag list
│   │   ├── practice/
│   │   │   └── page.tsx              # Practice directory with filtering
│   │   ├── about/page.tsx            # About page
│   │   ├── contact/page.tsx          # Contact form page
│   │   ├── globals.css               # Global styles + CSS variables
│   │   ├── layout.tsx                # Root layout with fonts & metadata
│   │   ├── page.tsx                  # Home page
│   │   ├── sitemap.ts                # Dynamic XML sitemap
│   │   ├── robots.ts                 # robots.txt configuration
│   │   └── rss.xml/route.ts          # RSS feed for blog
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx            # Button component
│   │   │   ├── card.tsx              # Card components
│   │   │   ├── badge.tsx             # Badge component
│   │   │   ├── input.tsx             # Input component
│   │   │   ├── select.tsx            # Select dropdown
│   │   │   ├── separator.tsx         # Separator/divider
│   │   │   ├── tabs.tsx              # Tabs component
│   │   │   ├── tooltip.tsx           # Tooltip component
│   │   │   └── skeleton.tsx          # Loading skeleton
│   │   ├── container.tsx             # Layout container component
│   │   ├── section.tsx               # Section spacing component
│   │   ├── header.tsx                # Site header with navigation
│   │   ├── footer.tsx                # Site footer
│   │   └── logo.tsx                  # Logo/wordmark component
│   ├── lib/
│   │   └── utils.ts                  # Utility functions (cn helper)
│   └── data/
│       └── practice.json             # Practice directory data (2 entries)
├── content/
│   └── blog/                         # MDX blog posts (2 posts)
│       ├── the-power-of-authentic-relating.mdx
│       └── five-keys-to-effective-communication.mdx
├── Configuration Files
│   ├── package.json                  # Dependencies & scripts
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── tailwind.config.ts            # Tailwind configuration
│   ├── postcss.config.js             # PostCSS configuration
│   ├── next.config.js                # Next.js configuration
│   ├── contentlayer.config.js        # Contentlayer configuration
│   ├── components.json               # shadcn/ui configuration
│   ├── vercel.json                   # Vercel deployment config
│   └── .eslintrc.json                # ESLint configuration
└── Documentation
    ├── README.md                     # Main documentation
    ├── DEPLOYMENT.md                 # Deployment guide
    ├── SETUP.md                      # Setup guide
    └── PROJECT_SUMMARY.md            # This file
```

## Pages & Routes

### Home Page (`/`)
- **Features:**
  - Hero section with headline and CTA buttons
  - Featured Practices section (3 cards)
  - Latest Blog Posts section (3 cards)
  - Gradient background on hero
  - Responsive grid layouts

### Practice Directory (`/practice`)
- **Features:**
  - Search functionality (searches title, org, description)
  - Tag filter dropdown
  - Location filter dropdown
  - Filterable directory of practices
  - Practice cards with:
    - Title and organization
    - Description
    - Tags as badges
    - Location and schedule
    - Contact email and website links
  - Empty state when no results
  - Loading skeletons
  - Results count display

### Blog Index (`/blog`)
- **Features:**
  - All blog posts in grid layout
  - Tag list/cloud at top
  - Post cards showing:
    - Date and author
    - Title (clickable)
    - Description
    - Tags
  - Sorted by date (newest first)

### Blog Post (`/blog/[slug]`)
- **Features:**
  - Full MDX content with prose styling
  - Frontmatter display (title, date, author, tags)
  - Back to blog link
  - Previous/Next post navigation
  - Proper heading hierarchy
  - OpenGraph metadata per post
  - Responsive typography

### About Page (`/about`)
- **Features:**
  - Mission and values content
  - Prose styling for long-form content
  - CTAs to Contact and Practice pages
  - Sections for:
    - Mission
    - What We Offer
    - Practice Directory info
    - Blog & Resources info
    - Get Involved

### Contact Page (`/contact`)
- **Features:**
  - Contact form with:
    - Name (required)
    - Email (required, validated)
    - Subject (required)
    - Message (required)
  - Form validation
  - Success/error states
  - Submits to `/api/contact` endpoint
  - Card layout for form
  - Loading state on submit

## Components

### Layout Components
- **Container:** Max-width wrapper with responsive padding
- **Section:** Consistent vertical spacing utility
- **Header:** Sticky header with navigation, active link highlighting
- **Footer:** Multi-column footer with links and copyright
- **Logo:** Text-based wordmark with brand styling

### UI Components (shadcn/ui)
All components use:
- Radix UI primitives for accessibility
- Tailwind CSS for styling
- CVA for variant management
- Proper TypeScript types
- Focus-visible states
- Keyboard navigation support
- ARIA attributes

Components included:
- Button (multiple variants)
- Card (with header, content, footer subcomponents)
- Badge (for tags)
- Input (form input)
- Select (dropdown with search)
- Separator (horizontal rule)
- Tabs (tab navigation)
- Tooltip (hover/focus tooltips)
- Skeleton (loading states)

## Styling & Design

### Brand Colors
```css
--brand: #2F7D73        /* Primary teal */
--brand-ink: #0D1B1E    /* Dark text */
--brand-accent: #D6F1EC /* Light teal accent */
```

### Typography
- **Body:** Inter (Google Fonts)
- **Headings:** Source Serif 4 (Google Fonts)
- CSS variables: `--font-inter`, `--font-serif`

### Design Tokens
- **Border Radius:** 1rem (rounded-2xl) for all components
- **Focus States:** 2px ring with brand color
- **Spacing:** Consistent padding/margin using Tailwind scale
- **Responsive:** Mobile-first with breakpoints at sm, md, lg, xl

### Prose Styling
- @tailwindcss/typography plugin configured
- Custom prose colors using brand tokens
- Serif font for headings in blog posts
- Proper link styling and hover states

## Features

### ✅ Content Management
- **Blog:** MDX files in `/content/blog/` with frontmatter
- **Practice Directory:** JSON file at `/src/data/practice.json`
- Hot reload for content changes
- Automatic URL generation

### ✅ SEO & Metadata
- Global metadata with OpenGraph
- Per-page metadata
- Dynamic sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- RSS feed at `/rss.xml`
- Proper meta tags for social sharing
- Canonical URLs

### ✅ Accessibility
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus-visible states (ring-2)
- Proper heading hierarchy
- Alt text ready for images
- Color contrast ratios meet WCAG AA

### ✅ Performance
- Next.js automatic optimizations
- Font optimization with next/font
- Image optimization ready (Next.js Image)
- Static generation where possible
- Automatic code splitting
- CSS optimization

### ✅ Developer Experience
- TypeScript with strict mode
- ESLint configured
- Hot reload in development
- Path aliases (@/* for src/*)
- Contentlayer type generation
- Clear project structure

## Sample Content

### Blog Posts (2)
1. **"The Power of Authentic Relating"**
   - Author: Sarah Mitchell
   - Date: October 5, 2024
   - Tags: Authentic Relating, Connection, Practices
   - ~800 words with H2/H3 structure

2. **"Five Keys to Effective Communication in Relationships"**
   - Author: Dr. James Chen
   - Date: September 28, 2024
   - Tags: Communication, Relationships, Skills
   - ~900 words with structured sections

### Practice Entries (2)
1. **Authentic Relating Circle** (Connection Lab)
   - Location: San Francisco, CA
   - Weekly practice group
   - Tags: Authentic Relating, Group, Weekly

2. **Couples Therapy Practice** (Bay Area Relationship Center)
   - Location: Oakland, CA
   - By appointment
   - Tags: Therapy, Couples, 1-on-1

## API Routes

### `/api/contact` (POST)
- Accepts: name, email, subject, message
- Validates: required fields, email format
- Returns: 202 Accepted
- Error handling: 400 for validation, 500 for server errors
- Ready for email integration (currently logs to console)

## Configuration Files

### `package.json`
- All dependencies specified with versions
- Scripts: dev, build, start, lint
- Postinstall hook for Contentlayer

### `tailwind.config.ts`
- Custom brand colors
- Font family variables
- Typography plugin configured
- Extended theme with brand tokens
- Proper TypeScript types

### `contentlayer.config.js`
- Post document type definition
- Frontmatter fields (title, description, date, author, tags)
- Computed fields (slug, url)
- MDX processing

### `next.config.js`
- Contentlayer integration
- React strict mode
- Ready for additional configuration

### `components.json`
- shadcn/ui configuration
- Path aliases
- Style preferences
- RSC enabled

## Documentation

### README.md
- Overview and features
- Getting started guide
- Project structure
- Content management instructions
- Customization guide
- Deployment instructions
- Technology stack
- Scripts reference

### DEPLOYMENT.md
- Local development setup
- Building for production
- Vercel deployment (2 methods)
- Post-deployment configuration
- Custom domain setup
- Environment variables
- Verification checklist
- Troubleshooting guide
- Analytics setup
- CI/CD workflow

### SETUP.md
- Quick start guide
- What's included
- Detailed project structure
- Development workflow
- Customization guide (colors, fonts, metadata)
- Content management
- Adding shadcn/ui components
- Accessibility features
- Performance optimizations
- Common tasks
- Troubleshooting

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open http://localhost:3000

### Production Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
1. Push to GitHub
2. Import repository in Vercel
3. Deploy (automatic configuration)

## Post-Deployment Tasks

1. Update production domain in:
   - `src/app/layout.tsx` (metadataBase)
   - `src/app/sitemap.ts` (baseUrl)
   - `src/app/rss.xml/route.ts` (baseUrl)
   - `src/app/robots.ts` (sitemap URL)

2. Optional enhancements:
   - Add actual email sending to contact form
   - Add Google Analytics
   - Add more blog posts
   - Add more practice entries
   - Customize about page content
   - Add images/OG image
   - Set up monitoring/analytics

## Extensibility

The project is built to be easily extended:

### Add New Pages
Create `src/app/new-page/page.tsx` and it's automatically routed

### Add New Components
Use shadcn/ui: `npx shadcn-ui@latest add [component]`

### Add Blog Posts
Create `.mdx` files in `content/blog/` with frontmatter

### Add Practice Entries
Edit `src/data/practice.json` with new entries

### Customize Styling
All Tailwind classes can be modified, brand colors in `globals.css`

## Standards & Best Practices

### Code Quality
- ✅ TypeScript strict mode
- ✅ ESLint configured
- ✅ Consistent component patterns
- ✅ Proper error handling
- ✅ Type-safe throughout

### Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast

### Performance
- ✅ Static generation
- ✅ Code splitting
- ✅ Font optimization
- ✅ Minimal client JS

### SEO
- ✅ Meta tags
- ✅ OpenGraph
- ✅ Sitemap
- ✅ Robots.txt
- ✅ RSS feed
- ✅ Semantic HTML

## Production Readiness Checklist

- ✅ All pages implemented and functional
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ TypeScript with no errors
- ✅ Accessible (WCAG AA level)
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Error handling
- ✅ Loading states
- ✅ Empty states
- ✅ Form validation
- ✅ Sample content included
- ✅ Documentation complete
- ✅ Deployment ready (Vercel)
- ✅ Configuration files included
- ✅ Git-friendly (.gitignore)
- ✅ Security headers (vercel.json)

## Known Limitations

1. **Contact Form:** Currently returns 202 but doesn't send email
   - Ready for integration with email service
   - See SETUP.md for implementation guide

2. **Practice Directory:** Client-side filtering only
   - Works well for small-medium datasets
   - Consider API/database for large datasets (>100 entries)

3. **Blog Pagination:** Not implemented
   - Shows all posts on one page
   - Consider adding pagination if >20 posts

4. **Image Optimization:** No images included
   - Next.js Image component ready to use
   - Add images to `/public` directory

## License

MIT License - Free to use and modify

## Support

- Documentation in README.md, DEPLOYMENT.md, SETUP.md
- Next.js docs: https://nextjs.org/docs
- shadcn/ui docs: https://ui.shadcn.com
- Contentlayer docs: https://contentlayer.dev

---

**Project Status:** ✅ Complete and Production Ready

**Last Updated:** October 11, 2024

**Version:** 1.0.0

