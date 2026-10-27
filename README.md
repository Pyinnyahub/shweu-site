# shweu-site

Static site for https://shweu.app (ShweU / ရွှေဥ): landing page, Privacy Policy (/privacy/), Terms of Use (/terms/). Plain HTML/CSS, no build step. Hosted on GitHub Pages.

Legal text is copied unchanged from the ShweU legal drafts (privacy-policy.html, terms.html), which now use the shweu.app URLs. Keep them in sync.

## Publish
1. Create a public GitHub repo `shweu-site`, push this folder to `main`.
2. Settings > Pages: Source "Deploy from a branch", branch `main`, folder `/ (root)`. Custom domain `shweu.app` (the CNAME file is already here). Enable "Enforce HTTPS" once offered.
3. DNS (Namecheap > Advanced DNS): A records for host `@` to 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; CNAME host `www` to `<username>.github.io.`. Remove Namecheap's default parking records.
4. Before publishing for real: fill in the effective date, resolve [LAWYER ...] markers, remove the DRAFT notice.
