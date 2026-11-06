# Deploying this site on Vercel

No deployment has been done from this repo yet. The site is deploy-ready;
deploying takes one import in the Vercel dashboard.

## Import settings (exact)

- **Repository:** `nehilbhakta/portfolio`
- **Branch:** `main`
- **Framework preset:** Next.js
- **Root directory:** `./`
- **Build command:** `npm run build`
- **Output directory:** `.next` (default)
- **Install command:** `npm install`
- **Environment variables:** none

## Steps

1. Go to https://vercel.com/new and sign in (or create a free account).
2. Import the `nehilbhakta/portfolio` GitHub repository.
3. Confirm the framework preset is **Next.js** and leave build/output/install
   commands at their defaults.
4. Click **Deploy**.

## After deployment

- The production URL will be something like
  `https://portfolio-<suffix>.vercel.app`; a custom domain can be added later
  in the Vercel project settings.
- Every push to `main` redeploys automatically.
- No project on this site has a live app URL yet, so all project links point
  to GitHub (and Tableau Public for the E-Commerce dashboard). When a project
  is deployed, fill in its `liveUrl` field in `app/page.tsx` and the
  "Live app →" link will appear on its card.
