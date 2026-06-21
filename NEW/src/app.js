const ingredients = [
  { id: "honeysuckle", name: "金銀花", sprite: 0, clue: "花開時一白一黃，常用於清熱解毒。", prep: "摘花去梗", tag: "清熱", lore: "金銀花提醒我們：涼茶不是茶葉，而是嶺南人把山野草木變成日常保健智慧。" },
  { id: "chrysanthemum", name: "菊花", sprite: 1, clue: "花香清雅，常配入清熱明目的飲品。", prep: "輕洗花瓣", tag: "清潤", lore: "菊花茶從藥用走向日常，反映唐宋以後藥草湯逐漸進入家庭生活。" },
  { id: "kapok", name: "木棉花", sprite: 2, clue: "南方常見紅花，五花茶中用來祛濕。", prep: "曬乾花瓣", tag: "祛濕", lore: "木棉花盛放於潮濕季節，民間把它放入茶方，回應嶺南多雨濕熱的環境。" },
  { id: "pueraria", name: "布渣葉", sprite: 3, clue: "嶺南常用草木，可助消滯解暑。", prep: "剪碎葉片", tag: "消滯", lore: "相傳葛洪在羅浮山採集本地野草配方，這類在地藥草是涼茶原型的重要線索。" },
  { id: "sophora", name: "槐花", sprite: 4, clue: "五花之一，味道溫和，常與其他花材同煲。", prep: "分揀花蕾", tag: "溫和", lore: "多種花材互補，呈現唐宋以後按季節、症狀與體質調配複方的智慧。" },
  { id: "herbBundle", name: "廿四味藥材包", sprite: 5, clue: "不是剛好二十四種，而是多種苦味藥材的概數。", prep: "分層包紮", tag: "複方", lore: "廿四味代表多種藥材合方抗疫、對付發熱瘡毒與濕氣的民間記憶。" },
  { id: "selfheal", name: "夏枯草", sprite: 6, clue: "名字帶有夏天意象，常見於清熱類涼茶。", prep: "揉開花穗", tag: "清熱", lore: "夏枯草對應暑濕熱病的生活經驗，是早期嶺南藥草湯的重要角色。" },
  { id: "jigucao", name: "雞骨草", sprite: 7, clue: "常用於疏肝祛濕，味道帶草本苦甘。", prep: "紮成小束", tag: "祛濕", lore: "雞骨草茶反映涼茶不只清熱，也處理濕重、疲倦和腸胃不適等南方生活問題。" },
  { id: "hempseed", name: "火麻仁", sprite: 8, clue: "口感較潤，常見於香港涼茶舖。", prep: "搗碎取香", tag: "滋潤", lore: "香港涼茶舖把藥飲變成街坊日常，溫和配方讓更多人願意入口。" },
  { id: "monkfruit", name: "羅漢果", sprite: 9, clue: "天然甘甜，常用來潤喉。", prep: "敲開果殼", tag: "潤喉", lore: "羅漢果令苦味茶方更易入口，也見證傳統涼茶向現代瓶裝飲品轉化。" },
  { id: "mistletoe", name: "桑寄生", sprite: 10, clue: "常見滋補茶材，適合慢火久煲。", prep: "慢洗去塵", tag: "調理", lore: "涼茶舖不只賣苦茶，也提供街坊按體質選擇的日常調理。" },
  { id: "sugarcane", name: "竹蔗", sprite: 11, clue: "清甜多汁，常與茅根同煲。", prep: "劈成小段", tag: "清甜", lore: "竹蔗茅根水是香港家庭記憶之一，味道清甜，連小朋友也容易接受。" },
  { id: "imperatae", name: "茅根", sprite: 12, clue: "白色根莖，常配竹蔗作清潤飲品。", prep: "洗淨泥沙", tag: "清潤", lore: "茅根一類草根藥材提醒玩家：涼茶是嶺南草木熬成的藥飲。" },
  { id: "rocksugar", name: "冰糖", sprite: 13, clue: "調和苦味，讓藥飲更容易入口。", prep: "後段加入", tag: "調味", lore: "一點甜味背後也有人情：老茶舖讓清苦生活多一口安慰。" },
  { id: "water", name: "清水", sprite: 14, clue: "所有藥草都要靠它慢慢煎出味道。", prep: "量好水位", tag: "火候", lore: "涼茶重視火候與水量，從家庭煲製到街頭銅壺，都是手藝的一部分。" },
  { id: "pot", name: "銅壺", sprite: 15, clue: "舊香港涼茶舖的標誌之一。", prep: "預熱銅壺", tag: "市井", lore: "五六十年代香港涼茶舖常見銅葫蘆招牌與大茶壺，是城市街景的一部分。" }
];

const timeline = [
  { era: "遠古至三國傳說", title: "神農嘗百草與瘴疫藥湯", text: "傳說神農嘗百草，為藥草解毒觀念埋下源頭；又傳諸葛亮南征時，士兵飲用民間草藥湯後脫離瘴疫。", ask: "傳說不一定等於史實，但能保存社群如何理解疾病與草藥。" },
  { era: "魏晉南北朝", title: "葛洪羅浮山行醫", text: "嶺南炎熱潮濕、瘴氣與疫病流行。東晉名醫葛洪參照《肘後備急方》，採夏枯草、金銀花、布渣葉等本地野草配成湯藥，形成涼茶早期原型。", ask: "這一階段說明涼茶和地理環境密不可分。" },
  { era: "唐宋", title: "民間方子成型", text: "居民按季節與病症調配藥草，不再只用單一草藥。家族配方開始傳承，藥草湯由治病藥劑慢慢變成日常預防飲品。", ask: "配方傳承是非物質文化的重要基礎。" },
  { era: "清代道光以後", title: "街頭涼茶舖興起", text: "廣州市井繁榮，王澤邦結合民間驗方開店，王老吉成為代表。粵人南下謀生後，涼茶傳入香港並服務碼頭苦力與工人。", ask: "商業化讓涼茶從家庭走到街頭。" },
  { era: "1950-60年代香港", title: "銅壺、寡佬茶與街坊人情", text: "涼茶舖遍布大街小巷。碼頭獨身勞工常飲涼茶解暑祛濕，舊稱「寡佬茶」；窮孩子與流浪漢有時也能得到一碗淡茶。", ask: "涼茶舖也是城市互助與消息交流的場所。" },
  { era: "2006年至今", title: "非物質文化遺產", text: "涼茶列入國家級非物質文化遺產。連鎖品牌、瓶裝飲品與老店秘方並存，成為華南與香港本土文化標誌。", ask: "非遺保護的是手藝、知識、記憶與生活方式。" }
];

const sourceCards = [
  {
    source: "史料卡 A：民間傳說把神農嘗百草、諸葛亮南征與草藥湯連起來，反映古人以草木解毒、避疫的想像。",
    question: "這段材料最適合用來說明甚麼？",
    options: ["民間記憶如何保存藥草觀念", "涼茶完全由現代工廠發明", "涼茶只是一種普通茶葉"],
    answer: 0,
    explain: "傳說未必能直接當作史實，但能反映社群如何理解疾病、環境與草藥。"
  },
  {
    source: "史料卡 B：嶺南暑濕、疫病流行，葛洪在羅浮山行醫，採本地草木配成湯藥，回應地方病患。",
    question: "這段材料顯示涼茶早期原型與哪個因素最有關？",
    options: ["地理氣候與在地藥草", "外國汽水文化", "宮廷宴會禮儀"],
    answer: 0,
    explain: "涼茶不是抽象配方，而是嶺南人面對暑濕瘴疫的在地回應。"
  },
  {
    source: "史料卡 C：唐宋以後，居民按季節、病症與體質調配複方，部分家族配方代代相傳。",
    question: "這段材料最能支持哪個觀點？",
    options: ["涼茶逐漸由治病藥劑走入日常生活", "涼茶沒有任何傳承方式", "所有涼茶配方完全相同"],
    answer: 0,
    explain: "按季節與體質調配，說明涼茶成為民間日常養生與家族傳承的一部分。"
  },
  {
    source: "史料卡 D：清代市井繁榮，廣州出現涼茶鋪；粵人南下謀生後，涼茶傳入香港，服務工人與街坊。",
    question: "這段材料反映涼茶發展出現了甚麼轉變？",
    options: ["由家庭與民間方子走向商業與城市生活", "完全離開華南地區", "只在學校實驗室出現"],
    answer: 0,
    explain: "街頭涼茶鋪使涼茶成為城市服務、移民與市井文化的一部分。"
  },
  {
    source: "史料卡 E：五六十年代香港涼茶舖常見銅壺招牌，碼頭工人、窮孩子和街坊都可能在店中得到照顧。",
    question: "這段材料最能說明涼茶舖的哪種社會功能？",
    options: ["社區互助與基層醫藥支援", "只售賣奢侈甜品", "只服務遊客拍照"],
    answer: 0,
    explain: "涼茶舖不只是飲品店，也承載街坊人情、廉價保健與消息交流。"
  },
  {
    source: "史料卡 F：2006 年涼茶列入國家級非物質文化遺產，保育重點包括手藝、配方、生活習俗與文化記憶。",
    question: "非遺保護最重視的是甚麼？",
    options: ["活態傳承與文化價值", "只保存一個包裝盒", "只追求銷售數字"],
    answer: 0,
    explain: "非遺重視活態文化：人如何學習、傳承、改良並繼續使用這套知識。"
  }
];

const cultureNotes = [
  "身體層面：嶺南高溫多雨，濕熱容易帶來喉痛、口瘡、疲倦、腸胃不適與皮膚問題。",
  "文化層面：春夏與潮濕季節一家人飲涼茶，涼茶舖也是街坊聊天與交換消息的地方。",
  "中醫智慧：涼茶講究辨證，體質寒涼者不宜飲太苦的廿四味，燥熱體質才適合清熱類配方。",
  "社會歷史：從抵禦瘴氣到照顧近代底層勞工，涼茶見證移民、貿易與香港市井文化。"
];

const teas = [
  {
    id: "five-flower",
    name: "五花茶",
    sprite: 0,
    level: "入門",
    concept: "因地制宜",
    summary: "溫和祛濕，適合認識民間如何按季節與環境調配草木。",
    scenario: "梅雨天，街坊小朋友覺得身重、無胃口，但又怕太苦。",
    learningGoals: ["分辨五花茶的花材", "理解濕熱氣候如何影響飲食文化", "知道民間傳說如何保存地方經驗"],
    story: "相傳五嶺山下村落夏天山洪氾濫，濕熱病流行。一位老婆婆採路邊五種花卉熬水，村民飲後症狀減輕，後人便固定成五花茶。它藥性溫和，是最適合做入門教學的涼茶。",
    dilemma: {
      question: "這位街坊最需要哪種思路？",
      options: ["用溫和花材祛濕，避免太苦", "一開始就飲最苦廿四味", "只加糖，不管藥材"],
      answer: 0,
      explain: "五花茶溫和，適合把祛濕概念和日常照顧連起來。"
    },
    historyQuestion: {
      question: "五花茶的故事最能說明涼茶哪一項特色？",
      options: ["按地方氣候與民間經驗調配", "只用普通茶葉沖泡", "完全沒有藥草成分"],
      answer: 0,
      explain: "五花茶由濕熱環境與民間採花經驗形成，正好說明涼茶是因地制宜的藥草飲。"
    },
    taste: "花香微甘",
    water: 1800,
    time: 25,
    ingredients: ["honeysuckle", "chrysanthemum", "kapok", "pueraria", "sophora"]
  },
  {
    id: "twenty-four",
    name: "廿四味",
    sprite: 1,
    level: "進階",
    concept: "複方抗疫",
    summary: "苦味最深的複方涼茶，適合理解勞工生活與民間抗疫記憶。",
    scenario: "碼頭工人長期暴曬搬貨，容易上火、生瘡，又沒有時間煲藥。",
    learningGoals: ["理解「廿四」是概數", "連結涼茶與底層勞工生活", "思考苦味、療效與文化記憶的關係"],
    story: "相傳嶺南鄉下爆發嚴重時疫，多位鄉村大夫各自拿出祖傳藥方，把治療發熱、瘡毒、風寒、濕氣的草藥融合。早年香港碼頭工人勞損嚴重，身上容易生瘡，最常飲用廿四味。民間有句話：「廿四味，食得苦，先得福」。",
    dilemma: {
      question: "這碗茶最應強調哪種歷史意義？",
      options: ["底層勞工用廉價藥飲抵受惡劣環境", "它是甜品", "它只服務富貴人家"],
      answer: 0,
      explain: "廿四味和碼頭勞工、瘡毒、濕熱、廉價醫藥的社會背景密切相關。"
    },
    historyQuestion: {
      question: "「廿四味」中的「廿四」應如何理解？",
      options: ["嚴格只有二十四味茶葉", "多種藥材的概數", "二十四小時都要飲"],
      answer: 1,
      explain: "「廿四」多作概數，強調藥材眾多、藥性全面。"
    },
    taste: "極苦回甘",
    water: 2200,
    time: 45,
    ingredients: ["herbBundle", "selfheal", "jigucao", "rocksugar"]
  },
  {
    id: "three-winter",
    name: "三冬茶",
    sprite: 2,
    level: "探索",
    concept: "傳統與科學",
    summary: "香港近代故事：本土植物研究與傳統涼茶相遇。",
    scenario: "有學生喉嚨發炎，想知道傳統涼茶是否也能和現代研究對話。",
    learningGoals: ["認識胡秀英教授與本土植物研究", "理解傳統知識可以被重新整理", "分辨故事、經驗與科學研究的關係"],
    story: "植物學家胡秀英教授幼年身患重病，鄉間醫生用救必應把她救活。長大後她在香港研究本土植物，挑選崗梅、救必應、苦丁茶三種冬青植物，研製三冬茶，用於咽喉發炎與風熱感冒，是現代科學結合傳統涼茶的代表故事。",
    dilemma: {
      question: "三冬茶最適合用來討論甚麼？",
      options: ["傳統經驗如何與現代植物研究互相補充", "所有傳說都等於科學證明", "香港沒有本土植物"],
      answer: 0,
      explain: "三冬茶的亮點不是神化藥效，而是把傳統經驗放進研究與整理的脈絡。"
    },
    historyQuestion: {
      question: "三冬茶最能代表哪一種發展？",
      options: ["傳統經驗與現代植物研究結合", "涼茶完全離開香港", "涼茶只在古代存在"],
      answer: 0,
      explain: "三冬茶把本土植物研究與涼茶經驗結合，展示傳統可以被現代知識重新整理。"
    },
    taste: "甘苦清喉",
    water: 1700,
    time: 30,
    ingredients: ["selfheal", "jigucao", "monkfruit"]
  },
  {
    id: "jigucao-tea",
    name: "雞骨草茶",
    sprite: 3,
    level: "應用",
    concept: "濕熱與飲食",
    summary: "疏肝祛濕，適合呈現嶺南濕熱與飲食習慣。",
    scenario: "一位街坊連吃火鍋和炸物後覺得口乾、疲倦、腸胃不適。",
    learningGoals: ["連結氣候、飲食與身體感受", "認識雞骨草的文化定位", "理解涼茶要看體質，不宜亂飲"],
    story: "香港與廣東常年高溫多雨，濕氣重，加上火鍋、油炸食物容易令人上火。雞骨草茶反映涼茶不只是治病，也是一種面對濕熱、疲倦和腸胃不適的日常調理。",
    dilemma: {
      question: "作為涼茶師傅，你應提醒甚麼？",
      options: ["涼茶要按體質與症狀選，不是越苦越好", "每個人都要每日飲廿四味", "只要廣告有名就適合"],
      answer: 0,
      explain: "教育理念重點是辨證與自我照顧，而不是鼓勵玩家盲目飲用。"
    },
    historyQuestion: {
      question: "雞骨草茶在遊戲中主要對應哪個生活背景？",
      options: ["嶺南濕熱與飲食燥熱", "北方嚴寒雪地", "海上遠洋捕鯨"],
      answer: 0,
      explain: "雞骨草茶與嶺南濕熱、油膩飲食後的調理關係最密切。"
    },
    taste: "草本甘苦",
    water: 1800,
    time: 35,
    ingredients: ["jigucao", "selfheal", "rocksugar"]
  },
  {
    id: "sugarcane-root",
    name: "竹蔗茅根",
    sprite: 4,
    level: "家庭",
    concept: "日常化",
    summary: "清甜易飲，常見於家庭與街坊涼茶舖。",
    scenario: "家中長輩想煲一款小朋友也願意喝的清潤飲品。",
    learningGoals: ["知道涼茶也有溫和清甜的一面", "理解藥飲如何進入家庭日常", "比較街舖與家庭煲製的文化角色"],
    story: "竹蔗茅根水讓小朋友也較容易接受，提醒我們涼茶不一定全都極苦。從家庭煲製到涼茶舖售賣，這類清潤配方把中醫智慧帶入日常生活。",
    dilemma: {
      question: "竹蔗茅根最能打破哪個迷思？",
      options: ["涼茶一定全部都苦到不能入口", "涼茶只能在皇宮飲", "涼茶和家庭無關"],
      answer: 0,
      explain: "清甜配方能讓玩家看到涼茶由藥用走向日常的過程。"
    },
    historyQuestion: {
      question: "竹蔗茅根水為甚麼適合放在涼茶遊戲中？",
      options: ["它呈現涼茶也有溫和日常的一面", "它是咖啡的一種", "它只用西式香料製成"],
      answer: 0,
      explain: "竹蔗茅根清甜易飲，能展示涼茶從藥用到日常飲品的變化。"
    },
    taste: "清甜潤喉",
    water: 2000,
    time: 30,
    ingredients: ["sugarcane", "imperatae", "rocksugar"]
  },
  {
    id: "old-hk",
    name: "舊香港街坊涼茶",
    sprite: 5,
    level: "人情",
    concept: "市井互助",
    summary: "把銅壺、勞工、免費淡茶與市井人情放進一碗茶。",
    scenario: "夜晚收檔前，有流浪漢和病童來到涼茶舖門口。",
    learningGoals: ["理解涼茶舖的社會功能", "認識「寡佬茶」與勞工生活", "思考文化遺產中的人情與公共性"],
    story: "四五十年代香港貧窮，很多人看不起病。涼茶師傅有時會讓生病的孩子免費喝一碗淡涼茶，收攤時路邊流浪漢也能喝到殘餘藥湯。涼茶不止是飲品，也曾是底層窮人的廉價醫藥與街坊溫情。",
    dilemma: {
      question: "這個故事最適合讓玩家學到甚麼？",
      options: ["涼茶舖承載街坊社交和底層互助", "涼茶舖只是一部自動售賣機", "文化只等於商品包裝"],
      answer: 0,
      explain: "涼茶文化的價值不只在配方，也在街坊關係、勞工生活與城市記憶。"
    },
    historyQuestion: {
      question: "舊香港涼茶舖除了賣飲品，還承載了甚麼？",
      options: ["街坊社交與底層互助", "只供皇宮使用", "只賣外國汽水"],
      answer: 0,
      explain: "涼茶舖是街坊交流、勞工歇腳和窮人獲得廉價調理的地方。"
    },
    taste: "苦中帶暖",
    water: 1600,
    time: 28,
    ingredients: ["pot", "herbBundle", "rocksugar", "water"]
  }
];

const innovationOptions = {
  product: [
    { id: "smart-pot", name: "智能涼茶煲", text: "以感測器和自動火力控制，幫助學生安全地重現傳統煲製過程。" },
    { id: "virtual-gallery", name: "非遺涼茶互動展館", text: "以虛擬展覽展示歷史、藥材、實驗數據和街坊故事。" },
    { id: "school-kiosk", name: "校園涼茶學習站", text: "把藥材標本、數據圖表和互動問答放在校園公共空間。" }
  ],
  sensor: [
    { id: "temp-ph", name: "溫度＋pH 感測", text: "記錄煲製過程的溫度與酸鹼變化，建立可比較數據。" },
    { id: "color-ai", name: "顏色辨識 AI", text: "用影像分析茶色深淺，推測煲製濃度和火候。" },
    { id: "humidity", name: "濕度感測", text: "把天氣濕度連結到街坊選茶情境，呈現因地制宜。" }
  ],
  audience: [
    { id: "junior", name: "初中學生", text: "用遊戲任務和視覺化數據提升自主閱讀興趣。" },
    { id: "community", name: "社區長者與街坊", text: "收集口述歷史，讓非遺保育回到社區。" },
    { id: "tourists", name: "本地文化參觀者", text: "以互動展館介紹香港市井文化與中華傳統智慧。" }
  ],
  value: [
    { id: "care", name: "仁愛與同理心", text: "理解涼茶舖曾照顧基層街坊的社會角色。" },
    { id: "responsibility", name: "責任感", text: "用安全、準確和有根據的方式傳承文化。" },
    { id: "identity", name: "國民身份認同", text: "認識涼茶作為中華傳統文化與華南生活智慧的一部分。" }
  ]
};

const traditionalPlan = {
  product: "傳統涼茶舖以銅壺、師傅經驗和口耳相傳服務街坊，優點是有人情味，限制是難以讓學生比較數據。",
  sensor: "傳統做法多靠看茶色、聞氣味和記火候，優點是保留手藝，限制是數據不易保存和分享。",
  audience: "傳統服務對象多是附近街坊和勞工，優點是貼地，限制是較難跨校園或跨社區推廣。",
  value: "傳統價值重視仁愛、互助和養生智慧，創新方案要避免只剩科技包裝。"
};

const audienceComments = {
  junior: "以初中學生身份看：方案需要任務清晰、數據視覺化和可重玩，這樣才能把歷史閱讀變成主動探究。",
  community: "以社區長者與街坊身份看：方案要尊重老店記憶和口述歷史，科技應幫助保存人情，而不是取代人情。",
  tourists: "以本地文化參觀者身份看：方案要把涼茶與香港街道、移民、勞工和非遺故事連起來，不能只介紹藥材名稱。"
};

const LEGACY_RECORD_KEY = "teaSteamGameRecord";
const RECORD_KEY = "teaSteamGameRecordProfiles";
const DEFAULT_PLAYER = "玩家一";
const difficultyModes = {
  novice: {
    name: "新手",
    label: "導學模式",
    text: "提示更溫和，適合第一次認識涼茶歷史的同學。",
    hintPenalty: 1,
    wrongPenalty: 6,
    needleStep: 3,
    needleInterval: 42,
    cookHighStep: 4,
    cookLowStep: 2,
    supportBonus: 6,
    scoreMultiplier: 1.04
  },
  normal: {
    name: "普通",
    label: "課堂模式",
    text: "歷史閱讀、科學數據和創新設計取得平衡。",
    hintPenalty: 3,
    wrongPenalty: 10,
    needleStep: 4,
    needleInterval: 34,
    cookHighStep: 5,
    cookLowStep: 3,
    supportBonus: 0,
    scoreMultiplier: 1
  },
  expert: {
    name: "高手",
    label: "挑戰模式",
    text: "反應更快、扣分更重，適合熟悉任務後挑戰高分。",
    hintPenalty: 5,
    wrongPenalty: 14,
    needleStep: 5,
    needleInterval: 26,
    cookHighStep: 6,
    cookLowStep: 4,
    supportBonus: -4,
    scoreMultiplier: 0.96
  }
};

const $ = (selector) => document.querySelector(selector);
const teaGrid = $("#tea-grid");
const difficultySelector = $("#difficulty-selector");
const guide = $("#ingredient-guide");
const timelinePanel = $("#timeline-panel");
const culturePanel = $("#culture-panel");
const personalRecordPanel = $("#personal-record");
const stageLabel = $("#stage-label");
const stageTitle = $("#stage-title");
const coachLine = $("#coach-line");

let activeTea = null;
let gathered = new Set();
let gatherScore = 100;
let wrongPicks = 0;
let prepIndex = 0;
let prepScore = 0;
let needle = 0;
let needleDirection = 1;
let needleTimer = null;
let water = 0;
let heat = "off";
let cookTime = 0;
let cookTimer = null;
let historyAnswered = false;
let historyCorrect = false;
let dilemmaAnswered = false;
let dilemmaCorrect = false;
let hintsUsed = 0;
let insightLog = [];
let lab = { water: 1800, time: 25, heat: 55, ratio: 100 };
let labMetrics = null;
let innovation = { product: "smart-pot", sensor: "temp-ph", audience: "junior", value: "responsibility" };
let currentDifficulty = "normal";

function difficulty() {
  return difficultyModes[currentDifficulty] || difficultyModes.normal;
}

function spriteStyle(type, index) {
  const columns = type === "tea" ? 3 : 4;
  const rows = type === "tea" ? 3 : 4;
  const col = index % columns;
  const row = Math.floor(index / columns);
  return [
    `--sprite: url("../assets/${type === "tea" ? "tea-sprite.webp" : "ingredient-sprite.webp"}")`,
    `--sprite-size: ${columns * 100}% ${rows * 100}%`,
    `--sprite-pos: ${(col / (columns - 1)) * 100}% ${(row / (rows - 1)) * 100}%`
  ].join(";");
}

function ingredientById(id) {
  return ingredients.find((item) => item.id === id);
}

function optionById(group, id) {
  return innovationOptions[group].find((item) => item.id === id);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function addInsight(text) {
  if (!insightLog.includes(text)) insightLog.push(text);
}

function blankRecord() {
  return { completed: {}, bestScores: {}, lastPlayed: null };
}

function sanitizePlayerName(name) {
  return (name || "").trim().slice(0, 18) || DEFAULT_PLAYER;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadRecordStore() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECORD_KEY) || "{}");
    if (parsed.profiles) {
      return {
        activePlayer: sanitizePlayerName(parsed.activePlayer),
        profiles: parsed.profiles
      };
    }

    const legacy = JSON.parse(localStorage.getItem(LEGACY_RECORD_KEY) || "{}");
    const migrated = {
      activePlayer: DEFAULT_PLAYER,
      profiles: {
        [DEFAULT_PLAYER]: {
          completed: legacy.completed || {},
          bestScores: legacy.bestScores || {},
          lastPlayed: legacy.lastPlayed || null
        }
      }
    };
    localStorage.setItem(RECORD_KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    return { activePlayer: DEFAULT_PLAYER, profiles: { [DEFAULT_PLAYER]: blankRecord() } };
  }
}

function saveRecordStore(store) {
  localStorage.setItem(RECORD_KEY, JSON.stringify(store));
}

function currentPlayerName() {
  return sanitizePlayerName(loadRecordStore().activePlayer);
}

function loadRecord() {
  const store = loadRecordStore();
  const player = sanitizePlayerName(store.activePlayer);
  return store.profiles[player] || blankRecord();
}

function saveRecord(record) {
  const store = loadRecordStore();
  const player = sanitizePlayerName(store.activePlayer);
  store.activePlayer = player;
  store.profiles[player] = record;
  saveRecordStore(store);
}

function switchPlayer(name) {
  const player = sanitizePlayerName(name);
  const store = loadRecordStore();
  store.activePlayer = player;
  store.profiles[player] = store.profiles[player] || blankRecord();
  saveRecordStore(store);
  renderTeaGrid();
  resetGame();
  coachLine.textContent = `已用「${player}」身份進入遊戲。現在的完成紀錄會獨立保存。`;
}

function clearCurrentPlayerRecord() {
  const store = loadRecordStore();
  const player = sanitizePlayerName(store.activePlayer);
  store.profiles[player] = blankRecord();
  saveRecordStore(store);
  renderTeaGrid();
  resetGame();
  coachLine.textContent = `已清除「${player}」的個人記錄，可以重新挑戰所有涼茶任務。`;
}

function completedTeaIds(record = loadRecord()) {
  return teas.filter((tea) => record.completed[tea.id]).map((tea) => tea.id);
}

function hasMasterBadge(record = loadRecord()) {
  return completedTeaIds(record).length === teas.length;
}

function updateRecord(total) {
  const record = loadRecord();
  record.completed[activeTea.id] = true;
  record.bestScores[activeTea.id] = Math.max(record.bestScores[activeTea.id] || 0, total);
  record.lastPlayed = {
    teaId: activeTea.id,
    teaName: activeTea.name,
    score: total,
    at: new Date().toISOString()
  };
  saveRecord(record);
  renderTeaGrid();
  renderPersonalRecord(record);
  return record;
}

function renderPersonalRecord(record = loadRecord()) {
  if (!personalRecordPanel) return;
  const completed = completedTeaIds(record);
  const master = completed.length === teas.length;
  const player = currentPlayerName();
  personalRecordPanel.innerHTML = `
    <section class="record-card">
      <div>
        <span class="era-chip">個人記錄</span>
        <h3>${master ? "涼茶宗師徽章已解鎖" : "涼茶任務收集中"}</h3>
        <p>目前身份：<b>${escapeHtml(player)}</b>。已完成 ${completed.length}/${teas.length} 款涼茶任務。完成全部任務可得到「涼茶宗師」徽章。</p>
        <div class="player-tools">
          <label>
            <span>新身份 / 組別</span>
            <input id="player-name-input" type="text" maxlength="18" value="${escapeHtml(player)}" placeholder="輸入姓名或組別" />
          </label>
          <div class="button-row">
            <button class="solid-button" type="button" id="switch-player">用此身份進入</button>
            <button class="ghost-button" type="button" id="clear-player-record">清除此身份紀錄</button>
          </div>
        </div>
      </div>
      <div class="record-grid">
        ${teas.map((tea) => `
          <span class="${record.completed[tea.id] ? "done" : ""}">
            ${record.completed[tea.id] ? "已完成" : "未完成"} · ${tea.name}${record.bestScores[tea.id] ? ` · 最高 ${record.bestScores[tea.id]}` : ""}
          </span>
        `).join("")}
      </div>
    </section>
  `;
}

function setStage(name, title, label) {
  document.querySelectorAll(".stage").forEach((stage) => stage.classList.remove("active-stage"));
  $(`#${name}-screen`).classList.add("active-stage");
  stageTitle.textContent = title;
  stageLabel.textContent = label;
}

function renderDifficultySelector() {
  if (!difficultySelector) return;
  difficultySelector.innerHTML = Object.entries(difficultyModes).map(([id, mode]) => `
    <button
      class="difficulty-button ${currentDifficulty === id ? "is-active" : ""}"
      type="button"
      data-difficulty="${id}"
      title="${mode.label}：${mode.text}"
      aria-pressed="${currentDifficulty === id}"
    >
      <strong>${mode.name}</strong>
      <span>${mode.label}</span>
    </button>
  `).join("");
}

function renderTeaGrid() {
  const record = loadRecord();
  teaGrid.innerHTML = teas.map((tea) => `
    <button class="tea-card" type="button" data-tea="${tea.id}">
      <span class="tea-image sprite" style='${spriteStyle("tea", tea.sprite)}' role="img" aria-label="${tea.name}"></span>
      <span class="tea-card-content">
        <span class="era-chip">${tea.level} · ${tea.concept}</span>
        ${record.completed[tea.id] ? `<span class="complete-chip">已完成${record.bestScores[tea.id] ? ` · ${record.bestScores[tea.id]}分` : ""}</span>` : ""}
        <h3>${tea.name}</h3>
        <p>${tea.summary}</p>
      </span>
    </button>
  `).join("");
  renderPersonalRecord(record);
}

function renderGuide() {
  guide.innerHTML = ingredients.map((item) => `
    <article class="ingredient-card guide-card">
      <span class="ingredient-image sprite" style='${spriteStyle("ingredient", item.sprite)}' role="img" aria-label="${item.name}"></span>
      <span class="tag-pill">${item.tag}</span>
      <strong>${item.name}</strong>
      <p>${item.clue}</p>
      <small>${item.lore}</small>
    </article>
  `).join("");
}

function renderTimeline() {
  timelinePanel.innerHTML = timeline.map((item, index) => `
    <article class="timeline-card">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div>
        <strong>${item.era}</strong>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <small>${item.ask}</small>
        ${renderSourceCard(index)}
      </div>
    </article>
  `).join("");
  culturePanel.innerHTML = cultureNotes.map((note) => `<li>${note}</li>`).join("");
}

function renderSourceCard(index) {
  const card = sourceCards[index];
  return `
    <section class="source-card" aria-label="史料閱讀卡">
      <b>史料閱讀卡</b>
      <p>${card.source}</p>
      <h4>${card.question}</h4>
      <div class="source-options">
        ${card.options.map((option, optionIndex) => `
          <button class="mini-button source-answer" type="button" data-source-index="${index}" data-source-answer="${optionIndex}">
            ${option}
          </button>
        `).join("")}
      </div>
      <p class="source-feedback" id="source-feedback-${index}">閱讀史料後，選出最合理的歷史判斷。</p>
    </section>
  `;
}

function verifySourceCard(cardIndex, answerIndex) {
  const card = sourceCards[cardIndex];
  const feedback = $(`#source-feedback-${cardIndex}`);
  const correct = answerIndex === card.answer;
  document.querySelectorAll(`[data-source-index="${cardIndex}"]`).forEach((button) => {
    const isAnswer = Number(button.dataset.sourceAnswer) === card.answer;
    const isSelected = Number(button.dataset.sourceAnswer) === answerIndex;
    button.disabled = true;
    button.classList.toggle("is-correct", isAnswer);
    button.classList.toggle("is-wrong", isSelected && !correct);
  });
  if (feedback) feedback.textContent = `${correct ? "判斷正確。" : "再想想史料重點。"}${card.explain}`;
}

function selectTea(teaId) {
  activeTea = teas.find((tea) => tea.id === teaId);
  gathered = new Set();
  gatherScore = 100;
  wrongPicks = 0;
  prepIndex = 0;
  prepScore = 0;
  water = 0;
  heat = "off";
  cookTime = 0;
  historyAnswered = false;
  historyCorrect = false;
  dilemmaAnswered = false;
  dilemmaCorrect = false;
  hintsUsed = 0;
  insightLog = [];
  lab = { water: activeTea.water, time: activeTea.time, heat: 55, ratio: 100 };
  labMetrics = calculateLabMetrics();
  innovation = { product: "smart-pot", sensor: "temp-ph", audience: "junior", value: "responsibility" };
  stopNeedle();
  stopCooking();
  coachLine.textContent = `今日你是涼茶舖小師傅。任務是煲好「${activeTea.name}」，再把歷史變成 STEAM 創新方案。`;
  renderHistory();
  location.hash = "game-panel";
}

function renderHistory() {
  const question = activeTea.historyQuestion;
  const dilemma = activeTea.dilemma;
  $("#history-screen").innerHTML = `
    <div class="history-layout">
      <div class="history-visual-wrap">
        <div class="history-visual sprite" style='${spriteStyle("tea", activeTea.sprite)}' role="img" aria-label="${activeTea.name}"></div>
        <div class="mission-card">
          <span class="era-chip">街坊個案</span>
          <p>${activeTea.scenario}</p>
        </div>
      </div>
      <div class="history-copy">
        <span class="era-chip">${activeTea.level}任務 · ${activeTea.concept}</span>
        <h3>${activeTea.name}</h3>
        <p>${activeTea.story}</p>
        <div class="learning-goals">
          ${activeTea.learningGoals.map((goal) => `<span>${goal}</span>`).join("")}
        </div>
        <div class="fact-strip" aria-label="煲製資料">
          <div><span>建議水量</span><strong>${activeTea.water} ml</strong></div>
          <div><span>煲製時間</span><strong>${activeTea.time} 分鐘</strong></div>
          <div><span>味道記憶</span><strong>${activeTea.taste}</strong></div>
        </div>
        <section class="history-quiz" aria-live="polite">
          <h4>${dilemma.question}</h4>
          <div class="choice-row">
            ${dilemma.options.map((option, index) => `<button class="choice-button" type="button" data-dilemma-answer="${index}">${option}</button>`).join("")}
          </div>
          <p id="dilemma-feedback">先處理街坊個案。這一題考你能否把歷史知識用到情境中。</p>
        </section>
        <section class="history-quiz" aria-live="polite">
          <h4>${question.question}</h4>
          <div class="choice-row">
            ${question.options.map((option, index) => `<button class="choice-button" type="button" data-history-answer="${index}">${option}</button>`).join("")}
          </div>
          <p id="history-feedback">再答一題歷史題，完成「理解先於操作」的學習步驟。</p>
        </section>
        <button class="solid-button" type="button" id="start-gather">開始採藥</button>
      </div>
    </div>
  `;
  $("#start-gather").addEventListener("click", renderGather);
  document.querySelectorAll("[data-history-answer]").forEach((button) => {
    button.addEventListener("click", () => verifyHistory(Number(button.dataset.historyAnswer)));
  });
  document.querySelectorAll("[data-dilemma-answer]").forEach((button) => {
    button.addEventListener("click", () => verifyDilemma(Number(button.dataset.dilemmaAnswer)));
  });
  setStage("history", activeTea.name, "第一關：理解情境");
}

function markChoiceButtons(selector, answerIndex, selectedIndex, correct) {
  document.querySelectorAll(selector).forEach((button, index) => {
    button.disabled = true;
    button.classList.toggle("is-correct", index === answerIndex);
    button.classList.toggle("is-wrong", index === selectedIndex && !correct);
  });
}

function verifyDilemma(answerIndex) {
  if (dilemmaAnswered) return;
  dilemmaAnswered = true;
  dilemmaCorrect = answerIndex === activeTea.dilemma.answer;
  $("#dilemma-feedback").textContent = dilemmaCorrect
    ? `判斷正確。${activeTea.dilemma.explain}`
    : `這次判斷未夠貼地。${activeTea.dilemma.explain}`;
  markChoiceButtons("[data-dilemma-answer]", activeTea.dilemma.answer, answerIndex, dilemmaCorrect);
  addInsight(activeTea.dilemma.explain);
  coachLine.textContent = dilemmaCorrect ? "很好，你開始像師傅：先看人和環境，再看配方。" : "沒關係，錯題是最好的路牌。現在把這個觀念帶去採藥。";
}

function verifyHistory(answerIndex) {
  if (historyAnswered) return;
  historyAnswered = true;
  historyCorrect = answerIndex === activeTea.historyQuestion.answer;
  $("#history-feedback").textContent = historyCorrect
    ? `答對了。${activeTea.historyQuestion.explain}`
    : `未中，但記住：${activeTea.historyQuestion.explain}`;
  markChoiceButtons("[data-history-answer]", activeTea.historyQuestion.answer, answerIndex, historyCorrect);
  addInsight(activeTea.historyQuestion.explain);
  coachLine.textContent = historyCorrect ? "文化分到手。懂得來龍去脈，煲出來才不只是糖水。" : "答錯也算學到。下一步用手藝補分。";
}

function renderGather() {
  const targetIds = activeTea.ingredients;
  const nextId = targetIds.find((id) => !gathered.has(id));
  const current = nextId ? ingredientById(nextId) : null;
  const choices = current
    ? shuffle([current, ...shuffle(ingredients.filter((item) => item.id !== current.id)).slice(0, 3)])
    : [];
  $("#gather-screen").innerHTML = `
    <div class="mobile-game-card gather-game">
      <div class="mobile-progress">
        <div><span>採藥分</span><strong>${gatherScore}</strong></div>
        <div><span>已收集</span><strong>${gathered.size}/${targetIds.length}</strong></div>
        <div><span>提示</span><strong>${hintsUsed}</strong></div>
        <div><span>模式</span><strong>${difficulty().name}</strong></div>
      </div>
      <div class="step-dots" aria-label="採藥進度">
        ${targetIds.map((id, index) => `<span class="${gathered.has(id) ? "done" : index === gathered.size ? "current" : ""}"></span>`).join("")}
      </div>
      ${
        current
          ? `
            <section class="quiz-prompt" aria-live="polite">
              <p class="kicker">第 ${gathered.size + 1} 味藥材 · ${current.tag}</p>
              <h3>${current.clue}</h3>
              <p>${current.lore}</p>
              <button class="ghost-button hint-button" type="button" id="hint-button">給我一個學習提示</button>
              <p id="hint-text" class="hint-text" hidden>提示：這味藥材叫「${current.name}」。記名字，也要記它和環境、身體感受的關係。</p>
            </section>
            <div class="quiz-choice-grid">
              ${choices.map((item) => `
                <button class="ingredient-card quiz-choice" type="button" data-answer="${item.id}">
                  <span class="ingredient-image sprite" style='${spriteStyle("ingredient", item.sprite)}' role="img" aria-label="${item.name}"></span>
                  <span class="tag-pill">${item.tag}</span>
                  <strong>${item.name}</strong>
                </button>
              `).join("")}
            </div>
          `
          : `
            <section class="quiz-prompt complete">
              <p class="kicker">採藥完成</p>
              <h3>藥材齊備，準備炮製。</h3>
              <p>你已經把故事中的草木轉成配方，下一步考驗手藝與火候。</p>
            </section>
          `
      }
    </div>
    <div class="feedback-box bottom-action-box">
      <p>${current ? `已收集：${targetIds.filter((id) => gathered.has(id)).map((id) => ingredientById(id).name).join("、") || "尚未採到藥材"}` : `採藥分：${gatherScore}`}</p>
      <button class="solid-button" id="go-prep" type="button" ${gathered.size === targetIds.length ? "" : "disabled"}>進入炮製</button>
    </div>
  `;
  $("#go-prep").addEventListener("click", renderPrep);
  $("#hint-button")?.addEventListener("click", () => {
    $("#hint-text").hidden = false;
    hintsUsed += 1;
    gatherScore = Math.max(0, gatherScore - difficulty().hintPenalty);
    coachLine.textContent = "提示會扣一點分，但能幫你真正學懂。教育不是靠猜，是靠逐步建立線索。";
    document.querySelector(".mobile-progress div:first-child strong").textContent = gatherScore;
    document.querySelector(".mobile-progress div:nth-child(3) strong").textContent = hintsUsed;
  });
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => verifyIngredient(button.dataset.answer));
  });
  setStage("gather", "採藥問答", "第二關：辨認藥材");
}

function verifyIngredient(answerId) {
  const expectedId = activeTea.ingredients.find((id) => !gathered.has(id));
  if (!expectedId) return;
  if (answerId === expectedId) {
    gathered.add(answerId);
    const item = ingredientById(answerId);
    addInsight(`${item.name}：${item.lore}`);
    coachLine.textContent = `答中：${item.name}。你不只認得名字，也把它放回嶺南生活脈絡。`;
    renderGather();
  } else {
    wrongPicks += 1;
    gatherScore = Math.max(0, gatherScore - difficulty().wrongPenalty);
    coachLine.textContent = `${ingredientById(answerId).name} 不是這一味。扣 10 分，但錯誤會提醒你重新看線索。`;
    renderGather();
  }
}

function renderPrep() {
  prepIndex = 0;
  prepScore = 0;
  renderPrepStep();
  setStage("prep", "炮製藥材", "第三關：手藝火候前奏");
}

function renderPrepStep() {
  const item = ingredientById(activeTea.ingredients[prepIndex]);
  $("#prep-screen").innerHTML = `
    <div class="prep-board">
      <div class="prep-target">
        <span class="ingredient-image sprite" style='${spriteStyle("ingredient", item.sprite)}' role="img" aria-label="${item.name}"></span>
        <span class="tag-pill">${item.tag}</span>
        <h3>${item.name}</h3>
        <p>${item.prep}</p>
        <small>${item.lore}</small>
      </div>
      <div class="control-group">
        <h3>在綠色區按下炮製</h3>
        <p>涼茶不是隨便把草丟進水裡。分揀、清洗、切段都會影響味道，也代表傳統手藝的細心。</p>
        <div class="timing-track" aria-label="炮製時機">
          <span id="timing-needle" class="timing-needle"></span>
        </div>
        <div class="scorebar">
          <div><span>炮製分</span><strong>${prepScore}</strong></div>
          <div><span>進度</span><strong>${prepIndex + 1}/${activeTea.ingredients.length}</strong></div>
          <div><span>目標</span><strong>穩準</strong></div>
        </div>
        <button class="solid-button" id="prep-hit" type="button">${item.prep}</button>
      </div>
    </div>
  `;
  $("#prep-hit").addEventListener("click", hitPrep);
  startNeedle();
}

function startNeedle() {
  stopNeedle();
  needle = 0;
  needleDirection = 1;
  needleTimer = setInterval(() => {
    needle += needleDirection * difficulty().needleStep;
    if (needle >= 100 || needle <= 0) needleDirection *= -1;
    $("#timing-needle")?.style.setProperty("--needle", needle);
  }, difficulty().needleInterval);
}

function stopNeedle() {
  if (needleTimer) clearInterval(needleTimer);
  needleTimer = null;
}

function hitPrep() {
  const hit = needle >= 37 && needle <= 63;
  prepScore += hit ? 20 : 8;
  coachLine.textContent = hit ? "手勢漂亮。老店師傅會點頭，雖然未必會把祖傳秘方告訴你。" : "差一點點。藥材還能用，只是香氣沒那麼完整。";
  prepIndex += 1;
  if (prepIndex >= activeTea.ingredients.length) {
    stopNeedle();
    renderCook();
  } else {
    renderPrepStep();
  }
}

function renderCook() {
  $("#cook-screen").innerHTML = `
    <div class="cook-layout">
      <div class="pot-visual" style="--steam-opacity: ${heat === "off" ? 0.12 : 0.62}">
        <div class="steam steam-one" aria-hidden="true"></div>
        <div class="steam steam-two" aria-hidden="true"></div>
        <div class="steam steam-three" aria-hidden="true"></div>
        <div class="herb-fall herb-a" aria-hidden="true"></div>
        <div class="herb-fall herb-b" aria-hidden="true"></div>
        <div class="clay-pot" role="img" aria-label="煲涼茶的陶壺">
          <span class="pot-lid"></span>
          <span class="pot-knob"></span>
          <span class="pot-rim"></span>
          <span class="pot-belly"></span>
          <span class="pot-handle left"></span>
          <span class="pot-handle right"></span>
          <span class="pot-foot"></span>
          <span class="fire-glow"></span>
        </div>
      </div>
      <div class="cook-controls">
        <div class="control-group">
          <h3>水量控制</h3>
          <p>目標：${activeTea.water} ml，目前 <strong id="water-value">${water}</strong> ml。</p>
          <div class="meter-line"><span id="water-fill" class="meter-fill"></span></div>
          <div class="button-row">
            <button class="mini-button" type="button" data-water="100">加 100 ml</button>
            <button class="mini-button" type="button" data-water="500">加 500 ml</button>
            <button class="mini-button" type="button" data-water="-100">減 100 ml</button>
          </div>
        </div>
        <div class="control-group">
          <h3>火候選擇</h3>
          <p>慢火能保留草本味，現在是 <strong id="heat-value">${heatLabel()}</strong>。</p>
          <div class="button-row">
            <button class="mini-button" type="button" data-heat="high">猛火</button>
            <button class="mini-button" type="button" data-heat="low">慢火</button>
            <button class="mini-button" type="button" data-heat="off">熄火</button>
          </div>
        </div>
        <div class="control-group">
          <h3>煲製時間</h3>
          <p>目標：${activeTea.time} 分鐘，目前 <strong id="time-value">${cookTime}</strong> 分鐘。</p>
          <div class="meter-line"><span id="time-fill" class="meter-fill"></span></div>
          <div class="button-row">
            <button class="solid-button" type="button" id="start-cook">開始煲</button>
            <button class="ghost-button" type="button" id="finish-cook">完成出爐</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.querySelectorAll("[data-water]").forEach((button) => {
    button.addEventListener("click", () => {
      water = Math.max(0, water + Number(button.dataset.water));
      updateCookUi();
    });
  });
  document.querySelectorAll("[data-heat]").forEach((button) => {
    button.addEventListener("click", () => {
      heat = button.dataset.heat;
      coachLine.textContent =
        heat === "low" ? "慢火最像傳統煲製，讓藥草慢慢出味。" :
        heat === "high" ? "猛火快，但容易把味道煲得粗暴。" :
        "先熄火觀察，別忘記時間仍是分數關鍵。";
      updateCookUi();
    });
  });
  $("#start-cook").addEventListener("click", startCooking);
  $("#finish-cook").addEventListener("click", renderLab);
  updateCookUi();
  setStage("cook", "煲茶火候", "第四關：水量與時間");
}

function heatLabel() {
  if (heat === "high") return "猛火";
  if (heat === "low") return "慢火";
  return "未開火";
}

function startCooking() {
  if (cookTimer) return;
  if (heat === "off") {
    coachLine.textContent = "先開火。清水與藥草都準備好了，只欠火候。";
    return;
  }
  cookTimer = setInterval(() => {
    cookTime += heat === "high" ? difficulty().cookHighStep : difficulty().cookLowStep;
    updateCookUi();
  }, 650);
}

function stopCooking() {
  if (cookTimer) clearInterval(cookTimer);
  cookTimer = null;
}

function updateCookUi() {
  $("#water-value") && ($("#water-value").textContent = water);
  $("#heat-value") && ($("#heat-value").textContent = heatLabel());
  $("#time-value") && ($("#time-value").textContent = cookTime);
  $("#water-fill")?.style.setProperty("--fill", `${Math.min(100, (water / activeTea.water) * 100)}%`);
  $("#time-fill")?.style.setProperty("--fill", `${Math.min(100, (cookTime / activeTea.time) * 100)}%`);
  $(".pot-visual")?.style.setProperty("--steam-opacity", heat === "off" ? 0.08 : heat === "high" ? 0.88 : 0.58);
  $(".pot-visual")?.classList.toggle("is-cooking", heat !== "off");
}

function calculateLabMetrics() {
  const ratio = lab.ratio / 100;
  const concentration = Math.max(0.45, Math.min(1.9, (activeTea.water / lab.water) * ratio));
  const heatFactor = lab.heat / 55;
  const timeFactor = lab.time / activeTea.time;
  const bitterness = Math.round(Math.min(100, 22 + concentration * 30 + timeFactor * 18 + (activeTea.id === "twenty-four" ? 22 : 0)));
  const temperature = Math.round(55 + lab.heat * 0.55 + Math.min(18, lab.time * 0.28));
  const ph = Math.max(5.2, Math.min(7.4, 7.2 - concentration * 0.55 - timeFactor * 0.22 + (lab.water > activeTea.water ? 0.18 : 0)));
  const color = Math.round(Math.min(100, 18 + concentration * 34 + timeFactor * 24 + heatFactor * 12));
  const dampHeat = Math.round(Math.min(100, concentration * 38 + timeFactor * 28 + (lab.heat < 75 ? 18 : 8) + (lab.water >= activeTea.water * 0.85 ? 10 : 0)));
  return { bitterness, temperature, ph: ph.toFixed(1), color, dampHeat, concentration: concentration.toFixed(2) };
}

function renderLab() {
  stopCooking();
  labMetrics = calculateLabMetrics();
  $("#lab-screen").innerHTML = `
    <div class="lab-layout">
      <section class="lab-panel">
        <span class="era-chip">STEAM 科學探究</span>
        <h3>涼茶科學實驗室</h3>
        <p>調整水量、時間、火力和藥材比例，觀察苦味值、茶色、溫度、pH 與「濕熱應對指數」如何變化。這是模擬數據，用來訓練假設、變項控制和資料解讀。</p>
        ${renderSlider("water", "水量", lab.water, 1200, 2600, 100, "ml")}
        ${renderSlider("time", "煲製時間", lab.time, 10, 60, 1, "分鐘")}
        ${renderSlider("heat", "火力", lab.heat, 30, 100, 5, "%")}
        ${renderSlider("ratio", "藥材比例", lab.ratio, 60, 150, 5, "%")}
        <div class="button-row">
          <button class="solid-button" type="button" id="record-lab">記錄實驗結果</button>
          <button class="ghost-button" type="button" id="go-innovation">進入創新方案</button>
        </div>
      </section>
      <section class="lab-dashboard" aria-live="polite">
        ${renderMetric("苦味值", labMetrics.bitterness, "越高越苦，適合討論可接受味道與藥材濃度。")}
        ${renderMetric("茶色深度", labMetrics.color, "由藥材比例、時間和火力共同影響。")}
        ${renderMetric("濕熱應對指數", labMetrics.dampHeat, "綜合濃度、時間與慢火表現的模擬指標。")}
        <div class="metric-card">
          <span>溫度</span>
          <strong>${labMetrics.temperature}°C</strong>
          <p>火力越高，溫度上升越快。</p>
        </div>
        <div class="metric-card">
          <span>pH</span>
          <strong>${labMetrics.ph}</strong>
          <p>以模擬方式呈現酸鹼度隨濃度變化。</p>
        </div>
        <div class="tea-color-sample" style="--tea-depth:${labMetrics.color}%">
          <span>茶色樣本</span>
        </div>
        <section class="principle-card">
          <h3>STEAM 原理說明</h3>
          <ul>
            <li><b>苦味值：</b>藥材比例越高、水量越少、時間越長，濃度上升，苦味值提高。</li>
            <li><b>pH：</b>以模擬方式表示濃度與煲製時間對酸鹼度的影響，數值越低代表越偏酸。</li>
            <li><b>顏色：</b>茶色受藥材濃度、煲製時間和火力影響；時間越長通常越深。</li>
            <li><b>濕熱應對指數：</b>綜合濃度、時間、慢火表現和水量是否足夠，用來討論配方是否能回應嶺南濕熱環境。</li>
          </ul>
        </section>
      </section>
    </div>
  `;
  document.querySelectorAll("[data-lab]").forEach((input) => {
    input.addEventListener("input", () => {
      lab[input.dataset.lab] = Number(input.value);
      renderLab();
    });
  });
  $("#record-lab").addEventListener("click", () => {
    addInsight(`科學實驗：水量 ${lab.water}ml、時間 ${lab.time}分鐘、火力 ${lab.heat}%、藥材 ${lab.ratio}% 時，苦味 ${labMetrics.bitterness}、pH ${labMetrics.ph}、濕熱應對指數 ${labMetrics.dampHeat}。`);
    coachLine.textContent = "已記錄實驗數據。這就是 STEAM 的 S 和 M：用變項和數據說明涼茶煲製。";
  });
  $("#go-innovation").addEventListener("click", renderInnovation);
  setStage("lab", "涼茶科學實驗室", "第五關：STEAM 數據探究");
}

function renderSlider(id, label, value, min, max, step, unit) {
  return `
    <label class="lab-slider">
      <span>${label}<strong>${value}${unit}</strong></span>
      <input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-lab="${id}" />
    </label>
  `;
}

function renderMetric(label, value, note) {
  return `
    <div class="metric-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <div class="metric-bar"><i style="--metric:${value}%"></i></div>
      <p>${note}</p>
    </div>
  `;
}

function renderInnovation() {
  const innovationScore = calculateInnovationScore();
  $("#innovation-screen").innerHTML = `
    <div class="innovation-layout">
      <section class="lab-panel">
        <span class="era-chip">STEAM 創新方案</span>
        <h3>把歷史變成解決方案</h3>
        <p>構思一個能保育涼茶文化、回應生活需要，並讓不同對象參與學習的創新方案。</p>
        ${renderDesignFlow()}
        ${renderOptionGroup("product", "選擇作品形式")}
        ${renderOptionGroup("sensor", "選擇科技/感測工具")}
        ${renderOptionGroup("audience", "選擇服務對象")}
        ${renderOptionGroup("value", "選擇重點價值觀")}
        <div class="button-row">
          <button class="solid-button" type="button" id="finish-innovation">完成並評分</button>
        </div>
      </section>
      <section class="concept-preview">
        <h3>方案預覽</h3>
        <div class="metric-card">
          <span>即時評分</span>
          <strong>${innovationScore}</strong>
          <div class="metric-bar"><i style="--metric:${innovationScore}%"></i></div>
          <p>這一步已可評分：分數來自 STEAM 完整度、數據連結、服務對象和價值觀清晰度。</p>
        </div>
        <div class="concept-card">
          <strong>${optionById("product", innovation.product).name}</strong>
          <p>${optionById("product", innovation.product).text}</p>
        </div>
        <div class="concept-card">
          <strong>${optionById("sensor", innovation.sensor).name}</strong>
          <p>${optionById("sensor", innovation.sensor).text}</p>
        </div>
        <div class="concept-card">
          <strong>${optionById("audience", innovation.audience).name}</strong>
          <p>${optionById("audience", innovation.audience).text}</p>
        </div>
        <div class="concept-card">
          <strong>${optionById("value", innovation.value).name}</strong>
          <p>${optionById("value", innovation.value).text}</p>
        </div>
        <div class="comparison-panel">
          <h3>與傳統方案比較</h3>
          ${renderComparison("product", "作品形式")}
          ${renderComparison("sensor", "判斷方法")}
          ${renderComparison("audience", "服務對象")}
          ${renderComparison("value", "保育價值")}
        </div>
        <div class="audience-comment">
          <h3>以「${optionById("audience", innovation.audience).name}」身份評語</h3>
          <p>${audienceComments[innovation.audience]}</p>
        </div>
      </section>
    </div>
  `;
  document.querySelectorAll("[data-innovate]").forEach((button) => {
    button.addEventListener("click", () => {
      innovation[button.dataset.group] = button.dataset.innovate;
      renderInnovation();
    });
  });
  $("#finish-innovation").addEventListener("click", renderResult);
  setStage("innovation", "創新方案任務", "第六關：工程與設計");
}

function renderDesignFlow() {
  const steps = ["問題定義", "選感測器", "控制流程", "對象", "保育目的", "改良"];
  return `
    <section class="design-flow" aria-label="STEAM 設計流程圖">
      <h4>設計流程圖</h4>
      <div>
        ${steps.map((step, index) => `
          <span>
            <b>${index + 1}</b>
            ${step}
          </span>
        `).join("")}
      </div>
    </section>
  `;
}

function calculateInnovationScore() {
  const sensorScore = innovation.sensor === "temp-ph" ? 18 : innovation.sensor === "color-ai" ? 20 : 16;
  const productScore = innovation.product === "virtual-gallery" ? 19 : innovation.product === "smart-pot" ? 20 : 17;
  const audienceScore = innovation.audience === "community" ? 19 : 17;
  const valueScore = innovation.value === "responsibility" ? 18 : 17;
  const labScore = labMetrics ? Math.min(20, Math.round(labMetrics.dampHeat / 5)) : 8;
  return Math.min(100, productScore + sensorScore + audienceScore + valueScore + labScore);
}

function renderComparison(group, label) {
  return `
    <div class="compare-row">
      <strong>${label}</strong>
      <p><b>傳統：</b>${traditionalPlan[group]}</p>
      <p><b>創新：</b>${optionById(group, innovation[group]).text}</p>
    </div>
  `;
}

function renderOptionGroup(group, title) {
  return `
    <div class="innovation-group">
      <h4>${title}</h4>
      <div class="choice-row">
        ${innovationOptions[group].map((item) => `
          <button class="choice-button ${innovation[group] === item.id ? "is-correct" : ""}" type="button" data-group="${group}" data-innovate="${item.id}">
            ${item.name}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function badgeForScore(total, record = loadRecord()) {
  const badges = [];
  if (historyCorrect && dilemmaCorrect) badges.push("歷史辨證徽章");
  if (wrongPicks === 0) badges.push("採藥神眼徽章");
  if (heat === "low") badges.push("慢火師傅徽章");
  if (labMetrics?.dampHeat >= 75) badges.push("科學實驗徽章");
  if (innovation.product && innovation.sensor) badges.push("STEAM 創新徽章");
  if (hasMasterBadge(record)) badges.push("涼茶宗師徽章");
  if (total >= 86) badges.push("非遺傳人徽章");
  if (currentDifficulty === "expert" && total >= 80) badges.push("高手挑戰徽章");
  if (badges.length === 0) badges.push("再接再厲學徒章");
  return badges;
}

function renderResult() {
  stopCooking();
  const waterPenalty = Math.min(35, Math.round(Math.abs(water - activeTea.water) / 60));
  const timePenalty = Math.min(35, Math.round(Math.abs(cookTime - activeTea.time) * 1.4));
  const heatBonus = heat === "low" || heat === "off" ? 12 : 0;
  const cultureBonus = (historyCorrect ? 8 : historyAnswered ? 3 : 0) + (dilemmaCorrect ? 8 : dilemmaAnswered ? 3 : 0);
  const hintPenalty = hintsUsed * difficulty().hintPenalty;
  const prepRatio = prepScore / (activeTea.ingredients.length * 20);
  const steamBonus = (labMetrics ? 10 : 0) + (innovation.product ? 8 : 0);
  const rawTotal = gatherScore * 0.22 + prepRatio * 22 + 24 + heatBonus + cultureBonus + steamBonus + difficulty().supportBonus - hintPenalty - waterPenalty - timePenalty;
  const total = Math.max(0, Math.min(100, Math.round(rawTotal * difficulty().scoreMultiplier)));
  addInsight(`創新方案：${optionById("product", innovation.product).name}配合${optionById("sensor", innovation.sensor).name}，以${optionById("audience", innovation.audience).name}為對象。`);
  const record = updateRecord(total);
  const rating = total >= 86 ? "非遺 STEAM 傳人" : total >= 68 ? "街坊科學師傅" : total >= 48 ? "學徒出壺" : "再煲一次";
  const note =
    total >= 86 ? "你既掌握配方，也能以數據和創新方案說明涼茶文化。這已經很接近 STEAM 作品雛形。" :
    total >= 68 ? "歷史和 STEAM 元素都已建立，再把實驗數據、訪問或作品模型補強，就會更完整。" :
    "味道還未穩，但你已經知道涼茶不是普通茶葉，而是可以連結歷史、科學與創新設計的文化議題。";
  const badges = badgeForScore(total, record);
  $("#result-screen").innerHTML = `
    <div class="result-layout">
      <div class="rating-panel">
        <div class="stamp-block">茶</div>
        <div class="rating">${total}</div>
        <p>${rating}</p>
        <div class="badge-list">${badges.map((badge) => `<span>${badge}</span>`).join("")}</div>
      </div>
      <div class="result-copy">
        <article>
          <h3>老師評語</h3>
          <p>${note}</p>
        </article>
        <article>
          <h3>遊戲模式</h3>
          <p>${difficulty().name}模式：${difficulty().text}</p>
        </article>
        <article>
          <h3>STEAM 數據摘要</h3>
          <p>${labMetrics ? `水量 ${lab.water}ml，時間 ${lab.time}分鐘，火力 ${lab.heat}%，藥材比例 ${lab.ratio}%；苦味 ${labMetrics.bitterness}，茶色 ${labMetrics.color}，溫度 ${labMetrics.temperature}°C，pH ${labMetrics.ph}，濕熱應對指數 ${labMetrics.dampHeat}。` : "尚未完成科學實驗室。"}</p>
        </article>
        <article>
          <h3>創新方案摘要</h3>
          <p>${optionById("product", innovation.product).name}配合${optionById("sensor", innovation.sensor).name}，服務${optionById("audience", innovation.audience).name}，突出${optionById("value", innovation.value).name}。創新方案即時評分：${calculateInnovationScore()}。</p>
        </article>
        <article>
          <h3>個人記錄</h3>
          <p>你已完成 ${completedTeaIds(record).length}/${teas.length} 款涼茶任務。${hasMasterBadge(record) ? "全部任務已完成，獲得「涼茶宗師徽章」。" : "完成全部涼茶任務後，可獲得「涼茶宗師徽章」。"}</p>
        </article>
        <article>
          <h3>你的學習筆記</h3>
          <ul class="insight-list">${insightLog.slice(0, 6).map((item) => `<li>${item}</li>`).join("") || "<li>再玩一次，收集更多筆記。</li>"}</ul>
        </article>
        <div class="button-row">
          <button class="solid-button" type="button" id="play-again">再玩這款</button>
          <a class="ghost-button" href="#tea-menu">選另一款</a>
        </div>
      </div>
    </div>
  `;
  $("#play-again").addEventListener("click", () => selectTea(activeTea.id));
  coachLine.textContent = total >= 86 ? "好，這碗有資格放在銅壺旁邊，也有資格放進 STEAM 展館。" : "再來一次，讓配方、數據和創新理念一起進步。";
  setStage("result", "出爐評分", "第八關：總結回顧");
}

function resetGame() {
  activeTea = null;
  gathered = new Set();
  gatherScore = 100;
  wrongPicks = 0;
  prepIndex = 0;
  prepScore = 0;
  water = 0;
  heat = "off";
  cookTime = 0;
  historyAnswered = false;
  historyCorrect = false;
  dilemmaAnswered = false;
  dilemmaCorrect = false;
  hintsUsed = 0;
  insightLog = [];
  labMetrics = null;
  stopNeedle();
  stopCooking();
  $("#history-screen").innerHTML = `
    <div class="empty-state">
      <div class="stamp-block">茶</div>
      <p>先選一款涼茶。你會完成「街坊個案、歷史題、採藥問答、炮製手藝、煲茶火候、科學實驗、創新方案」七步 STEAM 任務。</p>
    </div>
  `;
  coachLine.textContent = "歡迎來到涼茶歷史課。好遊戲不是只要贏，而是讓你玩完之後看得懂一間老涼茶舖，也能提出創新方案。";
  setStage("history", "選一款涼茶", "準備上課");
}

teaGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-tea]");
  if (card) selectTea(card.dataset.tea);
});

timelinePanel.addEventListener("click", (event) => {
  const button = event.target.closest("[data-source-answer]");
  if (!button) return;
  verifySourceCard(Number(button.dataset.sourceIndex), Number(button.dataset.sourceAnswer));
});

personalRecordPanel?.addEventListener("click", (event) => {
  if (event.target.closest("#switch-player")) {
    switchPlayer($("#player-name-input")?.value);
  }
  if (event.target.closest("#clear-player-record")) {
    clearCurrentPlayerRecord();
  }
});

personalRecordPanel?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.matches("#player-name-input")) {
    switchPlayer(event.target.value);
  }
});

$("#reset-button").addEventListener("click", resetGame);
difficultySelector?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-difficulty]");
  if (!button) return;
  currentDifficulty = button.dataset.difficulty;
  renderDifficultySelector();
  coachLine.textContent = `已切換至${difficulty().name}模式：${difficulty().text}`;
  if (document.querySelector("#gather-screen.active-stage")) renderGather();
});

renderDifficultySelector();
renderTeaGrid();
renderGuide();
renderTimeline();
resetGame();
