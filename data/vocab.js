/* ═══════════════════════════════════════════════════════════════════════
   Hanzi — vocabulary
   HSK 1 (150 words) and HSK 2 (149 words), tagged to the lesson of
   HSK Standard Course in which each word is introduced.

   NOTE ON LESSON TAGS: the word lists themselves are the official HSK
   1/2 lists. The `lesson` tag is a best-effort mapping onto Standard
   Course 1 and 2 — spot-check it against your own books and correct
   here; nothing else in the app hardcodes which word belongs where.

   Fields
     han   — characters
     py    — pinyin with tone marks
     en    — English gloss
     level — 1 | 2  (HSK level)
     les   — lesson number within that level's Standard Course book
     ex / exPy / exEn — example sentence for the flashcard back face
   ═══════════════════════════════════════════════════════════════════════ */

const VOCAB = [

  /* ─────────────────────────── HSK 1 ─────────────────────────── */

  /* L1 · 你好 */
  { han:'你', py:'nǐ', en:'you', level:1, les:1, ex:'你好！', exPy:'Nǐ hǎo!', exEn:'Hello!' },
  { han:'好', py:'hǎo', en:'good, well', level:1, les:1, ex:'我很好。', exPy:'Wǒ hěn hǎo.', exEn:"I'm well." },
  { han:'吗', py:'ma', en:'(question particle)', level:1, les:1, ex:'你好吗？', exPy:'Nǐ hǎo ma?', exEn:'How are you?' },
  { han:'我', py:'wǒ', en:'I, me', level:1, les:1, ex:'我是学生。', exPy:'Wǒ shì xuésheng.', exEn:"I'm a student." },
  { han:'很', py:'hěn', en:'very', level:1, les:1, ex:'今天很热。', exPy:'Jīntiān hěn rè.', exEn:"It's very hot today." },
  { han:'呢', py:'ne', en:'(question particle)', level:1, les:1, ex:'我很好，你呢？', exPy:'Wǒ hěn hǎo, nǐ ne?', exEn:"I'm well — and you?" },
  { han:'不', py:'bù', en:'not, no', level:1, les:1, ex:'我不喝茶。', exPy:'Wǒ bù hē chá.', exEn:"I don't drink tea." },
  { han:'我们', py:'wǒmen', en:'we, us', level:1, les:1, ex:'我们是朋友。', exPy:'Wǒmen shì péngyou.', exEn:'We are friends.' },
  { han:'再见', py:'zàijiàn', en:'goodbye', level:1, les:1, ex:'老师，再见！', exPy:'Lǎoshī, zàijiàn!', exEn:'Goodbye, teacher!' },
  { han:'请', py:'qǐng', en:'please', level:1, les:1, ex:'请坐。', exPy:'Qǐng zuò.', exEn:'Please sit down.' },

  /* L2 · 谢谢你 */
  { han:'谢谢', py:'xièxie', en:'thank you', level:1, les:2, ex:'谢谢你！', exPy:'Xièxie nǐ!', exEn:'Thank you!' },
  { han:'不客气', py:'bú kèqi', en:"you're welcome", level:1, les:2, ex:'不客气。', exPy:'Bú kèqi.', exEn:"You're welcome." },
  { han:'对不起', py:'duìbuqǐ', en:'sorry', level:1, les:2, ex:'对不起，我来晚了。', exPy:'Duìbuqǐ, wǒ lái wǎn le.', exEn:"Sorry, I'm late." },
  { han:'没关系', py:'méi guānxi', en:"it doesn't matter", level:1, les:2, ex:'没关系。', exPy:'Méi guānxi.', exEn:"It's fine." },
  { han:'喂', py:'wéi', en:'hello (on the phone)', level:1, les:2, ex:'喂，你好！', exPy:'Wéi, nǐ hǎo!', exEn:'Hello?' },
  { han:'的', py:'de', en:'(possessive particle)', level:1, les:2, ex:'这是我的书。', exPy:'Zhè shì wǒ de shū.', exEn:'This is my book.' },
  { han:'是', py:'shì', en:'to be', level:1, les:2, ex:'他是医生。', exPy:'Tā shì yīshēng.', exEn:"He's a doctor." },
  { han:'他', py:'tā', en:'he, him', level:1, les:2, ex:'他在家。', exPy:'Tā zài jiā.', exEn:"He's at home." },
  { han:'她', py:'tā', en:'she, her', level:1, les:2, ex:'她是我妈妈。', exPy:'Tā shì wǒ māma.', exEn:"She's my mother." },
  { han:'人', py:'rén', en:'person', level:1, les:2, ex:'他是中国人。', exPy:'Tā shì Zhōngguó rén.', exEn:"He's Chinese." },

  /* L3 · 你叫什么名字 */
  { han:'叫', py:'jiào', en:'to be called', level:1, les:3, ex:'我叫王明。', exPy:'Wǒ jiào Wáng Míng.', exEn:'My name is Wang Ming.' },
  { han:'什么', py:'shénme', en:'what', level:1, les:3, ex:'你叫什么名字？', exPy:'Nǐ jiào shénme míngzi?', exEn:"What's your name?" },
  { han:'名字', py:'míngzi', en:'name', level:1, les:3, ex:'她的名字很好听。', exPy:'Tā de míngzi hěn hǎotīng.', exEn:'Her name sounds lovely.' },
  { han:'老师', py:'lǎoshī', en:'teacher', level:1, les:3, ex:'他是我的汉语老师。', exPy:'Tā shì wǒ de Hànyǔ lǎoshī.', exEn:"He's my Chinese teacher." },
  { han:'学生', py:'xuésheng', en:'student', level:1, les:3, ex:'我是学生。', exPy:'Wǒ shì xuésheng.', exEn:"I'm a student." },
  { han:'认识', py:'rènshi', en:'to know (someone)', level:1, les:3, ex:'认识你很高兴。', exPy:'Rènshi nǐ hěn gāoxìng.', exEn:'Nice to meet you.' },
  { han:'高兴', py:'gāoxìng', en:'happy, glad', level:1, les:3, ex:'我今天很高兴。', exPy:'Wǒ jīntiān hěn gāoxìng.', exEn:"I'm very happy today." },
  { han:'先生', py:'xiānsheng', en:'Mr., sir', level:1, les:3, ex:'王先生在吗？', exPy:'Wáng xiānsheng zài ma?', exEn:'Is Mr. Wang in?' },
  { han:'小姐', py:'xiǎojiě', en:'Miss', level:1, les:3, ex:'李小姐是我的同学。', exPy:'Lǐ xiǎojiě shì wǒ de tóngxué.', exEn:'Miss Li is my classmate.' },
  { han:'同学', py:'tóngxué', en:'classmate', level:1, les:3, ex:'他是我的同学。', exPy:'Tā shì wǒ de tóngxué.', exEn:"He's my classmate." },

  /* L4 · 她是我的汉语老师 */
  { han:'汉语', py:'Hànyǔ', en:'Chinese (language)', level:1, les:4, ex:'我在学汉语。', exPy:'Wǒ zài xué Hànyǔ.', exEn:"I'm learning Chinese." },
  { han:'中国', py:'Zhōngguó', en:'China', level:1, les:4, ex:'我想去中国。', exPy:'Wǒ xiǎng qù Zhōngguó.', exEn:'I want to go to China.' },
  { han:'北京', py:'Běijīng', en:'Beijing', level:1, les:4, ex:'他住在北京。', exPy:'Tā zhù zài Běijīng.', exEn:'He lives in Beijing.' },
  { han:'朋友', py:'péngyou', en:'friend', level:1, les:4, ex:'他是我的好朋友。', exPy:'Tā shì wǒ de hǎo péngyou.', exEn:"He's my good friend." },
  { han:'医生', py:'yīshēng', en:'doctor', level:1, les:4, ex:'我妈妈是医生。', exPy:'Wǒ māma shì yīshēng.', exEn:'My mother is a doctor.' },
  { han:'这', py:'zhè', en:'this', level:1, les:4, ex:'这是我的家。', exPy:'Zhè shì wǒ de jiā.', exEn:'This is my home.' },
  { han:'那', py:'nà', en:'that', level:1, les:4, ex:'那是谁的书？', exPy:'Nà shì shéi de shū?', exEn:'Whose book is that?' },
  { han:'哪', py:'nǎ', en:'which', level:1, les:4, ex:'你是哪国人？', exPy:'Nǐ shì nǎ guó rén?', exEn:'What country are you from?' },
  { han:'谁', py:'shéi', en:'who', level:1, les:4, ex:'他是谁？', exPy:'Tā shì shéi?', exEn:'Who is he?' },
  { han:'个', py:'gè', en:'(general measure word)', level:1, les:4, ex:'我有一个哥哥。', exPy:'Wǒ yǒu yí ge gēge.', exEn:'I have an older brother.' },

  /* L5 · 她女儿今年二十岁 */
  { han:'女儿', py:'nǚ’ér', en:'daughter', level:1, les:5, ex:'她的女儿很漂亮。', exPy:'Tā de nǚ’ér hěn piàoliang.', exEn:'Her daughter is very pretty.' },
  { han:'儿子', py:'érzi', en:'son', level:1, les:5, ex:'我儿子在学校。', exPy:'Wǒ érzi zài xuéxiào.', exEn:'My son is at school.' },
  { han:'爸爸', py:'bàba', en:'dad', level:1, les:5, ex:'我爸爸是老师。', exPy:'Wǒ bàba shì lǎoshī.', exEn:'My dad is a teacher.' },
  { han:'妈妈', py:'māma', en:'mum', level:1, les:5, ex:'妈妈在做菜。', exPy:'Māma zài zuò cài.', exEn:'Mum is cooking.' },
  { han:'岁', py:'suì', en:'years old', level:1, les:5, ex:'她今年二十岁。', exPy:'Tā jīnnián èrshí suì.', exEn:"She's twenty this year." },
  { han:'年', py:'nián', en:'year', level:1, les:5, ex:'我学了一年汉语。', exPy:'Wǒ xuéle yì nián Hànyǔ.', exEn:"I've studied Chinese for a year." },
  { han:'多少', py:'duōshao', en:'how many, how much', level:1, les:5, ex:'这个多少钱？', exPy:'Zhège duōshao qián?', exEn:'How much is this?' },
  { han:'几', py:'jǐ', en:'how many (small number)', level:1, les:5, ex:'你家有几口人？', exPy:'Nǐ jiā yǒu jǐ kǒu rén?', exEn:'How many people are in your family?' },
  { han:'家', py:'jiā', en:'home, family', level:1, les:5, ex:'我在家看电视。', exPy:'Wǒ zài jiā kàn diànshì.', exEn:"I'm watching TV at home." },
  { han:'有', py:'yǒu', en:'to have', level:1, les:5, ex:'我有两个孩子。', exPy:'Wǒ yǒu liǎng ge háizi.', exEn:'I have two children.' },

  /* L6 · 我会说汉语 */
  { han:'会', py:'huì', en:'can, to know how to', level:1, les:6, ex:'我会说汉语。', exPy:'Wǒ huì shuō Hànyǔ.', exEn:'I can speak Chinese.' },
  { han:'说话', py:'shuōhuà', en:'to speak, to talk', level:1, les:6, ex:'他说话很快。', exPy:'Tā shuōhuà hěn kuài.', exEn:'He talks very fast.' },
  { han:'听', py:'tīng', en:'to listen', level:1, les:6, ex:'我在听老师说。', exPy:'Wǒ zài tīng lǎoshī shuō.', exEn:"I'm listening to the teacher." },
  { han:'读', py:'dú', en:'to read (aloud)', level:1, les:6, ex:'请读这个字。', exPy:'Qǐng dú zhège zì.', exEn:'Please read this character.' },
  { han:'写', py:'xiě', en:'to write', level:1, les:6, ex:'我会写汉字。', exPy:'Wǒ huì xiě Hànzì.', exEn:'I can write Chinese characters.' },
  { han:'学习', py:'xuéxí', en:'to study', level:1, les:6, ex:'我每天学习汉语。', exPy:'Wǒ měi tiān xuéxí Hànyǔ.', exEn:'I study Chinese every day.' },
  { han:'工作', py:'gōngzuò', en:'work, to work', level:1, les:6, ex:'他的工作很忙。', exPy:'Tā de gōngzuò hěn máng.', exEn:'His job is very busy.' },
  { han:'喜欢', py:'xǐhuan', en:'to like', level:1, les:6, ex:'我喜欢喝咖啡。', exPy:'Wǒ xǐhuan hē kāfēi.', exEn:'I like drinking coffee.' },
  { han:'能', py:'néng', en:'can, to be able to', level:1, les:6, ex:'我能坐这儿吗？', exPy:'Wǒ néng zuò zhèr ma?', exEn:'Can I sit here?' },
  { han:'太', py:'tài', en:'too, extremely', level:1, les:6, ex:'今天太热了。', exPy:'Jīntiān tài rè le.', exEn:"It's too hot today." },

  /* L7 · 今天几号 */
  { han:'今天', py:'jīntiān', en:'today', level:1, les:7, ex:'今天几号？', exPy:'Jīntiān jǐ hào?', exEn:"What's the date today?" },
  { han:'明天', py:'míngtiān', en:'tomorrow', level:1, les:7, ex:'明天我不工作。', exPy:'Míngtiān wǒ bù gōngzuò.', exEn:"I'm not working tomorrow." },
  { han:'昨天', py:'zuótiān', en:'yesterday', level:1, les:7, ex:'昨天下雨了。', exPy:'Zuótiān xiàyǔ le.', exEn:'It rained yesterday.' },
  { han:'月', py:'yuè', en:'month', level:1, les:7, ex:'现在是九月。', exPy:'Xiànzài shì jiǔ yuè.', exEn:"It's September now." },
  { han:'号', py:'hào', en:'date, number', level:1, les:7, ex:'今天是三号。', exPy:'Jīntiān shì sān hào.', exEn:"Today's the third." },
  { han:'星期', py:'xīngqī', en:'week', level:1, les:7, ex:'今天星期几？', exPy:'Jīntiān xīngqī jǐ?', exEn:'What day is it today?' },
  { han:'上午', py:'shàngwǔ', en:'morning', level:1, les:7, ex:'上午我有课。', exPy:'Shàngwǔ wǒ yǒu kè.', exEn:'I have class in the morning.' },
  { han:'中午', py:'zhōngwǔ', en:'midday', level:1, les:7, ex:'中午我们一起吃饭。', exPy:'Zhōngwǔ wǒmen yìqǐ chīfàn.', exEn:"We'll eat together at midday." },
  { han:'下午', py:'xiàwǔ', en:'afternoon', level:1, les:7, ex:'下午三点见。', exPy:'Xiàwǔ sān diǎn jiàn.', exEn:'See you at three in the afternoon.' },
  { han:'时候', py:'shíhou', en:'time, moment', level:1, les:7, ex:'你什么时候来？', exPy:'Nǐ shénme shíhou lái?', exEn:'When are you coming?' },

  /* L8 · 我想喝茶 */
  { han:'想', py:'xiǎng', en:'to want, to think', level:1, les:8, ex:'我想喝茶。', exPy:'Wǒ xiǎng hē chá.', exEn:'I want to drink tea.' },
  { han:'喝', py:'hē', en:'to drink', level:1, les:8, ex:'他在喝水。', exPy:'Tā zài hē shuǐ.', exEn:"He's drinking water." },
  { han:'茶', py:'chá', en:'tea', level:1, les:8, ex:'这个茶很好喝。', exPy:'Zhège chá hěn hǎohē.', exEn:'This tea is delicious.' },
  { han:'水', py:'shuǐ', en:'water', level:1, les:8, ex:'请给我一杯水。', exPy:'Qǐng gěi wǒ yì bēi shuǐ.', exEn:'A glass of water, please.' },
  { han:'吃', py:'chī', en:'to eat', level:1, les:8, ex:'我们去吃饭吧。', exPy:'Wǒmen qù chīfàn ba.', exEn:"Let's go and eat." },
  { han:'菜', py:'cài', en:'dish, vegetable', level:1, les:8, ex:'这个菜太贵了。', exPy:'Zhège cài tài guì le.', exEn:'This dish is too expensive.' },
  { han:'米饭', py:'mǐfàn', en:'cooked rice', level:1, les:8, ex:'我要一碗米饭。', exPy:'Wǒ yào yì wǎn mǐfàn.', exEn:"I'd like a bowl of rice." },
  { han:'苹果', py:'píngguǒ', en:'apple', level:1, les:8, ex:'她买了三个苹果。', exPy:'Tā mǎile sān ge píngguǒ.', exEn:'She bought three apples.' },
  { han:'水果', py:'shuǐguǒ', en:'fruit', level:1, les:8, ex:'我很喜欢吃水果。', exPy:'Wǒ hěn xǐhuan chī shuǐguǒ.', exEn:'I really like eating fruit.' },
  { han:'和', py:'hé', en:'and, with', level:1, les:8, ex:'我和朋友去商店。', exPy:'Wǒ hé péngyou qù shāngdiàn.', exEn:"I'm going to the shop with a friend." },

  /* L9 · 你儿子在哪儿工作 */
  { han:'在', py:'zài', en:'at, in, to be at', level:1, les:9, ex:'我在学校。', exPy:'Wǒ zài xuéxiào.', exEn:"I'm at school." },
  { han:'哪儿', py:'nǎr', en:'where', level:1, les:9, ex:'你在哪儿工作？', exPy:'Nǐ zài nǎr gōngzuò?', exEn:'Where do you work?' },
  { han:'商店', py:'shāngdiàn', en:'shop', level:1, les:9, ex:'商店在前面。', exPy:'Shāngdiàn zài qiánmiàn.', exEn:"The shop's up ahead." },
  { han:'医院', py:'yīyuàn', en:'hospital', level:1, les:9, ex:'他去医院了。', exPy:'Tā qù yīyuàn le.', exEn:"He's gone to the hospital." },
  { han:'学校', py:'xuéxiào', en:'school', level:1, les:9, ex:'我们的学校很大。', exPy:'Wǒmen de xuéxiào hěn dà.', exEn:'Our school is very big.' },
  { han:'饭店', py:'fàndiàn', en:'restaurant, hotel', level:1, les:9, ex:'这家饭店的菜很好吃。', exPy:'Zhè jiā fàndiàn de cài hěn hǎochī.', exEn:'The food at this restaurant is delicious.' },
  { han:'里', py:'lǐ', en:'inside', level:1, les:9, ex:'书在房间里。', exPy:'Shū zài fángjiān lǐ.', exEn:'The book is in the room.' },
  { han:'后面', py:'hòumiàn', en:'behind, at the back', level:1, les:9, ex:'医院在学校后面。', exPy:'Yīyuàn zài xuéxiào hòumiàn.', exEn:'The hospital is behind the school.' },
  { han:'前面', py:'qiánmiàn', en:'in front, ahead', level:1, les:9, ex:'前面有一个商店。', exPy:'Qiánmiàn yǒu yí ge shāngdiàn.', exEn:"There's a shop ahead." },
  { han:'住', py:'zhù', en:'to live, to stay', level:1, les:9, ex:'我住在北京。', exPy:'Wǒ zhù zài Běijīng.', exEn:'I live in Beijing.' },

  /* L10 · 我能坐这儿吗 */
  { han:'坐', py:'zuò', en:'to sit, to travel by', level:1, les:10, ex:'我们坐出租车去。', exPy:'Wǒmen zuò chūzūchē qù.', exEn:"We'll go by taxi." },
  { han:'桌子', py:'zhuōzi', en:'table', level:1, les:10, ex:'书在桌子上。', exPy:'Shū zài zhuōzi shàng.', exEn:'The book is on the table.' },
  { han:'椅子', py:'yǐzi', en:'chair', level:1, les:10, ex:'这把椅子是新的。', exPy:'Zhè bǎ yǐzi shì xīn de.', exEn:'This chair is new.' },
  { han:'杯子', py:'bēizi', en:'cup, glass', level:1, les:10, ex:'那个杯子是我的。', exPy:'Nàge bēizi shì wǒ de.', exEn:'That cup is mine.' },
  { han:'电脑', py:'diànnǎo', en:'computer', level:1, les:10, ex:'我的电脑很快。', exPy:'Wǒ de diànnǎo hěn kuài.', exEn:'My computer is fast.' },
  { han:'电视', py:'diànshì', en:'television', level:1, les:10, ex:'爸爸在看电视。', exPy:'Bàba zài kàn diànshì.', exEn:'Dad is watching TV.' },
  { han:'书', py:'shū', en:'book', level:1, les:10, ex:'这本书很好。', exPy:'Zhè běn shū hěn hǎo.', exEn:'This book is good.' },
  { han:'本', py:'běn', en:'(measure word for books)', level:1, les:10, ex:'我买了两本书。', exPy:'Wǒ mǎile liǎng běn shū.', exEn:'I bought two books.' },
  { han:'东西', py:'dōngxi', en:'thing', level:1, les:10, ex:'我要去买东西。', exPy:'Wǒ yào qù mǎi dōngxi.', exEn:"I'm going shopping." },
  { han:'些', py:'xiē', en:'some, a few', level:1, les:10, ex:'这些菜都很好吃。', exPy:'Zhèxiē cài dōu hěn hǎochī.', exEn:'All these dishes are delicious.' },

  /* L11 · 现在几点 */
  { han:'现在', py:'xiànzài', en:'now', level:1, les:11, ex:'现在几点？', exPy:'Xiànzài jǐ diǎn?', exEn:"What time is it now?" },
  { han:'点', py:'diǎn', en:"o'clock", level:1, les:11, ex:'我六点起床。', exPy:'Wǒ liù diǎn qǐchuáng.', exEn:'I get up at six.' },
  { han:'分钟', py:'fēnzhōng', en:'minute', level:1, les:11, ex:'请等我五分钟。', exPy:'Qǐng děng wǒ wǔ fēnzhōng.', exEn:'Please wait five minutes for me.' },
  { han:'上', py:'shàng', en:'up, on, previous', level:1, les:11, ex:'书在桌子上。', exPy:'Shū zài zhuōzi shàng.', exEn:'The book is on the table.' },
  { han:'下', py:'xià', en:'down, under, next', level:1, les:11, ex:'猫在椅子下。', exPy:'Māo zài yǐzi xià.', exEn:'The cat is under the chair.' },
  { han:'去', py:'qù', en:'to go', level:1, les:11, ex:'我要去学校。', exPy:'Wǒ yào qù xuéxiào.', exEn:"I'm going to school." },
  { han:'来', py:'lái', en:'to come', level:1, les:11, ex:'他明天来。', exPy:'Tā míngtiān lái.', exEn:"He's coming tomorrow." },
  { han:'回', py:'huí', en:'to return', level:1, les:11, ex:'我五点回家。', exPy:'Wǒ wǔ diǎn huí jiā.', exEn:'I go home at five.' },
  { han:'开', py:'kāi', en:'to open, to drive', level:1, les:11, ex:'请开门。', exPy:'Qǐng kāi mén.', exEn:'Please open the door.' },
  { han:'做', py:'zuò', en:'to do, to make', level:1, les:11, ex:'他在做中国菜。', exPy:'Tā zài zuò Zhōngguó cài.', exEn:"He's making Chinese food." },

  /* L12 · 明天天气怎么样 */
  { han:'天气', py:'tiānqì', en:'weather', level:1, les:12, ex:'今天天气很好。', exPy:'Jīntiān tiānqì hěn hǎo.', exEn:"The weather's lovely today." },
  { han:'怎么样', py:'zěnmeyàng', en:'how about, how is it', level:1, les:12, ex:'明天天气怎么样？', exPy:'Míngtiān tiānqì zěnmeyàng?', exEn:"What's the weather like tomorrow?" },
  { han:'怎么', py:'zěnme', en:'how', level:1, les:12, ex:'这个字怎么读？', exPy:'Zhège zì zěnme dú?', exEn:'How do you read this character?' },
  { han:'热', py:'rè', en:'hot', level:1, les:12, ex:'夏天很热。', exPy:'Xiàtiān hěn rè.', exEn:'Summer is very hot.' },
  { han:'冷', py:'lěng', en:'cold', level:1, les:12, ex:'今天很冷。', exPy:'Jīntiān hěn lěng.', exEn:"It's cold today." },
  { han:'下雨', py:'xiàyǔ', en:'to rain', level:1, les:12, ex:'明天会下雨。', exPy:'Míngtiān huì xiàyǔ.', exEn:"It'll rain tomorrow." },
  { han:'大', py:'dà', en:'big', level:1, les:12, ex:'他的房间很大。', exPy:'Tā de fángjiān hěn dà.', exEn:'His room is very big.' },
  { han:'小', py:'xiǎo', en:'small', level:1, les:12, ex:'这件衣服太小了。', exPy:'Zhè jiàn yīfu tài xiǎo le.', exEn:'This piece of clothing is too small.' },
  { han:'少', py:'shǎo', en:'few, little', level:1, les:12, ex:'今天人很少。', exPy:'Jīntiān rén hěn shǎo.', exEn:'There are few people today.' },
  { han:'一点儿', py:'yìdiǎnr', en:'a little', level:1, les:12, ex:'我会说一点儿汉语。', exPy:'Wǒ huì shuō yìdiǎnr Hànyǔ.', exEn:'I can speak a little Chinese.' },

  /* L13 · 他在学做中国菜呢 */
  { han:'爱', py:'ài', en:'to love', level:1, les:13, ex:'我爱我的家。', exPy:'Wǒ ài wǒ de jiā.', exEn:'I love my family.' },
  { han:'看', py:'kàn', en:'to look, to watch', level:1, les:13, ex:'我在看书。', exPy:'Wǒ zài kàn shū.', exEn:"I'm reading." },
  { han:'看见', py:'kànjiàn', en:'to see', level:1, les:13, ex:'我看见他了。', exPy:'Wǒ kànjiàn tā le.', exEn:'I saw him.' },
  { han:'睡觉', py:'shuìjiào', en:'to sleep', level:1, les:13, ex:'我十一点睡觉。', exPy:'Wǒ shíyī diǎn shuìjiào.', exEn:'I go to sleep at eleven.' },
  { han:'打电话', py:'dǎ diànhuà', en:'to make a phone call', level:1, les:13, ex:'我给妈妈打电话。', exPy:'Wǒ gěi māma dǎ diànhuà.', exEn:"I'm calling my mum." },
  { han:'电影', py:'diànyǐng', en:'film, movie', level:1, les:13, ex:'我们去看电影吧。', exPy:'Wǒmen qù kàn diànyǐng ba.', exEn:"Let's go to a film." },
  { han:'狗', py:'gǒu', en:'dog', level:1, les:13, ex:'我家有一只狗。', exPy:'Wǒ jiā yǒu yì zhī gǒu.', exEn:'We have a dog at home.' },
  { han:'猫', py:'māo', en:'cat', level:1, les:13, ex:'那只猫很小。', exPy:'Nà zhī māo hěn xiǎo.', exEn:'That cat is very small.' },
  { han:'了', py:'le', en:'(completed-action particle)', level:1, les:13, ex:'我吃了。', exPy:'Wǒ chī le.', exEn:"I've eaten." },
  { han:'漂亮', py:'piàoliang', en:'pretty, beautiful', level:1, les:13, ex:'这件衣服很漂亮。', exPy:'Zhè jiàn yīfu hěn piàoliang.', exEn:'This outfit is lovely.' },

  /* L14 · 她买了不少衣服 */
  { han:'买', py:'mǎi', en:'to buy', level:1, les:14, ex:'我想买一个手机。', exPy:'Wǒ xiǎng mǎi yí ge shǒujī.', exEn:'I want to buy a phone.' },
  { han:'衣服', py:'yīfu', en:'clothes', level:1, les:14, ex:'她买了不少衣服。', exPy:'Tā mǎile bù shǎo yīfu.', exEn:'She bought quite a lot of clothes.' },
  { han:'钱', py:'qián', en:'money', level:1, les:14, ex:'这个多少钱？', exPy:'Zhège duōshao qián?', exEn:'How much is this?' },
  { han:'块', py:'kuài', en:'(unit of currency)', level:1, les:14, ex:'这本书三十块。', exPy:'Zhè běn shū sānshí kuài.', exEn:'This book is thirty yuan.' },
  { han:'五', py:'wǔ', en:'five', level:1, les:14, ex:'我五点回家。', exPy:'Wǒ wǔ diǎn huí jiā.', exEn:'I go home at five.' },
  { han:'六', py:'liù', en:'six', level:1, les:14, ex:'我每天六点起床。', exPy:'Wǒ měi tiān liù diǎn qǐchuáng.', exEn:'I get up at six every day.' },
  { han:'七', py:'qī', en:'seven', level:1, les:14, ex:'七点吃早饭。', exPy:'Qī diǎn chī zǎofàn.', exEn:'Breakfast at seven.' },
  { han:'八', py:'bā', en:'eight', level:1, les:14, ex:'他八点上班。', exPy:'Tā bā diǎn shàngbān.', exEn:'He starts work at eight.' },
  { han:'九', py:'jiǔ', en:'nine', level:1, les:14, ex:'商店九点开门。', exPy:'Shāngdiàn jiǔ diǎn kāimén.', exEn:'The shop opens at nine.' },
  { han:'十', py:'shí', en:'ten', level:1, les:14, ex:'我有十块钱。', exPy:'Wǒ yǒu shí kuài qián.', exEn:'I have ten yuan.' },

  /* L15 · 我是坐飞机来的 */
  { han:'飞机', py:'fēijī', en:'aeroplane', level:1, les:15, ex:'我是坐飞机来的。', exPy:'Wǒ shì zuò fēijī lái de.', exEn:'I came by plane.' },
  { han:'出租车', py:'chūzūchē', en:'taxi', level:1, les:15, ex:'我们坐出租车去机场。', exPy:'Wǒmen zuò chūzūchē qù jīchǎng.', exEn:"We'll take a taxi to the airport." },
  { han:'一', py:'yī', en:'one', level:1, les:15, ex:'我要一杯咖啡。', exPy:'Wǒ yào yì bēi kāfēi.', exEn:"I'd like a coffee." },
  { han:'二', py:'èr', en:'two', level:1, les:15, ex:'今天是二号。', exPy:'Jīntiān shì èr hào.', exEn:"Today's the second." },
  { han:'三', py:'sān', en:'three', level:1, les:15, ex:'我有三个朋友。', exPy:'Wǒ yǒu sān ge péngyou.', exEn:'I have three friends.' },
  { han:'四', py:'sì', en:'four', level:1, les:15, ex:'我们四点见。', exPy:'Wǒmen sì diǎn jiàn.', exEn:"We'll meet at four." },
  { han:'字', py:'zì', en:'character, word', level:1, les:15, ex:'这个字怎么写？', exPy:'Zhège zì zěnme xiě?', exEn:'How do you write this character?' },
  { han:'没有', py:'méiyǒu', en:'not have, there is not', level:1, les:15, ex:'我没有时间。', exPy:'Wǒ méiyǒu shíjiān.', exEn:"I don't have time." },
  { han:'都', py:'dōu', en:'all, both', level:1, les:15, ex:'我们都是学生。', exPy:'Wǒmen dōu shì xuésheng.', exEn:"We're all students." },
  { han:'多', py:'duō', en:'many, much', level:1, les:15, ex:'今天人很多。', exPy:'Jīntiān rén hěn duō.', exEn:'There are a lot of people today.' },

  /* ─────────────────────────── HSK 2 ─────────────────────────── */

  /* L1 · 他在哪儿呢 */
  { han:'吧', py:'ba', en:'(suggestion particle)', level:2, les:1, ex:'我们走吧。', exPy:'Wǒmen zǒu ba.', exEn:"Let's go." },
  { han:'正在', py:'zhèngzài', en:'in the middle of (doing)', level:2, les:1, ex:'他正在打电话。', exPy:'Tā zhèngzài dǎ diànhuà.', exEn:"He's on the phone right now." },
  { han:'着', py:'zhe', en:'(continuous-state particle)', level:2, les:1, ex:'门开着呢。', exPy:'Mén kāizhe ne.', exEn:'The door is open.' },
  { han:'教室', py:'jiàoshì', en:'classroom', level:2, les:1, ex:'老师在教室里。', exPy:'Lǎoshī zài jiàoshì lǐ.', exEn:'The teacher is in the classroom.' },
  { han:'门', py:'mén', en:'door', level:2, les:1, ex:'请关门。', exPy:'Qǐng guān mén.', exEn:'Please close the door.' },
  { han:'旁边', py:'pángbiān', en:'beside, next to', level:2, les:1, ex:'医院在学校旁边。', exPy:'Yīyuàn zài xuéxiào pángbiān.', exEn:'The hospital is next to the school.' },
  { han:'外', py:'wài', en:'outside', level:2, les:1, ex:'他在门外等你。', exPy:'Tā zài mén wài děng nǐ.', exEn:"He's waiting for you outside." },
  { han:'找', py:'zhǎo', en:'to look for', level:2, les:1, ex:'我在找我的手机。', exPy:'Wǒ zài zhǎo wǒ de shǒujī.', exEn:"I'm looking for my phone." },
  { han:'问', py:'wèn', en:'to ask', level:2, les:1, ex:'我想问你一个问题。', exPy:'Wǒ xiǎng wèn nǐ yí ge wèntí.', exEn:'I want to ask you a question.' },
  { han:'上班', py:'shàngbān', en:'to go to work', level:2, les:1, ex:'他八点上班。', exPy:'Tā bā diǎn shàngbān.', exEn:'He starts work at eight.' },

  /* L2 · 我每天六点起床 */
  { han:'每', py:'měi', en:'every, each', level:2, les:2, ex:'我每天跑步。', exPy:'Wǒ měi tiān pǎobù.', exEn:'I run every day.' },
  { han:'起床', py:'qǐchuáng', en:'to get up', level:2, les:2, ex:'我每天六点起床。', exPy:'Wǒ měi tiān liù diǎn qǐchuáng.', exEn:'I get up at six every day.' },
  { han:'早上', py:'zǎoshang', en:'early morning', level:2, les:2, ex:'早上我喝咖啡。', exPy:'Zǎoshang wǒ hē kāfēi.', exEn:'I drink coffee in the morning.' },
  { han:'晚上', py:'wǎnshang', en:'evening', level:2, les:2, ex:'晚上我在家休息。', exPy:'Wǎnshang wǒ zài jiā xiūxi.', exEn:'In the evening I rest at home.' },
  { han:'时间', py:'shíjiān', en:'time', level:2, les:2, ex:'我没有时间。', exPy:'Wǒ méiyǒu shíjiān.', exEn:"I don't have time." },
  { han:'小时', py:'xiǎoshí', en:'hour', level:2, les:2, ex:'我学了两个小时。', exPy:'Wǒ xuéle liǎng ge xiǎoshí.', exEn:'I studied for two hours.' },
  { han:'休息', py:'xiūxi', en:'to rest', level:2, les:2, ex:'你累了，休息一下吧。', exPy:'Nǐ lèi le, xiūxi yíxià ba.', exEn:"You're tired — have a rest." },
  { han:'运动', py:'yùndòng', en:'sport, to exercise', level:2, les:2, ex:'我喜欢运动。', exPy:'Wǒ xǐhuan yùndòng.', exEn:'I like sport.' },
  { han:'跑步', py:'pǎobù', en:'to run, to jog', level:2, les:2, ex:'他每天早上跑步。', exPy:'Tā měi tiān zǎoshang pǎobù.', exEn:'He runs every morning.' },
  { han:'洗', py:'xǐ', en:'to wash', level:2, les:2, ex:'我要洗衣服。', exPy:'Wǒ yào xǐ yīfu.', exEn:'I need to wash my clothes.' },

  /* L3 · 左边那个红色的是我的 */
  { han:'左边', py:'zuǒbian', en:'left side', level:2, les:3, ex:'左边那个是我的。', exPy:'Zuǒbian nàge shì wǒ de.', exEn:'The one on the left is mine.' },
  { han:'右边', py:'yòubian', en:'right side', level:2, les:3, ex:'商店在右边。', exPy:'Shāngdiàn zài yòubian.', exEn:'The shop is on the right.' },
  { han:'白', py:'bái', en:'white', level:2, les:3, ex:'我喜欢白色的。', exPy:'Wǒ xǐhuan báisè de.', exEn:'I like the white one.' },
  { han:'黑', py:'hēi', en:'black', level:2, les:3, ex:'他有一个黑色的手机。', exPy:'Tā yǒu yí ge hēisè de shǒujī.', exEn:'He has a black phone.' },
  { han:'红', py:'hóng', en:'red', level:2, les:3, ex:'那个红色的是我的。', exPy:'Nàge hóngsè de shì wǒ de.', exEn:'The red one is mine.' },
  { han:'颜色', py:'yánsè', en:'colour', level:2, les:3, ex:'你喜欢什么颜色？', exPy:'Nǐ xǐhuan shénme yánsè?', exEn:'What colour do you like?' },
  { han:'手表', py:'shǒubiǎo', en:'watch', level:2, les:3, ex:'这块手表很贵。', exPy:'Zhè kuài shǒubiǎo hěn guì.', exEn:'This watch is expensive.' },
  { han:'手机', py:'shǒujī', en:'mobile phone', level:2, les:3, ex:'我的手机在哪儿？', exPy:'Wǒ de shǒujī zài nǎr?', exEn:"Where's my phone?" },
  { han:'铅笔', py:'qiānbǐ', en:'pencil', level:2, les:3, ex:'请给我一支铅笔。', exPy:'Qǐng gěi wǒ yì zhī qiānbǐ.', exEn:'Please give me a pencil.' },
  { han:'件', py:'jiàn', en:'(measure word: clothes, matters)', level:2, les:3, ex:'这件衣服很漂亮。', exPy:'Zhè jiàn yīfu hěn piàoliang.', exEn:'This piece of clothing is lovely.' },

  /* L4 · 这个工作是他帮我介绍的 */
  { han:'帮助', py:'bāngzhù', en:'to help', level:2, les:4, ex:'谢谢你的帮助。', exPy:'Xièxie nǐ de bāngzhù.', exEn:'Thank you for your help.' },
  { han:'介绍', py:'jièshào', en:'to introduce', level:2, les:4, ex:'这个工作是他帮我介绍的。', exPy:'Zhège gōngzuò shì tā bāng wǒ jièshào de.', exEn:"He's the one who found me this job." },
  { han:'公司', py:'gōngsī', en:'company', level:2, les:4, ex:'他在一家大公司工作。', exPy:'Tā zài yì jiā dà gōngsī gōngzuò.', exEn:'He works at a big company.' },
  { han:'房间', py:'fángjiān', en:'room', level:2, les:4, ex:'我的房间很小。', exPy:'Wǒ de fángjiān hěn xiǎo.', exEn:'My room is small.' },
  { han:'服务员', py:'fúwùyuán', en:'waiter, attendant', level:2, les:4, ex:'服务员，买单！', exPy:'Fúwùyuán, mǎidān!', exEn:'Waiter, the bill please!' },
  { han:'已经', py:'yǐjīng', en:'already', level:2, les:4, ex:'我已经吃过了。', exPy:'Wǒ yǐjīng chīguo le.', exEn:"I've already eaten." },
  { han:'就', py:'jiù', en:'just, at once, then', level:2, les:4, ex:'我就来。', exPy:'Wǒ jiù lái.', exEn:"I'm coming right now." },
  { han:'让', py:'ràng', en:'to let, to make (someone do)', level:2, les:4, ex:'妈妈让我早点儿回家。', exPy:'Māma ràng wǒ zǎo diǎnr huí jiā.', exEn:'Mum wants me home a bit earlier.' },
  { han:'送', py:'sòng', en:'to give (a gift), to see off', level:2, les:4, ex:'我送他一本书。', exPy:'Wǒ sòng tā yì běn shū.', exEn:'I gave him a book.' },
  { han:'告诉', py:'gàosu', en:'to tell', level:2, les:4, ex:'请告诉我你的名字。', exPy:'Qǐng gàosu wǒ nǐ de míngzi.', exEn:'Please tell me your name.' },

  /* L5 · 我是走回来的 */
  { han:'走', py:'zǒu', en:'to walk, to leave', level:2, les:5, ex:'我是走回来的。', exPy:'Wǒ shì zǒu huílai de.', exEn:'I walked back.' },
  { han:'出', py:'chū', en:'to go out', level:2, les:5, ex:'他出去了。', exPy:'Tā chūqu le.', exEn:'He went out.' },
  { han:'进', py:'jìn', en:'to enter', level:2, les:5, ex:'请进！', exPy:'Qǐng jìn!', exEn:'Come in!' },
  { han:'到', py:'dào', en:'to arrive, to reach', level:2, les:5, ex:'我五点到家。', exPy:'Wǒ wǔ diǎn dào jiā.', exEn:'I get home at five.' },
  { han:'过', py:'guò', en:'(experiential particle), to pass', level:2, les:5, ex:'我去过北京。', exPy:'Wǒ qùguo Běijīng.', exEn:"I've been to Beijing." },
  { han:'往', py:'wǎng', en:'towards', level:2, les:5, ex:'往前走。', exPy:'Wǎng qián zǒu.', exEn:'Walk straight ahead.' },
  { han:'路', py:'lù', en:'road, route', level:2, les:5, ex:'这条路很长。', exPy:'Zhè tiáo lù hěn cháng.', exEn:'This road is long.' },
  { han:'公共汽车', py:'gōnggòng qìchē', en:'bus', level:2, les:5, ex:'我坐公共汽车上班。', exPy:'Wǒ zuò gōnggòng qìchē shàngbān.', exEn:'I take the bus to work.' },
  { han:'自行车', py:'zìxíngchē', en:'bicycle', level:2, les:5, ex:'他骑自行车去学校。', exPy:'Tā qí zìxíngchē qù xuéxiào.', exEn:'He cycles to school.' },
  { han:'火车站', py:'huǒchēzhàn', en:'train station', level:2, les:5, ex:'火车站离这儿很近。', exPy:'Huǒchēzhàn lí zhèr hěn jìn.', exEn:'The station is close to here.' },

  /* L6 · 我借你的词典用一下 */
  { han:'一下', py:'yíxià', en:'briefly, a bit', level:2, les:6, ex:'请等一下。', exPy:'Qǐng děng yíxià.', exEn:'Please wait a moment.' },
  { han:'给', py:'gěi', en:'to give, for', level:2, les:6, ex:'请给我一杯水。', exPy:'Qǐng gěi wǒ yì bēi shuǐ.', exEn:'Please give me a glass of water.' },
  { han:'等', py:'děng', en:'to wait', level:2, les:6, ex:'我在门外等你。', exPy:'Wǒ zài mén wài děng nǐ.', exEn:"I'll wait for you outside." },
  { han:'可以', py:'kěyǐ', en:'may, can', level:2, les:6, ex:'我可以进来吗？', exPy:'Wǒ kěyǐ jìnlai ma?', exEn:'May I come in?' },
  { han:'两', py:'liǎng', en:'two (with measure words)', level:2, les:6, ex:'我有两个孩子。', exPy:'Wǒ yǒu liǎng ge háizi.', exEn:'I have two children.' },
  { han:'第一', py:'dìyī', en:'first', level:2, les:6, ex:'这是我第一次来中国。', exPy:'Zhè shì wǒ dìyī cì lái Zhōngguó.', exEn:"It's my first time in China." },
  { han:'次', py:'cì', en:'(measure word: times)', level:2, les:6, ex:'我去过两次。', exPy:'Wǒ qùguo liǎng cì.', exEn:"I've been twice." },
  { han:'再', py:'zài', en:'again, once more', level:2, les:6, ex:'请再说一次。', exPy:'Qǐng zài shuō yí cì.', exEn:'Please say that again.' },
  { han:'还', py:'hái', en:'still, also', level:2, les:6, ex:'我还想喝一杯。', exPy:'Wǒ hái xiǎng hē yì bēi.', exEn:"I'd still like another cup." },
  { han:'别', py:'bié', en:"don't", level:2, les:6, ex:'别忘了。', exPy:'Bié wàng le.', exEn:"Don't forget." },

  /* L7 · 你怎么不吃了 */
  { han:'好吃', py:'hǎochī', en:'tasty', level:2, les:7, ex:'这个菜很好吃。', exPy:'Zhège cài hěn hǎochī.', exEn:'This dish is delicious.' },
  { han:'鸡蛋', py:'jīdàn', en:'egg', level:2, les:7, ex:'我要一个鸡蛋。', exPy:'Wǒ yào yí ge jīdàn.', exEn:"I'd like an egg." },
  { han:'牛奶', py:'niúnǎi', en:'milk', level:2, les:7, ex:'孩子每天喝牛奶。', exPy:'Háizi měi tiān hē niúnǎi.', exEn:'The child drinks milk every day.' },
  { han:'咖啡', py:'kāfēi', en:'coffee', level:2, les:7, ex:'我要一杯咖啡。', exPy:'Wǒ yào yì bēi kāfēi.', exEn:"I'd like a cup of coffee." },
  { han:'羊肉', py:'yángròu', en:'mutton, lamb', level:2, les:7, ex:'我不吃羊肉。', exPy:'Wǒ bù chī yángròu.', exEn:"I don't eat lamb." },
  { han:'鱼', py:'yú', en:'fish', level:2, les:7, ex:'这个鱼很好吃。', exPy:'Zhège yú hěn hǎochī.', exEn:'This fish is delicious.' },
  { han:'西瓜', py:'xīguā', en:'watermelon', level:2, les:7, ex:'夏天我喜欢吃西瓜。', exPy:'Xiàtiān wǒ xǐhuan chī xīguā.', exEn:'I like watermelon in summer.' },
  { han:'药', py:'yào', en:'medicine', level:2, les:7, ex:'吃药了吗？', exPy:'Chī yào le ma?', exEn:'Have you taken your medicine?' },
  { han:'要', py:'yào', en:'to want, will', level:2, les:7, ex:'我要一杯咖啡。', exPy:'Wǒ yào yì bēi kāfēi.', exEn:"I'd like a coffee." },
  { han:'累', py:'lèi', en:'tired', level:2, les:7, ex:'我今天很累。', exPy:'Wǒ jīntiān hěn lèi.', exEn:"I'm very tired today." },

  /* L8 · 你什么时候搬家 */
  { han:'新', py:'xīn', en:'new', level:2, les:8, ex:'这是我的新房间。', exPy:'Zhè shì wǒ de xīn fángjiān.', exEn:'This is my new room.' },
  { han:'宾馆', py:'bīnguǎn', en:'hotel', level:2, les:8, ex:'我住在宾馆里。', exPy:'Wǒ zhù zài bīnguǎn lǐ.', exEn:"I'm staying in a hotel." },
  { han:'近', py:'jìn', en:'near', level:2, les:8, ex:'学校离我家很近。', exPy:'Xuéxiào lí wǒ jiā hěn jìn.', exEn:'The school is near my home.' },
  { han:'远', py:'yuǎn', en:'far', level:2, les:8, ex:'机场离这儿很远。', exPy:'Jīchǎng lí zhèr hěn yuǎn.', exEn:'The airport is far from here.' },
  { han:'离', py:'lí', en:'away from', level:2, les:8, ex:'医院离这儿不远。', exPy:'Yīyuàn lí zhèr bù yuǎn.', exEn:"The hospital isn't far from here." },
  { han:'比', py:'bǐ', en:'than, compared with', level:2, les:8, ex:'今天比昨天热。', exPy:'Jīntiān bǐ zuótiān rè.', exEn:"It's hotter today than yesterday." },
  { han:'贵', py:'guì', en:'expensive', level:2, les:8, ex:'这件衣服太贵了。', exPy:'Zhè jiàn yīfu tài guì le.', exEn:'This outfit is too expensive.' },
  { han:'便宜', py:'piányi', en:'cheap', level:2, les:8, ex:'这个手机很便宜。', exPy:'Zhège shǒujī hěn piányi.', exEn:'This phone is cheap.' },
  { han:'最', py:'zuì', en:'most', level:2, les:8, ex:'这是最好的。', exPy:'Zhè shì zuì hǎo de.', exEn:'This is the best one.' },
  { han:'非常', py:'fēicháng', en:'extremely', level:2, les:8, ex:'今天非常冷。', exPy:'Jīntiān fēicháng lěng.', exEn:"It's extremely cold today." },

  /* L9 · 我是在网上买的 */
  { han:'卖', py:'mài', en:'to sell', level:2, les:9, ex:'他们卖水果。', exPy:'Tāmen mài shuǐguǒ.', exEn:'They sell fruit.' },
  { han:'票', py:'piào', en:'ticket', level:2, les:9, ex:'我买了两张票。', exPy:'Wǒ mǎile liǎng zhāng piào.', exEn:'I bought two tickets.' },
  { han:'百', py:'bǎi', en:'hundred', level:2, les:9, ex:'这个一百块。', exPy:'Zhège yìbǎi kuài.', exEn:'This is a hundred yuan.' },
  { han:'千', py:'qiān', en:'thousand', level:2, les:9, ex:'这个手机三千块。', exPy:'Zhège shǒujī sānqiān kuài.', exEn:'This phone is three thousand yuan.' },
  { han:'穿', py:'chuān', en:'to wear', level:2, les:9, ex:'你穿得太少了。', exPy:'Nǐ chuān de tài shǎo le.', exEn:"You're not wearing enough." },
  { han:'长', py:'cháng', en:'long', level:2, les:9, ex:'这条路很长。', exPy:'Zhè tiáo lù hěn cháng.', exEn:'This road is long.' },
  { han:'高', py:'gāo', en:'tall, high', level:2, les:9, ex:'他比我高。', exPy:'Tā bǐ wǒ gāo.', exEn:"He's taller than me." },
  { han:'快', py:'kuài', en:'fast, soon', level:2, les:9, ex:'他走得很快。', exPy:'Tā zǒu de hěn kuài.', exEn:'He walks quickly.' },
  { han:'慢', py:'màn', en:'slow', level:2, les:9, ex:'请说慢一点儿。', exPy:'Qǐng shuō màn yìdiǎnr.', exEn:'Please speak a little slower.' },
  { han:'错', py:'cuò', en:'wrong, mistake', level:2, les:9, ex:'我写错了。', exPy:'Wǒ xiěcuò le.', exEn:'I wrote it wrong.' },

  /* L10 · 我头疼 */
  { han:'生病', py:'shēngbìng', en:'to fall ill', level:2, les:10, ex:'小王今天生病了。', exPy:'Xiǎo Wáng jīntiān shēngbìng le.', exEn:'Xiao Wang is ill today.' },
  { han:'身体', py:'shēntǐ', en:'body, health', level:2, les:10, ex:'他身体很好。', exPy:'Tā shēntǐ hěn hǎo.', exEn:"He's in good health." },
  { han:'眼睛', py:'yǎnjing', en:'eye', level:2, les:10, ex:'她的眼睛很大。', exPy:'Tā de yǎnjing hěn dà.', exEn:'She has big eyes.' },
  { han:'觉得', py:'juéde', en:'to feel, to think', level:2, les:10, ex:'我觉得这个很好。', exPy:'Wǒ juéde zhège hěn hǎo.', exEn:'I think this one is good.' },
  { han:'希望', py:'xīwàng', en:'to hope', level:2, les:10, ex:'我希望明天不下雨。', exPy:'Wǒ xīwàng míngtiān bú xiàyǔ.', exEn:'I hope it does not rain tomorrow.' },
  { han:'可能', py:'kěnéng', en:'maybe, possible', level:2, les:10, ex:'他可能不来了。', exPy:'Tā kěnéng bù lái le.', exEn:'He might not come.' },
  { han:'懂', py:'dǒng', en:'to understand', level:2, les:10, ex:'我不懂这个字。', exPy:'Wǒ bù dǒng zhège zì.', exEn:"I don't understand this character." },
  { han:'知道', py:'zhīdào', en:'to know', level:2, les:10, ex:'我不知道他在哪儿。', exPy:'Wǒ bù zhīdào tā zài nǎr.', exEn:"I don't know where he is." },
  { han:'问题', py:'wèntí', en:'question, problem', level:2, les:10, ex:'这个问题很难。', exPy:'Zhège wèntí hěn nán.', exEn:'This question is hard.' },
  { han:'准备', py:'zhǔnbèi', en:'to prepare', level:2, les:10, ex:'我在准备考试。', exPy:'Wǒ zài zhǔnbèi kǎoshì.', exEn:"I'm preparing for an exam." },

  /* L11 · 就要开学了 */
  { han:'开始', py:'kāishǐ', en:'to begin', level:2, les:11, ex:'电影八点开始。', exPy:'Diànyǐng bā diǎn kāishǐ.', exEn:'The film starts at eight.' },
  { han:'完', py:'wán', en:'to finish', level:2, les:11, ex:'我吃完了。', exPy:'Wǒ chīwán le.', exEn:"I've finished eating." },
  { han:'课', py:'kè', en:'lesson, class', level:2, les:11, ex:'我今天有三节课。', exPy:'Wǒ jīntiān yǒu sān jié kè.', exEn:'I have three classes today.' },
  { han:'考试', py:'kǎoshì', en:'exam, to take an exam', level:2, les:11, ex:'明天有考试。', exPy:'Míngtiān yǒu kǎoshì.', exEn:"There's an exam tomorrow." },
  { han:'题', py:'tí', en:'question, exercise', level:2, les:11, ex:'这道题我不会。', exPy:'Zhè dào tí wǒ bú huì.', exEn:"I can't do this question." },
  { han:'事情', py:'shìqing', en:'matter, affair', level:2, les:11, ex:'我有事情要做。', exPy:'Wǒ yǒu shìqing yào zuò.', exEn:'I have things to do.' },
  { han:'意思', py:'yìsi', en:'meaning', level:2, les:11, ex:'这个词是什么意思？', exPy:'Zhège cí shì shénme yìsi?', exEn:'What does this word mean?' },
  { han:'因为…所以…', py:'yīnwèi…suǒyǐ…', en:'because…, so…', level:2, les:11, ex:'因为下雨，所以我没去。', exPy:'Yīnwèi xiàyǔ, suǒyǐ wǒ méi qù.', exEn:"Because it rained, I didn't go." },
  { han:'虽然…但是…', py:'suīrán…dànshì…', en:'although…, but…', level:2, les:11, ex:'虽然很累，但是很高兴。', exPy:'Suīrán hěn lèi, dànshì hěn gāoxìng.', exEn:'Although tired, I am happy.' },
  { han:'得', py:'de', en:'(complement particle)', level:2, les:11, ex:'他跑得很快。', exPy:'Tā pǎo de hěn kuài.', exEn:'He runs fast.' },

  /* L12 · 你穿得太少了 */
  { han:'阴', py:'yīn', en:'overcast, cloudy', level:2, les:12, ex:'今天是阴天。', exPy:'Jīntiān shì yīntiān.', exEn:"It's overcast today." },
  { han:'晴', py:'qíng', en:'sunny, clear', level:2, les:12, ex:'明天是晴天。', exPy:'Míngtiān shì qíngtiān.', exEn:"It'll be sunny tomorrow." },
  { han:'雪', py:'xuě', en:'snow', level:2, les:12, ex:'昨天下雪了。', exPy:'Zuótiān xià xuě le.', exEn:'It snowed yesterday.' },
  { han:'唱歌', py:'chànggē', en:'to sing', level:2, les:12, ex:'她唱歌唱得很好。', exPy:'Tā chànggē chàng de hěn hǎo.', exEn:'She sings very well.' },
  { han:'跳舞', py:'tiàowǔ', en:'to dance', level:2, les:12, ex:'我们一起去跳舞吧。', exPy:'Wǒmen yìqǐ qù tiàowǔ ba.', exEn:"Let's go dancing together." },
  { han:'打篮球', py:'dǎ lánqiú', en:'to play basketball', level:2, les:12, ex:'他每天下午打篮球。', exPy:'Tā měi tiān xiàwǔ dǎ lánqiú.', exEn:'He plays basketball every afternoon.' },
  { han:'踢足球', py:'tī zúqiú', en:'to play football', level:2, les:12, ex:'孩子们在踢足球。', exPy:'Háizimen zài tī zúqiú.', exEn:'The children are playing football.' },
  { han:'游泳', py:'yóuyǒng', en:'to swim', level:2, les:12, ex:'夏天我常常游泳。', exPy:'Xiàtiān wǒ chángcháng yóuyǒng.', exEn:'I often swim in summer.' },
  { han:'玩', py:'wán', en:'to play, to have fun', level:2, les:12, ex:'我们去外面玩吧。', exPy:'Wǒmen qù wàimiàn wán ba.', exEn:"Let's go out and have fun." },
  { han:'快乐', py:'kuàilè', en:'happy', level:2, les:12, ex:'生日快乐！', exPy:'Shēngrì kuàilè!', exEn:'Happy birthday!' },

  /* L13 · 我们是去年入学的 */
  { han:'去年', py:'qùnián', en:'last year', level:2, les:13, ex:'我们是去年来的。', exPy:'Wǒmen shì qùnián lái de.', exEn:'We came last year.' },
  { han:'日', py:'rì', en:'day, date', level:2, les:13, ex:'今天是九月三日。', exPy:'Jīntiān shì jiǔ yuè sān rì.', exEn:"Today's the third of September." },
  { han:'生日', py:'shēngrì', en:'birthday', level:2, les:13, ex:'明天是我的生日。', exPy:'Míngtiān shì wǒ de shēngrì.', exEn:"Tomorrow's my birthday." },
  { han:'大家', py:'dàjiā', en:'everyone', level:2, les:13, ex:'大家都来了。', exPy:'Dàjiā dōu lái le.', exEn:"Everyone's here." },
  { han:'孩子', py:'háizi', en:'child', level:2, les:13, ex:'她有两个孩子。', exPy:'Tā yǒu liǎng ge háizi.', exEn:'She has two children.' },
  { han:'男', py:'nán', en:'male', level:2, les:13, ex:'他是我的男朋友。', exPy:'Tā shì wǒ de nán péngyou.', exEn:"He's my boyfriend." },
  { han:'女', py:'nǚ', en:'female', level:2, les:13, ex:'她是我的女朋友。', exPy:'Tā shì wǒ de nǚ péngyou.', exEn:"She's my girlfriend." },
  { han:'姓', py:'xìng', en:'surname, to be surnamed', level:2, les:13, ex:'我姓王。', exPy:'Wǒ xìng Wáng.', exEn:'My surname is Wang.' },
  { han:'您', py:'nín', en:'you (polite)', level:2, les:13, ex:'您好！', exPy:'Nín hǎo!', exEn:'Hello (polite).' },
  { han:'它', py:'tā', en:'it', level:2, les:13, ex:'它是我的猫。', exPy:'Tā shì wǒ de māo.', exEn:"It's my cat." },

  /* L14 · 我想在这儿多住几天 */
  { han:'哥哥', py:'gēge', en:'older brother', level:2, les:14, ex:'我哥哥在公司工作。', exPy:'Wǒ gēge zài gōngsī gōngzuò.', exEn:'My older brother works at a company.' },
  { han:'姐姐', py:'jiějie', en:'older sister', level:2, les:14, ex:'我姐姐是医生。', exPy:'Wǒ jiějie shì yīshēng.', exEn:'My older sister is a doctor.' },
  { han:'弟弟', py:'dìdi', en:'younger brother', level:2, les:14, ex:'我弟弟今年十岁。', exPy:'Wǒ dìdi jīnnián shí suì.', exEn:'My younger brother is ten.' },
  { han:'妹妹', py:'mèimei', en:'younger sister', level:2, les:14, ex:'我妹妹在学校。', exPy:'Wǒ mèimei zài xuéxiào.', exEn:'My younger sister is at school.' },
  { han:'妻子', py:'qīzi', en:'wife', level:2, les:14, ex:'他的妻子是老师。', exPy:'Tā de qīzi shì lǎoshī.', exEn:'His wife is a teacher.' },
  { han:'丈夫', py:'zhàngfu', en:'husband', level:2, les:14, ex:'她丈夫在北京工作。', exPy:'Tā zhàngfu zài Běijīng gōngzuò.', exEn:'Her husband works in Beijing.' },
  { han:'从', py:'cóng', en:'from', level:2, les:14, ex:'我从北京来。', exPy:'Wǒ cóng Běijīng lái.', exEn:"I'm from Beijing." },
  { han:'真', py:'zhēn', en:'really, true', level:2, les:14, ex:'这个真好吃。', exPy:'Zhège zhēn hǎochī.', exEn:'This is really tasty.' },
  { han:'对', py:'duì', en:'correct, right', level:2, les:14, ex:'你说得对。', exPy:'Nǐ shuō de duì.', exEn:"You're right." },
  { han:'笑', py:'xiào', en:'to laugh, to smile', level:2, les:14, ex:'大家都笑了。', exPy:'Dàjiā dōu xiào le.', exEn:'Everyone laughed.' },

  /* L15 · 我要去旅游了 */
  { han:'旅游', py:'lǚyóu', en:'to travel', level:2, les:15, ex:'我要去旅游了。', exPy:'Wǒ yào qù lǚyóu le.', exEn:"I'm off travelling." },
  { han:'船', py:'chuán', en:'boat, ship', level:2, les:15, ex:'我们坐船去。', exPy:'Wǒmen zuò chuán qù.', exEn:"We'll go by boat." },
  { han:'机场', py:'jīchǎng', en:'airport', level:2, les:15, ex:'我去机场接他。', exPy:'Wǒ qù jīchǎng jiē tā.', exEn:"I'm meeting him at the airport." },
  { han:'报纸', py:'bàozhǐ', en:'newspaper', level:2, les:15, ex:'爸爸在看报纸。', exPy:'Bàba zài kàn bàozhǐ.', exEn:'Dad is reading the newspaper.' },
  { han:'一起', py:'yìqǐ', en:'together', level:2, les:15, ex:'我们一起去吧。', exPy:'Wǒmen yìqǐ qù ba.', exEn:"Let's go together." },
  { han:'忙', py:'máng', en:'busy', level:2, les:15, ex:'他工作很忙。', exPy:'Tā gōngzuò hěn máng.', exEn:"He's very busy with work." },
  { han:'也', py:'yě', en:'also, too', level:2, les:15, ex:'我也想去。', exPy:'Wǒ yě xiǎng qù.', exEn:'I want to go too.' },
  { han:'说', py:'shuō', en:'to say, to speak', level:2, les:15, ex:'他说他很忙。', exPy:'Tā shuō tā hěn máng.', exEn:'He says he is very busy.' },
  { han:'为什么', py:'wèi shénme', en:'why', level:2, les:15, ex:'你为什么不去？', exPy:'Nǐ wèi shénme bú qù?', exEn:"Why aren't you going?" },
];

/* Stable id per word — used as the localStorage key for its schedule. */
VOCAB.forEach((w, i) => { w.id = 'w' + String(i).padStart(3, '0'); });
