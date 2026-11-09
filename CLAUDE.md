# CLAUDE.md — shweu-site
> https://shweu.app static site (GitHub Pages)။ Publish လုပ်ရန် Adrian "တင်ပါ" လို။

- Plain HTML/CSS/JS, no build step. Pages: `/` landing, `/privacy/`, `/terms/`, auth fallbacks `/confirm/`, `/reset-password/`, `/expired/` (`fallback.css`, `fallback.js`, `logo.png`), `404.html`, `CNAME` (shweu.app).
- Legal / support pages (since 2026-11-06): **one language per page** — English `/privacy/`, `/terms/`, `/support/` (default, legal original) and Myanmar `/my/privacy/`, `/my/terms/`, `/my/support/`. Header EN | မြန်မာ switch; `lang.js` remembers the choice (localStorage `shweu_lang`, shared with the fallback pages) and sends a visitor who chose Myanmar to `/my/…` (`?lang=en` overrides). No DRAFT box or `[...]` placeholders on public pages. Interim wording until the lawyer review (L1): no liability cap amount, governing law Thailand. The published text here is the current one; `shweu-backend/legal/*.md` are older drafts — update them together on the next legal change.
- Fallback pages: one language chosen by `?lang=my|en` → saved toggle (localStorage `shweu_lang`) → browser language; static default English. Buttons open `shweu://confirm`, `shweu://reset-password`, `shweu://`, passing Supabase tokens through. `otp_expired` → expired state.
- Colours: cream #FFF8E0, gold #D4A33B, maroon #340B0A / #6B0F1A. No emoji.
- Never push/publish without "တင်ပါ". Commit author `git -c user.name=Pyinnyahub -c user.email=maungprofessional@gmail.com commit`. Do not touch the BLAKE FORGE website repo.
- Contact address (since 2026-11-09): `support@shweu.app` (Namecheap forward to Gmail; replies via Gmail Send-as + Resend SMTP). `email-logo.png` (192 px, from the app icon) is for the support email signature: `https://shweu.app/email-logo.png`; `email-logo-sm.png` (80 px) is the one used in the Gmail signature.
- TODO: App Store badge is a "Coming soon" placeholder until launch.
