# SiteProof public pages

Served by GitHub Pages from the public repo `NMsanka/siteproof-site`:

- https://nmsanka.github.io/siteproof-site/privacy.html: the privacy policy (Google Play → App content → Privacy policy)
- https://nmsanka.github.io/siteproof-site/delete.html: account deletion (Google Play → Data safety → Delete account URL)

- https://nmsanka.github.io/siteproof-site/guides/: the user guides, one per role (owner, co-owner, family member on site, contractor, designer, viewer), in English and in Sinhala (`guides/si/`, a draft until a native speaker reviews it), with screenshots in `guides/img/`
- `media/siteproof-promo.mp4`: the one-minute promo video on the home page (1080×1920), with its poster `media/siteproof-promo.jpg`

The screenshots and the video were made on the Android emulator from the local test data, with realistic names, AI-generated site photos and AI-generated profile photos of the two test people (OpenAI `gpt-image-2`, 13 Nov 2026); the video's voice-over is OpenAI text-to-speech, so the page says it's AI-generated (OpenAI's usage policy asks for that).

These files are the source. They live in the main SiteProof repo and are published with
`npm run site:publish` (scripts/publish-site.mjs), which pushes only this folder.
