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
const HELD_STREAK  = 3;           // correct answers in a row before a word counts as "held"
const SLIP_MISSES  = 2;           // misses that put a word in the slipping pile

/* Days to wait before a word is due again, indexed by current streak. */
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
  exercises: {},   // "level-lesson" → { score, total, date }
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
  return store.words[id] || (store.words[id] = { seen: 0, miss: 0, streak: 0, last: null });
}

const isNew      = w => ws(w.id).seen === 0;
const isHeld     = w => ws(w.id).streak >= HELD_STREAK;
const isSlipping = w => { const s = ws(w.id); return s.miss >= SLIP_MISSES && s.streak < 2; };

function isDue(w) {
  const s = ws(w.id);
  if (s.seen === 0) return true;
  return daysSince(s.last) >= INTERVALS[Math.min(s.streak, INTERVALS.length - 1)];
}

function tagFor(w) {
  const s = ws(w.id);
  if (s.seen === 0)  return 'NEW';
  if (isSlipping(w)) return 'SLIPPING';
  return `SEEN ${s.seen}×`;
}

function grade(w, correct) {
  const s = ws(w.id);
  s.seen += 1;
  if (correct) {
    s.streak += 1;
    s.last = todayISO();
  } else {
    s.miss += 1;
    s.streak = 0;
  }
  markStudiedToday();
  save();
}

/* ── Word sets ──────────────────────────────────────────────────────── */

const wordsIn      = (lv, les) => VOCAB.filter(w => w.level === lv && (les == null || w.les === les));
const slippingList = ()        => VOCAB.filter(isSlipping);
const dueList      = lv        => wordsIn(lv).filter(isDue);

/* Build a session: due cards first, weighted toward slipping ones. */
function buildSession(pool) {
  const slip  = pool.filter(isSlipping);
  const fresh = pool.filter(w => isNew(w) && !isSlipping(w));
  const rest  = pool.filter(w => !isSlipping(w) && !isNew(w) && isDue(w));
  const ordered = [...shuffle(slip), ...shuffle(fresh), ...shuffle(rest)];
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
  gotCount: 0,
  newToday: [],
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
  const slip  = slippingList().length;
  const days  = streakDays();

  return `
    <div class="hdr">
      <div class="hdr-brand">
        <div class="hdr-mark"></div>
        <div class="hdr-name">Hanzi</div>
      </div>
      <div class="hdr-meta">${LEVEL_LABEL[lv]} · day ${days || 1}</div>
    </div>

    <div class="hero"><div class="hero-text">Three things.<br>Pick one.</div></div>

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
        <div class="home-card-sub">Lesson ${les.n} workbook, 4 questions</div>
      </div>
    </button>

    <button class="home-card home-card-c" data-act="progress">
      <div class="home-card-top">
        <div class="icon-sq icon-sq-on-ink han">进</div>
        <div class="home-card-badge">${held} / ${total}</div>
      </div>
      <div>
        <div class="home-card-title">Progress</div>
        <div class="home-card-sub">${days} day streak · ${slip} slipping</div>
      </div>
    </button>`;
}

/* ══════════════════════════════════════════════════════════════════════
   2 · Set picker
   ══════════════════════════════════════════════════════════════════════ */

function renderSets() {
  const levelCard = lv => {
    const words = wordsIn(lv);
    const held  = heldCount(lv);
    const sub   = held === words.length
      ? `${words.length} words · all solid`
      : `${words.length} words · ${held} held`;
    return `
      <button class="level-card${lv === S.level ? ' level-card-active' : ''}"
              data-act="drill-level" data-lv="${lv}">
        <div class="label${lv === S.level ? ' label-on-tint' : ''}">LEVEL</div>
        <div class="level-name">${LEVEL_LABEL[lv]}</div>
        <div class="level-sub">${sub}</div>
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
          <div class="row-name">Lesson ${les.n}</div>
          <div class="row-han han">${h(les.han)}</div>
          <div class="row-py">${h(les.py)}</div>
        </div>
        ${right}
      </button>`;
  }).join('');

  const slip = slippingList().length;

  return `
    ${backHeader('home', 'Home', '<div class="hdr-meta">Flashcards</div>')}
    <div class="title"><div class="title-text">What are we<br>drilling?</div></div>
    <div class="level-row">${levelCard(1)}${levelCard(2)}</div>
    <div class="label" style="padding:8px 6px 0">BY CHAPTER</div>
    <div class="rows rows-scroll">${rows}</div>
    <div class="foot-card">
      <div class="foot-card-text">
        ${slip ? `Just the ${slip} word${slip === 1 ? '' : 's'} I keep missing`
               : 'Nothing slipping yet — keep going'}
      </div>
      ${slip ? `<button class="btn-drill" data-act="drill-slipping">Drill<span class="dot"></span></button>` : ''}
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   3 · Drill
   ══════════════════════════════════════════════════════════════════════ */

function startDrill(pool, label) {
  const cards = buildSession(pool);
  if (!cards.length) return;
  Object.assign(S, {
    setLabel: label, cards, cardIndex: 0, flipped: false,
    gotCount: 0, newToday: cards.filter(isNew), startedAt: Date.now(),
  });
  go('drill');
}

function renderDrill() {
  const card  = S.cards[S.cardIndex];
  const total = S.cards.length;
  const pct   = ((S.cardIndex + (S.flipped ? 1 : 0)) / total) * 100;

  return `
    ${backHeader('sets', S.setLabel, `
      <div class="hdr-group">
        <div class="hdr-meta">${S.cardIndex + 1} / ${total}</div>
        <button class="pill" data-act="toggle-pinyin">Pinyin ${S.pinyinOn ? 'on' : 'off'}</button>
      </div>`)}

    <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>

    <div class="card-wrap" data-act="flip">
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
        </div>

      </div>
    </div>

    <div class="rate-row">
      <button class="btn btn-ghost" data-act="rate" data-ok="0">Again</button>
      <button class="btn btn-ink"   data-act="rate" data-ok="1">Got it</button>
    </div>`;
}

function rate(ok) {
  grade(S.cards[S.cardIndex], ok);
  if (ok) S.gotCount += 1;

  if (S.cardIndex + 1 >= S.cards.length) {
    S.lastMs = Date.now() - S.startedAt;
    store.sessions.push({
      date: todayISO(), ms: S.lastMs,
      got: S.gotCount, missed: S.cards.length - S.gotCount,
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
  const missed = S.cards.length - S.gotCount;
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
      <div class="hdr-meta">${fmtDuration(S.lastMs)}</div>
    </div>

    <div class="title-lg"><div class="title-lg-text">Session done.<br>Nice one.</div></div>

    <div class="stat-pair">
      <div class="stat-card stat-card-lime">
        <div class="stat-num">${S.gotCount}</div>
        <div class="stat-label">got it</div>
      </div>
      <div class="stat-card stat-card-white">
        <div class="stat-num">${missed}</div>
        <div class="stat-label">back in the pile</div>
      </div>
    </div>

    <div class="list-card">
      <div class="label">NEW TODAY</div>
      <div class="list-card-body">${rows}</div>
    </div>

    <div class="btn-row">
      <button class="btn btn-ghost" data-act="home">Home</button>
      <button class="btn btn-ink"   data-act="exercises">Do the homework</button>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   5 · Exercises list
   ══════════════════════════════════════════════════════════════════════ */

function renderExercises() {
  const lv   = CURRENT.level;
  const cur  = LESSONS[lv][CURRENT.lesson - 1];
  const qs   = exerciseSet(lv, cur.n);
  const kind = hasAuthoredSet(lv, cur.n)
    ? 'Blank-filling, pictures, listening, a short reading.'
    : 'Generated from this lesson’s words until the workbook set is in.';

  const past = LESSONS[lv].slice(0, CURRENT.lesson - 1).reverse().slice(0, 3).map(les => {
    const rec = store.exercises[`${lv}-${les.n}`];
    if (!rec) {
      return `
        <button class="past-row" data-act="run" data-les="${les.n}">
          <div class="row-body">
            <div class="row-name">Lesson ${les.n} · ${h(les.pages)}</div>
            <div class="row-py">${h(les.py)}</div>
          </div>
          <div class="past-score">not done</div>
        </button>`;
    }
    const strong = rec.score / rec.total >= 0.75;
    return `
      <button class="past-row" data-act="run" data-les="${les.n}">
        <div class="row-body">
          <div class="row-name">Lesson ${les.n} · ${h(les.pages)}</div>
          <div class="row-py">${h(les.py)}</div>
        </div>
        <div class="past-score">${rec.score}/${rec.total}</div>
        <div class="status-dot ${strong ? 'status-strong' : 'status-shaky'}"></div>
      </button>`;
  }).join('');

  const next = LESSONS[lv][CURRENT.lesson];
  const nextRow = next ? `
    <div class="past-row past-row-next">
      <div class="row-body"><div class="row-name">Lesson ${next.n} · ${h(next.pages)}</div></div>
      <div style="font-size:12px">next week</div>
    </div>` : '';

  return `
    ${backHeader('home', 'Home', `<div class="hdr-meta">Workbook ${lv}</div>`)}
    <div class="title"><div class="title-text">This week’s<br>homework.</div></div>

    <button class="week-card" data-act="run" data-les="${cur.n}">
      <div class="week-card-top">
        <div class="label label-on-tint">LESSON ${cur.n} · ${h(cur.pages.toUpperCase())}</div>
        <div class="pill-static">${qs.length} Q</div>
      </div>
      <div class="week-han han">${h(cur.han)}</div>
      <div class="week-py">${h(cur.py)}</div>
      <div class="week-desc">${h(kind)}</div>
      <div class="btn-start">Start<span class="dot dot-lime"></span></div>
    </button>

    <div class="past-rows">${past}${nextRow}</div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   6 · Exercise runner
   ══════════════════════════════════════════════════════════════════════ */

function startRunner(lesson) {
  const qs = exerciseSet(CURRENT.level, lesson);
  if (!qs.length) return;
  Object.assign(S, {
    lesson, qs, questionIndex: 0, answer: null,
    exRight: 0, exStartedAt: Date.now(),
  });
  go('runner');
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
  }[q.type](q, en, done);

  const feedback = done ? `
    <div class="banner ${S.answer === q.answer ? 'banner-right' : 'banner-wrong'}">
      <div class="banner-verdict">${S.answer === q.answer ? 'Right.' : 'Not that one.'}</div>
      <div class="banner-why">${h(S.answer === q.answer ? q.why.right : q.why.wrong)}</div>
    </div>
    <button class="btn-next" data-act="next-q">
      ${S.questionIndex + 1 >= S.qs.length ? 'Finish' : 'Next question'}
    </button>` : '';

  return `
    ${backHeader('exercises', `Lesson ${les.n}`, `
      <div class="hdr-group">
        <button class="pill ${en ? 'is-on' : 'is-off'}" data-act="toggle-en">English ${en ? 'on' : 'off'}</button>
        <div class="pill">${S.questionIndex + 1} / ${S.qs.length}</div>
      </div>`)}

    <div class="q-label">${h(q.label)}</div>
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
      <div class="q-sentence han">${h(q.pre)}${blank}${h(q.post)}</div>
      <div class="q-py">${h(q.py)}</div>
      ${en ? `<div class="q-en">${h(q.en)}</div>` : ''}
    </div>
    <div class="opt-chips">${chips}</div>`;
}

function renderPicture(q, en, done) {
  const tiles = q.tiles.map((t, i) => `
    <div class="pic${i === q.target ? ' pic-target' : ''}">
      <span class="pic-glyph" role="img" aria-label="${h(t.alt || '')}">${t.glyph}</span>
    </div>`).join('');

  const chips = q.options.map((o, i) => `
    <button class="${optClass(i, q)}" data-act="answer" data-i="${i}">
      <div class="opt-chip-body opt-chip-body-sm">
        <div class="opt-chip-han-sm han">${h(o.han)}</div>
        <div class="opt-py">${h(o.py)}</div>
      </div>
    </button>`).join('');

  return `
    <div class="pic-grid">${tiles}</div>
    <div class="opt-chips">${chips}</div>`;
}

function renderListening(q, en, done) {
  const bars = [40, 70, 100, 55, 85, 35, 60, 90, 45].map((v, i) =>
    `<div class="wave-bar${i < 4 ? ' is-played' : ''}" style="height:${v}%"></div>`).join('');

  const rows = q.options.map((o, i) => `
    <button class="${optClass(i, q)}" data-act="answer" data-i="${i}">
      <div class="opt-row-body">
        <div class="opt-row-han han">${h(o.han)}</div>
        <div class="opt-row-py">${h(o.py)}</div>
        ${en && o.en ? `<div class="opt-en">· ${h(o.en)}</div>` : ''}
      </div>
    </button>`).join('');

  return `
    <div class="player">
      <button class="player-play" data-act="say" data-text="${h(q.audio)}" aria-label="Play">▶</button>
      <div class="wave">${bars}</div>
      <div class="player-rate">0.75×</div>
    </div>
    <div class="q-prompt">${h(q.prompt)}</div>
    <div class="opt-list">${rows}</div>`;
}

function renderReading(q, en, done) {
  const rows = q.options.map((o, i) => `
    <button class="${optClass(i, q)}" data-act="answer" data-i="${i}">
      <div class="opt-row-body">
        <div class="opt-row-han han">${h(o.han)}</div>
        <div class="opt-row-py">${h(o.py)}</div>
        ${en && o.en ? `<div class="opt-en">· ${h(o.en)}</div>` : ''}
      </div>
    </button>`).join('');

  return `
    <div class="q-card">
      <div class="q-passage han">${h(q.han)}</div>
      <div class="q-py">${h(q.py)}</div>
      ${en ? `<div class="q-en">${h(q.en)}</div>` : ''}
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
    store.exercises[`${CURRENT.level}-${S.lesson}`] = {
      score: S.exRight, total: S.qs.length, date: todayISO(),
    };
    save();
    go('exdone');
    return;
  }
  S.questionIndex += 1;
  S.answer = null;
  render();
}

/* ══════════════════════════════════════════════════════════════════════
   7 · Homework done
   ══════════════════════════════════════════════════════════════════════ */

function renderDone() {
  const les = LESSONS[CURRENT.level][S.lesson - 1];
  const all = S.exRight === S.qs.length;

  const patterns = les.patterns.map(p => `
    <div>
      <div class="pattern-line-han han">${h(p.han)}</div>
      <div class="pattern-line-gloss">${h(p.gloss)}</div>
    </div>`).join('');

  return `
    <div class="hdr">
      <div class="hdr-meta">Lesson ${les.n} · ${h(les.pages)}</div>
      <div class="hdr-meta">${fmtDuration(S.exMs)}</div>
    </div>

    <div class="title-lg">
      <div class="title-lg-text">${all ? 'Homework’s in.<br>You’re current.' : 'Homework’s in.<br>Worth a re-run.'}</div>
    </div>

    <div class="score-card">
      <div class="label label-on-tint">THIS PAGE</div>
      <div class="score-line">
        <div class="score-num">${S.exRight}</div>
        <div class="score-of">/ ${S.qs.length} right</div>
      </div>
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
        <div class="chapter-name">Lesson ${les.n}</div>
        <div class="chapter-track">
          <div class="chapter-fill${partial ? ' is-partial' : ''}" style="width:${pct}%"></div>
        </div>
        <div class="chapter-count">${good}/${set.length}</div>
      </div>`;
  }).join('');

  const slip = slippingList();
  const slipCard = slip.length ? `
    <button class="bento-slip bento-wide" data-act="drill-slipping">
      <div class="slip-body">
        <div class="label label-on-ink">${slip.length} KEEP SLIPPING</div>
        <div class="slip-han han">${slip.slice(0, 4).map(w => h(w.han)).join(' ')}</div>
        <div class="slip-py">${slip.slice(0, 4).map(w => h(w.py)).join(' · ')}</div>
      </div>
      <div class="btn-drill btn-drill-lime">Drill<span class="dot"></span></div>
    </button>` : `
    <div class="bento-slip bento-wide">
      <div class="slip-body">
        <div class="label label-on-ink">NOTHING SLIPPING</div>
        <div class="slip-py" style="margin-top:5px">Everything you’ve seen is holding.</div>
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
        <div class="label">BY CHAPTER</div>
        ${chapters}
      </div>

      ${slipCard}
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
   Events — one delegated handler for the whole app
   ══════════════════════════════════════════════════════════════════════ */

$app.addEventListener('click', ev => {
  const target = ev.target.closest('[data-act]');
  if (!target) return;
  const act = target.dataset.act;

  switch (act) {
    case 'home':      go('home'); break;
    case 'sets':      go('sets'); break;
    case 'progress':  go('progress'); break;
    case 'exercises': go('exercises'); break;

    case 'drill-level':
      S.level = Number(target.dataset.lv);
      startDrill(wordsIn(S.level), `All ${LEVEL_LABEL[S.level]}`);
      break;

    case 'drill-lesson': {
      const n = Number(target.dataset.les);
      startDrill(wordsIn(S.level, n), `Lesson ${n}`);
      break;
    }

    case 'drill-slipping': {
      const slip = slippingList();
      startDrill(slip, `Slipping · ${slip.length}`);
      break;
    }

    case 'flip':
      S.flipped = !S.flipped;
      render();
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

    case 'rate':
      rate(target.dataset.ok === '1');
      break;

    case 'run':
      startRunner(Number(target.dataset.les));
      break;

    case 'toggle-en':
      S.englishOn = !S.englishOn;
      render();
      break;

    case 'answer':
      answerQuestion(Number(target.dataset.i));
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
