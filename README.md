# Hanzi

HSK vocabulary drills and workbook exercises. Phone-first PWA, no build step —
same shape as DailySpend: plain HTML, CSS and JS served as static files.

Built from the `design_handoff_hsk_practice` handoff (option 4a).

## Run it

```bash
python3 -m http.server 4321 --directory /Users/isaac/Documents/Hanzi
```

Then open <http://localhost:4321>. Add to home screen for the standalone app.

## Files

| File | What's in it |
| --- | --- |
| `index.html` | Shell only — every screen is rendered by `app.js` |
| `style.css` | Design tokens and all component styles |
| `app.js` | State, scheduling, and the eight screens |
| `data/vocab.js` | HSK 1 + HSK 2 word lists |
| `data/lessons.js` | Standard Course lesson titles, pages, grammar patterns |
| `data/exercises.js` | Hand-authored workbook exercise sets |
| `sw.js` | Service worker — network-first, cache fallback |

## The three things you'll actually edit

**1 — Which lesson you're on.** `data/lessons.js`, bottom of the file:

```js
const CURRENT = { level: 2, lesson: 4 };
```

Everything follows from this: the Home badge, "this week's homework", which
lesson is marked new, and which past weeks appear.

**2 — Adding a week's exercises.** `data/exercises.js`, keyed `"<level>-<lesson>"`.
Four question shapes — `fill`, `picture`, `listening`, `reading` — all documented
in the header comment of that file. `answer` is the index of the correct option.

Any lesson **without** a hand-authored set falls back to a set generated from
that lesson's own vocabulary, so all 30 lessons are playable right now. The
Exercises card says which kind you're getting.

**3 — Fixing vocabulary.** `data/vocab.js`. Each word carries its level, the
Standard Course lesson it's introduced in, and an example sentence.

## Known gaps

- **HSK 2 has 149 words, not the official 150.** Lesson 15 is one short. Add the
  missing word to the HSK 2 L15 block in `data/vocab.js` when you spot which one.
- **Lesson tags are best-effort.** The word *lists* are the official HSK 1/2
  lists; which lesson each word is introduced in is a reconstruction. Spot-check
  against your books and correct in place — nothing else hardcodes the mapping.
- **Page numbers** assume four workbook pages per lesson. Correct in
  `data/lessons.js` if your copy differs.
- **No real audio or photos.** Listening questions and the flashcard ♪ button use
  the browser's Chinese speech synthesis at 0.75×. Picture questions use emoji
  placeholders. Both are swap-in points: give a question an `<audio>` source or
  real image paths and the layout is already there.

## Scheduling

Tap a card to reveal it. Once revealed:

- **swipe left** (or tap again) — correct, move on
- **swipe right** — incorrect; the card comes back `REQUEUE_GAP` places later
  in the same session

The card follows your finger, rotating and shrinking slightly, and tints past
the threshold: lime for correct, blush for incorrect. A blank card peeks out
from behind as the top one leaves, and the next card rises into its place.
Below the threshold everything springs back.

Revealing is what marks a word seen, so a card still counts if you stop
mid-session. A word is **held** after 3 correct in a row; a single incorrect
resets that run, so the word is due again the next day. Intervals by run
length: 0, 1, 3, 7, 16, 35 days. Sessions are 10 cards, unseen words first,
then whatever is due, least recently seen leading.

Tunable at the top of `app.js` (`SESSION_SIZE`, `HELD_OK`, `REQUEUE_GAP`,
`INTERVALS`).

## Progress data

Everything lives in `localStorage` under `hanzi.v1` — per-word schedule, session
history, exercise scores, study days. Clearing site data resets progress.

```js
// wipe progress from the console
localStorage.removeItem('hanzi.v1'); location.reload();
```
