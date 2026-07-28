# Verdict sounds

Drop two files here and they replace the synthesised tones in the exercise
runner:

    sfx/correct.mp3
    sfx/wrong.mp3

That's the whole install — no code change, no version bump beyond the usual
cache-busting. `app.js` fetches and decodes them when a chapter opens, and
falls back to the built-in tones if a file is missing or won't decode. So
the app is never worse for their absence, and you can pull them back out by
deleting them.

## Making them

ElevenLabs' Sound Effects tool, or anything else that exports a short clip.
Prompts that suit the app:

- **correct** — soft marimba chime, two quick notes rising, warm, clean, no
  reverb tail
- **wrong** — soft muted wooden knock, low pitched, gentle, brief, not harsh

Keep both **under a second**. These fire on every answer, thirty-five times a
chapter — anything with a long tail or a game-show sting wears out fast. The
tones they replace rise for correct and fall for wrong, which is worth
keeping: the shape carries the verdict even at low volume.

## Format

`.mp3` is what the paths expect. Any format the browser decodes will work if
you rename it, though Safari is fussier than Chrome — mp3 or m4a are safest.
Mono is fine and halves the size. A few tens of KB each is plenty; they are
cached by the service worker for offline use, so there's no reason to ship
anything large.
