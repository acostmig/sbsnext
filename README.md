# SBSNext

Static Next.js frontend (GitHub Pages) + Cloudflare Worker backend. $0/month hosting. One push deploys both.

## How it's wired

Single `deploy.yml` workflow runs on every push to `main`:

1. **Worker job** — builds and deploys the Cloudflare Worker (chat + contact endpoints), pushing `OPENAI_API_KEY` and `RESEND_API_KEY` from GitHub secrets into Cloudflare. Outputs the worker URL.
2. **Site job** — builds Next.js with `NEXT_PUBLIC_API_URL` set to the worker URL from step 1, deploys `out/` to GitHub Pages.

The site is always pinned to the latest worker URL — nothing to configure manually after setup.

## First-time setup

### 1. Cloudflare
- Sign up at https://dash.cloudflare.com/sign-up (free, no CC)
- **My Profile → API Tokens → Create Token** → "Edit Cloudflare Workers" template → copy token
- Note your **Account ID** (right sidebar of dashboard)

### 2. Resend
- Sign up at https://resend.com
- Generate an API key
- (Later) verify `sbsnext.com` as a sending domain so you can change `CONTACT_FROM` in [worker/wrangler.toml](worker/wrangler.toml) to `hello@sbsnext.com`

### 3. GitHub repo → Settings → Secrets and variables → Actions
Add these four **secrets**:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`

No variables needed — the workflow derives the API URL automatically.

### 4. GitHub → Settings → Pages
Source: **GitHub Actions**

### 5. Push
```bash
git push origin main
```
Watch the Actions tab. Worker deploys first, then the site builds with its URL baked in.

### 6. DNS cutover (Route 53)
Once the GH Pages deploy succeeds:
- `sbsnext.com` → A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www.sbsnext.com` → CNAME `acostmig.github.io`

Nameservers stay at AWS.

## Local dev

```bash
# frontend on http://localhost:4000
pnpm install
cp .env.local.example .env.local
pnpm dev

# worker on http://localhost:8787 — another terminal
cd worker
pnpm install
# create worker/.dev.vars with OPENAI_API_KEY, RESEND_API_KEY, DISABLE_EMAIL
pnpm dev
```

## Structure

```
.
├── .github/workflows/deploy.yml    # one-shot deploy (worker → site)
├── src/                            # Next.js app
├── public/
├── worker/                         # Cloudflare Worker
│   ├── src/
│   └── wrangler.toml
├── next.config.ts                  # output: "export", trailingSlash: true
└── package.json
```
