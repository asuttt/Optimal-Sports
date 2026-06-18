# Gym Site Template

CMS-driven public website starter for gym and wellness projects.

It includes:

- a Vite + React public site
- a Sanity Studio for editable page content
- optional hospitality support for menu PDFs, gallery images, and promo copy
- placeholder states so the site still renders before a new CMS project is connected

## Structure

- `src/`
  Frontend app for the public site.
- `studio/`
  Sanity Studio for page content, navigation, branding, and schedule data.

## Included Public Pages

- Home
- Our Story
- Facility
- Classes
- Training
- Memberships
- Schedule
- Privacy & Terms
- Hospitality
  Keep or remove this route depending on project needs.

## Local Development

Frontend:

```sh
npm install
npm run dev
```

Studio:

```sh
cd studio
npm install
npm run dev
```

Useful frontend commands:

```sh
npm run build
npm run test
npm run lint
```

Useful Studio commands:

```sh
cd studio
npm run build
npm run deploy
```

## Environment

Frontend uses `src/lib/sanity/client.ts` and reads:

```sh
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-02-23
VITE_MINDBODY_STUDIO_ID=
```

See `.env.example`.

Studio uses:

```sh
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=Gym Site Template
```

See `studio/.env.example`.

If the Sanity values are blank, the frontend falls back to starter placeholders and the Studio stays template-configured until you wire it to a real project.

## Notes

- Branding is CMS-first. If logos or favicons are missing, the site shows neutral fallback marks instead of client-specific assets.
- Legacy internal-app code, Supabase wiring, staff pages, and keytag tooling have been removed.
- The hospitality module is intentionally preserved as an optional feature so future projects can keep or remove it quickly.

## License

UNLICENSED
