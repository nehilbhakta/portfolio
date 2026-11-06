# Nehil Bhakta — Portfolio

Portfolio website for **Nehil Bhakta**, Frontend & Full-Stack Developer
(React, Next.js, TypeScript) and MS IT student at Arizona State University.

Built with **Next.js 15 / React 19 / TypeScript**, plain CSS (no CSS framework),
dark violet-on-navy default theme with a working light theme toggle.

## What's on the site

- Hero with a theme-aware 3D avatar (dark-navy version in dark theme,
  light-lavender version in light theme), availability pill (Tempe, AZ),
  role chips, and Download CV / GitHub / LinkedIn buttons.
- 01 About — stats (6 projects, GPA 3.78/4.0, B.Tech 9.5/10, 2+ years at Ordex).
- 02 Journey — Work Experience / Education toggle with timeline + detail card.
- 03 Toolbox — Frontend, Backend, Databases, Cloud & Data, Tools.
- 04 Selected work — TaskBoard featured first, then RLVR Environment, Supply
  Chain KPI Dashboard, Heart Attack Risk Prediction, Restaurant Reservation API,
  E-Commerce Sales Dashboard. Every project card shows a visual image.
- 05 Contact — email nbhakta@asu.edu (tap-to-copy) and phone (806) 544-8653
  (tap-to-call) only.

The CV download (`public/Nehil_Bhakta_Resume.pdf`, 2 pages) is Nehil's improved
resume, converted from the DOCX via LibreOffice DOCX → ODT → PDF.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy on Vercel (one-click import)

| Setting | Value |
|---|---|
| Repository | `nehilbhakta/portfolio` |
| Branch | `main` |
| Framework preset | **Next.js** |
| Root directory | `./` (repository root) |
| Build command | `npm run build` (default) |
| Output directory | `.next` (default — leave as-is) |
| Install command | `npm install` (default) |
| Environment variables | None needed |

Steps: in the Vercel dashboard, **Add New → Project → Import** the
`nehilbhakta/portfolio` repository, keep the defaults above, and click
**Deploy**. No accounts or configuration beyond the import are required.
