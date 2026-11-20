# godwinakpan.si — flagship site

Next.js 15 (App Router) · TypeScript · Tailwind · Lenis + GSAP + Framer Motion · Postgres (Drizzle) · custom CMS at `/admin` · Medium sync · Netlify.

## Run locally
```
npm install
cp .env.example .env.local   # fill in values (DATABASE_URL optional)
npm run dev
```
Without `DATABASE_URL` the site runs on the built-in content in `src/lib/seed.ts` (the CMS shows a "no database" notice).

## Where things live
| Path | What |
|---|---|
| `src/lib/seed.ts` | Built-in content: copy, credentials, projects, initiatives, topics, starter posts, image slots |
| `src/app/*` | Public pages: `/`, `/about`, `/work`, `/initiatives`, `/speaking-media`, `/insights`, `/contact` |
| `src/app/admin` | CMS: insights editor (Markdown, schedule, tags, cover upload), Medium sync, work, media swap, inquiries, settings |
| `src/db/schema.ts` | Tables: `posts`, `projects`, `media_assets`, `inquiries`, `site_settings` |
| `src/lib/medium.ts` | Medium RSS reader (canonical links back to Medium) |
| `netlify/functions/medium-cron.mts` | Re-syncs Medium every 6 hours |
| `public/media` | Real photos from the Drive studio shoot |

Colours follow the brand style guide: black/white, Disrupt Red leads, one accent per layout, never gold.
Search the code for `TODO: Replace` to find every image slot still waiting for a Drive asset.

See `LAUNCH.md` for deployment.
