# Launching the new site on a fresh Netlify site

The old Netlify site stays untouched. This creates a second, separate site.

## 1. Code on GitHub
Push this folder to a new GitHub repository (Claude can do this once the empty repo exists).

## 2. New Netlify site (5 min)
Netlify → **Add new site → Import an existing project → GitHub** → pick the new repo → **Deploy**. Netlify detects Next.js automatically.

## 3. Database (5 min)
Netlify → the new site → **Extensions → Netlify DB** (Neon Postgres) → enable. It adds `NETLIFY_DATABASE_URL` for you.
Nothing else to run: the first time you sign in to `/admin`, press **Set up database**. It creates the tables and adds the starter content.

## 4. Environment variables
Site configuration → Environment variables:
| Name | Value |
|---|---|
| `ADMIN_EMAIL` | the email you'll sign in to /admin with |
| `ADMIN_PASSWORD` | a strong password |
| `AUTH_SECRET` | any long random string (40+ characters) |
| `CRON_SECRET` | another random string (for the Medium auto-sync) |
| `SITE_URL` | `https://www.godwinakpan.ng` |
| `PRIMARY_HOST` | `www.godwinakpan.ng` (the domain everyone ends up on) |
| `RESEND_API_KEY` | optional: email alerts for new inquiries (resend.com, free tier) |
| `INQUIRY_TO` | inbox for those alerts |
Redeploy after adding them.

## 5. Domains (both, one forwards)
Netlify → Domain management → add `www.godwinakpan.ng` as the primary domain, then add `godwinakpan.ng`, `godwinakpan.com` and `www.godwinakpan.com` as domain aliases.
Point each domain's DNS at Netlify (nameservers, or the A/CNAME records Netlify shows). The site permanently redirects every alias to `PRIMARY_HOST`, so `.com` visitors land on `.ng`.
Note: `godwinakpan.com` is currently attached to the old Netlify site. Remove it there first, or keep the old site on its `.netlify.app` address.

## 6. First sign-in
Go to `/admin`, sign in, press **Medium sync → Sync now**, then swap photos under **Media** as Drive assets arrive.
