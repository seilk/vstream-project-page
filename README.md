# vSTREAM — Project Page

Project page for **"Real-Time Visual Attribution Streaming in Thinking Model"** (ICML 2026 submission).

## Stack

- Next.js 15 (App Router, static export)
- React 19 + TypeScript 5
- three.js + `@react-three/fiber` + `drei` for the hero attention-graph background
- Tailwind 3.4 + CSS custom properties

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build

```bash
npm run build
# static site output in ./out
```

## Deploy

Hosted on Vercel. Pushes to `main` trigger a production deploy.

For GitHub Pages deployment, set `NEXT_PUBLIC_BASE_PATH=/vstream-project-page` before building.
