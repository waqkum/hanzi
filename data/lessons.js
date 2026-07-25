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

  2: [
    { n:1,  han:'他在哪儿呢',            py:'Tā zài nǎr ne',                   pages:'p.4–7',
      patterns:[ { han:'正在 + 动词 + 呢', gloss:'zhèngzài + verb + ne · happening right now' },
                 { han:'动词 + 着', gloss:'verb + zhe · a continuing state' } ] },
    { n:2,  han:'我每天六点起床',         py:'Wǒ měi tiān liù diǎn qǐchuáng',   pages:'p.10–13',
      patterns:[ { han:'每 + 量词', gloss:'měi + measure word · every…' },
                 { han:'时间词 + 动词', gloss:'time word before the verb' } ] },
    { n:3,  han:'左边那个红色的是我的',    py:'Zuǒbiān nàge hóngsè de shì wǒ de', pages:'p.16–19',
      patterns:[ { han:'的 (名词性)', gloss:'de · turns a phrase into "the … one"' },
                 { han:'方位词', gloss:'fāngwèicí · left, right, beside' } ] },
    { n:4,  han:'这个工作是他帮我介绍的',  py:'Zhège gōngzuò shì tā bāng wǒ jièshào de', pages:'p.28–31',
      patterns:[ { han:'是…的', gloss:'shì…de · marks who did it' },
                 { han:'帮 + 人 + 动词', gloss:'bāng + person + verb · to help someone do' } ] },
    { n:5,  han:'我是走回来的',           py:'Wǒ shì zǒu huílai de',            pages:'p.34–37',
      patterns:[ { han:'来 / 去 补语', gloss:'lái / qù · direction complements' } ] },
    { n:6,  han:'我借你的词典用一下',      py:'Wǒ jiè nǐ de cídiǎn yòng yíxià',  pages:'p.40–43',
      patterns:[ { han:'动词 + 一下', gloss:'verb + yíxià · softening a request' } ] },
    { n:7,  han:'你怎么不吃了',           py:'Nǐ zěnme bù chī le',              pages:'p.46–49',
      patterns:[ { han:'怎么…', gloss:'zěnme… · how come?' },
                 { han:'要 + 量词 + 名词', gloss:'yào + measure word + noun · ordering' } ] },
    { n:8,  han:'你什么时候搬家',         py:'Nǐ shénme shíhou bānjiā',         pages:'p.52–55',
      patterns:[ { han:'离', gloss:'lí · distance from' },
                 { han:'比', gloss:'bǐ · comparison' } ] },
    { n:9,  han:'我是在网上买的',         py:'Wǒ shì zài wǎngshàng mǎi de',     pages:'p.58–61',
      patterns:[ { han:'是…的 (地点)', gloss:'shì…de · marks where it happened' } ] },
    { n:10, han:'我头疼',                py:'Wǒ tóu téng',                     pages:'p.64–67',
      patterns:[ { han:'觉得', gloss:'juéde · to feel that' },
                 { han:'可能', gloss:'kěnéng · maybe' } ] },
    { n:11, han:'就要开学了',            py:'Jiù yào kāixué le',               pages:'p.70–73',
      patterns:[ { han:'就要…了', gloss:'jiù yào…le · about to happen' },
                 { han:'因为…所以…', gloss:'yīnwèi…suǒyǐ… · because, so' } ] },
    { n:12, han:'你穿得太少了',           py:'Nǐ chuān de tài shǎo le',         pages:'p.76–79',
      patterns:[ { han:'动词 + 得 + 形容词', gloss:'verb + de + adjective · how it was done' } ] },
    { n:13, han:'我们是去年入学的',       py:'Wǒmen shì qùnián rùxué de',       pages:'p.82–85',
      patterns:[ { han:'是…的 (时间)', gloss:'shì…de · marks when it happened' } ] },
    { n:14, han:'我想在这儿多住几天',      py:'Wǒ xiǎng zài zhèr duō zhù jǐ tiān', pages:'p.88–91',
      patterns:[ { han:'多 / 少 + 动词', gloss:'duō / shǎo + verb · do more or less of' } ] },
    { n:15, han:'我要去旅游了',           py:'Wǒ yào qù lǚyóu le',              pages:'p.94–97',
      patterns:[ { han:'要…了', gloss:'yào…le · going to happen soon' } ] },
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
