# Working on Hanzi

Personal HSK study PWA. Vanilla JS, no build step, no dependencies — the
same shape as Isaac's DailySpend and DailyConvert. There is no Node or npm
on this machine, so anything requiring a toolchain is out.

Public repo, deployed on **GitHub Pages** at `waqkum.github.io/hanzi/`.
Previously Netlify; moved when the free tier ran out. Don't suggest going
back, and don't suggest Pages needs a private-repo workaround — the repo is
public deliberately. All paths are relative and `manifest.json` uses
`start_url: "./index.html"`, `scope: "./"`, so it works from the `/hanzi/`
subpath.

## Shape of it

    index.html   thin shell, script tags only
    app.js       everything — state, render, scheduling, audio, checker
    style.css    design tokens from the original handoff; no shadows
    data/        vocab.js, lessons.js, exercises.js
    img/2-1/     photographs cropped from the workbook, per chapter
    sfx/         optional verdict sounds; falls back to synthesis

Nine screens switched flatly by `S.screen`: home, sets, drill, summary,
exercises, runner, exdone, progress, today. `render()` rebuilds the whole
screen's innerHTML on every state change — which is why the journal
textarea mirrors into `S.draft` rather than living in the DOM, and why the
drill's enter animation is a one-shot class.

## After any change

Bump `?v=N` on every script/link in `index.html` **and** `CACHE` in `sw.js`.
Skipping this serves stale files from cache and looks like the change didn't
apply. Then verify in the browser — several real bugs here only surfaced by
running the flow, not by reading the diff (an identifier collision that
killed the whole app, images the browser deferred forever, a sound whose
envelope silenced it before its pitch finished falling).

## Data provenance — read before trusting any of it

Source is `HSK 标准教程 2（练习册）`, a scanned PDF in `~/Downloads`.
Answer key and listening transcripts:
`https://mandrinacademy.blogspot.com/2021/11/hsk2wbans.html`

| | State |
|---|---|
| HSK 2 chapter titles, pages | Transcribed from the 目录. Trustworthy. |
| HSK 2 ch.1–2 exercises | Full 35 questions, photographs, every answer checked against the key |
| HSK 2 ch.3 exercises | Reading Part III only (Q26–30) |
| HSK 2 ch.4 exercises | Placeholder, invented before the PDF existed |
| HSK 2 ch.1–2 vocab tags | Derived from the workbook — see `data/vocab.js` header |
| HSK 2 ch.3–15 vocab tags | Guesswork, known unreliable |
| HSK 1 everything | Guesswork, never checked |
| HSK 1/2 word lists themselves | The official lists. Fine. |

Eleven of fifteen HSK 2 chapter titles were wrong until the contents page
was transcribed, and the vocabulary tags built on them were wrong with
them. Assume nothing here is right because it looks plausible.

## Transcribing a chapter

1. Extract page images: the PDF's pages are JPEGs embedded whole. Walk
   `/Subtype /Image`, take the bytes between `stream` and `endstream`.
   Don't scan for JPEG start/end markers — each file has an Exif thumbnail
   inside it and you'll slice that instead.
2. **File number = workbook page + 8.** Chapter N starts at the page in
   `data/lessons.js`.
3. Seven parts per chapter, 35 questions: listening true/false (1–5),
   listening picture-match (6–10), listening Q&A (11–15), reading
   picture-match (16–20), fill-in-the-blank (21–25), true/false (26–30),
   dialogue matching (31–35).
4. Listening sentences are **not printed** — take them from the transcripts
   link above.
5. Crop photographs with `sips -c H W --cropOffset Y X`. Bounding boxes can
   be found by drawing the page to a canvas and looking for mid-grey blocks
   (paper is near-white, text near-black). Detection is unreliable on
   lighter pages; fall back to the template geometry and check by eye on a
   contact sheet.
6. Check every answer against the published key. For picture questions
   check *which lettered photo* the correct option points at, not the index
   — an index can be right by accident once options are reordered.

## Judgement calls already made

- Matching sections are split into one question each, because the option
  chips can't hold whole sentences. Same content, same answers.
- Photographs use `object-fit: contain`, never `cover` — cover cropped the
  detail the question depended on.
- The journal's grammar checker finds known mistakes; it cannot confirm a
  sentence is correct, and the copy says so rather than implying a pass.
  Every rule is conservative because a false accusation teaches the wrong
  thing.
- "Chapter", not "Lesson", throughout the interface — the book says 课, but
  this is Isaac's preference.
