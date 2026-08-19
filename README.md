# Wildline 🌲

Click blocks to layer ambient nature sounds. Click again to stop. Any number play together at once.

## How audio works now

Each block plays **`sounds/<slug>.mp3`** if that file exists in the repo — a real recording, looped seamlessly.

If the file doesn't exist yet, the block automatically falls back to a **generated placeholder** (synthesized in the browser) so the site still works while you're collecting real audio — that placeholder is marked with a small amber dot in the corner of the card, so you always know which sounds are still fake.

**To upgrade a sound:** just add a correctly-named mp3 to the `sounds/` folder. No code changes. The dot disappears and it plays your real file from then on.

See **`SOUNDS_NEEDED.md`** for the exact filename for every single sound (194 unique files cover all 200 entries — some names repeat across sections and automatically share one file).

### What makes a good source file
- A clean ambient loop, roughly 10–40 seconds
- Starts and ends on a similar tone/level, so the loop point isn't jarring (a tiny bit of crossfade in your audio editor helps a lot)
- mp3, mono or stereo, 128–192kbps is plenty — no need for huge files
- Where to get real ones: [Freesound.org](https://freesound.org) (filter by CC0), [Pixabay Sound Effects](https://pixabay.com/sound-effects/) (free, no attribution required), [BBC Sound Effects Archive](https://sound-effects.bbcrewind.co.uk/) (free for personal/non-commercial use — check their license for anything else), or your own AI-generated clips.

## Deploying to GitHub Pages (no command line needed)

1. On your repo's GitHub page, click **"uploading an existing file"** in the Quick Setup box.
2. Drag in `index.html`, `style.css`, `script.js`, and this `README.md`. Commit.
3. Create a folder inside the repo called `sounds` (GitHub lets you do this by naming a file `sounds/anything.mp3` when uploading — it creates the folder automatically) and drop your mp3s in there, named exactly as listed in `SOUNDS_NEEDED.md`.
4. Go to **Settings → Pages → Source → Deploy from a branch → `main` / `root`** → Save.
5. Visit `https://<your-username>.github.io/<repo-name>/` after a minute.

You can add files gradually — upload a handful at a time and re-check the site; each one just works the moment it's named right.

## Customizing

- **Add or rename sounds:** edit the `SECTIONS` array at the top of `script.js`, then regenerate your filename list (slug = lowercase, non-letters/numbers replaced with `-`).
- **Change the generative placeholder for a sound:** see `classify()` and the `switch` in `Engine.buildSynth()` in `script.js` — not required if you're supplying real files.
- **Colors:** each section has an `hue` (HSL) value in `SECTIONS`/`COMBOS` — cards derive their whole palette from it.
