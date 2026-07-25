/* ═══════════════════════════════════════════════════════════════════════
   Hanzi — lesson metadata
   HSK Standard Course 1 and 2, fifteen lessons each.

   `pages` are the workbook page ranges. They follow the standard
   four-pages-per-lesson pattern; correct any that differ in your copy.
   `patterns` are the grammar points surfaced on the Homework-done screen.
   ═══════════════════════════════════════════════════════════════════════ */

const LESSONS = {

  1: [
    { n:1,  han:'你好',                 py:'Nǐ hǎo',                          pages:'p.2–5',
      patterns:[ { han:'你好', gloss:'nǐ hǎo · the basic greeting' } ] },
    { n:2,  han:'谢谢你',               py:'Xièxie nǐ',                       pages:'p.6–9',
      patterns:[ { han:'谢谢…', gloss:'xièxie… · thanking someone' } ] },
    { n:3,  han:'你叫什么名字',          py:'Nǐ jiào shénme míngzi',           pages:'p.10–13',
      patterns:[ { han:'叫 + 名字', gloss:'jiào + name · to be called' } ] },
    { n:4,  han:'她是我的汉语老师',       py:'Tā shì wǒ de Hànyǔ lǎoshī',       pages:'p.14–17',
      patterns:[ { han:'是', gloss:'shì · A is B' }, { han:'的', gloss:'de · possessive' } ] },
    { n:5,  han:'她女儿今年二十岁',       py:'Tā nǚ’ér jīnnián èrshí suì',      pages:'p.18–21',
      patterns:[ { han:'多大 / 几岁', gloss:'duō dà / jǐ suì · asking age' } ] },
    { n:6,  han:'我会说汉语',            py:'Wǒ huì shuō Hànyǔ',               pages:'p.22–25',
      patterns:[ { han:'会 + 动词', gloss:'huì + verb · learned ability' } ] },
    { n:7,  han:'今天几号',              py:'Jīntiān jǐ hào',                  pages:'p.26–29',
      patterns:[ { han:'几号 / 星期几', gloss:'jǐ hào / xīngqī jǐ · dates and days' } ] },
    { n:8,  han:'我想喝茶',              py:'Wǒ xiǎng hē chá',                 pages:'p.30–33',
      patterns:[ { han:'想 + 动词', gloss:'xiǎng + verb · to want to' } ] },
    { n:9,  han:'你儿子在哪儿工作',       py:'Nǐ érzi zài nǎr gōngzuò',         pages:'p.34–37',
      patterns:[ { han:'在 + 地点', gloss:'zài + place · location' } ] },
    { n:10, han:'我能坐这儿吗',          py:'Wǒ néng zuò zhèr ma',             pages:'p.38–41',
      patterns:[ { han:'能 + 动词', gloss:'néng + verb · permission and capacity' } ] },
    { n:11, han:'现在几点',              py:'Xiànzài jǐ diǎn',                 pages:'p.42–45',
      patterns:[ { han:'几点', gloss:'jǐ diǎn · telling the time' } ] },
    { n:12, han:'明天天气怎么样',         py:'Míngtiān tiānqì zěnmeyàng',       pages:'p.46–49',
      patterns:[ { han:'怎么样', gloss:'zěnmeyàng · how is it?' } ] },
    { n:13, han:'他在学做中国菜呢',       py:'Tā zài xué zuò Zhōngguó cài ne',  pages:'p.50–53',
      patterns:[ { han:'在 + 动词 + 呢', gloss:'zài + verb + ne · action in progress' } ] },
    { n:14, han:'她买了不少衣服',         py:'Tā mǎile bù shǎo yīfu',           pages:'p.54–57',
      patterns:[ { han:'了', gloss:'le · completed action' } ] },
    { n:15, han:'我是坐飞机来的',         py:'Wǒ shì zuò fēijī lái de',         pages:'p.58–61',
      patterns:[ { han:'是…的', gloss:'shì…de · highlighting how or when' } ] },
  ],

  /* ── HSK 2 ──────────────────────────────────────────────────────────
     VERIFIED. Titles, English and page numbers are transcribed from the
     目录 of HSK 标准教程 2（练习册）. Lessons run ten workbook pages each
     (the last few run nine), the Model Test starts at p.143.
     Grammar patterns are inferred from the titles, not transcribed.
     ─────────────────────────────────────────────────────────────────── */
  2: [
    { n:1,  han:'九月去北京旅游最好',      py:'Jiǔ yuè qù Běijīng lǚyóu zuì hǎo', en:'September is the best time to visit Beijing', pages:'p.1–10',
      patterns:[ { han:'最', gloss:'zuì · the most, the best' },
                 { han:'月份 + 去 + 地点', gloss:'month + qù + place · when you go somewhere' } ] },
    { n:2,  han:'我每天六点起床',         py:'Wǒ měi tiān liù diǎn qǐchuáng',   en:'I get up at six every day', pages:'p.11–20',
      patterns:[ { han:'每 + 量词', gloss:'měi + measure word · every…' },
                 { han:'时间词 + 动词', gloss:'time word before the verb' } ] },
    { n:3,  han:'左边那个红色的是我的',    py:'Zuǒbiān nàge hóngsè de shì wǒ de', en:'The red one on the left is mine', pages:'p.21–30',
      patterns:[ { han:'的 (名词性)', gloss:'de · turns a phrase into "the … one"' },
                 { han:'方位词', gloss:'fāngwèicí · left, right, beside' } ] },
    { n:4,  han:'这个工作是他帮我介绍的',  py:'Zhège gōngzuò shì tā bāng wǒ jièshào de', en:'He recommended me for this job', pages:'p.31–40',
      patterns:[ { han:'是…的', gloss:'shì…de · marks who did it' },
                 { han:'帮 + 人 + 动词', gloss:'bāng + person + verb · to help someone do' } ] },
    { n:5,  han:'就买这件吧',             py:'Jiù mǎi zhè jiàn ba',             en:'Take this one', pages:'p.41–50',
      patterns:[ { han:'吧', gloss:'ba · softens a suggestion' },
                 { han:'量词 件', gloss:'jiàn · measure word for clothes and matters' } ] },
    { n:6,  han:'你怎么不吃了',           py:'Nǐ zěnme bù chī le',              en:'Why don’t you eat more', pages:'p.51–60',
      patterns:[ { han:'怎么…', gloss:'zěnme… · how come?' },
                 { han:'不 + 动词 + 了', gloss:'bù + verb + le · stopping something' } ] },
    { n:7,  han:'你家离公司远吗',         py:'Nǐ jiā lí gōngsī yuǎn ma',        en:'Do you live far from your company', pages:'p.61–69',
      patterns:[ { han:'离', gloss:'lí · distance from' },
                 { han:'远 / 近', gloss:'yuǎn / jìn · far and near' } ] },
    { n:8,  han:'让我想想再告诉你',        py:'Ràng wǒ xiǎngxiang zài gàosu nǐ', en:'Let me think about it and I’ll tell you later', pages:'p.70–78',
      patterns:[ { han:'让', gloss:'ràng · to let someone do something' },
                 { han:'动词重叠', gloss:'verb reduplication · doing a bit of something' } ] },
    { n:9,  han:'题太多，我没做完',        py:'Tí tài duō, wǒ méi zuò wán',      en:'There were too many questions; I didn’t finish all of them', pages:'p.79–87',
      patterns:[ { han:'太…了', gloss:'tài…le · too much' },
                 { han:'动词 + 完', gloss:'verb + wán · finishing the action' } ] },
    { n:10, han:'别找了，手机在桌子上呢',  py:'Bié zhǎo le, shǒujī zài zhuōzi shàng ne', en:'Stop looking for your cell phone; it’s on the desk', pages:'p.88–96',
      patterns:[ { han:'别…了', gloss:'bié…le · stop doing that' },
                 { han:'在…上', gloss:'zài…shàng · on top of' } ] },
    { n:11, han:'他比我大三岁',           py:'Tā bǐ wǒ dà sān suì',             en:'He is three years older than me', pages:'p.97–105',
      patterns:[ { han:'比', gloss:'bǐ · comparison' },
                 { han:'比 + 形容词 + 数量', gloss:'bǐ + adjective + amount · by how much' } ] },
    { n:12, han:'你穿得太少了',           py:'Nǐ chuān de tài shǎo le',         en:'You wear too little', pages:'p.106–114',
      patterns:[ { han:'动词 + 得 + 形容词', gloss:'verb + de + adjective · how it was done' } ] },
    { n:13, han:'门开着呢',               py:'Mén kāizhe ne',                   en:'The door is open', pages:'p.115–123',
      patterns:[ { han:'动词 + 着', gloss:'verb + zhe · a continuing state' },
                 { han:'正在 + 动词 + 呢', gloss:'zhèngzài + verb + ne · happening right now' } ] },
    { n:14, han:'你看过这个电影吗',        py:'Nǐ kànguo zhège diànyǐng ma',     en:'Have you seen that movie', pages:'p.124–132',
      patterns:[ { han:'动词 + 过', gloss:'verb + guo · having done it before' } ] },
    { n:15, han:'新年就要到了',           py:'Xīnnián jiù yào dào le',          en:'The New Year is coming', pages:'p.133–142',
      patterns:[ { han:'就要…了', gloss:'jiù yào…le · about to happen' } ] },
  ],
};

/* Which level and lesson you are currently working through. This drives
   the Home badge, the Exercises "this week" card, and which lesson is
   marked new in the Set picker. Bump `lesson` as you move through the
   book — everything else follows. */
const CURRENT = { level: 2, lesson: 4 };

const LEVEL_LABEL = { 1: 'HSK 1', 2: 'HSK 2' };
const NUMERALS = [
  null,
  { han:'一', py:'yī' },  { han:'二', py:'èr' },   { han:'三', py:'sān' },
  { han:'四', py:'sì' },  { han:'五', py:'wǔ' },   { han:'六', py:'liù' },
  { han:'七', py:'qī' },  { han:'八', py:'bā' },   { han:'九', py:'jiǔ' },
  { han:'十', py:'shí' }, { han:'十一', py:'shíyī' }, { han:'十二', py:'shí’èr' },
  { han:'十三', py:'shísān' }, { han:'十四', py:'shísì' }, { han:'十五', py:'shíwǔ' },
];
