# ismails-portfolio

A minimal Astro portfolio, ready for static deployment on Vercel.

## Local development

```sh
npm ci
npm run dev
```

Edit `src/pages/index.astro` to customize the homepage.

Run `npm run check` to check Astro templates and TypeScript before building.

## Components and icons

Import interface icons directly from `@lucide/astro`:

```astro
---
import { Sun, Folder } from '@lucide/astro';
---
<Sun size={18} stroke-width={1.5} />
<Folder size={20} class="text-muted" />
```

The GitHub logo is available as `src/components/icons/GitHubIcon.astro`.
`HeaderDropdown.astro` shares the header dropdown markup, and
`src/scripts/header.ts` handles keyboard navigation and theme selection.
The optional project and toolbox sections are preserved in `SavedWork.astro`;
import and render it when those sections are ready to appear on the homepage.

## Production build

```sh
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Git and Vercel

Create an empty repository on GitHub, then run:

```sh
git init -b main
git add .
git commit -m "Initialize Astro portfolio"
git remote add origin https://github.com/algorrismo/ismails-portfolio.git
git push -u origin main
```

In Vercel, choose **Add New → Project** and import that repository.
Use the **Astro** framework preset, `npm run build` as the build command,
and `dist` as the output directory. Click **Deploy**.

Vercel automatically deploys future pushes to the connected repository.
A static Astro site does not need the Vercel adapter.

Deployment documentation: https://vercel.com/docs/frameworks/frontend/astro
