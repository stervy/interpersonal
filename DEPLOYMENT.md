# Deployment Guide

This guide provides step-by-step instructions for deploying Interpersonal to Vercel and running it locally.

## Running Locally

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Steps

1. **Clone or navigate to the repository:**

```bash
cd interpersonal
```

2. **Install dependencies:**

```bash
npm install
```

This will also run `contentlayer build` automatically via the postinstall script.

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

You should see:
- Home page with hero, featured practices, and latest blog posts
- Practice directory at `/practice` with search and filtering
- Blog at `/blog` with posts
- Individual blog posts at `/blog/[slug]`
- About page at `/about`
- Contact page at `/contact`

### Development Tips

- Hot reload is enabled — changes to files will automatically update
- Contentlayer watches for changes to MDX files in `content/blog/`
- If you add new blog posts, they'll be automatically picked up
- Edit `src/data/practice.json` to modify practice directory entries

## Building for Production

```bash
npm run build
```

This will:
1. Run `contentlayer build` to process MDX files
2. Build the Next.js application
3. Output to `.next/` directory

To test the production build locally:

```bash
npm run start
```

## Deploying to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub:**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Visit [vercel.com](https://vercel.com)** and sign in

3. **Click "Add New Project"**

4. **Import your GitHub repository**

5. **Configure your project:**
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

6. **Add Environment Variables (optional):**
   - `NEXT_PUBLIC_SITE_URL` — Your production URL (e.g., https://interpersonal.com)

7. **Click "Deploy"**

Vercel will:
- Install dependencies
- Run postinstall script (builds Contentlayer)
- Build the Next.js app
- Deploy to production

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**

```bash
npm i -g vercel
```

2. **Login to Vercel:**

```bash
vercel login
```

3. **Deploy:**

```bash
vercel
```

Follow the prompts to configure and deploy your project.

For production deployment:

```bash
vercel --prod
```

## Post-Deployment Configuration

After deploying, update the following files with your production domain:

### 1. Update metadata URLs

**File: `src/app/layout.tsx`**

```typescript
metadataBase: new URL("https://your-actual-domain.com")
```

### 2. Update sitemap URLs

**File: `src/app/sitemap.ts`**

```typescript
const baseUrl = "https://your-actual-domain.com"
```

### 3. Update RSS feed URLs

**File: `src/app/rss.xml/route.ts`**

```typescript
const baseUrl = "https://your-actual-domain.com"
```

### 4. Update robots.txt

**File: `src/app/robots.ts`**

```typescript
sitemap: "https://your-actual-domain.com/sitemap.xml"
```

Commit and push these changes, and Vercel will automatically redeploy.

## Custom Domain

To add a custom domain on Vercel:

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

## Environment Variables

If you need environment variables:

1. Create `.env.local` for local development
2. Add variables via Vercel dashboard: Settings → Environment Variables

Example variables:

```bash
NEXT_PUBLIC_SITE_URL=https://interpersonal.com
```

## Verifying Deployment

After deployment, verify:

- ✅ Home page loads correctly
- ✅ Blog posts are accessible at `/blog` and `/blog/[slug]`
- ✅ Practice directory works at `/practice`
- ✅ Contact form submits (check API route)
- ✅ Sitemap is accessible at `/sitemap.xml`
- ✅ RSS feed is accessible at `/rss.xml`
- ✅ Robots.txt is accessible at `/robots.txt`
- ✅ Navigation and links work
- ✅ Fonts load correctly
- ✅ Styling is consistent

## Troubleshooting

### Build Fails on Vercel

**Issue:** Contentlayer build fails

**Solution:** Make sure all MDX files in `content/blog/` have valid frontmatter

### Fonts Not Loading

**Issue:** Fonts don't appear correctly

**Solution:** Check that Google Fonts are imported correctly in `src/app/layout.tsx`

### 404 on Blog Posts

**Issue:** Blog post pages return 404

**Solution:** Ensure Contentlayer built successfully. Check `.contentlayer/generated` directory exists

### Practice Directory Empty

**Issue:** Practice directory shows no results

**Solution:** Verify `src/data/practice.json` exists and has valid JSON structure

## Analytics & Monitoring (Optional)

Consider adding:

- **Vercel Analytics:** Built-in, enable in dashboard
- **Google Analytics:** Add tracking code to `layout.tsx`
- **Sentry:** For error tracking
- **Plausible/Fathom:** Privacy-friendly analytics

## Continuous Deployment

Vercel automatically deploys:

- **Production:** When you push to `main` branch
- **Preview:** When you open a pull request

This enables a smooth workflow:
1. Create feature branch
2. Make changes
3. Open pull request → Preview deployment
4. Merge to main → Production deployment

## Performance Optimization

After deployment, check:

- Lighthouse scores (Vercel provides these automatically)
- Core Web Vitals
- Image optimization
- Font loading

Vercel optimizes automatically, but you can further improve by:
- Adding `priority` to above-the-fold images
- Lazy loading components
- Using Next.js Image component

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Contact Vercel support

For application issues:
- Review application logs
- Check browser console for errors
- Verify all API routes are working

