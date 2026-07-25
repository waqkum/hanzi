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
   truefalse { type, label, han, py, en, claim, claimPy, claimEn, answer, why }
               The workbook's 判断对错. `han` is the statement, `claim` is the
               ★ line to judge. Options are fixed 对 / 错, so `answer` is
               0 for true and 1 for false — there is no options array.

   `answer` is the index of the correct option. `why.right` shows after a
   correct pick, `why.wrong` after an incorrect one.

   ── Provenance ────────────────────────────────────────────────────────
   Lessons 1–3 are TRANSCRIBED from HSK 标准教程 2（练习册）, Reading Part
   III (questions 26–30 of each lesson), and checked against the published
   answer key. English translations are mine; the workbook prints English
   only for the worked example. Lesson 4 is still placeholder content.
   ═══════════════════════════════════════════════════════════════════════ */

const EXERCISES = {

  /* ── HSK 2 · Lesson 1 — 九月去北京旅游最好 ─────────────────────────
     Transcribed: workbook p.6, questions 26–30. Key: × √ × √ ×          */
  '2-1': [
    { type:'truefalse', label:'TRUE OR FALSE · P.6',
      han:'她喜欢在家看电影，也喜欢睡觉，不喜欢出去。',
      py:'Tā xǐhuan zài jiā kàn diànyǐng, yě xǐhuan shuì jiào, bù xǐhuan chūqu.',
      en:'She likes watching films at home and likes sleeping; she doesn’t like going out.',
      claim:'她最喜欢运动。', claimPy:'Tā zuì xǐhuan yùndòng.', claimEn:'She likes sport best.',
      answer:1,
      why:{ right:'She likes staying in — 不喜欢出去. Sport is never mentioned.',
            wrong:'不喜欢出去 means she doesn’t like going out, so sport can’t be her favourite.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.6',
      han:'王小姐的小猫在我家，我的小猫在我妈妈家。',
      py:'Wáng xiǎojiě de xiǎo māo zài wǒ jiā, wǒ de xiǎo māo zài wǒ māma jiā.',
      en:'Miss Wang’s kitten is at my place, and my kitten is at my mother’s.',
      claim:'我有一个小猫。', claimPy:'Wǒ yǒu yí ge xiǎo māo.', claimEn:'I have a kitten.',
      answer:0,
      why:{ right:'我的小猫 — the speaker refers to their own kitten, so they have one.',
            wrong:'我的小猫在我妈妈家 — it is elsewhere, but it is still theirs.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.6',
      han:'我不想买桌子，我要买几个新椅子。',
      py:'Wǒ bù xiǎng mǎi zhuōzi, wǒ yào mǎi jǐ ge xīn yǐzi.',
      en:'I don’t want to buy a table; I want to buy a few new chairs.',
      claim:'我要去商店买桌子。', claimPy:'Wǒ yào qù shāngdiàn mǎi zhuōzi.',
      claimEn:'I’m going to the shop to buy a table.',
      answer:1,
      why:{ right:'不想买桌子 — it is chairs they are after, not a table.',
            wrong:'The sentence opens with 不想买桌子 — they do not want a table.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.6',
      han:'听说你在学做中国菜呢，我们一起做吧。',
      py:'Tīngshuō nǐ zài xué zuò Zhōngguó cài ne, wǒmen yìqǐ zuò ba.',
      en:'I hear you’re learning to cook Chinese food — let’s cook together.',
      claim:'他们要一起做中国菜。', claimPy:'Tāmen yào yìqǐ zuò Zhōngguó cài.',
      claimEn:'They are going to cook Chinese food together.',
      answer:0,
      why:{ right:'我们一起做吧 — 吧 makes it a suggestion to cook together.',
            wrong:'我们一起做吧 proposes doing it together.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.6',
      han:'八月北京很热，九月天气好，你来吧。',
      py:'Bā yuè Běijīng hěn rè, jiǔ yuè tiānqì hǎo, nǐ lái ba.',
      en:'Beijing is very hot in August; the weather is good in September — come then.',
      claim:'八月去北京旅游最好。', claimPy:'Bā yuè qù Běijīng lǚyóu zuì hǎo.',
      claimEn:'August is the best time to visit Beijing.',
      answer:1,
      why:{ right:'August is 很热; it is September that gets 天气好 — the lesson’s own title.',
            wrong:'八月很热 — August is the month being warned against, not recommended.' } },
  ],

  /* ── HSK 2 · Lesson 2 — 我每天六点起床 ───────────────────────────────
     Transcribed: workbook p.16, questions 26–30. Key: √ × √ × √         */
  '2-2': [
    { type:'truefalse', label:'TRUE OR FALSE · P.16',
      han:'医生说我要住两天院，明天能出院。',
      py:'Yīshēng shuō wǒ yào zhù liǎng tiān yuàn, míngtiān néng chū yuàn.',
      en:'The doctor said I have to stay in hospital for two days and can leave tomorrow.',
      claim:'我今天不能出院。', claimPy:'Wǒ jīntiān bù néng chū yuàn.',
      claimEn:'I can’t leave hospital today.',
      answer:0,
      why:{ right:'明天能出院 — tomorrow, which means not today.',
            wrong:'明天能出院 puts the discharge tomorrow, so today is ruled out.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.16',
      han:'我的小猫生病了，你知道去哪个医院好吗？',
      py:'Wǒ de xiǎo māo shēng bìng le, nǐ zhīdào qù nǎge yīyuàn hǎo ma?',
      en:'My kitten is ill — do you know which hospital would be best?',
      claim:'我的小猫现在好多了。', claimPy:'Wǒ de xiǎo māo xiànzài hǎoduō le.',
      claimEn:'My kitten is much better now.',
      answer:1,
      why:{ right:'生病了 and still asking where to take it — it has not recovered.',
            wrong:'They are still asking 去哪个医院好, so the kitten is not better.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.16',
      han:'你星期天也去学校吗？太忙了！',
      py:'Nǐ xīngqītiān yě qù xuéxiào ma? Tài máng le!',
      en:'You go to school on Sundays as well? That’s far too busy!',
      claim:'他星期天不休息。', claimPy:'Tā xīngqītiān bù xiūxi.',
      claimEn:'He doesn’t rest on Sundays.',
      answer:0,
      why:{ right:'也去学校 — 也 means Sunday is another working day, so no rest.',
            wrong:'星期天也去学校 — the 也 tells you Sunday is spent at school too.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.16',
      han:'这个药每天中午吃，晚饭后不要吃。',
      py:'Zhège yào měi tiān zhōngwǔ chī, wǎnfàn hòu búyào chī.',
      en:'Take this medicine at midday every day; don’t take it after dinner.',
      claim:'每天晚饭后吃药。', claimPy:'Měi tiān wǎnfàn hòu chī yào.',
      claimEn:'Take the medicine after dinner every day.',
      answer:1,
      why:{ right:'晚饭后不要吃 — after dinner is exactly when not to take it.',
            wrong:'不要 makes it a prohibition: not after dinner, but at 中午.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.16',
      han:'我儿子不太高，他今年十四岁，一米五几。',
      py:'Wǒ érzi bú tài gāo, tā jīnnián shísì suì, yì mǐ wǔ jǐ.',
      en:'My son isn’t very tall; he’s fourteen this year, about one metre fifty-something.',
      claim:'他儿子今年十多岁。', claimPy:'Tā érzi jīnnián shí duō suì.',
      claimEn:'His son is in his teens this year.',
      answer:0,
      why:{ right:'十四岁 falls inside 十多岁 — somewhere past ten.',
            wrong:'十四岁 is fourteen, which is 十多岁.' } },
  ],

  /* ── HSK 2 · Lesson 3 — 左边那个红色的是我的 ─────────────────────────
     Transcribed: workbook p.26, questions 26–30. Key: √ √ × √ ×         */
  '2-3': [
    { type:'truefalse', label:'TRUE OR FALSE · P.26',
      han:'这个房间是丽丽的，她喜欢粉色的房间。',
      py:'Zhège fángjiān shì Lìli de, tā xǐhuan fěnsè de fángjiān.',
      en:'This room is Lili’s — she likes pink rooms.',
      claim:'丽丽的房间是粉色的。', claimPy:'Lìli de fángjiān shì fěnsè de.',
      claimEn:'Lili’s room is pink.',
      answer:0,
      why:{ right:'The room is hers and she likes 粉色的房间 — the two join up.',
            wrong:'这个房间是丽丽的 plus 她喜欢粉色的房间 gives you a pink room.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.26',
      han:'桌子上的报纸是昨天的，今天送报纸的没来。',
      py:'Zhuōzi shang de bàozhǐ shì zuótiān de, jīntiān sòng bàozhǐ de méi lái.',
      en:'The paper on the table is yesterday’s; today’s delivery never came.',
      claim:'桌子上的报纸不是今天的。', claimPy:'Zhuōzi shang de bàozhǐ bú shì jīntiān de.',
      claimEn:'The paper on the table isn’t today’s.',
      answer:0,
      why:{ right:'是昨天的 — yesterday’s, so by definition not today’s.',
            wrong:'The paper is 昨天的 and today’s never arrived.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.26',
      han:'你的药在房间里，这是爸爸的。',
      py:'Nǐ de yào zài fángjiān li, zhè shì bàba de.',
      en:'Your medicine is in the room; this one is Dad’s.',
      claim:'房间里的药是爸爸的。', claimPy:'Fángjiān li de yào shì bàba de.',
      claimEn:'The medicine in the room is Dad’s.',
      answer:1,
      why:{ right:'你的药 is the one 在房间里; 这 — the one here — is Dad’s.',
            wrong:'The one in the room is 你的; it is 这 that belongs to Dad.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.26',
      han:'这块手表是昨天买的，我很喜欢。',
      py:'Zhè kuài shǒubiǎo shì zuótiān mǎi de, wǒ hěn xǐhuan.',
      en:'I bought this watch yesterday — I like it a lot.',
      claim:'我昨天买了一块手表。', claimPy:'Wǒ zuótiān mǎile yí kuài shǒubiǎo.',
      claimEn:'I bought a watch yesterday.',
      answer:0,
      why:{ right:'是…的 marks when it happened — 昨天买的.',
            wrong:'是昨天买的 states the purchase was yesterday.' } },

    { type:'truefalse', label:'TRUE OR FALSE · P.26',
      han:'小王，你喜欢哪个颜色的杯子？给你一个。',
      py:'Xiǎo Wáng, nǐ xǐhuan nǎge yánsè de bēizi? Gěi nǐ yí ge.',
      en:'Xiao Wang, which colour cup do you like? I’ll give you one.',
      claim:'他要给小王一个红色杯子。', claimPy:'Tā yào gěi xiǎo Wáng yí ge hóngsè bēizi.',
      claimEn:'He’s going to give Xiao Wang a red cup.',
      answer:1,
      why:{ right:'He asks 哪个颜色 — the colour is still an open question.',
            wrong:'He is asking which colour; no colour has been settled on yet.' } },
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
