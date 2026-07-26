/* ═══════════════════════════════════════════════════════════════════════
   Hanzi — HSK practice
   Eight screens: home · sets · drill · summary · exercises · runner ·
   exdone · progress. Flat screen switching, no animated transitions.
   ═══════════════════════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════════════════════
   Constants
   ══════════════════════════════════════════════════════════════════════ */

const SESSION_SIZE = 10;          // cards per drill session
const HELD_OK      = 3;           // continues in a row before a word counts as "held"
const REQUEUE_GAP  = 3;           // cards to wait before an "again" card comes back

/* Days to wait before a word comes round again, indexed by its run of
   continues. An "again" resets that run, so the word returns tomorrow. */
const INTERVALS = [0, 1, 3, 7, 16, 35];

/* Placeholder art for generated picture questions. The workbook's own
   photos would go here instead — see the `tiles` note in exercises.js. */
const EMOJI = {
  '苹果':'🍎','水果':'🍇','米饭':'🍚','菜':'🥬','茶':'🍵','水':'💧','咖啡':'☕',
  '牛奶':'🥛','鸡蛋':'🥚','鱼':'🐟','羊肉':'🍖','西瓜':'🍉','药':'💊',
  '狗':'🐕','猫':'🐈','书':'📕','报纸':'📰','电脑':'💻','电视':'📺','手机':'📱',
  '手表':'⌚','铅笔':'✏️','杯子':'🥤','桌子':'🪑','椅子':'🪑','衣服':'👕','钱':'💴',
  '票':'🎫','门':'🚪','飞机':'✈️','出租车':'🚕','公共汽车':'🚌','自行车':'🚲',
  '船':'⛵','火车站':'🚉','机场':'🛫','医院':'🏥','学校':'🏫','商店':'🏪',
  '饭店':'🍽️','宾馆':'🏨','公司':'🏢','教室':'🏫','房间':'🛏️','家':'🏠',
  '眼睛':'👁️','雪':'❄️','下雨':'🌧️','晴':'☀️','阴':'☁️','医生':'🧑‍⚕️','老师':'🧑‍🏫',
  '学生':'🎒','孩子':'🧒','朋友':'👥','服务员':'🧑‍🍳','睡觉':'😴','跑步':'🏃',
  '游泳':'🏊','唱歌':'🎤','跳舞':'💃','打篮球':'🏀','踢足球':'⚽','运动':'🏋️',
  '电影':'🎬','旅游':'🧳','生日':'🎂','洗':'🧺','打电话':'📞','考试':'📝','路':'🛣️',
};

/* ══════════════════════════════════════════════════════════════════════
   Small helpers
   ══════════════════════════════════════════════════════════════════════ */

const $app = document.getElementById('app');

function h(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

const isoOf = d =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const todayISO = () => isoOf(new Date());

/* Parse to LOCAL midnight. `new Date('2026-07-25')` would parse as UTC,
   which reads back a day early everywhere west of Greenwich. */
function parseISO(iso) {
  const [y, m, d] = String(iso).split('-').map(Number);
  return new Date(y, m - 1, d);
}

function daysSince(iso) {
  if (!iso) return Infinity;
  // Round, not floor: DST makes some local days 23 or 25 hours long.
  return Math.round((parseISO(todayISO()) - parseISO(iso)) / 86400000);
}

function fmtDuration(ms) {
  const total = Math.round(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m ? `${m} min ${s} s` : `${s} s`;
}

function fmtClock(ms) {
  const total = Math.round(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample(arr, n) { return shuffle(arr).slice(0, n); }

/* ══════════════════════════════════════════════════════════════════════
   Persistence
   ══════════════════════════════════════════════════════════════════════ */

const STORE_KEY = 'hanzi.v1';

const blankStore = () => ({
  words:     {},   // id → { seen, miss, streak, last }
  sessions:  [],   // { date, ms, got, missed }
  exercises: {},   // "level-chapter" → { best, last, total, attempts, date }
  days:      [],   // ISO dates on which anything was studied
  started:   todayISO(),
});

let store = load();

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return blankStore();
    return Object.assign(blankStore(), JSON.parse(raw));
  } catch (e) {
    console.warn('Hanzi: could not read saved progress, starting fresh.', e);
    return blankStore();
  }
}

function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn('Hanzi: could not save progress.', e);
  }
}

function markStudiedToday() {
  const t = todayISO();
  if (!store.days.includes(t)) store.days.push(t);
}

/* ══════════════════════════════════════════════════════════════════════
   Scheduling
   ══════════════════════════════════════════════════════════════════════ */

function ws(id) {
  return store.words[id] || (store.words[id] = { seen: 0, ok: 0, last: null });
}

const isNew  = w => ws(w.id).seen === 0;
const isHeld = w => ws(w.id).ok >= HELD_OK;

function isDue(w) {
  const s = ws(w.id);
  if (s.seen === 0) return true;
  return daysSince(s.last) >= INTERVALS[Math.min(s.ok, INTERVALS.length - 1)];
}

function tagFor(w) {
  const s = ws(w.id);
  return s.seen === 0 ? 'NEW' : `SEEN ${s.seen}×`;
}

/* Revealing a card counts as exposure regardless of how you then judge
   it, so a word still registers if you stop mid-session. */
function markSeen(w) {
  const s = ws(w.id);
  s.seen += 1;
  s.last = todayISO();
  markStudiedToday();
  save();
}

/* Swipe right — you knew it. Extends the run of continues, which is what
   lengthens the interval and eventually makes the word "held". */
function markContinue(w) {
  ws(w.id).ok += 1;
  save();
}

/* Swipe left — you didn't. Resets the run so the word is due again
   tomorrow, and comes back later in this same session. */
function markAgain(w) {
  ws(w.id).ok = 0;
  save();
}

/* ── Word sets ──────────────────────────────────────────────────────── */

const wordsIn  = (lv, les) => VOCAB.filter(w => w.level === lv && (les == null || w.les === les));
const dueList  = lv        => wordsIn(lv).filter(isDue);
const unseenIn = lv        => wordsIn(lv).filter(isNew);

/* Build a session: unseen words first, then whatever is due, least
   recently looked at leading. */
function buildSession(pool) {
  const fresh = pool.filter(isNew);
  const rest  = pool.filter(w => !isNew(w) && isDue(w))
    .sort((a, b) => (ws(a.id).last || '').localeCompare(ws(b.id).last || ''));
  const ordered = [...shuffle(fresh), ...rest];
  // If nothing is due, fall back to the whole pool so a session is always possible.
  const cards = ordered.length ? ordered : shuffle(pool);
  return cards.slice(0, SESSION_SIZE);
}

/* ── Aggregates for the Progress screen ─────────────────────────────── */

function streakDays() {
  if (!store.days.length) return 0;
  const set = new Set(store.days);
  let n = 0;
  const d = parseISO(todayISO());
  // Today only counts once something has been studied; otherwise start at yesterday.
  if (!set.has(todayISO())) d.setDate(d.getDate() - 1);
  while (set.has(isoOf(d))) {
    n += 1;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

function avgSessionMs() {
  if (!store.sessions.length) return 0;
  return store.sessions.reduce((t, s) => t + s.ms, 0) / store.sessions.length;
}

const heldCount = lv => wordsIn(lv).filter(isHeld).length;

/* ══════════════════════════════════════════════════════════════════════
   Audio — speech synthesis stands in for the workbook recordings
   ══════════════════════════════════════════════════════════════════════ */

function speak(text, rate) {
  if (!('speechSynthesis' in window)) return false;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = rate || 0.75;
    const voice = speechSynthesis.getVoices().find(v => /^zh/i.test(v.lang));
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
    return true;
  } catch (e) {
    console.warn('Hanzi: speech synthesis unavailable.', e);
    return false;
  }
}

/* Voices load asynchronously in some browsers; touching the list early
   means the first tap on a card has a Chinese voice ready. */
if ('speechSynthesis' in window) {
  speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
}

/* ── Read-along ─────────────────────────────────────────────────────────
   Speaks a line and lights each character as it is read. `boundary`
   events are the accurate source, but plenty of zh-CN voices never fire
   them, so a timed sweep runs alongside and bows out the moment a real
   boundary arrives. Roughly a beat per character at 0.75×.
   ─────────────────────────────────────────────────────────────────────── */

const CHAR_MS = 300;
let sweepTimer = null;
let speakToken = 0;               // so a cancelled utterance can't clear a newer one

/* Wraps each character so it can be lit individually. Pass `from` when the
   text is rendered in more than one run, as the fill-in-the-blank sentence
   is, to keep the indices continuous across the gap. */
const charSpans = (text, from = 0) =>
  [...text].map((c, i) => `<span class="sp" data-i="${from + i}">${h(c)}</span>`).join('');

function clearLit() {
  clearInterval(sweepTimer);
  sweepTimer = null;
  document.querySelectorAll('.sp.is-lit').forEach(el => el.classList.remove('is-lit'));
}

function speakAlong(text) {
  clearLit();
  if (!('speechSynthesis' in window) || !text) return;

  const spans = [...document.querySelectorAll('.sp')];
  const lightOnly = i => spans.forEach((el, n) => el.classList.toggle('is-lit', n === i));
  const token = ++speakToken;
  let gotBoundary = false;

  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = 0.75;
    const voice = speechSynthesis.getVoices().find(v => /^zh/i.test(v.lang));
    if (voice) u.voice = voice;

    u.onboundary = e => {
      gotBoundary = true;
      clearInterval(sweepTimer);
      sweepTimer = null;
      if (token === speakToken) lightOnly(e.charIndex);
    };
    const finish = () => { if (token === speakToken) clearLit(); };
    u.onend = finish;
    u.onerror = finish;

    speechSynthesis.speak(u);

    if (!spans.length) return;
    let i = 0;
    sweepTimer = setInterval(() => {
      if (gotBoundary || token !== speakToken) { clearInterval(sweepTimer); return; }
      if (i >= spans.length) { clearLit(); return; }
      lightOnly(i++);
    }, CHAR_MS);
  } catch (e) {
    console.warn('Hanzi: read-along unavailable.', e);
    clearLit();
  }
}

/* What gets read for each question type. The fill-in-the-blank sentence is
   spoken without the missing word — that's the bit you're working out. */
function questionText(q) {
  if (!q) return '';
  if (q.type === 'fill')      return q.pre + q.post;
  if (q.type === 'reading')   return q.han;
  if (q.type === 'truefalse') return q.han;   // the statement, not the claim
  if (q.type === 'listening') return q.audio;
  return '';
}

function speakQuestion() {
  speakAlong(questionText(S.qs[S.questionIndex]));
}

/* ══════════════════════════════════════════════════════════════════════
   Session state (not persisted)
   ══════════════════════════════════════════════════════════════════════ */

let S = {
  screen: 'home',
  level: CURRENT.level,
  lesson: CURRENT.lesson,

  setLabel: '',
  cards: [],
  cardIndex: 0,
  flipped: false,
  pinyinOn: true,
  newToday: [],
  againCount: 0,
  entering: false,
  drillLesson: null,

  matches: [],        // picture questions: tile index -> chosen option index
  chipOrder: [],      // picture questions: shuffled display order of options

  exLevel: CURRENT.level,   // which book the exercises list is showing
  exChapter: null,          // chapter selected in that list, null until you pick
  exBeat: false,            // did the run just beat the previous best
  exBest: null,
  startedAt: 0,
  lastMs: 0,

  qs: [],
  questionIndex: 0,
  answer: null,
  englishOn: false,
  exRight: 0,
  exStartedAt: 0,
  exMs: 0,
};

/* ══════════════════════════════════════════════════════════════════════
   Exercise sets — hand-authored where available, generated otherwise
   ══════════════════════════════════════════════════════════════════════ */

function exerciseSet(level, lesson) {
  return EXERCISES[`${level}-${lesson}`] || buildGeneratedSet(level, lesson);
}

const hasAuthoredSet = (level, lesson) => Boolean(EXERCISES[`${level}-${lesson}`]);

/* Four questions built from the lesson's own vocabulary, so every lesson
   is playable before its workbook set has been typed up. */
function buildGeneratedSet(level, lesson) {
  const pool = wordsIn(level, lesson);
  if (pool.length < 4) return [];

  const wider = wordsIn(level).concat(level === 2 ? wordsIn(1) : []);
  const distractors = (w, n) =>
    sample(wider.filter(x => x.han !== w.han && x.han.length <= w.han.length + 1), n);

  const withOptions = (correct, others) => {
    const opts = shuffle([correct, ...others]);
    return { opts, answer: opts.indexOf(correct) };
  };

  const qs = [];

  /* A blank cut out of the word's own example sentence. */
  const makeFill = w => {
    const at = w.ex.indexOf(w.han);
    if (at < 0) return null;
    const { opts, answer } = withOptions(w, distractors(w, 3));
    return {
      type:'fill', label:'FILL IN THE BLANK',
      pre: w.ex.slice(0, at),
      post: w.ex.slice(at + w.han.length),
      py: w.exPy, en: w.exEn,
      options: opts.map(o => ({ han:o.han, py:o.py })), answer,
      why:{ right:`${w.han} ${w.py} — ${w.en}.`,
            wrong:`The sentence needs ${w.han} ${w.py} — ${w.en}.` },
    };
  };

  /* 1 — fill in the blank */
  const fillable = pool.filter(w => w.ex.includes(w.han));
  const fillWord = fillable[0] || pool[0];
  const q1 = makeFill(fillWord);
  if (q1) qs.push(q1);

  /* 2 — picture match, using whichever of the lesson's words have art.
     Not every lesson has picturable vocabulary; those fall back to a
     second blank so the set is always four questions long. */
  const picturable = pool.filter(w => EMOJI[w.han]);
  let pictureAdded = false;

  if (picturable.length) {
    const correct = picturable[Math.floor(Math.random() * picturable.length)];
    const others  = sample(Object.keys(EMOJI).filter(k => k !== correct.han), 3)
      .map(k => VOCAB.find(w => w.han === k)).filter(Boolean);
    if (others.length === 3) {
      const { opts, answer } = withOptions(correct, others);
      const tiles = opts.map(o => ({ glyph: EMOJI[o.han] || '❔', alt: o.en }));
      qs.push({
        type:'picture', label:'MATCH THE WORD TO THE PICTURE',
        tiles, target: answer,
        options: opts.map(o => ({ han:o.han, py:o.py })), answer,
        why:{ right:`${correct.han} ${correct.py} — ${correct.en}.`,
              wrong:`That one is not ${correct.en}.` },
      });
      pictureAdded = true;
    }
  }

  if (!pictureAdded) {
    const alt = fillable.find(w => w !== fillWord);
    const q2 = alt && makeFill(alt);
    if (q2) qs.push(q2);
  }

  /* 3 — listening: hear the sentence, pick the word that was in it */
  const listenWord = pool[Math.floor(Math.random() * pool.length)];
  {
    const { opts, answer } = withOptions(listenWord, distractors(listenWord, 2));
    qs.push({
      type:'listening', label:'LISTENING',
      audio: listenWord.ex,
      prompt:'Which word did you hear?',
      options: opts.map(o => ({ han:o.han, py:o.py, en:o.en })), answer,
      why:{ right:`The sentence was ${listenWord.ex} — ${listenWord.exEn}`,
            wrong:`Listen again for ${listenWord.han} ${listenWord.py}.` },
    });
  }

  /* 4 — short reading, using a sentence as the passage */
  const readWord = pool.filter(w => w !== listenWord)[0] || pool[0];
  {
    const { opts, answer } = withOptions(readWord, distractors(readWord, 2));
    qs.push({
      type:'reading', label:'SHORT READING',
      han: readWord.ex, py: readWord.exPy, en: readWord.exEn,
      prompt:'Which word appears in the passage?',
      options: opts.map(o => ({ han:o.han, py:o.py, en:o.en })), answer,
      why:{ right:`${readWord.han} ${readWord.py} — ${readWord.en}.`,
            wrong:`The passage uses ${readWord.han} ${readWord.py}.` },
    });
  }

  return qs;
}

/* ══════════════════════════════════════════════════════════════════════
   Shared view pieces
   ══════════════════════════════════════════════════════════════════════ */

const backHeader = (act, label, right) => `
  <div class="hdr">
    <button class="hdr-back" data-act="${act}">
      <span class="hdr-back-arrow">←</span>${h(label)}
    </button>
    ${right}
  </div>`;

const hanClass = s => {
  const n = [...s].length;
  return n >= 5 ? 'card-han is-xlong' : n >= 3 ? 'card-han is-long' : 'card-han';
};

/* ══════════════════════════════════════════════════════════════════════
   1 · Home
   ══════════════════════════════════════════════════════════════════════ */

function renderHome() {
  const lv    = CURRENT.level;
  const due   = dueList(lv).length;
  const les   = LESSONS[lv][CURRENT.lesson - 1];
  const total = wordsIn(lv).length;
  const held  = heldCount(lv);
  const fresh = unseenIn(lv).length;
  const days  = streakDays();

  return `
    <div class="hdr">
      <div class="hdr-brand">
        <div class="hdr-mark"></div>
        <div class="hdr-name">Hanzi</div>
      </div>
      <div class="hdr-meta">${LEVEL_LABEL[lv]} · day ${days || 1}</div>
    </div>

    <div class="hero"><div class="hero-text">Do your<br>homework.</div></div>

    <button class="home-card home-card-a" data-act="sets">
      <div class="home-card-top">
        <div class="icon-sq han">字</div>
        <div class="pill-static">${due} due</div>
      </div>
      <div>
        <div class="home-card-title">Flashcards</div>
        <div class="home-card-sub">HSK 1, HSK 2, or one chapter</div>
      </div>
    </button>

    <button class="home-card home-card-b" data-act="exercises">
      <div class="home-card-top">
        <div class="icon-sq han">题</div>
        <div class="pill-static">${h(les.pages)}</div>
      </div>
      <div>
        <div class="home-card-title">Exercises</div>
        <div class="home-card-sub">Chapter ${les.n} workbook exercises</div>
      </div>
    </button>

    <button class="home-card home-card-c" data-act="progress">
      <div class="home-card-top">
        <div class="icon-sq icon-sq-on-ink han">进</div>
        <div class="home-card-badge">${held} / ${total}</div>
      </div>
      <div>
        <div class="home-card-title">Progress</div>
        <div class="home-card-sub">${days} day streak · ${fresh} still new</div>
      </div>
    </button>`;
}

/* ══════════════════════════════════════════════════════════════════════
   2 · Set picker
   ══════════════════════════════════════════════════════════════════════ */

function renderSets() {
  /* First tap picks the level and swaps the chapter list below; tapping
     the one already selected drills the whole level. */
  const levelCard = lv => {
    const on    = lv === S.level;
    const words = wordsIn(lv);
    const held  = heldCount(lv);
    const sub   = on
      ? 'Tap again for all of it'
      : held === words.length
        ? `${words.length} words · all solid`
        : `${words.length} words · ${held} held`;
    return `
      <button class="level-card${on ? ' level-card-active' : ''}"
              data-act="pick-level" data-lv="${lv}">
        <div class="label${on ? ' label-on-tint' : ''}">LEVEL</div>
        <div class="level-name">${LEVEL_LABEL[lv]}</div>
        <div class="level-sub">${h(sub)}</div>
      </button>`;
  };

  const rows = LESSONS[S.level].map(les => {
    const words = wordsIn(S.level, les.n);
    const fresh = words.filter(isNew).length;
    const num   = NUMERALS[les.n] || { han: String(les.n), py: '' };
    const right = fresh
      ? `<div class="pill-count">${fresh} new</div>`
      : `<div class="row-count">${words.length}</div>`;
    return `
      <button class="row" data-act="drill-lesson" data-les="${les.n}">
        <div class="row-numeral">
          <div class="row-numeral-han han">${h(num.han)}</div>
          <div class="row-numeral-py">${h(num.py)}</div>
        </div>
        <div class="row-body">
          <div class="row-name">Chapter ${les.n}</div>
          <div class="row-han han">${h(les.han)}</div>
          <div class="row-py">${h(les.py)}</div>
        </div>
        ${right}
      </button>`;
  }).join('');

  const fresh = unseenIn(S.level).length;

  return `
    ${backHeader('home', 'Home', '<div class="hdr-meta">Flashcards</div>')}
    <div class="title"><div class="title-text">What are we<br>drilling?</div></div>
    <div class="level-row">${levelCard(1)}${levelCard(2)}</div>
    <div class="label" style="padding:8px 6px 0">BY CHAPTER</div>
    <div class="rows rows-scroll">${rows}</div>
    <div class="foot-card">
      <div class="foot-card-text">
        ${fresh ? `The ${fresh} word${fresh === 1 ? '' : 's'} I haven’t seen yet`
                : `Every ${LEVEL_LABEL[S.level]} word has been round at least once`}
      </div>
      ${fresh ? `<button class="btn-drill" data-act="drill-new">Drill<span class="dot"></span></button>` : ''}
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   3 · Drill
   ══════════════════════════════════════════════════════════════════════ */

/* `lesson` is the chapter number when the set was a single chapter, so the
   summary can offer the next one. Null for whole-level or unseen sets. */
function startDrill(pool, label, lesson = null) {
  const cards = buildSession(pool);
  if (!cards.length) return;
  Object.assign(S, {
    setLabel: label, cards, cardIndex: 0, flipped: false,
    drillLesson: lesson,
    newToday: cards.filter(isNew), againCount: 0, startedAt: Date.now(),
  });
  go('drill');
}

function renderDrill() {
  const card  = S.cards[S.cardIndex];
  const total = S.cards.length;
  const pct   = ((S.cardIndex + (S.flipped ? 1 : 0)) / total) * 100;

  // One-shot: only animate the card in when we've actually moved on, not
  // on every re-render (a flip or a pinyin toggle rebuilds this markup too).
  const entering = S.entering;
  S.entering = false;

  return `
    ${backHeader('sets', S.setLabel, `
      <div class="hdr-group">
        <div class="hdr-meta">${S.cardIndex + 1} / ${total}</div>
        <button class="pill" data-act="toggle-pinyin">Pinyin ${S.pinyinOn ? 'on' : 'off'}</button>
      </div>`)}

    <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>

    <div class="card-stack">
      <!-- Sits behind the live card and rises into view as you drag, so a
           swipe feels like lifting the top card off a deck. Blocked-out
           shapes rather than real content: they show where the next card's
           parts will land without giving the word away early. -->
      <div class="card-peek" aria-hidden="true">
        <div class="peek-top">
          <div class="peek-block peek-tag"></div>
          <div class="peek-block peek-audio"></div>
        </div>
        <div class="peek-centre">
          <div class="peek-block peek-han"></div>
          <div class="peek-block peek-py"></div>
        </div>
        <div class="peek-block peek-hint"></div>
      </div>

      <div class="card-wrap${entering ? ' is-entering' : ''}" data-act="flip">
        <div class="card-inner${S.flipped ? ' is-flipped' : ''}">

        <div class="face face-front">
          <div class="face-top">
            <div class="tag">${h(tagFor(card))}</div>
            <button class="audio-btn" data-act="say" data-text="${h(card.han)}">♪</button>
          </div>
          <div class="face-centre">
            <div class="${hanClass(card.han)} han">${h(card.han)}</div>
            <div class="card-py">${S.pinyinOn ? h(card.py) : ''}</div>
          </div>
          <div class="card-hint">Tap to reveal</div>
        </div>

        <div class="face face-back">
          <div class="face-top">
            <div class="tag">${h(tagFor(card))}</div>
            <button class="audio-btn" data-act="say" data-text="${h(card.ex)}">♪</button>
          </div>
          <div class="back-body">
            <div class="back-han han">${h(card.han)}</div>
            <div class="back-py">${h(card.py)}</div>
            <div class="back-en">${h(card.en)}</div>
          </div>
          <div class="example">
            <div class="example-han han">${h(card.ex)}</div>
            <div class="example-py">${h(card.exPy)}</div>
            <div class="example-en">${h(card.exEn)}</div>
          </div>
          <div class="card-hint card-hint-back">
            <span class="hint-ok">←&nbsp;correct</span>
            <span class="hint-sep">·</span>
            <span class="hint-no">incorrect&nbsp;→</span>
          </div>
        </div>

        </div>
      </div>
    </div>`;
}

/* Tap reveals. Once revealed, a tap counts the card correct — the quick
   path stays a single finger in one place — and swiping right is the
   deliberate "I didn't know that". */
function tapCard() {
  if (!S.flipped) {
    const card = S.cards[S.cardIndex];
    S.flipped = true;
    markSeen(card);
    // Say the word as it turns over. This runs inside the tap handler on
    // purpose — iOS only allows speech synthesis from a user gesture.
    speak(card.han);
    render();
    return;
  }
  advanceCard(true);
}

/* correct === false re-queues the card a few places later, so a word you
   missed comes back before the session is out. */
function advanceCard(correct) {
  const card = S.cards[S.cardIndex];

  if (correct) {
    markContinue(card);
  } else {
    markAgain(card);
    S.againCount += 1;
    const at = Math.min(S.cardIndex + 1 + REQUEUE_GAP, S.cards.length);
    S.cards.splice(at, 0, card);
  }

  S.entering = true;

  if (S.cardIndex + 1 >= S.cards.length) {
    S.lastMs = Date.now() - S.startedAt;
    store.sessions.push({
      date: todayISO(), ms: S.lastMs,
      cards: S.cards.length, fresh: S.newToday.length, again: S.againCount,
    });
    save();
    go('summary');
    return;
  }
  S.cardIndex += 1;
  S.flipped = false;
  render();
}

/* ══════════════════════════════════════════════════════════════════════
   4 · Session summary
   ══════════════════════════════════════════════════════════════════════ */

function renderSummary() {
  const rows = S.newToday.length
    ? S.newToday.map(w => `
        <div class="word-line">
          <div class="word-line-han han">${h(w.han)}</div>
          <div class="word-line-py">${h(w.py)}</div>
          <div class="word-line-en">${h(w.en)}</div>
        </div>`).join('')
    : '<div class="empty-note">No new words this time — all review.</div>';

  return `
    <div class="hdr">
      <div class="hdr-meta">${h(S.setLabel)}</div>
      <!-- The session time is still recorded for the avg-session stat on
           Progress; it just isn't worth the slot here. -->
      <button class="pill" data-act="sets">Pick another</button>
    </div>

    <div class="title-lg"><div class="title-lg-text">Session done.<br>Nice one.</div></div>

    <div class="stat-pair">
      <div class="stat-card stat-card-lime">
        <div class="stat-num">${S.cards.length}</div>
        <div class="stat-label">card${S.cards.length === 1 ? '' : 's'} through</div>
      </div>
      <div class="stat-card stat-card-white">
        <div class="stat-num">${S.againCount}</div>
        <div class="stat-label">back in the pile</div>
      </div>
    </div>

    <div class="list-card">
      <div class="label">NEW TODAY</div>
      <div class="list-card-body">${rows}</div>
    </div>

    <div class="btn-row">
      <button class="btn btn-ghost" data-act="home">Home</button>
      ${nextLesson()
        ? '<button class="btn btn-ink" data-act="drill-next">Next chapter</button>'
        : '<button class="btn btn-ink" data-act="exercises">Do the homework</button>'}
    </div>`;
}

/* The chapter after the one just drilled, if there is one. Whole-level and
   unseen-word sets aren't a chapter, so they have no "next" — those fall
   back to the homework button rather than showing a dead control. */
function nextLesson() {
  if (!S.drillLesson) return null;
  return LESSONS[S.level].find(les => les.n === S.drillLesson + 1) || null;
}

/* ══════════════════════════════════════════════════════════════════════
   5 · Exercises list
   ══════════════════════════════════════════════════════════════════════ */

function renderExercises() {
  const lv = S.exLevel;

  /* Same two-step as the flashcard picker: first tap picks the level,
     and the chapter list below swaps to it. */
  const levelCard = n => `
    <button class="level-card${n === lv ? ' level-card-active' : ''}"
            data-act="pick-ex-level" data-lv="${n}">
      <div class="label${n === lv ? ' label-on-tint' : ''}">LEVEL</div>
      <div class="level-name">${LEVEL_LABEL[n]}</div>
      <div class="level-sub">${LESSONS[n].length} chapters</div>
    </button>`;

  /* Nothing is highlighted until you choose it. One tap selects a chapter
     and shows what's in it; a second tap starts it. */
  const rows = LESSONS[lv].map(les => {
    const rec  = store.exercises[`${lv}-${les.n}`];
    const on   = les.n === S.exChapter;
    const best = rec ? (rec.best != null ? rec.best : rec.score) : null;

    const right = best != null
      ? `<div class="past-score">${best}/${rec.total}</div>
         <div class="status-dot ${best / rec.total >= 0.75 ? 'status-strong' : 'status-shaky'}"></div>`
      : '<div class="past-score">not done</div>';

    if (!on) {
      return `
        <button class="past-row" data-act="pick-chapter" data-les="${les.n}">
          <div class="row-body">
            <div class="row-name">Chapter ${les.n} · ${h(les.pages)}</div>
            <div class="row-han han">${h(les.han)}</div>
            <div class="row-py">${h(les.py)}</div>
          </div>
          ${right}
        </button>`;
    }

    const qs   = exerciseSet(lv, les.n);
    const kind = hasAuthoredSet(lv, les.n)
      ? 'Straight from the workbook, in book order.'
      : 'Generated from this chapter’s words until the workbook set is in.';

    return `
      <button class="week-card" data-act="pick-chapter" data-les="${les.n}">
        <div class="week-card-top">
          <div class="label label-on-tint">CHAPTER ${les.n} · ${h(les.pages.toUpperCase())}</div>
          <div class="pill-static">${qs.length} Q</div>
        </div>
        <div class="week-han han">${h(les.han)}</div>
        <div class="week-py">${h(les.py)}</div>
        <div class="week-desc">${h(kind)}</div>
        ${best != null
          ? `<div class="week-best">Best so far ${best} / ${rec.total} · ${rec.attempts || 1} ${(rec.attempts || 1) === 1 ? 'try' : 'tries'}</div>`
          : ''}
        <div class="btn-start">Start<span class="dot dot-lime"></span></div>
      </button>`;
  }).join('');

  return `
    ${backHeader('home', 'Home', `<div class="hdr-meta">Workbook ${lv}</div>`)}
    <div class="title"><div class="title-text">Which chapter?</div></div>
    <div class="level-row">${levelCard(1)}${levelCard(2)}</div>
    <div class="label" style="padding:8px 6px 0">BY CHAPTER</div>
    <div class="past-rows">${rows}</div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   6 · Exercise runner
   ══════════════════════════════════════════════════════════════════════ */

function startRunner(lesson) {
  const qs = exerciseSet(S.exLevel, lesson);
  if (!qs.length) return;
  Object.assign(S, {
    lesson, qs, questionIndex: 0, answer: null,
    exRight: 0, exStartedAt: Date.now(), exBeat: false, exBest: null,
  });
  prepQuestion();
  go('runner');
  // After render, so the character spans exist to light up. Both callers
  // reach here from a tap, which is what iOS requires to allow speech.
  speakQuestion();
}

/* Per-question scratch state. Picture questions need a slot per tile and a
   shuffled chip order; everything else clears them. */
function prepQuestion() {
  const q = S.qs[S.questionIndex];
  S.matches = [];
  S.chipOrder = [];
  if (q && q.type === 'picture') {
    S.matches = new Array(q.tiles.length).fill(null);
    S.chipOrder = shuffle(q.options.map((_, i) => i));
  }
}

/* The single `why.wrong` string can't describe a four-way match, so a
   missed picture question names the pairs that went astray instead. */
function verdictWhy(q, right) {
  if (q.type === 'picture' && !right) {
    const missed = q.tiles
      .map((t, i) => (S.matches[i] !== i ? `${q.options[i].han} is the ${t.alt}` : null))
      .filter(Boolean);
    if (missed.length) return missed.join('; ') + '.';
  }
  return right ? q.why.right : q.why.wrong;
}

/* A full-width option row, shared by listening and reading. An option may
   carry `img` — a workbook photo — in place of, or alongside, its text;
   the picture-choice questions are answered by looking, so the English
   caption stays hidden until the English toggle or an answer reveals it. */
function optRow(o, i, q, en, done) {
  const thumb = o.img
    ? `<img class="opt-thumb" src="${h(o.img)}" alt="${h(o.en || '')}">`
    : '';
  const text = o.han
    ? `<div class="opt-row-han han">${h(o.han)}</div>
       ${o.py ? `<div class="opt-row-py">${h(o.py)}</div>` : ''}`
    : '';
  return `
    <button class="${optClass(i, q)}" data-act="answer" data-i="${i}">
      <div class="opt-row-body${o.img ? ' has-thumb' : ''}">
        ${thumb}${text}
        ${(en || done) && o.en ? `<div class="opt-en">${o.han ? '· ' : ''}${h(o.en)}</div>` : ''}
      </div>
    </button>`;
}

/* One skin function shared by every option, per the handoff. */
function optClass(i, q) {
  if (S.answer === null) return 'opt';
  if (i === S.answer) return i === q.answer ? 'opt opt-correct' : 'opt opt-wrong';
  if (i === q.answer)  return 'opt opt-reveal';
  return 'opt opt-muted';
}

function renderRunner() {
  const q    = S.qs[S.questionIndex];
  const les  = LESSONS[CURRENT.level][S.lesson - 1];
  const en   = S.englishOn;
  const done = S.answer !== null;

  const body = {
    fill:      renderFill,
    picture:   renderPicture,
    listening: renderListening,
    reading:   renderReading,
    truefalse: renderTrueFalse,
  }[q.type](q, en, done);

  const right = S.answer === q.answer;
  const feedback = done ? `
    <div class="banner ${right ? 'banner-right' : 'banner-wrong'}">
      <div class="banner-verdict">${right ? 'Right.' : 'Not that one.'}</div>
      <div class="banner-why">${h(verdictWhy(q, right))}</div>
    </div>
    <button class="btn-next" data-act="next-q">
      ${S.questionIndex + 1 >= S.qs.length ? 'Finish' : 'Next question'}
    </button>` : '';

  /* A question counts as done the moment it's answered, so the bar moves
     under your finger rather than waiting for Next. Same component as the
     drill's. */
  const pct = ((S.questionIndex + (done ? 1 : 0)) / S.qs.length) * 100;

  return `
    <div class="q-head">
      ${backHeader('exercises', `Chapter ${les.n}`, `
        <div class="hdr-group">
          <button class="pill ${en ? 'is-on' : 'is-off'}" data-act="toggle-en">English ${en ? 'on' : 'off'}</button>
          <div class="pill">${S.questionIndex + 1} / ${S.qs.length}</div>
        </div>`)}
      <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
    </div>

    <div class="q-label-row">
      <div class="q-label">${h(q.label)}</div>
      ${questionText(q) && q.type !== 'listening'
        ? '<button class="audio-btn" data-act="say-q" aria-label="Read it again">♪</button>'
        : ''}
    </div>
    ${body}
    <div class="q-foot">${feedback}</div>`;
}

function renderFill(q, en, done) {
  const picked = done ? q.options[S.answer] : null;
  const right  = done && S.answer === q.answer;
  const blank  = picked
    ? `<span class="blank${right ? '' : ' blank-wrong'} han">${h(picked.han)}</span>`
    : '<span class="blank">&nbsp;</span>';

  const chips = q.options.map((o, i) => `
    <button class="${optClass(i, q)}" data-act="answer" data-i="${i}">
      <div class="opt-chip-body">
        <div class="opt-chip-han han">${h(o.han)}</div>
        <div class="opt-py">${h(o.py)}</div>
      </div>
    </button>`).join('');

  return `
    <div class="q-card">
      <div class="q-sentence han">${charSpans(q.pre)}${blank}${charSpans(q.post, [...q.pre].length)}</div>
      <div class="q-py">${h(q.py)}</div>
      ${en || done ? `<div class="q-en">${h(q.en)}</div>` : ''}
    </div>
    <div class="opt-chips">${chips}</div>`;
}

/* Every picture gets matched, not just one. tiles[i] pairs with
   options[i] — that invariant holds for authored and generated sets alike
   — so a match is right when the chosen option index equals the tile's.
   The chips are shown in a shuffled order, or matching would just be
   pairing things by position. */
function renderPicture(q, en, done) {
  const total   = q.tiles.length;
  const current = done ? -1 : S.matches.findIndex(m => m == null);

  const tiles = q.tiles.map((t, i) => {
    const picked = S.matches[i];
    const has    = picked != null;
    const cls = 'pic'
      + (has ? (picked === i ? ' pic-right' : ' pic-wrong') : '')
      + (i === current ? ' pic-target' : '');
    return `
      <div class="${cls}">
        <span class="pic-glyph" role="img" aria-label="${h(t.alt || '')}">${t.glyph}</span>
        ${has ? `<div class="pic-tag han">${h(q.options[picked].han)}</div>` : ''}
      </div>`;
  }).join('');

  const used = new Set(S.matches.filter(m => m != null));
  const chips = S.chipOrder.map(oi => {
    const o    = q.options[oi];
    const spent = used.has(oi);
    return `
      <button class="opt${spent ? ' opt-muted' : ''}"
              ${spent ? '' : `data-act="match" data-i="${oi}"`}>
        <div class="opt-chip-body opt-chip-body-sm">
          <div class="opt-chip-han-sm han">${h(o.han)}</div>
          <div class="opt-py">${h(o.py)}</div>
        </div>
      </button>`;
  }).join('');

  return `
    <div class="pic-grid">${tiles}</div>
    ${current !== -1
      ? `<div class="q-prompt">Which word goes with the outlined picture?
           <span class="q-count">${used.size + 1} of ${total}</span></div>`
      : ''}
    <div class="opt-chips">${chips}</div>`;
}

/* Assigns the tapped word to whichever picture is currently outlined. Once
   every picture has a word the question is settled: right only if all of
   them landed correctly. */
function matchPicture(oi) {
  const q = S.qs[S.questionIndex];
  if (S.answer !== null) return;

  const cur = S.matches.findIndex(m => m == null);
  if (cur === -1 || S.matches.includes(oi)) return;

  S.matches[cur] = oi;

  if (S.matches.every(m => m != null)) {
    const allRight = S.matches.every((m, i) => m === i);
    // -1 can never equal q.answer, so the banner reads it as wrong.
    S.answer = allRight ? q.answer : -1;
    if (allRight) S.exRight += 1;
    markStudiedToday();
    save();
  }
  render();
}

function renderListening(q, en, done) {
  const bars = [40, 70, 100, 55, 85, 35, 60, 90, 45].map((v, i) =>
    `<div class="wave-bar${i < 4 ? ' is-played' : ''}" style="height:${v}%"></div>`).join('');

  const rows = q.options.map((o, i) => optRow(o, i, q, en, done)).join('');

  return `
    <div class="player">
      <button class="player-play" data-act="say" data-text="${h(q.audio)}" aria-label="Play">▶</button>
      <div class="wave">${bars}</div>
      <div class="player-rate">0.75×</div>
    </div>
    <div class="q-prompt">${h(q.prompt)}</div>
    <div class="opt-list">${rows}</div>`;
}

/* The workbook's 判断对错: a statement, then a claim about it to judge.
   Options are fixed — 对 / 错 — so the data carries answer 0 for true and
   1 for false rather than an options array. */
function renderTrueFalse(q, en, done) {
  const opts = [
    { han: '对', py: 'duì', en: 'true' },
    { han: '错', py: 'cuò', en: 'false' },
  ];

  const rows = opts.map((o, i) => `
    <button class="${optClass(i, q)}" data-act="answer" data-i="${i}">
      <div class="opt-row-body">
        <div class="opt-row-han han">${o.han}</div>
        <div class="opt-row-py">${o.py}</div>
        <div class="opt-en">· ${o.en}</div>
      </div>
    </button>`).join('');

  /* Listening Part I shows a picture and asks whether the sentence you
     hear describes it. `img` is the workbook's own photo, cropped out of
     the page scan; `glyph` is the emoji fallback for generated sets. */
  const pic = q.img
    ? `<div class="tf-pic"><img src="${h(q.img)}" alt="${h(q.imgAlt || '')}"></div>`
    : q.glyph
      ? `<div class="tf-pic"><span class="pic-glyph" role="img" aria-label="${h(q.glyphAlt || '')}">${q.glyph}</span></div>`
      : '';

  return `
    ${pic}
    <div class="q-card">
      <div class="q-passage han">${charSpans(q.han)}</div>
      <div class="q-py">${h(q.py)}</div>
      ${en || done ? `<div class="q-en">${h(q.en)}</div>` : ''}
    </div>

    <div class="claim">
      <div class="claim-star">★</div>
      <div>
        <div class="claim-han han">${h(q.claim)}</div>
        <div class="q-py">${h(q.claimPy)}</div>
        ${en || done ? `<div class="q-en">${h(q.claimEn)}</div>` : ''}
      </div>
    </div>

    <div class="opt-list">${rows}</div>`;
}

function renderReading(q, en, done) {
  const rows = q.options.map((o, i) => optRow(o, i, q, en, done)).join('');

  return `
    <div class="q-card">
      <div class="q-passage han">${charSpans(q.han)}</div>
      <div class="q-py">${h(q.py)}</div>
      ${en || done ? `<div class="q-en">${h(q.en)}</div>` : ''}
    </div>
    <div class="q-prompt">${h(q.prompt)}</div>
    <div class="opt-list">${rows}</div>`;
}

function answerQuestion(i) {
  if (S.answer !== null) return;          // once answered, further taps are ignored
  S.answer = i;
  if (i === S.qs[S.questionIndex].answer) S.exRight += 1;
  markStudiedToday();
  save();
  render();
}

function nextQuestion() {
  if (S.questionIndex + 1 >= S.qs.length) {
    S.exMs = Date.now() - S.exStartedAt;

    /* Keep the best run as well as the latest, so a chapter is something
       you can go back and beat. `score` on the old shape was whatever you
       last got, so it seeds both. */
    const key  = `${S.exLevel}-${S.lesson}`;
    const prev = store.exercises[key] || {};
    const best = Math.max(S.exRight, prev.best != null ? prev.best : (prev.score || 0));
    store.exercises[key] = {
      best, last: S.exRight, total: S.qs.length,
      attempts: (prev.attempts || 0) + 1, date: todayISO(),
    };
    S.exBeat = S.exRight > (prev.best != null ? prev.best : (prev.score || -1))
               && (prev.attempts || 0) > 0;
    S.exBest = best;
    save();
    clearLit();
    go('exdone');
    return;
  }
  S.questionIndex += 1;
  S.answer = null;
  prepQuestion();
  render();
  speakQuestion();
}

/* ══════════════════════════════════════════════════════════════════════
   7 · Homework done
   ══════════════════════════════════════════════════════════════════════ */

function renderDone() {
  const les = LESSONS[S.exLevel][S.lesson - 1];
  const all = S.exRight === S.qs.length;

  const patterns = les.patterns.map(p => `
    <div>
      <div class="pattern-line-han han">${h(p.han)}</div>
      <div class="pattern-line-gloss">${h(p.gloss)}</div>
    </div>`).join('');

  const heading = all       ? 'Full marks.<br>Nothing to beat.'
                : S.exBeat  ? 'New best.<br>Well beaten.'
                            : 'Chapter done.<br>Worth a re-run.';

  /* Only worth showing once there's a mark that isn't just this run. */
  const beatLine = S.exBest != null && S.exBest > S.exRight
    ? `<div class="score-best">Your best is ${S.exBest} / ${S.qs.length}</div>`
    : S.exBeat
      ? '<div class="score-best">Beat your previous best</div>'
      : '';

  return `
    <div class="hdr">
      <div class="hdr-meta">Chapter ${les.n} · ${h(les.pages)}</div>
      <div class="hdr-meta">${fmtDuration(S.exMs)}</div>
    </div>

    <div class="title-lg">
      <div class="title-lg-text">${heading}</div>
    </div>

    <div class="score-card">
      <div class="label label-on-tint">THIS CHAPTER</div>
      <div class="score-line">
        <div class="score-num">${S.exRight}</div>
        <div class="score-of">/ ${S.qs.length} right</div>
      </div>
      ${beatLine}
    </div>

    <div class="list-card">
      <div class="label">PATTERNS YOU USED</div>
      <div class="list-card-body">${patterns}</div>
    </div>

    <div class="btn-row">
      <button class="btn btn-ghost" data-act="home">Home</button>
      <button class="btn btn-ink"   data-act="progress">See progress</button>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   8 · Progress
   ══════════════════════════════════════════════════════════════════════ */

function renderProgress() {
  const lv    = CURRENT.level;
  const words = wordsIn(lv);
  const held  = heldCount(lv);
  const total = words.length;

  const filled = Math.round((held / total) * 10);
  const segments = Array.from({ length: 10 }, (_, i) =>
    `<div class="segment${i < filled ? ' is-full' : ''}"></div>`).join('');

  const chapters = LESSONS[lv].map(les => {
    const set  = wordsIn(lv, les.n);
    const good = set.filter(isHeld).length;
    const pct  = set.length ? (good / set.length) * 100 : 0;
    const partial = pct > 0 && pct < 100;
    return `
      <div class="chapter-line">
        <div class="chapter-name">Chapter ${les.n}</div>
        <div class="chapter-track">
          <div class="chapter-fill${partial ? ' is-partial' : ''}" style="width:${pct}%"></div>
        </div>
        <div class="chapter-count">${good}/${set.length}</div>
      </div>`;
  }).join('');

  /* Exercise scores, kept apart from the word bars above — those move only
     when you drill flashcards, which is why doing homework looked like it
     wasn't registering. Best run per chapter, so there's a mark to beat. */
  const done = LESSONS[lv]
    .map(les => ({ les, rec: store.exercises[`${lv}-${les.n}`] }))
    .filter(x => x.rec);

  const exRows = done.length
    ? done.map(({ les, rec }) => {
        const best = rec.best != null ? rec.best : rec.score;
        const pct  = (best / rec.total) * 100;
        return `
          <div class="chapter-line">
            <div class="chapter-name">Chapter ${les.n}</div>
            <div class="chapter-track">
              <div class="chapter-fill${pct < 75 ? ' is-partial' : ''}" style="width:${pct}%"></div>
            </div>
            <div class="chapter-count">${best}/${rec.total}</div>
          </div>`;
      }).join('')
    : '<div class="empty-note">No chapters done yet — your best score for each will show up here.</div>';

  const exTotal = done.reduce((t, x) => t + (x.rec.best != null ? x.rec.best : x.rec.score), 0);
  const exOutOf = done.reduce((t, x) => t + x.rec.total, 0);

  const fresh = unseenIn(lv);
  const freshCard = fresh.length ? `
    <button class="bento-slip bento-wide" data-act="drill-new">
      <div class="slip-body">
        <div class="label label-on-ink">${fresh.length} NOT SEEN YET</div>
        <div class="slip-han han">${fresh.slice(0, 4).map(w => h(w.han)).join(' ')}</div>
        <div class="slip-py">${fresh.slice(0, 4).map(w => h(w.py)).join(' · ')}</div>
      </div>
      <div class="btn-drill btn-drill-lime">Drill<span class="dot"></span></div>
    </button>` : `
    <div class="bento-slip bento-wide">
      <div class="slip-body">
        <div class="label label-on-ink">ALL THE WAY THROUGH</div>
        <div class="slip-py" style="margin-top:5px">Every ${LEVEL_LABEL[lv]} word has been round at least once.</div>
      </div>
    </div>`;

  const since = parseISO(store.started).toLocaleDateString('en-GB', { month: 'long' });
  const avg   = avgSessionMs();

  return `
    ${backHeader('home', 'Home', `<div class="hdr-meta">Since ${h(since)}</div>`)}

    <div class="bento">
      <div class="bento-held bento-wide">
        <div class="label label-on-tint">WORDS HELD</div>
        <div class="held-line">
          <div class="held-num">${held}</div>
          <div class="held-of">/ ${total}</div>
        </div>
        <div class="segments">${segments}</div>
      </div>

      <div class="bento-stat bento-stat-white">
        <div class="bento-stat-num">${streakDays()}</div>
        <div class="bento-stat-label">day streak</div>
      </div>

      <div class="bento-stat bento-stat-peri">
        <div class="bento-stat-num">${avg ? fmtClock(avg) : '—'}</div>
        <div class="bento-stat-label">avg session</div>
      </div>

      <div class="bento-chapters bento-wide">
        <div class="label">WORDS HELD BY CHAPTER</div>
        ${chapters}
      </div>

      <div class="bento-chapters bento-wide">
        <div class="label">EXERCISE SCORES${exOutOf ? ` · BEST ${exTotal}/${exOutOf}` : ''}</div>
        ${exRows}
      </div>

      ${freshCard}
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   Router
   ══════════════════════════════════════════════════════════════════════ */

const VIEWS = {
  home: renderHome, sets: renderSets, drill: renderDrill, summary: renderSummary,
  exercises: renderExercises, runner: renderRunner, exdone: renderDone,
  progress: renderProgress,
};

/* Screens whose content can exceed the 800pt canvas. */
const SCROLLS = new Set(['runner', 'exdone', 'summary']);

function go(screen) {
  S.screen = screen;
  render();
  $app.scrollTop = 0;
}

function render() {
  $app.className = 'app' + (SCROLLS.has(S.screen) ? ' is-scroll' : '');
  $app.innerHTML = VIEWS[S.screen]();
}

/* ══════════════════════════════════════════════════════════════════════
   Card swipe — left is correct, right is incorrect

   Pointer events so one code path covers touch and mouse. The drag is
   applied to .card-wrap rather than .card-inner, because .card-inner
   already owns the rotateY flip and the two transforms would fight.
   ══════════════════════════════════════════════════════════════════════ */

const SWIPE_HINT = 34;            // px of travel before the colour hint shows
const FLING_MS   = 300;           // must outlast the fling transition, see endDrag
let drag = null;
let swipedAt = 0;                 // suppresses the click that follows a swipe

function swipeThreshold(el) {
  return Math.max(64, el.offsetWidth * 0.26);
}

$app.addEventListener('pointerdown', ev => {
  if (S.screen !== 'drill' || !S.flipped) return;      // only once revealed
  const wrap = ev.target.closest('.card-wrap');
  if (!wrap || ev.target.closest('[data-act="say"]')) return;
  drag = {
    x0: ev.clientX, y0: ev.clientY, dx: 0, wrap, moved: false,
    peek: wrap.parentElement.querySelector('.card-peek'),
  };
});

$app.addEventListener('pointermove', ev => {
  if (!drag) return;
  const dx = ev.clientX - drag.x0;
  const dy = ev.clientY - drag.y0;
  if (!drag.moved && Math.abs(dx) < 8) return;
  if (!drag.moved && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }

  drag.moved = true;
  drag.dx = dx;

  // How far through the gesture we are, 0…1.
  const t = Math.min(1, Math.abs(dx) / swipeThreshold(drag.wrap));

  drag.wrap.style.transition = 'none';
  drag.wrap.style.transform =
    `translateX(${dx}px) rotate(${dx / 26}deg) scale(${1 - t * 0.04})`;
  drag.wrap.dataset.swipe =
    dx < -SWIPE_HINT ? 'correct' : dx > SWIPE_HINT ? 'incorrect' : '';

  // The card underneath rises to meet you as the top one leaves.
  if (drag.peek) {
    drag.peek.style.transition = 'none';
    drag.peek.style.opacity = String(t);
    drag.peek.style.transform =
      `scale(${0.93 + t * 0.07}) translateY(${(1 - t) * 12}px)`;
  }
});

function endDrag(cancelled) {
  if (!drag) return;
  const { wrap, dx, moved, peek } = drag;
  drag = null;

  wrap.style.transition = '';
  delete wrap.dataset.swipe;
  if (peek) peek.style.transition = '';

  if (!moved) return;
  swipedAt = Date.now();

  if (!cancelled && Math.abs(dx) >= swipeThreshold(wrap)) {
    const dir = dx > 0 ? 1 : -1;

    /* Fling it clear off the screen. No opacity fade — a card that
       dissolves while still on screen reads as disappearing rather than
       being thrown — and the curve accelerates out instead of the usual
       ease-out so it keeps its momentum. */
    wrap.style.transition = `transform ${FLING_MS}ms cubic-bezier(.4, 0, 1, 1)`;
    wrap.style.transform =
      `translateX(${dir * 160}%) rotate(${dir * 20}deg) scale(.92)`;

    // Settle the card underneath into place while the top one is leaving.
    if (peek) {
      peek.style.opacity = '1';
      peek.style.transform = 'scale(1) translateY(0)';
    }

    /* Wait for the transition to actually finish before re-rendering.
       Timing the swap on a matching setTimeout races the animation, and
       losing that race is what made the card look like it vanished
       part-way across. The timer is only a fallback for the case where
       transitionend never fires (interrupted transition, hidden tab). */
    let advanced = false;
    const done = () => {
      if (advanced) return;
      advanced = true;
      wrap.removeEventListener('transitionend', done);
      advanceCard(dir < 0);          // left is correct, right is incorrect
    };
    wrap.addEventListener('transitionend', done);
    setTimeout(done, FLING_MS + 120);
    return;
  }

  wrap.style.transform = '';       // spring back
  if (peek) {
    peek.style.opacity = '';
    peek.style.transform = '';
  }
}

$app.addEventListener('pointerup', () => endDrag(false));
$app.addEventListener('pointercancel', () => endDrag(true));
$app.addEventListener('pointerleave', () => endDrag(true));

/* ══════════════════════════════════════════════════════════════════════
   Events — one delegated handler for the whole app
   ══════════════════════════════════════════════════════════════════════ */

$app.addEventListener('click', ev => {
  const target = ev.target.closest('[data-act]');
  if (!target) return;
  const act = target.dataset.act;

  // A swipe ends with a click; don't let it also advance the card.
  if (act === 'flip' && Date.now() - swipedAt < 400) return;

  switch (act) {
    case 'home':      go('home'); break;
    case 'sets':      go('sets'); break;
    case 'progress':  go('progress'); break;
    case 'exercises': go('exercises'); break;

    /* Tapping an unselected level just selects it, so you can pick a
       chapter within it. Tapping the selected one drills the whole level. */
    case 'pick-level': {
      const lv = Number(target.dataset.lv);
      if (lv === S.level) {
        startDrill(wordsIn(lv), `All ${LEVEL_LABEL[lv]}`);
      } else {
        S.level = lv;
        render();
      }
      break;
    }

    case 'drill-lesson': {
      const n = Number(target.dataset.les);
      startDrill(wordsIn(S.level, n), `Chapter ${n}`, n);
      break;
    }

    case 'drill-new': {
      const fresh = unseenIn(S.level);
      startDrill(fresh, `New · ${fresh.length}`);
      break;
    }

    case 'drill-next': {
      const les = nextLesson();
      if (les) startDrill(wordsIn(S.level, les.n), `Chapter ${les.n}`, les.n);
      break;
    }

    case 'flip':
      tapCard();
      break;

    case 'toggle-pinyin':
      ev.stopPropagation();               // don't flip the card underneath
      S.pinyinOn = !S.pinyinOn;
      render();
      break;

    case 'say':
      ev.stopPropagation();
      speak(target.dataset.text);
      break;

    case 'say-q':
      ev.stopPropagation();
      speakQuestion();
      break;

    case 'run':
      startRunner(Number(target.dataset.les));
      break;

    /* Tapping an unselected chapter opens it; tapping the open one runs it. */
    case 'pick-chapter': {
      const n = Number(target.dataset.les);
      if (n === S.exChapter) startRunner(n);
      else { S.exChapter = n; render(); }
      break;
    }

    case 'pick-ex-level':
      S.exLevel = Number(target.dataset.lv);
      S.exChapter = null;          // chapter numbers don't carry across books
      render();
      break;

    case 'toggle-en':
      S.englishOn = !S.englishOn;
      render();
      break;

    case 'answer':
      answerQuestion(Number(target.dataset.i));
      break;

    case 'match':
      matchPicture(Number(target.dataset.i));
      break;

    case 'next-q':
      nextQuestion();
      break;
  }
});

/* ══════════════════════════════════════════════════════════════════════
   Boot
   ══════════════════════════════════════════════════════════════════════ */

render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(e =>
      console.warn('Hanzi: service worker not registered.', e));
  });
}
