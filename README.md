# ismails-portfolio

A minimal Astro portfolio, ready for static deployment on Vercel.

## Local development

```sh
npm ci
npm run dev
```

Run `npm run check` to check Astro templates and TypeScript before building.

## Project structure

```text
src/
├── components/           # Reusable Astro UI
│   ├── experiments/     # Experimental portfolio illustrations
│   ├── icons/           # Brand icons
│   ├── work/            # Project list and toolbox
│   ├── Header.astro
│   ├── HeaderDropdown.astro
│   ├── SavedWork.astro   # Optional homepage sections
│   └── ThemeToggle.astro
├── data/                 # Content and its TypeScript contracts
│   ├── experiments.ts   # Garden notes, resources, section metadata
│   ├── navigation.ts    # Header destinations
│   ├── profile.ts       # Name, bio, GitHub URL, tagline
│   ├── projects.ts      # Projects, technology stacks, repositories
│   └── tools.ts         # Toolbox and shared Technology type
├── layouts/              # Shared document shell and metadata
├── pages/                # File-based routes
├── scripts/              # Browser interactions
└── styles/               # Global and experimental styles
public/                   # Static assets: avatar, fonts, SVG icons
```

### Where to make changes

- **Bio and identity:** `src/data/profile.ts`.
- **Projects:** `src/data/projects.ts`. Entries are checked against the `Project`
  interface; icon keys are limited to the supported project icons.
- **Technologies:** `src/data/tools.ts`; SVG filenames refer to `public/icons/`.
- **Homepage content and layout:** `src/pages/index.astro`.
- **Navigation destinations:** `src/data/navigation.ts`.
- **Theme and menu behavior:** `src/scripts/header.ts`.
- **Experimental portfolio:** `src/pages/experiments.astro`, with its dedicated
  components, data, script, and stylesheet.

Keep content in `data/`, reusable markup in `components/`, and browser behavior
in `scripts/`. Route files compose those pieces. `/projects/` and `/stack/` render the existing
project and technology data. `/notes/` and `/uses/` remain honest placeholders
until content is ready. The homepage stays minimal.

## UI behavior and review

- The hamburger reveals a labelled horizontal menu on desktop and a vertical
  menu on screens up to 600px. Hover-opened menus stay open when the pointer
  leaves; click the toggle/outside, press Escape, or Tab out to close.
- Menu links support arrow keys, Home, End, and ordinary Tab navigation.
- Theme preference persists locally; without JavaScript, the site follows the
  system theme and provides plain navigation links.
- **Alt + Shift + T** toggles the theme. On `/experiments/`, **Alt + Shift +
  W/G/S/R/B** opens the matching section. Plain letters do not trigger actions.
- Experimental project previews have a pause/resume button, pause while hovered
  or focused, and do not auto-rotate with reduced motion enabled.

When changing UI, check all routes at 320px, 375px, 768px, desktop, and landscape
sizes, in both themes. Verify menu dismissal, visible keyboard focus, browser
Back/Forward, reduced motion, and no-JavaScript navigation. Automated
accessibility checks complement—but do not replace—manual usability review.

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
