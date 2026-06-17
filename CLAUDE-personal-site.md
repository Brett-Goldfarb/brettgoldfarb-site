# CLAUDE.md — Brett Goldfarb Personal Site (Portfolio + Living Resume)

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **Read the BJG brand assets** before making any UI or design decisions, every session, no exceptions:
  - `branding/BJG_Creations_Brand_Guide.docx`
  - `branding/Voice_Guide_-_BJG_Creations.docx`
  - `branding/BJG_Creations_Logo.png` and `branding/BJG_png.png`

## Quick Recap Status Block (multi-task prompts)
- **Whenever a prompt contains more than one task**, end the response with a single red/yellow/green status line.
- Format: end with `🟢`, `🟡`, or `🔴` followed by one concise status sentence (under 100 characters).
  - `🟢` — all requested tasks are finished.
  - `🟡` — code/work is done but a specific non-routine follow-up remains; name it.
  - `🔴` — blocked on user input; name what's needed.
- The status line goes at the very end. Do not add `---`, spacer lines, or any content after it.

## Project
- Project root: `~/Downloads/brettgoldfarb-site/`
- Single-page static site — no backend, no database, no build step
- Frontend: `index.html` — single file, vanilla JS, no frameworks
- Assets live in `assets/` (logos, downloadable HTML tools, images)
- Preview locally: `python3 -m http.server 8000` → open `http://localhost:8000`
- If a server is already running on that port, do not start a second instance

## Deployment — GitHub Pages
- Site is served as static files directly from the repo
- Deploy target: GitHub Pages (Settings → Pages → deploy from `main` branch, root)
- The entry file MUST be `index.html` at repo root
- Include an empty `.nojekyll` file at repo root so Pages serves all files as-is
- Custom domain later: add a `CNAME` file at root if/when a domain is purchased
- Keep all paths relative (`./assets/...`), never absolute (`/assets/...`), so the site works under a project subpath

## Screenshot Workflow
- Use a local static preview, not a Flask server: `python3 -m http.server 8000`
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:8000`
- Screenshots save to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten)
- Optional label suffix: `node screenshot.mjs http://localhost:8000 label` → `screenshot-N-label.png`
- Screenshot BOTH light and dark mode every comparison round
- Screenshot at mobile AND desktop widths (the site is mobile-first responsive)
- After screenshotting, read the PNG with the Read tool and analyze it directly
- When comparing, be specific: "heading is 32px but should be ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing
- Do not stop after one screenshot pass — minimum 2 comparison rounds

## Brand — Colors
Pull directly from the BJG brand kit. These are the only base values:
- Black — `#000000`
- White — `#ffffff`
- Light Gray — `#d9d9d9`

### Accent (personal-site differentiator)
- This personal site uses a **navy/blue accent** to stand apart from the core BJG brand while staying cohesive.
- Use navy for links, interactive accents, focus states, and select highlights — sparingly, not wall-to-wall.
- Suggested anchor: a deep navy (e.g. `#1B2A4A` range) with a slightly brighter blue for hover/active. Lock exact values on first build and never drift from them afterward.
- Never invent additional brand colors beyond black, white, light gray, and the navy accent family.

## Brand — Typography
From the BJG brand kit. Load via Google Fonts CDN.
- **Headings:** Roboto Slab
- **Body / paragraph:** Roboto
- Logo wordmark uses "Active Heart" — do NOT recreate it in CSS; use the provided logo image asset instead
- Never swap heading and body fonts. Roboto Slab is for headings only.

## Brand — Voice (for all site copy)
From the Voice Guide. The voice is:
- Ambitious, Intelligent, Confident, Creative, Professional, Innovative, Passionate, Modern, Knowledgeable, Honest, Personable, Witty, Consistent, Inspiring, Conversational, Optimistic
- NOT: impulsive, brainy, cocky, random, corporate, risky, animated, ordinary, pretentious, harsh, soft, sarcastic, rigid, dramatic, chatty, unrealistic
- Reading level: grade 5–7. Average sentence length: 8–11 words.
- Use contractions: "can't" not "cannot", "don't" not "do not"
- Website tone is **Professional** and **Promotional** (why, not how)
- Let the work speak — no dedicated "About me" section

## Site Structure (one-page scroll)
Single page, anchored sections, smooth scroll. Sections in order:
1. **Hero** — name + identity line, dark-mode-friendly, BJG logo present
2. **Marketing** — social media marketing and other marketing work
3. **AI Tools** — projects like Heirloom, the budgeting tool, internal agency tools
   - Each tool card supports a **Loom video embed** (walkthrough) and/or a **file download button** for standalone HTML tools
4. **Writing** — embed personal Substack (`https://brettgoldfarb.substack.com/`) and BJG Creations Substack (`https://bjgcreationsblog.substack.com/`)
5. **Links / Footer** — external links (e.g. `https://canvasrebel.com/meet-brett-goldfarb/`) and contact

## Frontend Rules
- Single `index.html`, all styles inline, vanilla JS only — no frameworks, no build tools
- Mobile-first responsive
- Dark mode toggle required; persist preference and respect `prefers-color-scheme` on first load
- Light animation only — fade/slide on scroll, hover transitions, the toggle
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Substack embeds: use the publication URL (not the profile URL). Personal pub is `brettgoldfarb.substack.com`. If an embed can't render, fall back to a styled link-out card.

## Anti-Generic Guardrails
- **Shadows:** Never use flat `shadow-md`. Use layered, low-opacity shadows. In dark mode lean on elevation/contrast, not heavy drop shadows.
- **Typography:** Roboto Slab for headings/display, Roboto for everything else. Never swap them.
- **Backgrounds:** No flat wall-to-wall fills. Add subtle depth — gentle gradients or tonal layering within the black/white/gray + navy system.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use ease-in-out or spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Spacing:** Intentional, consistent spacing — not random values. Use a defined scale.
- **Depth:** Surfaces should have a layering system (base → elevated → floating).

## Hard Rules
- Do not change the color palette — black, white, light gray, and the locked navy accent family only
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as the accent — use the locked navy values
- Keep all asset paths relative so GitHub Pages works under a subpath
- `index.html` must stay at repo root; include `.nojekyll`
- Recreate the logo wordmark from the image asset only — never rebuild "Active Heart" in CSS/fonts
- This is a personal site: it carries BJG DNA but must read as Brett's own, not as the agency's marketing site
- Do not stop after one screenshot pass — minimum 2 comparison rounds, light + dark, mobile + desktop
