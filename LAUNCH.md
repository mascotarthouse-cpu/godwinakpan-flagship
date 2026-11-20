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
| `SITE_URL` | `https://www.godwinakpan.si` |
| `PRIMARY_HOST` | `www.godwinakpan.si` (the domain everyone ends up on) |
| `RESEND_API_KEY` | optional: email alerts for new inquiries (resend.com, free tier) |
| `INQUIRY_TO` | inbox for those alerts |
Redeploy after adding them.

## 5. Domain: www.godwinakpan.si
1. Netlify → the new site → **Domain management → Add a domain** → `www.godwinakpan.si`. Netlify also adds `godwinakpan.si` and forwards it to www.
2. At your .si registrar, add these DNS records (or switch the nameservers to the four Netlify shows, which is easiest):
   | Type | Host | Value |
   |---|---|---|
   | CNAME | `www` | `<your-site>.netlify.app` |
   | A | `@` (godwinakpan.si) | `75.2.60.5` |
   Delete any other A, AAAA or CNAME records on `@` and `www` first.
3. Wait for Netlify to show the domain as verified (minutes to a few hours), then press **Verify DNS** and **Provision certificate** under HTTPS if it hasn't started on its own.
4. Optional: add `godwinakpan.ng` / `godwinakpan.com` as domain aliases later. The site forwards them to `PRIMARY_HOST` automatically.

## 6. First sign-in
Go to `/admin`, sign in, press **Medium sync → Sync now**, then swap photos under **Media** as Drive assets arrive.
