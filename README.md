# mini-mechanics
Welcome to Mini Mechanics Website!
https://minimechanics.github.io/mini-mechanics/#

# Mini Mechanics — Static site

This repository contains a static site scaffold designed for Mini Mechanics. It focuses on a matte-black, premium "kidult" aesthetic accented with Turbo Red and Electric Blue.

Included:
- index.html — main markup
- assets/css/styles.css — design system & styles
- assets/js/app.js — client-side product rendering, modal, filters, contact stub
- data/products.json — sample product and gallery data
- assets/images — placeholder images (replace with studio photos)

How to use:
1. Clone or create a new repo and add these files.
2. Replace images in `assets/images/*` with your product photography. Keep filenames or update `data/products.json`.
3. Host as a static site (GitHub Pages, Netlify, Vercel). If using GitHub Pages, push to `main` and enable Pages.

Accessibility & performance notes:
- Images should include descriptive alt text; use progressive JPEG/WebP for faster loads.
- Consider lazy-loading large gallery images and adding low-res placeholders for LCP improvement.
- Replace the contact form alert with a serverless function or form provider (Formspree, Netlify Forms, etc).

Brand & photography guidelines:
- Use studio-lit product shots on matte/black surfaces to preserve the matte aesthetic.
- Use strong rim lighting in Turbo Red or Electric Blue gels for hero & featured images.
- Provide 2-3 close-up detail images per product for product pages / lightbox.

Customization:
- Colors and tokens live in `styles.css` root variables.
- Product catalog is powered by `data/products.json` and can be replaced with an API endpoint if needed.

If you want, I can:
- Convert this to a Next.js or Astro project for SSR and better SEO.
- Add a Stripe cart & checkout integration.
- Build dedicated product pages and a CMS integration (Sanity, Contentful, Shopify) for inventory management.
