/* ═══════════════════════════════════════════════════════════════════════
   Hanzi — workbook exercises

   Hand-authored sets, keyed "<level>-<lesson>". Any lesson without a set
   here falls back to a generated set built from that lesson's own
   vocabulary (see buildGeneratedSet in app.js), so every lesson is
   playable — hand-authored sets simply read better.

   ── Question shapes ───────────────────────────────────────────────────
   fill      { type, label, pre, post, py, en, options[{han,py}], answer, why{right,wrong} }
               `pre` / `post` are the sentence either side of the blank.
   picture   { type, label, tiles[{glyph,alt}], options[{han,py}], answer, why }
               Every picture gets matched, one after another. **tiles[i] must
               pair with options[i]** — that is how a match is judged correct,
               so keep the two arrays in step when editing. The chips are
               shuffled on screen, so the pairing is never positional.
               `tiles` are placeholder art until real photos are dropped in.
               `answer` is only used to phrase the verdict; `target` is no
               longer read.
   listening { type, label, audio, prompt, options[{han,py,en}], answer, why }
               `audio` is the Chinese that gets spoken (speech synthesis,
               zh-CN, 0.75× rate). Swap for an <audio src> when you have
               the workbook recordings.
   reading   { type, label, han, py, en, prompt, options[{han,py,en}], answer, why }

   `answer` is the index of the correct option. `why.right` shows after a
   correct pick, `why.wrong` after an incorrect one.
   ═══════════════════════════════════════════════════════════════════════ */

const EXERCISES = {

  /* ── HSK 2 · Lesson 1 — 他在哪儿呢 ─────────────────────────────────── */
  '2-1': [
    { type:'fill', label:'FILL IN THE BLANK',
      pre:'他', post:'打电话呢。',
      py:'Tā ___ dǎ diànhuà ne.',
      en:"He's on the phone right now.",
      options:[ {han:'正在',py:'zhèngzài'}, {han:'已经',py:'yǐjīng'},
                {han:'因为',py:'yīnwèi'},  {han:'一起',py:'yìqǐ'} ],
      answer:0,
      why:{ right:'正在 + verb + 呢 marks something happening at this moment.',
            wrong:'已经 means "already" — a finished action, not one in progress.' } },

    { type:'picture', label:'MATCH THE WORD TO THE PICTURE',
      tiles:[ {glyph:'🪑',alt:'chair'}, {glyph:'🚪',alt:'door'},
              {glyph:'📚',alt:'books'}, {glyph:'🖥️',alt:'computer'} ],
      target:1,
      options:[ {han:'椅子',py:'yǐzi'}, {han:'门',py:'mén'},
                {han:'书',py:'shū'},   {han:'电脑',py:'diànnǎo'} ],
      answer:1,
      why:{ right:'门 mén — door.', wrong:'That one is not the door.' } },

    { type:'listening', label:'LISTENING',
      audio:'老师正在教室里等你。',
      prompt:'Where is the teacher?',
      options:[ {han:'在教室里',py:'zài jiàoshì lǐ',en:'in the classroom'},
                {han:'在门外',  py:'zài mén wài',  en:'outside the door'},
                {han:'在家',    py:'zài jiā',      en:'at home'} ],
      answer:0,
      why:{ right:'在 + place tells you where someone is.',
            wrong:'Listen again for 教室 jiàoshì — classroom.' } },

    { type:'reading', label:'SHORT READING',
      han:'我在找我的手机。它不在房间里，也不在教室里。',
      py:'Wǒ zài zhǎo wǒ de shǒujī. Tā bú zài fángjiān lǐ, yě bú zài jiàoshì lǐ.',
      en:"I'm looking for my phone. It isn't in the room, and it isn't in the classroom either.",
      prompt:'What is the speaker doing?',
      options:[ {han:'找手机',  py:'zhǎo shǒujī',  en:'looking for a phone'},
                {han:'打电话',  py:'dǎ diànhuà',   en:'making a call'},
                {han:'上班',    py:'shàngbān',     en:'going to work'} ],
      answer:0,
      why:{ right:'找 zhǎo — to look for something.',
            wrong:'The passage says 找 zhǎo, not 打电话.' } },
  ],

  /* ── HSK 2 · Lesson 2 — 我每天六点起床 ────────────────────────────── */
  '2-2': [
    { type:'fill', label:'FILL IN THE BLANK',
      pre:'我', post:'天六点起床。',
      py:'Wǒ ___ tiān liù diǎn qǐchuáng.',
      en:'I get up at six every day.',
      options:[ {han:'每',py:'měi'}, {han:'两',py:'liǎng'},
                {han:'些',py:'xiē'}, {han:'次',py:'cì'} ],
      answer:0,
      why:{ right:'每 + measure word means "every…" — 每天 is "every day".',
            wrong:'两 is the number two used with measure words, not "every".' } },

    { type:'picture', label:'MATCH THE WORD TO THE PICTURE',
      tiles:[ {glyph:'🏃',alt:'running'}, {glyph:'🛏️',alt:'bed'},
              {glyph:'☕',alt:'coffee'},  {glyph:'🧺',alt:'laundry'} ],
      target:0,
      options:[ {han:'跑步',py:'pǎobù'},   {han:'睡觉',py:'shuìjiào'},
                {han:'咖啡',py:'kāfēi'},   {han:'洗衣服',py:'xǐ yīfu'} ],
      answer:0,
      why:{ right:'跑步 pǎobù — to run.', wrong:'That one is not running.' } },

    { type:'listening', label:'LISTENING',
      audio:'我每天早上跑步，跑一个小时。',
      prompt:'How long does she run for?',
      options:[ {han:'一个小时', py:'yí ge xiǎoshí', en:'an hour'},
                {han:'两个小时', py:'liǎng ge xiǎoshí', en:'two hours'},
                {han:'六点',     py:'liù diǎn',       en:'six o’clock'} ],
      answer:0,
      why:{ right:'小时 xiǎoshí is a duration; 点 diǎn is a clock time.',
            wrong:'She says 一个小时 — one hour.' } },

    { type:'reading', label:'SHORT READING',
      han:'我每天六点起床，先运动，然后洗澡、吃早饭。晚上很累，我十一点睡觉。',
      py:'Wǒ měi tiān liù diǎn qǐchuáng, xiān yùndòng, ránhòu xǐzǎo, chī zǎofàn. Wǎnshang hěn lèi, wǒ shíyī diǎn shuìjiào.',
      en:'I get up at six every day: first exercise, then a shower and breakfast. In the evening I am tired, so I sleep at eleven.',
      prompt:'What does she do first after getting up?',
      options:[ {han:'运动',  py:'yùndòng',  en:'exercise'},
                {han:'吃早饭', py:'chī zǎofàn', en:'eat breakfast'},
                {han:'睡觉',  py:'shuìjiào', en:'sleep'} ],
      answer:0,
      why:{ right:'先…然后… orders the steps — 运动 comes first.',
            wrong:'先 xiān marks what happens first: 运动.' } },
  ],

  /* ── HSK 2 · Lesson 3 — 左边那个红色的是我的 ──────────────────────── */
  '2-3': [
    { type:'fill', label:'FILL IN THE BLANK',
      pre:'左边那个', post:'色的是我的。',
      py:'Zuǒbian nàge ___ sè de shì wǒ de.',
      en:'The red one on the left is mine.',
      options:[ {han:'红',py:'hóng'}, {han:'白',py:'bái'},
                {han:'黑',py:'hēi'},  {han:'新',py:'xīn'} ],
      answer:0,
      why:{ right:'红色 hóngsè — red. 的 turns it into "the red one".',
            wrong:'新 is "new" — not a colour.' } },

    { type:'picture', label:'MATCH THE WORD TO THE PICTURE',
      tiles:[ {glyph:'✏️',alt:'pencil'},  {glyph:'⌚',alt:'watch'},
              {glyph:'📱',alt:'phone'},   {glyph:'👕',alt:'shirt'} ],
      target:1,
      options:[ {han:'铅笔',py:'qiānbǐ'},   {han:'手表',py:'shǒubiǎo'},
                {han:'手机',py:'shǒujī'},   {han:'衣服',py:'yīfu'} ],
      answer:1,
      why:{ right:'手表 shǒubiǎo — a watch.',
            wrong:'手机 is a mobile phone; 手表 is worn on the wrist.' } },

    { type:'listening', label:'LISTENING',
      audio:'右边那个黑色的手机是我的。',
      prompt:'Which phone is hers?',
      options:[ {han:'右边黑色的', py:'yòubian hēisè de', en:'the black one on the right'},
                {han:'左边红色的', py:'zuǒbian hóngsè de', en:'the red one on the left'},
                {han:'旁边白色的', py:'pángbiān báisè de', en:'the white one beside it'} ],
      answer:0,
      why:{ right:'Position word + colour + 的 identifies one item out of several.',
            wrong:'She says 右边 yòubian — the right side.' } },

    { type:'reading', label:'SHORT READING',
      han:'桌子上有两个手机。左边那个是我的，右边白色的是我姐姐的。',
      py:'Zhuōzi shàng yǒu liǎng ge shǒujī. Zuǒbian nàge shì wǒ de, yòubian báisè de shì wǒ jiějie de.',
      en:'There are two phones on the table. The one on the left is mine; the white one on the right is my older sister’s.',
      prompt:'Whose is the white phone?',
      options:[ {han:'我姐姐的', py:'wǒ jiějie de', en:'my older sister’s'},
                {han:'我的',    py:'wǒ de',       en:'mine'},
                {han:'我妹妹的', py:'wǒ mèimei de', en:'my younger sister’s'} ],
      answer:0,
      why:{ right:'的 at the end of a phrase means "…’s one".',
            wrong:'白色的 on the right belongs to 姐姐, the older sister.' } },
  ],

  /* ── HSK 2 · Lesson 4 — 这个工作是他帮我介绍的 ────────────────────── */
  '2-4': [
    { type:'fill', label:'FILL IN THE BLANK',
      pre:'这个工作是他', post:'我介绍的。',
      py:'Zhège gōngzuò shì tā ___ wǒ jièshào de.',
      en:"He's the one who found me this job.",
      options:[ {han:'帮',py:'bāng'}, {han:'送',py:'sòng'},
                {han:'让',py:'ràng'}, {han:'给',py:'gěi'} ],
      answer:0,
      why:{ right:'是…的 marks who did it — 帮 takes the person directly.',
            wrong:'送 is to give a gift; 让 is to let someone do something.' } },

    { type:'picture', label:'MATCH THE WORD TO THE PICTURE',
      tiles:[ {glyph:'⌚',alt:'watch'},   {glyph:'🥚',alt:'egg'},
              {glyph:'✏️',alt:'pencil'}, {glyph:'🛏️',alt:'room'} ],
      target:1,
      options:[ {han:'手表',py:'shǒubiǎo'}, {han:'鸡蛋',py:'jīdàn'},
                {han:'铅笔',py:'qiānbǐ'},   {han:'房间',py:'fángjiān'} ],
      answer:1,
      why:{ right:'鸡蛋 jīdàn — egg.', wrong:'That one is not food.' } },

    { type:'listening', label:'LISTENING',
      audio:'服务员，我要一杯咖啡。',
      prompt:'What does she order?',
      options:[ {han:'一杯咖啡', py:'yì bēi kāfēi', en:'a cup of coffee'},
                {han:'一个鸡蛋', py:'yí ge jīdàn',  en:'an egg'},
                {han:'一些药',   py:'yìxiē yào',    en:'some medicine'} ],
      answer:0,
      why:{ right:'要 + measure word + noun is how you order something.',
            wrong:'She says 一杯 — a cup — so it is a drink.' } },

    { type:'reading', label:'SHORT READING',
      han:'小王今天生病了，所以他没去工作，他去医院了。',
      py:'Xiǎo Wáng jīntiān shēngbìng le, suǒyǐ tā méi qù gōngzuò, tā qù yīyuàn le.',
      en:"Xiao Wang is ill today, so he didn't go to work — he went to the hospital.",
      prompt:'Where is Xiao Wang?',
      options:[ {han:'他在家',    py:'tā zài jiā',       en:'at home'},
                {han:'他去工作了', py:'tā qù gōngzuò le', en:'at work'},
                {han:'他去医院了', py:'tā qù yīyuàn le',  en:'at the hospital'} ],
      answer:2,
      why:{ right:'因为…所以… links the reason to the result.',
            wrong:'The passage says 他生病了 — he is ill, so he did not go to work.' } },
  ],
};
