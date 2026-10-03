# ismails-portfolio

A minimal Astro portfolio, ready for static deployment on Vercel.

## Local development

```sh
npm ci
npm run dev
```

Edit `src/pages/index.astro` to customize the homepage.

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
