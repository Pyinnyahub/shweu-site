# CLAUDE.md — shweu-site
> https://shweu.app static site (GitHub Pages)။ Publish လုပ်ရန် Adrian "တင်ပါ" လို။

- Plain HTML/CSS/JS, no build step. Pages: `/` landing, `/privacy/`, `/terms/`, auth fallbacks `/confirm/`, `/reset-password/`, `/expired/` (`fallback.css`, `fallback.js`, `logo.png`), `404.html`, `CNAME` (shweu.app).
- Legal text is copied unchanged from `shweu-backend/legal/`; keep in sync. Before real publish: effective date, resolve `[LAWYER ...]` markers, remove DRAFT notice.
- Fallback pages: one language chosen by `?lang=my|en` → saved toggle (localStorage `shweu_lang`) → browser language; static default English. Buttons open `shweu://confirm`, `shweu://reset-password`, `shweu://`, passing Supabase tokens through. `otp_expired` → expired state.
- Colours: cream #FFF8E0, gold #D4A33B, maroon #340B0A / #6B0F1A. No emoji.
- Never push/publish without "တင်ပါ". Commit author `git -c user.name=Pyinnyahub -c user.email=maungprofessional@gmail.com commit`. Do not touch the BLAKE FORGE website repo.
- TODO: App Store badge is a "Coming soon" placeholder until launch.
