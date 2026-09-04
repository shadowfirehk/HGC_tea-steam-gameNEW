const ingredients = [
  { id: "honeysuckle", name: "金銀花", sprite: 0, clue: "中藥舖多見淡黃至灰綠的乾燥花蕾，細長微皺，帶微小絨毛。", prep: "後下輕煎", tag: "清熱", lore: "金銀花屬花葉類藥材，芳香成分與綠原酸怕久煮；宜後下或中火短煎，不應猛火長時間熬煮。" },
  { id: "chrysanthemum", name: "菊花", sprite: 1, clue: "花香清雅，常配入清熱明目的飲品。", prep: "輕洗花瓣", tag: "清潤", lore: "菊花茶從藥用走向日常，反映唐宋以後藥草湯逐漸進入家庭生活。" },
  { id: "kapok", name: "木棉花", sprite: 2, clue: "南方常見紅花，五花茶中用來祛濕。", prep: "曬乾花瓣", tag: "祛濕", lore: "木棉花盛放於潮濕季節，民間把它放入茶方，回應嶺南多雨濕熱的環境。" },
  { id: "pueraria", name: "布渣葉", sprite: 3, clue: "嶺南常用草木，可助消滯解暑。", prep: "剪碎葉片", tag: "消滯", lore: "相傳葛洪在羅浮山採集本地野草配方，這類在地藥草是涼茶原型的重要線索。" },
  { id: "sophora", name: "槐花", sprite: 4, clue: "五花之一，味道溫和，常與其他花材同煲。", prep: "分揀花蕾", tag: "溫和", lore: "多種花材互補，呈現唐宋以後按季節、症狀與體質調配複方的智慧。" },
  { id: "herbBundle", name: "廿四味藥材包", sprite: 5, clue: "不是剛好二十四種，而是多種苦味藥材的概數。", prep: "分層包紮", tag: "複方", lore: "廿四味代表多種藥材合方抗疫、對付發熱瘡毒與濕氣的民間記憶。" },
  { id: "selfheal", name: "夏枯草", sprite: 6, clue: "藥用部位是乾燥果穗，像棕黑色迷你松果或枯乾麥穗。", prep: "揉開果穗", tag: "清熱", lore: "夏枯草不是葉片，而是層疊苞片組成的乾燥穗狀物；它會令茶湯顏色加深，常見於清熱類涼茶。" },
  { id: "jigucao", name: "雞骨草", sprite: 7, clue: "常用於疏肝祛濕，味道帶草本苦甘。", prep: "紮成小束", tag: "祛濕", lore: "雞骨草茶反映涼茶不只清熱，也處理濕重、疲倦和腸胃不適等南方生活問題。" },
  { id: "hempseed", name: "火麻仁", sprite: 8, clue: "口感較潤，常見於香港涼茶舖。", prep: "搗碎取香", tag: "滋潤", lore: "香港涼茶舖把藥飲變成街坊日常，溫和配方讓更多人願意入口。" },
  { id: "monkfruit", name: "羅漢果", sprite: 9, clue: "天然甘甜，常用來潤喉。", prep: "敲開果殼", tag: "潤喉", lore: "羅漢果令苦味茶方更易入口，也見證傳統涼茶向現代瓶裝飲品轉化。" },
  { id: "mistletoe", name: "桑寄生", sprite: 10, clue: "常見滋補茶材，適合慢火久煲。", prep: "慢洗去塵", tag: "調理", lore: "涼茶舖不只賣苦茶，也提供街坊按體質選擇的日常調理。" },
  { id: "sugarcane", name: "竹蔗", sprite: 11, clue: "清甜多汁，常與茅根同煲。", prep: "劈成小段", tag: "清甜", lore: "竹蔗茅根水是香港家庭記憶之一，味道清甜，連小朋友也容易接受。" },
  { id: "imperatae", name: "茅根", sprite: 12, clue: "白色根莖，常配竹蔗作清潤飲品。", prep: "洗淨泥沙", tag: "清潤", lore: "茅根一類草根藥材提醒玩家：涼茶是嶺南草木熬成的藥飲。" },
  { id: "licorice", name: "甘草", sprite: 13, clue: "常切成圓形薄片，外皮紅棕，切面淡黃並有放射狀紋理。", prep: "薄片略洗", tag: "調和", lore: "甘草根帶天然甜味，可調和苦味；在圖鑑中要看見淡黃色切面與類似年輪的紋理。" },
  { id: "mint", name: "薄荷", sprite: 14, clue: "乾燥葉片仍帶清涼芳香，常用於疏散風熱、宣肺利咽。", prep: "後下短煎", tag: "宣肺", lore: "薄荷含揮發性芳香成分，適合引導學生理解花葉類與芳香類藥材不宜長時間猛火熬煮。" },
  { id: "rocksugar", name: "冰糖", sprite: 13, clue: "晶體透明，用來調和苦味，讓藥飲更容易入口。", prep: "後段加入", tag: "調味", lore: "一點甜味背後也有人情：老茶舖讓清苦生活多一口安慰。" },
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
    options: ["民間記憶如何保存藥草觀念", "二十世紀包裝飲品如何改變涼茶銷售", "個人飲食偏好如何形成地方傳說"],
    answer: 0,
    explain: "傳說未必能直接當作史實，但能反映社群如何理解疾病、環境與草藥。"
  },
  {
    source: "史料卡 B：嶺南暑濕、疫病流行，葛洪在羅浮山行醫，採本地草木配成湯藥，回應地方病患。",
    question: "這段材料顯示涼茶早期原型與哪個因素最有關？",
    options: ["地理氣候與在地藥草", "城市商業品牌的包裝推廣", "地方官府的公共衛生制度"],
    answer: 0,
    explain: "涼茶不是抽象配方，而是嶺南人面對暑濕瘴疫的在地回應。"
  },
  {
    source: "史料卡 C：唐宋以後，居民按季節、病症與體質調配複方，部分家族配方代代相傳。",
    question: "這段材料最能支持哪個觀點？",
    options: ["涼茶逐漸由治病藥劑走入日常生活", "涼茶主要依靠單一名醫統一配方", "涼茶只在瘟疫年份才有社會作用"],
    answer: 0,
    explain: "按季節與體質調配，說明涼茶成為民間日常養生與家族傳承的一部分。"
  },
  {
    source: "史料卡 D：清代市井繁榮，廣州出現涼茶鋪；粵人南下謀生後，涼茶傳入香港，服務工人與街坊。",
    question: "這段材料反映涼茶發展出現了甚麼轉變？",
    options: ["由家庭與民間方子走向商業與城市生活", "由街頭飲品轉為只屬私人家族儀式", "由藥草湯轉為主要依靠西式飲料市場"],
    answer: 0,
    explain: "街頭涼茶鋪使涼茶成為城市服務、移民與市井文化的一部分。"
  },
  {
    source: "史料卡 E：五六十年代香港涼茶舖常見銅壺招牌，碼頭工人、窮孩子和街坊都可能在店中得到照顧。",
    question: "這段材料最能說明涼茶舖的哪種社會功能？",
    options: ["社區互助與基層醫藥支援", "主要作為高收入人士的社交會所", "主要反映戰後旅遊消費興起"],
    answer: 0,
    explain: "涼茶舖不只是飲品店，也承載街坊人情、廉價保健與消息交流。"
  },
  {
    source: "史料卡 F：2006 年涼茶列入國家級非物質文化遺產，保育重點包括手藝、配方、生活習俗與文化記憶。",
    question: "非遺保護最重視的是甚麼？",
    options: ["活態傳承與文化價值", "只保存商標和包裝設計", "只以市場佔有率判斷文化重要性"],
    answer: 0,
    explain: "非遺重視活態文化：人如何學習、傳承、改良並繼續使用這套知識。"
  }
];

const sourceReliabilityQuestion = {
  question: "高手史料可靠性：哪份資料最適合研究 1950 年代香港涼茶舖如何照顧基層街坊？",
  options: [
    "1950年代涼茶舖老照片配合當年報章報道，可觀察店舖空間、顧客與時代語境，但仍要留意拍攝角度局限。",
    "2026年的品牌宣傳短片，能完整反映1950年代所有涼茶舖的真實情況。",
    "一位長者的口述回憶，可直接代表全港所有工人和街坊的經歷。"
  ],
  answer: 0,
  explain: "研究歷史要考慮年代、作者、目的、來源性質和局限；一手史料有價值，但也要互相印證。"
};

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
    npc: { name: "阿晴", role: "梅雨天學生", symbol: "晴", type: "student" },
    intel: {
      title: "五嶺山洪濕熱記",
      source: "「夏日山洪後，村童多覺身重不思食。金銀花質地輕浮，內含芳香之氣，切忌猛火久熬，否則藥效盡隨熱氣散失。宜中火平煎，微沸即收。」",
      clues: ["症狀關鍵是濕熱與胃口差", "金銀花屬花葉類，忌猛火久熬", "中火平煎能保留清輕芳香"],
      recipeHint: "情報推論：五花茶應用較多花材，水量充足，時間不宜過長；含金銀花時宜中火短煎或後下。"
    },
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
      options: ["按地方氣候與民間經驗調配", "主要由近代品牌廣告推動家庭飲用", "主要用來取代日常清水飲用"],
      answer: 0,
      explain: "五花茶由濕熱環境與民間採花經驗形成，正好說明涼茶是因地制宜的藥草飲。"
    },
    taste: "花香微甘",
    water: 1800,
    time: 25,
    preferredHeat: "medium",
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
    npc: { name: "強叔", role: "1950年代碼頭苦力", symbol: "力", type: "worker" },
    intel: {
      title: "碼頭勞工與廿四味口述",
      source: "「日曬搬貨，汗出如雨，背脊又生瘡。苦茶雖難入口，卻要藥材多些，先猛火滾起，再轉慢火熬深。」",
      clues: ["職業線索是長時間暴曬與勞損", "症狀線索是上火、生瘡、濕熱", "複方要濃，火候先急後緩"],
      recipeHint: "情報推論：廿四味藥材比例較重、時間較長，初段可猛火，之後以慢火穩定濃縮。"
    },
    learningGoals: ["理解「廿四」是概數", "連結涼茶與底層勞工生活", "思考苦味、療效與文化記憶的關係"],
    story: "相傳嶺南鄉下爆發嚴重時疫，多位鄉村大夫各自拿出祖傳藥方，把治療發熱、瘡毒、風寒、濕氣的草藥融合。早年香港碼頭工人勞損嚴重，身上容易生瘡，最常飲用廿四味。民間有句話：「廿四味，食得苦，先得福」。",
    dilemma: {
      question: "這碗茶最應強調哪種歷史意義？",
      options: ["底層勞工用廉價藥飲抵受惡劣環境", "城市中產以苦味飲品作身份象徵", "商家以苦味塑造高級消費形象"],
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
    preferredHeat: "low",
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
    npc: { name: "俊彥", role: "科學學會學生", symbol: "研", type: "researcher" },
    intel: {
      title: "胡秀英教授本土植物札記",
      source: "「救必應曾救幼年病危，後以香港本土植物再作整理。咽喉風熱，不求味濃，只求清喉與可觀察。」",
      clues: ["重點是傳統經驗與現代植物研究", "對象是咽喉發炎與風熱", "數據觀察比神化藥效更重要"],
      recipeHint: "情報推論：三冬茶宜中等水量與時間，火力保持穩定，方便比較溫度、pH 和茶色。"
    },
    learningGoals: ["認識胡秀英教授與本土植物研究", "理解傳統知識可以被重新整理", "分辨故事、經驗與科學研究的關係"],
    story: "植物學家胡秀英教授幼年身患重病，鄉間醫生用救必應把她救活。長大後她在香港研究本土植物，挑選崗梅、救必應、苦丁茶三種冬青植物，研製三冬茶，用於咽喉發炎與風熱感冒，是現代科學結合傳統涼茶的代表故事。",
    dilemma: {
      question: "三冬茶最適合用來討論甚麼？",
      options: ["傳統經驗如何與現代植物研究互相補充", "口述記憶可直接取代科學觀察", "本土植物研究只適合做標本收藏"],
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
    preferredHeat: "medium",
    ingredients: ["honeysuckle", "selfheal", "licorice"]
  },
  {
    id: "cold-tea",
    name: "傳統感冒茶",
    sprite: 2,
    level: "工業香港",
    concept: "勞工健康",
    summary: "以 1960 年代工廠區為背景，理解基層工人如何依靠涼茶作快速調理。",
    scenario: "觀塘工廠下班後，一位工人喉嚨乾痛、頭痛發熱，明天仍要開工。",
    npc: { name: "阿芬", role: "1960年代製衣廠女工", symbol: "工", type: "worker" },
    intel: {
      title: "工廠區涼茶舖排隊記",
      source: "「製衣車間棉絮飛揚，窗少風弱。工人日做十小時，喉乾頭痛，卻怕請假扣工錢。下班後，涼茶舖前人龍最長。東華三院等慈善機構亦以中醫藥贈醫施藥，支援基層市民。」",
      clues: ["背景是工廠化與基層勞動", "症狀是喉乾、頭痛、初起感冒", "芳香宣肺藥材宜後下短煎"],
      recipeHint: "情報推論：感冒茶需清熱解表、宣肺利咽；薄荷等芳香葉類應後下短煎，不宜長時間猛火。"
    },
    learningGoals: ["理解 1960 年代香港工業化與勞工健康", "從史料推論基層工人的醫療選擇", "分辨芳香葉類藥材的火候控制"],
    story: "六十年代香港製衣業與電子業蓬勃，工廠區通風不足、棉絮飛揚，很多工人小病也不敢請假。除了民間涼茶舖，東華三院等慈善機構亦以中醫藥贈醫施藥支援基層。傳統感冒茶反映香港社區如何回應勞工健康問題。",
    dilemma: {
      question: "面對這位工人，你最應先理解甚麼？",
      options: ["她不是貪方便，而是受工作環境和經濟壓力影響", "她只是追求時尚飲品", "她一定要飲最苦廿四味才算有效"],
      answer: 0,
      explain: "歷史同理心要求學生看見工廠環境、計件工資和勞工福利不足，而不只是看症狀。"
    },
    historyQuestion: {
      question: "1960 年代工廠區感冒茶流行，最能反映哪種香港社會現實？",
      options: ["基層工人勞動強度高，又缺乏充足醫療和休息保障", "涼茶舖主要因工業區娛樂消費而流行", "工廠醫療制度已完全取代民間調理"],
      answer: 0,
      explain: "感冒茶大受歡迎，反映工業化下的勞工健康、工作環境與基層生活壓力。"
    },
    taste: "辛涼回甘",
    water: 1600,
    time: 20,
    preferredHeat: "medium",
    ingredients: ["honeysuckle", "chrysanthemum", "mint", "licorice"]
  },
  {
    id: "jigucao-tea",
    name: "雞骨草茶",
    sprite: 3,
    level: "應用",
    concept: "濕熱與飲食",
    summary: "疏肝祛濕，適合呈現嶺南濕熱與飲食習慣。",
    scenario: "一位街坊連吃火鍋和炸物後覺得口乾、疲倦、腸胃不適。",
    npc: { name: "美姨", role: "火鍋後街坊", symbol: "濕", type: "neighbor" },
    intel: {
      title: "濕熱飲食觀察簿",
      source: "「連日火鍋油炸，口乾而倦，胃中不舒。此非越苦越佳，須看體質，以祛濕消滯為先。」",
      clues: ["症狀來自飲食燥熱與濕重", "不是越苦越好，要辨證", "雞骨草與祛濕消滯較貼合情境"],
      recipeHint: "情報推論：雞骨草茶應保持祛濕濃度，但避免過高火力造成苦味過重。"
    },
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
    preferredHeat: "low",
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
    npc: { name: "婆婆", role: "家庭煲茶長輩", symbol: "家", type: "elder" },
    intel: {
      title: "家庭清潤煲製便條",
      source: "「小兒怕苦，宜竹蔗茅根，清甜而潤。水要足，火不可躁，待根蔗之味慢慢出。」",
      clues: ["對象是小朋友與家庭", "味道要清甜易入口", "水量足、慢火煲，避免過苦"],
      recipeHint: "情報推論：竹蔗茅根水量應較充足，時間中等，重點是清甜清潤而非濃苦。"
    },
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
    preferredHeat: "low",
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
    npc: { name: "華叔", role: "舊香港涼茶師傅", symbol: "舖", type: "master" },
    intel: {
      title: "舊香港收檔人情錄",
      source: "「貧童無錢看病，收檔前仍留淡茶一碗。銅壺不只盛藥，也盛街坊消息。若遇制水年月，更要惜水儲水；東華三院等慈善機構亦以贈醫施藥協助市民渡過困境。」",
      clues: ["涼茶舖有社區互助功能", "淡茶照顧弱勢，不只追求濃苦", "1963 制水提醒玩家考慮水資源與工程儲備"],
      recipeHint: "情報推論：舊香港街坊涼茶要兼顧人情與資源，水量較省，火候要穩，並思考儲水過濾方案。"
    },
    learningGoals: ["理解涼茶舖的社會功能", "認識「寡佬茶」與勞工生活", "思考文化遺產中的人情與公共性"],
    story: "四五十年代香港貧窮，很多人看不起病。涼茶師傅有時會讓生病的孩子免費喝一碗淡涼茶，收攤時路邊流浪漢也能喝到殘餘藥湯。到 1963 年香港大制水，基層市民生活困苦，中暑和腸胃病頻發；除了民間自發煲製涼茶外，東華三院等慈善機構亦積極為市民提供中醫藥贈醫施藥服務，協助大眾共渡時艱。",
    dilemma: {
      question: "這個故事最適合讓玩家學到甚麼？",
      options: ["涼茶舖承載街坊社交和底層互助", "涼茶舖只是一部自動售賣機", "文化只等於商品包裝"],
      answer: 0,
      explain: "涼茶文化的價值不只在配方，也在街坊關係、勞工生活與城市記憶。"
    },
    historyQuestion: {
      question: "舊香港涼茶舖除了賣飲品，還承載了甚麼？",
      options: ["街坊社交與底層互助", "主要作為商業品牌宣傳場地", "主要反映市民轉向西式飲品"],
      answer: 0,
      explain: "涼茶舖是街坊交流、勞工歇腳和窮人獲得廉價調理的地方。"
    },
    taste: "苦中帶暖",
    water: 1600,
    time: 28,
    preferredHeat: "low",
    ingredients: ["pot", "herbBundle", "licorice", "water"]
  }
];

const archiveUnlocks = {
  "five-flower": {
    label: "五花茶：嶺南氣候與家庭防病",
    documents: [
      {
        sourceType: "【二手史料 / Secondary Source】民間風俗紀錄整理",
        title: "文獻 A：民國時期嶺南民間風俗紀錄（模擬史料）",
        text: "嶺南夏日冗長，自四月至十月皆酷熱難耐。平民之家，常受「暑濕」所困，症見身熱口渴、小便短赤、精神倦怠。坊間傳承「五花」之方，採金銀花、菊花、雞蛋花、木棉花、槐花熬製。此方不似廿四味之苦澀，其氣芳香，微甜易入口，婦孺皆樂意飲用，為仲夏家居常備之茶。"
      }
    ],
    questions: [
      {
        type: "single",
        tag: "歷史與社會考證",
        question: "根據文獻 A，為什麼五花茶在嶺南民間，特別是婦女與兒童之間，普及率會比廿四味更高？",
        options: ["因為五花茶較常被包裝成城市品牌飲品。", "因為五花茶使用花類藥材，口感微甜且具芳香，比極度苦澀的廿四味更易被婦孺接受，適合日常家庭防病。", "因為五花茶主要由醫館作急症重藥使用。"],
        answers: [1],
        explain: "五花茶的歷史重點是家庭化、日常化和易入口；學生要從文本讀出民間普及的社會原因。"
      },
      {
        type: "single",
        tag: "STEAM 科學變數控制",
        question: "五花茶多用花類藥材，花瓣中的揮發油在高溫下容易隨蒸氣流失。遊戲中應如何控制火候與時間？",
        options: ["選擇猛火急攻，持續熬煮 2 小時，直到水全部蒸發。", "選擇文火慢熬，且總熬煮時間不宜過長，約 15 至 20 分鐘，一聞到濃郁花香即可關火，以保留揮發油。", "不用加熱，直接用冷水泡開。"],
        answers: [1],
        explain: "花葉類與芳香類藥材重在保留清香成分，火候與時間要比根莖類更溫和。"
      }
    ],
    successTitle: "考證成功！五花茶配方已解鎖",
    successText: "你讀懂了嶺南暑濕、家庭防病和花類藥材短煎的科學原理。",
    unlockEffect: "五花茶對婦孺、學生與濕熱家庭情境獲得雙倍療效。",
    taskHint: "進入煲製坊後，請以中火或文火、較短時間保留花香。"
  },
  "twenty-four": {
    label: "廿四味：1894 鼠疫與太平山街",
    documents: [
      {
        sourceType: "【一手史料 / Primary Source】改編自當年華人聯署書信",
        title: "文獻甲：1894 年香港華人對殖民地防疫措施之恐懼（改編史料）",
        text: "日前面臨疫症，潔淨局官員強行進入華人住宅，搜查病者。凡有染病，即強制擄至西醫船隔離，更將死者剖腹檢查。華人社會大為震恐，深恐西醫割體剜眼，且船上斷絕家人音訊，與送死無異。基層百姓寧可隱瞞病情，藏匿於唐樓之中，尋求坊間草藥煎熬，亦不願向官府通報。"
      },
      {
        sourceType: "【二手史料 / Secondary Source】中醫藥文獻現代整理",
        title: "文獻乙：嶺南草藥文獻關於廿四味之記載（模擬史料）",
        text: "廿四味並非固定方劑，常隨四時感冒調整。其主料多為嶺南本土野生之剛烈草藥，如三椏苦、崗梅根、九層糕、苦瓜乾等。此等藥材多屬樹皮、粗根、硬莖，極其苦澀，能清解入血之熱毒與瘴癘。於 1894 年大疫期間，上環一帶涼茶檔夜夜開爐，煎製黑苦茶，苦力走卒皆視之為避疫、抗發熱之護身符。"
      }
    ],
    questions: [
      {
        type: "multi",
        tag: "歷史與社會考證",
        question: "根據文獻甲與文獻乙，1894 年太平山街底層華人為何寧願飲用極苦的廿四味，也不願前往殖民政府設立的西醫醫療船求醫？",
        options: ["文化與心理恐懼：當時華人對西醫解剖、隔離極度陌生與恐懼。", "經濟與現實困境：華人基層貧困，街頭涼茶是較易負擔的醫療替代。", "殖民政府強硬手段：潔淨局軍警強行搜屋，引起華人反感與不信任。", "科學證實：當時華人已透過顯微鏡證實廿四味能 100% 殺死鼠疫桿菌。"],
        answers: [0, 1, 2],
        explain: "此題考歷史同理心：涼茶在當時不只是一杯飲品，也承載恐懼、貧窮、文化衝突和民間自救。"
      },
      {
        type: "single",
        tag: "STEAM 科學變數控制",
        question: "廿四味多用樹皮、粗根與硬莖。根據固體溶出與熱傳導原理，遊戲中應如何設定煲煮參數？",
        options: ["文火低溫 60°C 慢浸 10 分鐘即可。", "武火沸騰 100°C 後轉文火約 85°C 長熬 1.5 至 2 小時，讓水分滲透木質部並萃取有效成分。", "高壓急凍到零下 10°C 逼出汁液。"],
        answers: [1],
        explain: "不同植物部位要配合不同萃取條件；根莖硬材需要更長時間與較高初始溫度。"
      }
    ],
    successTitle: "考證成功！廿四味配方已解鎖",
    successText: "你解讀了 1894 年大疫的歷史現場，也掌握了根莖類藥材需長熬萃取的物理規律。",
    unlockEffect: "系統已提升店內鍋爐的耐火耐燒度。",
    taskHint: "現在有一位發熱咳嗽的碼頭苦力前來求助，請設定先武後文、長時間熬煮的黃金參數。"
  },
  "cold-tea": {
    label: "傳統感冒茶：1960 年代工廠化與勞工健康",
    documents: [
      {
        sourceType: "【二手史料 / Secondary Source】工業發展與勞工健康報告節錄",
        title: "文獻 B：1960 年代香港工業發展與勞工健康報告（節錄）",
        text: "六十年代，香港製衣業與電子業蓬勃。新蒲崗、觀塘一帶工廠林立。數以萬計之工廠妹與男工，每日於通風不良、棉絮飛揚之車間工作逾十小時。工人常感喉嚨乾涸、頭痛發熱、感冒流涕。由於手工業計件工資微薄，工人不願請假就醫。每逢下班，工廠區外之涼茶舖便擠滿勞工；同時，東華三院等慈善機構亦透過中醫藥贈醫施藥支援基層，反映社會互助網絡的重要。"
      }
    ],
    questions: [
      {
        type: "multi",
        tag: "歷史情境同理",
        question: "根據文獻 B，1960 年代香港工廠區感冒茶大受歡迎，反映了當時怎樣的社會現實？",
        options: ["基層工人勞動強度大，工作環境惡劣，例如棉絮多、通風差。", "勞工福利不足，工人因經濟壓力小病不願請假，依賴涼茶作快速調理。", "香港市民生活富裕，飲涼茶主要是一種時尚消閒活動。"],
        answers: [0, 1],
        explain: "感冒茶流行反映工業化下的勞工健康、工作環境和基層生活壓力。"
      },
      {
        type: "single",
        tag: "STEAM 工程與配方設計",
        question: "面對長期在多塵、不通風環境工作，且有初期感冒發熱的工人 NPC，除了清熱草藥外，最應加入哪種宣肺止咳、疏散風熱的藥材？",
        options: ["昂貴的冬蟲夏草，用於大補元氣。", "桑葉或薄荷，芳香成分有助宣肺利咽，減輕喉部不適。", "大量砂糖，用來掩蓋苦味。"],
        answers: [1],
        explain: "配方設計要對應工作環境和症狀；芳香宣肺藥材應配合短煎或後下。"
      }
    ],
    successTitle: "考證成功！傳統感冒茶配方已解鎖",
    successText: "你讀懂了 1960 年代工廠化下的勞工健康問題，也能把宣肺利咽的科學概念轉化為配方決策。",
    unlockEffect: "感冒茶對工廠工人、喉嚨乾痛與初起感冒 NPC 產生雙倍療效。",
    taskHint: "煲製時請加入薄荷，並避免芳香葉類長時間猛火熬煮。"
  },
  "three-winter": {
    label: "三冬茶：香港植物學與本土研究",
    documents: [
      {
        sourceType: "【二手史料 / Secondary Source】人物訪談與植物學研究整理",
        title: "人物訪談：胡秀英教授與香港本土植物研究（模擬整理）",
        text: "植物學者把童年病患經驗、本土植物採集和現代研究結合，將崗梅、救必應、苦丁茶等冬青科植物轉化成三冬茶配方。這個故事顯示傳統經驗可以經由觀察、分類與整理，成為可討論、可驗證的知識。"
      }
    ],
    questions: [
      {
        type: "single",
        tag: "歷史與科學連結",
        question: "這段資料最能說明三冬茶的哪一種 STEAM 特點？",
        options: ["傳統經驗與植物科學研究互相驗證。", "完全不用歷史閱讀也可發明。", "只重視包裝顏色。"],
        answers: [0],
        explain: "三冬茶展示 Science 與 History 的連結：閱讀人物經歷後，再理解植物分類與配方設計。"
      }
    ],
    successTitle: "考證成功！三冬茶配方已解鎖",
    successText: "你把人物故事轉化為植物學與配方設計線索。",
    unlockEffect: "三冬茶研究卡已加入個人記錄。",
    taskHint: "進入任務後，留意咽喉風熱與科學觀察的關係。"
  },
  "jigucao-tea": {
    label: "雞骨草茶：嶺南濕熱生活",
    documents: [
      {
        sourceType: "【二手史料 / Secondary Source】地方志與民俗研究整理",
        title: "地方志摘錄：嶺南濕熱與日常飲食（模擬史料）",
        text: "嶺南地區暑濕重，居民常以雞骨草、夏枯草等草藥煲飲，回應飲食油膩、濕熱不適與社區日常保健需要。"
      }
    ],
    questions: [
      {
        type: "single",
        tag: "生活史推論",
        question: "玩家應從這段史料推論出甚麼任務方向？",
        options: ["從氣候、飲食和身體反應推論祛濕配方。", "只追求茶湯越甜越好。", "完全忽略季節和地區環境。"],
        answers: [0],
        explain: "雞骨草茶的閱讀重點，是把地理環境、飲食習慣和身體症狀連成決策線索。"
      }
    ],
    successTitle: "考證成功！雞骨草茶配方已解鎖",
    successText: "你能把嶺南氣候與飲食習慣轉化為祛濕配方判斷。",
    unlockEffect: "祛濕生活卡已加入個人記錄。",
    taskHint: "注意不是越苦越好，要看體質與症狀。"
  },
  "sugarcane-root": {
    label: "竹蔗茅根：家庭清潤飲食",
    documents: [
      {
        sourceType: "【一手史料 / Primary Source】口述歷史整理",
        title: "口述歷史：夏日家庭清潤飲品（模擬整理）",
        text: "老街坊回憶夏日家中常煲竹蔗茅根水，味道清甜，適合一家大小飲用，也反映涼茶不只治病，還是家庭照顧與日常養生。"
      }
    ],
    questions: [
      {
        type: "single",
        tag: "家庭生活史",
        question: "這段口述歷史提醒玩家，竹蔗茅根的價值不只在於甚麼？",
        options: ["不只在藥效，也在家庭照顧與生活文化。", "只在於賣得最貴。", "只在於顏色越黑越好。"],
        answers: [0],
        explain: "這一關要讀出清潤飲品背後的家庭照顧、代際記憶和溫和配方設計。"
      }
    ],
    successTitle: "考證成功！竹蔗茅根配方已解鎖",
    successText: "你看見涼茶如何進入家庭日常與代際照顧。",
    unlockEffect: "家庭清潤卡已加入個人記錄。",
    taskHint: "重點是水量充足、慢火清潤，而非煲到極苦。"
  },
  "old-hk": {
    label: "舊香港涼茶舖：制水危機與社區照顧",
    documents: [
      {
        sourceType: "【一手史料 / Primary Source】1963 年大制水報紙剪報（模擬）",
        title: "報紙剪報：1963 年香港制水（模擬史料）",
        text: "1963 年香港大制水，基層市民生活困苦，中暑和腸胃病頻發。當時除了民間自發煲製涼茶外，東華三院等慈善機構亦積極為市民提供中醫藥贈醫施藥服務，協助大眾共渡時艱。傳統涼茶舖既要照顧街坊，也要思考儲水、節水和保溫器具的運用。"
      }
    ],
    questions: [
      {
        type: "single",
        tag: "工程解難",
        question: "如果把這段史料轉成遊戲任務，最合理的工程挑戰是甚麼？",
        options: ["在水資源有限下設計節水煲製和儲水流程。", "維持原本大量煲製流程以保留傳統味道。", "把資源集中在包裝宣傳以增加銷量。"],
        answers: [0],
        explain: "舊香港關卡應把歷史事件變成工程問題：節水、儲存、流程控制和社區照顧。"
      }
    ],
    successTitle: "考證成功！舊香港涼茶舖任務已解鎖",
    successText: "你把制水危機轉化成工程與社區照顧問題。",
    unlockEffect: "節水工程卡已加入個人記錄。",
    taskHint: "留意水量、儲水和保溫器具的選擇。"
  }
};

const socialProblemFrames = {
  "five-flower": {
    reading: "五嶺山下濕熱、花草入藥和民間配方流傳",
    problem: "香港與嶺南地區春夏潮濕，學生容易把氣候、身體不適和日常預防連結起來",
    value: "關心同學健康，尊重民間智慧"
  },
  "twenty-four": {
    reading: "清末至戰後香港苦力、街頭涼茶舖和基層醫藥需要",
    problem: "碼頭工人長時間勞動，在濕熱、勞損和醫療資源有限下需要廉價調理",
    value: "同理基層、仁愛互助、服務社群"
  },
  "three-winter": {
    reading: "香港本土植物研究、胡秀英教授故事和傳統配方現代化",
    problem: "如何把口述經驗、植物學研究和校園健康教育連結起來",
    value: "求真、創新、尊重科學與傳統"
  },
  "cold-tea": {
    reading: "1960 年代香港工廠化、製衣業工人與涼茶舖排隊文化",
    problem: "工廠工人在通風差、棉絮多和工時長的環境下容易感冒喉痛，卻因經濟壓力不願請假求醫",
    value: "同理勞工、關愛基層、改善工作健康"
  },
  "jigucao-tea": {
    reading: "嶺南濕熱生活、飲食習慣和家庭草藥調理",
    problem: "城市學生常吃煎炸食物，又面對濕熱氣候，需要理解日常養生與環境關係",
    value: "責任感、自我照顧、尊重生活文化"
  },
  "sugarcane-root": {
    reading: "家庭清潤飲食、長者口述歷史和代際照顧",
    problem: "如何讓年輕人理解長者的生活記憶，並把家庭照顧轉化成校園學習",
    value: "孝親、關愛、珍惜家庭記憶"
  },
  "old-hk": {
    reading: "舊香港涼茶舖、底層互助和 1963 年制水背景",
    problem: "公共資源緊張時，社區如何用工程思維節水、儲水和照顧街坊",
    value: "珍惜資源、承擔精神、非遺保育"
  }
};

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
    text: "顯示目標範圍、NPC 提示和資源影響，事件只有兩個選項，並容許一次時間重試。",
    hintPenalty: 1,
    wrongPenalty: 6,
    needleStep: 3,
    needleInterval: 42,
    cookHighStep: 4,
    cookLowStep: 2,
    supportBonus: 6,
    scoreMultiplier: 1.04,
    eventChoices: 2,
    retry: true,
    revealTargets: true,
    startingResources: { money: 140, water: 72, herbs: 48, time: 300, satisfaction: 82 }
  },
  normal: {
    name: "普通",
    label: "課堂模式",
    text: "不直接給完整答案，需要從史料推算火候與時間；事件有三個選項。",
    hintPenalty: 3,
    wrongPenalty: 10,
    needleStep: 4,
    needleInterval: 34,
    cookHighStep: 5,
    cookLowStep: 3,
    supportBonus: 0,
    scoreMultiplier: 1,
    eventChoices: 3,
    retry: false,
    revealTargets: false,
    startingResources: { money: 120, water: 60, herbs: 42, time: 260, satisfaction: 76 }
  },
  expert: {
    name: "高手",
    label: "挑戰模式",
    text: "史料較少、證據較複雜、資源壓力更大；目標不完整顯示，重要選擇不能重試。",
    hintPenalty: 5,
    wrongPenalty: 14,
    needleStep: 5,
    needleInterval: 26,
    cookHighStep: 6,
    cookLowStep: 4,
    supportBonus: -4,
    scoreMultiplier: 0.96,
    eventChoices: 3,
    retry: false,
    revealTargets: false,
    startingResources: { money: 92, water: 42, herbs: 34, time: 210, satisfaction: 66 }
  }
};

const UPGRADES = {
  improvedStove: {
    name: "改良茶爐",
    cost: 120,
    level: 2,
    text: "火候穩定度 +5%，煲製時間容錯增加。",
    effects: { timingTolerance: 0.05, heatStability: 5 }
  },
  thermometer: {
    name: "溫度計",
    cost: 180,
    level: 3,
    text: "煲茶頁可查看實時溫度，實驗室溫度誤差減少。",
    effects: { labAccuracy: 4 },
    unlocks: ["temperatureReading"]
  },
  phSensor: {
    name: "pH Sensor",
    cost: 250,
    level: 4,
    text: "解鎖 pH Measurement 與 Lab Advanced Mode。",
    effects: { labAccuracy: 5 },
    unlocks: ["phMeasurement", "labAdvanced"]
  },
  waterSaver: {
    name: "節水裝置",
    cost: 220,
    level: 3,
    text: "每次加水消耗較少食水，制水事件壓力下降。",
    effects: { waterSaving: 0.25, sustainability: 4 }
  },
  smartPot: {
    name: "Smart Pot Prototype",
    cost: 400,
    level: 5,
    text: "解鎖自動溫度警示，創新方案科技分更易達高分。",
    effects: { autoTemperatureAlert: 1, technology: 5 },
    unlocks: ["smartPotPrototype"]
  }
};

const AUDIO_SCENES = {
  menu: { bpm: 76, volume: 0.9, melody: [392, 440, 523.25, 440, 392, 329.63, 392, 293.66], wave: "triangle", taps: 2 },
  archive: { bpm: 64, volume: 0.45, melody: [293.66, 329.63, 392, 329.63, 293.66], wave: "sine", taps: 1 },
  street: { bpm: 82, volume: 0.82, melody: [392, 523.25, 587.33, 523.25, 440, 392], wave: "triangle", taps: 3 },
  ingredient: { bpm: 102, volume: 0.86, melody: [440, 523.25, 587.33, 659.25, 587.33, 523.25], wave: "triangle", taps: 3 },
  brewing: { bpm: 84, volume: 0.95, melody: [329.63, 392, 440, 523.25, 440, 392], wave: "sawtooth", taps: 4 },
  lab: { bpm: 92, volume: 0.72, melody: [523.25, 587.33, 659.25, 783.99, 659.25, 587.33], wave: "square", taps: 1 },
  innovation: { bpm: 96, volume: 0.9, melody: [440, 523.25, 659.25, 783.99, 659.25, 523.25], wave: "triangle", taps: 2 },
  result: { bpm: 76, volume: 0.88, melody: [523.25, 587.33, 659.25, 587.33, 523.25, 440, 392, 440], wave: "triangle", taps: 2 }
};

const $ = (selector) => document.querySelector(selector);
const teaGrid = $("#tea-grid");
const difficultySelector = $("#difficulty-selector");
const guide = $("#ingredient-guide");
const timelinePanel = $("#timeline-panel");
const culturePanel = $("#culture-panel");
const personalRecordPanel = $("#personal-record");
const archiveModalRoot = $("#archive-modal-root");
const stageLabel = $("#stage-label");
const stageTitle = $("#stage-title");
const coachLine = $("#coach-line");
const musicToggle = $("#music-toggle");
const musicVolumeInput = $("#music-volume");
const sfxVolumeInput = $("#sfx-volume");
const audioMutedInput = $("#audio-muted");
const resourcePanel = $("#resource-panel");

const SAVE_VERSION = 3;
const AUDIO_SETTINGS_KEY = "teaSteamAudioSettings";

const teaConfig = Object.fromEntries(teas.map((tea) => {
  const historicalRanges = {
    "five-flower": { brewTime: [15, 20], water: [1200, 1800], heat: "文火至中火短煎" },
    "twenty-four": { brewTime: [90, 120], water: [2200, 3000], heat: "先武火煮沸，再文火長熬" },
    "cold-tea": { brewTime: [15, 25], water: [1400, 1800], heat: "中火短煎，芳香藥材後下" },
    "three-winter": { brewTime: [25, 35], water: [1500, 1900], heat: "中火微沸" },
    "jigucao-tea": { brewTime: [35, 50], water: [1700, 2300], heat: "文火慢熬" },
    "sugarcane-root": { brewTime: [30, 45], water: [1800, 2400], heat: "文火清潤" },
    "old-hk": { brewTime: [25, 40], water: [1400, 1900], heat: "文火保溫，節水煲製" }
  };
  return [tea.id, {
    historicalRange: historicalRanges[tea.id] || { brewTime: [tea.time, tea.time], water: [tea.water, tea.water], heat: heatTargetLabel(tea) },
    simulationTarget: {
      brewTime: tea.time,
      water: tea.water,
      heat: tea.preferredHeat || "low"
    },
    labTarget: {
      brewTime: tea.time,
      water: tea.water,
      heat: tea.preferredHeat || "low",
      ratio: 100
    }
  }];
}));

const randomEvents = [
  {
    id: "water-shortage",
    title: "制水記憶",
    text: "今日區內臨時制水，食水供應減少。你要決定如何應對。",
    options: [
      { id: "less-water", label: "減少每煲水量", text: "相對節省食水，但味道和街坊接受度下降。", effects: { water: 15, satisfaction: -3 }, modifiers: { tasteQuality: -5, maxWaterMl: -350 } },
      { id: "buy-water", label: "購買額外食水", text: "成本上升，但保持服務量。", effects: { money: -30, water: 25 }, requires: { money: 30 } },
      { id: "serve-less", label: "減少服務人數", text: "保留食水並騰出時間，但街坊會失望。", effects: { water: 20, satisfaction: -8, time: 10 }, modifiers: { communityImpact: -5 } }
    ],
    difficulty: ["standard", "expert"]
  },
  {
    id: "hot-weather",
    title: "天氣炎熱",
    text: "濕熱天氣令街坊需求增加，服務壓力上升。",
    options: [
      { id: "prioritize-heat", label: "優先服務濕熱個案", text: "照顧最急切街坊，但操作時間變緊。", effects: { satisfaction: 7, time: -14 }, modifiers: { communityImpact: 5 } },
      { id: "small-batches", label: "分小批煲製", text: "較節省風險，品質稍為下降。", effects: { water: 5, herbs: -4, satisfaction: 2 }, modifiers: { tasteQuality: -2 } },
      { id: "extra-helper", label: "請街坊幫手", text: "多花少量銅錢，換取時間與人情。", effects: { money: -12, time: 18, satisfaction: 4 }, modifiers: { culture: 3 } }
    ],
    difficulty: ["novice", "standard", "expert"]
  },
  {
    id: "herb-price",
    title: "藥材漲價",
    text: "部分乾藥材來貨少，採購成本上升。你要在真實性、成本與份量之間取捨。",
    options: [
      { id: "full-price", label: "照價購買", text: "保存傳統配方質素，但成本很高。", effects: { money: -35, herbs: 8 }, modifiers: { tasteQuality: 5 }, requires: { money: 35 } },
      { id: "substitute", label: "便宜替代方案", text: "支出較低，但史料真實性下降。", effects: { money: -10, herbs: 5 }, modifiers: { authenticity: -5 }, requires: { money: 10 } },
      { id: "smaller-dose", label: "減少份量", text: "保留藥材庫存，但街坊可能覺得不夠足料。", effects: { herbs: 10, satisfaction: -6 }, modifiers: { tasteQuality: -4 } }
    ],
    difficulty: ["standard", "expert"]
  },
  {
    id: "school-visit",
    title: "學校參觀",
    text: "學生參觀涼茶舖，需要較易入口和清楚解說。",
    options: [
      { id: "guided-tour", label: "安排導賞", text: "花時間講解史料與藥材，文化點大增。", effects: { time: -20, satisfaction: 5 }, modifiers: { culture: 10 } },
      { id: "reading-card", label: "只派簡介卡", text: "成本低，仍能留下閱讀線索。", effects: { money: -5, satisfaction: 1 }, modifiers: { culture: 4 }, requires: { money: 5 } },
      { id: "decline", label: "拒絕參觀", text: "保留時間，但錯過教育機會。", effects: { time: 10, satisfaction: -6 }, modifiers: { culture: -4 } }
    ],
    difficulty: ["novice", "standard", "expert"]
  },
  {
    id: "elder-visit",
    title: "老街坊到訪",
    text: "老街坊重視傳統味道，對火候與茶色更敏感。",
    options: [
      { id: "listen-story", label: "聽口述歷史", text: "增加文化理解，但會用去時間。", effects: { time: -16, satisfaction: 6 }, modifiers: { culture: 8, authenticity: 3 } },
      { id: "standard-service", label: "照常服務", text: "維持流程，沒有太大風險。", effects: { money: 4, satisfaction: 2 }, modifiers: { tasteQuality: 1 } },
      { id: "rush", label: "催促離開", text: "節省時間，但人情味大跌。", effects: { time: 10, satisfaction: -10 }, modifiers: { culture: -6 } }
    ],
    difficulty: ["expert"]
  }
];

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
let reliabilityAnswered = false;
let reliabilityCorrect = false;
let hintsUsed = 0;
let insightLog = [];
let lab = { water: 1800, time: 25, heat: 55, ratio: 100 };
let labInquiry = defaultLabInquiry();
let labMetrics = null;
let innovation = { product: null, sensor: null, audience: null, value: null };
let innovationAppliedEffects = { product: null, sensor: null, audience: null, value: null };
let innovationJustification = "";
let currentDifficulty = "normal";
let intelUnlocked = false;
let resources = { money: 120, water: 60, herbs: 42, time: 260, satisfaction: 76 };
let activeEvents = [];
let resourceLog = [];
let modifiers = defaultModifiers();
let cookStarted = false;
let forcedOutcome = null;
let lastScoreBreakdown = null;
let audioSettings = { musicVolume: 35, sfxVolume: 65, muted: false };
let musicState = {
  context: null,
  master: null,
  sfxMaster: null,
  timer: null,
  steamSource: null,
  steamGain: null,
  isPlaying: false,
  nextTime: 0,
  scene: "menu",
  intensity: 0
};

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

function containsIngredient(id) {
  return activeTea?.ingredients?.includes(id);
}

function loadAudioSettings() {
  try {
    audioSettings = { ...audioSettings, ...JSON.parse(localStorage.getItem(AUDIO_SETTINGS_KEY) || "{}") };
  } catch {
    audioSettings = { musicVolume: 35, sfxVolume: 65, muted: false };
  }
  audioSettings.musicVolume = clamp(Number(audioSettings.musicVolume), 0, 100);
  audioSettings.sfxVolume = clamp(Number(audioSettings.sfxVolume), 0, 100);
  audioSettings.muted = Boolean(audioSettings.muted);
  if (musicVolumeInput) musicVolumeInput.value = audioSettings.musicVolume;
  if (sfxVolumeInput) sfxVolumeInput.value = audioSettings.sfxVolume;
  if (audioMutedInput) audioMutedInput.checked = audioSettings.muted;
}

function saveAudioSettings() {
  localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(audioSettings));
}

function musicGainValue() {
  return audioSettings.muted ? 0.0001 : Math.max(0.0001, audioSettings.musicVolume / 100);
}

function sfxGainValue() {
  return audioSettings.muted ? 0.0001 : Math.max(0.0001, audioSettings.sfxVolume / 100);
}

function applyAudioSettings() {
  if (musicState.master && musicState.context) {
    musicState.master.gain.cancelScheduledValues(musicState.context.currentTime);
    musicState.master.gain.setValueAtTime(musicGainValue() * currentAudioScene().volume, musicState.context.currentTime);
  }
  if (musicState.sfxMaster && musicState.context) {
    musicState.sfxMaster.gain.cancelScheduledValues(musicState.context.currentTime);
    musicState.sfxMaster.gain.setValueAtTime(sfxGainValue(), musicState.context.currentTime);
  }
  if (musicState.steamGain && musicState.context) {
    musicState.steamGain.gain.setValueAtTime(audioSettings.muted ? 0.0001 : 0.018, musicState.context.currentTime);
  }
  saveAudioSettings();
}

function createMusicContext() {
  if (musicState.context) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    if (musicToggle) musicToggle.textContent = "涼茶音樂不可用";
    return;
  }
  const context = new AudioContext();
  const master = context.createGain();
  const sfxMaster = context.createGain();
  master.gain.value = 0.0001;
  sfxMaster.gain.value = sfxGainValue();
  master.connect(context.destination);
  sfxMaster.connect(context.destination);
  musicState.context = context;
  musicState.master = master;
  musicState.sfxMaster = sfxMaster;
}

function playTone(frequency, start, duration, type = "sine", volume = 0.055, channel = "music") {
  const { context, master, sfxMaster } = musicState;
  const output = channel === "sfx" ? sfxMaster : master;
  if (!context || !output || audioSettings.muted) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(output);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.05);
}

function playKettleTap(start, frequency = 1180, volume = 0.022) {
  const { context, master } = musicState;
  if (!context || !master || audioSettings.muted) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.72, start + 0.12);
  filter.type = "bandpass";
  filter.frequency.value = 1250;
  filter.Q.value = 8;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  oscillator.start(start);
  oscillator.stop(start + 0.22);
}

function startSteamAmbience() {
  const { context, master } = musicState;
  if (!context || !master || musicState.steamSource) return;
  const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * 0.35;
  }
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  source.loop = true;
  filter.type = "lowpass";
  filter.frequency.value = 520;
  gain.gain.value = audioSettings.muted ? 0.0001 : 0.018;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  source.start();
  musicState.steamSource = source;
  musicState.steamGain = gain;
}

function stopSteamAmbience() {
  if (musicState.steamSource) {
    try {
      musicState.steamSource.stop();
    } catch {
      // Source may already have stopped when the browser suspends audio.
    }
  }
  musicState.steamSource = null;
  musicState.steamGain = null;
}

function currentAudioScene() {
  return AUDIO_SCENES[musicState.scene] || AUDIO_SCENES.menu;
}

function secondsPerBeat(scene = currentAudioScene()) {
  return 60 / scene.bpm;
}

function setAudioScene(sceneName) {
  const nextScene = AUDIO_SCENES[sceneName] ? sceneName : "menu";
  if (musicState.scene === nextScene) return;
  musicState.scene = nextScene;
  musicState.nextTime = musicState.context ? musicState.context.currentTime + 0.05 : 0;
  if (musicState.master && musicState.context && musicState.isPlaying) {
    musicState.master.gain.cancelScheduledValues(musicState.context.currentTime);
    musicState.master.gain.setValueAtTime(Math.max(musicState.master.gain.value, 0.0001), musicState.context.currentTime);
    musicState.master.gain.exponentialRampToValueAtTime(musicGainValue() * currentAudioScene().volume, musicState.context.currentTime + 0.8);
  }
}

function setMusicIntensity(level) {
  musicState.intensity = clamp(level, 0, 2);
}

function scheduleMusicBar(startTime) {
  const scene = currentAudioScene();
  const beat = secondsPerBeat(scene);
  const answer = [523.25, 587.33, 659.25, 587.33, 523.25, 440, 392, 440];
  const activeMelody = Math.round(startTime * 10) % 2 ? answer : scene.melody;
  const intensity = musicState.scene === "brewing" ? musicState.intensity : 0;
  const volumeBoost = 1 + intensity * 0.26;
  activeMelody.forEach((note, index) => {
    playTone(note, startTime + index * beat, beat * 0.72, scene.wave, 0.032 * scene.volume * volumeBoost);
  });
  [196, 220, 261.63, 293.66].forEach((note, index) => {
    playTone(note, startTime + index * beat * 2, beat * 1.8, "sine", 0.016 * scene.volume);
  });
  const tapCount = scene.taps + intensity;
  for (let index = 0; index < tapCount; index += 1) {
    playKettleTap(startTime + 0.18 + index * beat * 1.4, 960 + index * 130, 0.012 + intensity * 0.004);
  }
  if (scene.wave === "square") playTone(783.99, startTime + beat * 6, beat * 0.7, "triangle", 0.016);
}

function scheduleBackgroundMusic() {
  const { context } = musicState;
  if (!context || !musicState.isPlaying) return;
  while (musicState.nextTime < context.currentTime + 2.5) {
    scheduleMusicBar(musicState.nextTime);
    musicState.nextTime += secondsPerBeat() * 8;
  }
}

async function startBackgroundMusic() {
  createMusicContext();
  const { context, master } = musicState;
  if (!context || !master) return;
  await context.resume();
  musicState.isPlaying = true;
  musicState.nextTime = context.currentTime + 0.08;
  master.gain.cancelScheduledValues(context.currentTime);
  master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), context.currentTime);
  master.gain.exponentialRampToValueAtTime(musicGainValue() * currentAudioScene().volume, context.currentTime + 0.5);
  startSteamAmbience();
  scheduleBackgroundMusic();
  musicState.timer = setInterval(scheduleBackgroundMusic, 900);
  if (musicToggle) {
    musicToggle.textContent = "涼茶音樂：開";
    musicToggle.setAttribute("aria-pressed", "true");
    musicToggle.classList.add("is-playing");
  }
  coachLine.textContent = "涼茶舖背景音樂已開啟：五聲音階、銅壺輕響和微弱煲茶聲，全部由程式原創合成。";
}

function stopBackgroundMusic() {
  const { context, master } = musicState;
  musicState.isPlaying = false;
  if (musicState.timer) clearInterval(musicState.timer);
  musicState.timer = null;
  if (context && master) {
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.35);
  }
  stopSteamAmbience();
  if (musicToggle) {
    musicToggle.textContent = "涼茶音樂：關";
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.classList.remove("is-playing");
  }
}

function toggleBackgroundMusic() {
  if (musicState.isPlaying) {
    stopBackgroundMusic();
    coachLine.textContent = "背景音樂已關閉，適合專心閱讀史料。";
  } else {
    startBackgroundMusic();
  }
}

function playSfx(kind = "click") {
  createMusicContext();
  const { context, sfxMaster } = musicState;
  if (!context || !sfxMaster || audioSettings.muted) return;
  const tones = {
    click: [620, 0.05, "triangle", 0.018],
    paper: [360, 0.09, "sawtooth", 0.012],
    herb: [520, 0.12, "triangle", 0.02],
    correct: [880, 0.12, "sine", 0.026],
    wrong: [220, 0.16, "triangle", 0.018],
    success: [1046.5, 0.22, "triangle", 0.035],
    sensor: [760, 0.08, "square", 0.012]
  };
  const [frequency, duration, type, volume] = tones[kind] || tones.click;
  const start = context.currentTime + 0.01;
  playTone(frequency, start, duration, type, volume, "sfx");
}

function heatTargetLabel(tea = activeTea) {
  if (!tea?.preferredHeat) return "按史料判斷";
  if (tea.preferredHeat === "medium") return "中火平煎";
  if (tea.preferredHeat === "low") return "文火慢煎";
  if (tea.preferredHeat === "high") return "武火急煎";
  return "按史料判斷";
}

function ingredientSpecimen(item) {
  const details = {
    honeysuckle: ["淡黃至灰綠", "細長乾燥花蕾", "微皺、有細絨毛"],
    selfheal: ["深棕至紫黑", "乾燥果穗", "像迷你松果或枯麥穗"],
    licorice: ["紅棕外皮", "淡黃切面", "圓片有放射狀紋理"],
  };
  return details[item.id] || [item.tag, item.prep, item.clue];
}

function cookHint(kind) {
  const mode = currentDifficulty;
  const targetHeat = heatTargetLabel();
  const hasFlower = containsIngredient("honeysuckle");
  const config = configForTea(activeTea);
  const exactWater = `${config.simulationTarget.water} ml`;
  const exactTime = `${config.simulationTarget.brewTime} 分鐘`;

  const hints = {
    water: {
      novice: `新手提示：把水量調到 ${exactWater}。水太少會太苦，水太多會變淡。`,
      normal: "課堂提示：比較藥材多少與茶色深度，水量要避免過濃或過淡。",
      expert: "高手提示：不直接顯示安全答案。請根據藥材多少、茶色深度和濃度風險判斷水量。"
    },
    heat: {
      novice: `新手提示：本關目標火候是「${targetHeat}」。${hasFlower ? "金銀花忌猛火久熬，宜中火微沸或後下。" : "留意水面氣泡大小和蒸氣量。"}`,
      normal: "課堂提示：先判斷是花葉類、根莖類還是複方，再選火候。",
      expert: hasFlower ? "高手提示：花葉類重在保留芳香與活性成分，看到大量蒸氣時要警覺。" : "高手提示：只看沸騰狀態判斷；大泡、微沸、小泡代表不同萃取節奏。"
    },
    time: {
      novice: `新手提示：煲到接近 ${exactTime} 就可以完成出爐。`,
      normal: "課堂提示：時間影響苦味和茶色；根據史料與鍋內變化收火。",
      expert: "高手提示：不直接給時間答案。觀察茶色、氣泡和配方性質，過煲會提高苦味並損失部分成分。"
    }
  };

  return hints[kind]?.[mode] || hints[kind]?.normal || "";
}

function renderModeHint(kind) {
  return `<p class="mode-hint mode-${currentDifficulty}">${cookHint(kind)}</p>`;
}

function optionById(group, id) {
  return innovationOptions[group].find((item) => item.id === id);
}

function selectedOption(group) {
  return optionById(group, innovation[group]) || { name: "未選擇", text: "請先作出設計選擇，未完成項目不會取得分數。" };
}

function configForTea(tea = activeTea) {
  return teaConfig[tea?.id] || {
    historicalRange: { brewTime: [tea?.time || 0, tea?.time || 0], water: [tea?.water || 0, tea?.water || 0], heat: heatTargetLabel(tea) },
    simulationTarget: { brewTime: tea?.time || 0, water: tea?.water || 0, heat: tea?.preferredHeat || "low" },
    labTarget: { brewTime: tea?.time || 0, water: tea?.water || 0, heat: tea?.preferredHeat || "low", ratio: 100 }
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function defaultModifiers() {
  return {
    tasteQuality: 0,
    authenticity: 0,
    culture: 0,
    research: 0,
    communityImpact: 0,
    timingTolerance: 0,
    heatStability: 0,
    labAccuracy: 0,
    waterSaving: 0,
    maxWaterMl: 0,
    timeOutPenalty: 0,
    timeOutHandled: false,
    timeRetryUsed: false,
    satisfactionCrisis: false
  };
}

function defaultLabInquiry() {
  return {
    hypothesis: null,
    variable: "time",
    result: "color",
    trials: [],
    conclusion: null,
    evidence: null,
    recorded: false
  };
}

function formatResourceValue(key, value) {
  if (key === "water") return `${value}L`;
  if (key === "time") return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
  if (key === "satisfaction") return `${value}%`;
  return value;
}

function resetResources() {
  resources = { ...difficulty().startingResources };
  activeEvents = chooseRandomEvents().map((event) => ({ ...event, resolved: false, choice: null }));
  resourceLog = [];
  modifiers = defaultModifiers();
  cookStarted = false;
  forcedOutcome = null;
  renderResourcePanel();
}

function chooseRandomEvents() {
  const mode = currentDifficulty === "normal" ? "standard" : currentDifficulty;
  const count = currentDifficulty === "expert" ? 2 : currentDifficulty === "normal" ? 1 : Math.random() > 0.5 ? 1 : 0;
  return shuffle(randomEvents.filter((event) => event.difficulty.includes(mode))).slice(0, count);
}

function changeResource(type, amount, reason, options = {}) {
  const changes = typeof type === "object" ? type : { [type]: amount };
  return applyResourceChange(changes, typeof type === "object" ? amount : reason, typeof type === "object" ? reason || {} : options);
}

function applyResourceChange(changes, reason, options = {}) {
  const before = { ...resources };
  Object.entries(changes).forEach(([key, delta]) => {
    const max = key === "satisfaction" ? 100 : key === "time" ? 999 : 999;
    resources[key] = clamp(Math.round((resources[key] || 0) + delta), 0, max);
  });
  const deltas = Object.entries(changes).map(([key, delta]) => `${resourceLabel(key)} ${formatResourceValue(key, before[key] || 0)} → ${formatResourceValue(key, resources[key])}（${delta > 0 ? "+" : ""}${delta}${key === "water" ? "L" : key === "satisfaction" ? "%" : key === "time" ? "分鐘" : ""}）`);
  resourceLog.unshift({ reason, deltas });
  resourceLog = resourceLog.slice(0, 5);
  if (!options.silent) coachLine.textContent = `${reason}：${deltas.join("；")}`;
  renderResourcePanel();
  if (!options.skipConsequences) checkResourceConsequences(reason);
  return true;
}

function reverseEffects(effects = {}) {
  return Object.fromEntries(Object.entries(effects).map(([key, value]) => [key, -value]));
}

function canApplyResourceEffects(effects = {}) {
  return Object.entries(effects).every(([key, delta]) => delta >= 0 || (resources[key] || 0) >= Math.abs(delta));
}

function blockedResourceMessage(effects = {}) {
  const blocked = Object.entries(effects).find(([key, delta]) => delta < 0 && (resources[key] || 0) < Math.abs(delta));
  if (!blocked) return "";
  const [key, delta] = blocked;
  return `${resourceLabel(key)}不足，需要 ${Math.abs(delta)}，目前只有 ${formatResourceValue(key, resources[key] || 0)}。`;
}

function applyModifierChanges(changes = {}) {
  Object.entries(changes).forEach(([key, delta]) => {
    modifiers[key] = (modifiers[key] || 0) + delta;
  });
}

function checkResourceConsequences(reason = "") {
  if (!activeTea || forcedOutcome) return;
  if (resources.satisfaction <= 20 && !modifiers.satisfactionCrisis) {
    modifiers.satisfactionCrisis = true;
    modifiers.communityImpact -= 8;
    resourceLog.unshift({ reason: "街坊信任危機", deltas: ["滿意度低於 20%，最終評價會下降"] });
    resourceLog = resourceLog.slice(0, 5);
    coachLine.textContent = "街坊信任危機：NPC 會變得不信任你的判斷，最後評價會被拉低。";
  }
  if (resources.time <= 0 && !modifiers.timeOutHandled) {
    handleTimeOut(reason);
  }
  renderResourcePanel();
}

function handleTimeOut(reason = "") {
  modifiers.timeOutHandled = true;
  stopCooking();
  if (difficulty().retry && !modifiers.timeRetryUsed) {
    modifiers.timeRetryUsed = true;
    resources.time = 90;
    resources.satisfaction = clamp(resources.satisfaction - 4, 0, 100);
    resourceLog.unshift({ reason: "TIME_OUT 新手重試", deltas: ["時間補回 1:30，但滿意度 -4"] });
    coachLine.textContent = "時間用盡。新手模式容許一次重試，請調整策略。";
    modifiers.timeOutHandled = false;
    return;
  }
  if (currentDifficulty === "normal") {
    modifiers.timeOutPenalty = 18;
    resources.time = 30;
    resources.satisfaction = clamp(resources.satisfaction - 12, 0, 100);
    resourceLog.unshift({ reason: "TIME_OUT 扣分", deltas: ["普通模式保留任務，但總分會扣 18 分"] });
    coachLine.textContent = "時間用盡。普通模式不會即時失敗，但總分會大幅扣分。";
    return;
  }
  forcedOutcome = {
    title: "TIME_OUT",
    reason: `時間用盡，${currentDifficulty === "expert" ? "高手模式本關失敗" : "重試機會已用完，本關結束"}。${reason ? `觸發原因：${reason}` : ""}`
  };
  setTimeout(() => renderForcedResult(forcedOutcome.title, forcedOutcome.reason), 0);
}

function resourceLabel(key) {
  return { money: "銅錢", water: "食水", herbs: "藥材", time: "時間", satisfaction: "街坊滿意度" }[key] || key;
}

function npcMood() {
  if (resources.satisfaction >= 86) return "😀";
  if (resources.satisfaction >= 70) return "🙂";
  if (resources.satisfaction >= 52) return "😐";
  return "😟";
}

function renderResourcePanel() {
  if (!resourcePanel) return;
  if (!activeTea) {
    resourcePanel.innerHTML = "";
    return;
  }
  const eventHtml = renderEventStrip();
  resourcePanel.innerHTML = `
    <div class="resource-grid">
      <span><b>銅錢</b>${resources.money}</span>
      <span><b>食水</b>${resources.water}L</span>
      <span><b>藥材</b>${resources.herbs}</span>
      <span><b>時間</b>${formatResourceValue("time", resources.time)}</span>
      <span><b>滿意度</b>${npcMood()} ${resources.satisfaction}%</span>
    </div>
    ${renderResourceWarnings()}
    ${eventHtml}
    ${resourceLog.length ? `<p class="resource-last">${resourceLog[0].reason}：${resourceLog[0].deltas.join("；")}</p>` : ""}
  `;
}

function renderResourceWarnings() {
  const warnings = [];
  if (resources.water <= 0) warnings.push("水量不足，無法繼續煲製。請購買水、減少份量或放棄本次任務。");
  if (resources.herbs <= 0) warnings.push("藥材不足，無法開始煲茶。");
  if (resources.money <= 0) warnings.push("銅錢不足，不能購買補給、使用高級感測器或升級設備。");
  if (resources.satisfaction <= 20) warnings.push("街坊信任危機：最終評價會下降。");
  if (!warnings.length) return "";
  return `<div class="resource-warnings">${warnings.map((warning) => `<span>${warning}</span>`).join("")}</div>`;
}

function renderEventStrip() {
  if (!activeEvents.length) {
    return `<div class="event-strip"><span><b>平穩開局</b>今日沒有突發事件，適合先熟習流程。</span></div>`;
  }
  return `
    <div class="event-strip event-choice-strip">
      ${activeEvents.map((event) => `
        <section class="event-card ${event.resolved ? "is-resolved" : ""}">
          <div>
            <b>${event.title}</b>
            <p>${event.text}</p>
            ${event.resolved ? `<small>已選擇：${event.choice?.label || "已處理"}。${event.choice?.text || ""}</small>` : ""}
          </div>
          ${event.resolved ? "" : `
            <div class="event-options">
              ${eventOptionsForMode(event).map((option) => {
                const disabled = !canApplyResourceEffects(option.effects);
                return `<button class="mini-button" type="button" data-event="${event.id}" data-event-option="${option.id}" ${disabled ? "disabled" : ""} title="${option.text}${disabled ? `（${blockedResourceMessage(option.effects)}）` : ""}">${option.label}</button>`;
              }).join("")}
            </div>
          `}
        </section>
      `).join("")}
    </div>
  `;
}

function eventOptionsForMode(event) {
  return event.options.slice(0, difficulty().eventChoices || 3);
}

function applyEventChoice(eventId, optionId) {
  const event = activeEvents.find((item) => item.id === eventId);
  if (!event || event.resolved) return;
  const option = event.options.find((item) => item.id === optionId);
  if (!option) return;
  if (!canApplyResourceEffects(option.effects)) {
    coachLine.textContent = blockedResourceMessage(option.effects);
    playSfx("wrong");
    return;
  }
  event.resolved = true;
  event.choice = option;
  applyModifierChanges(option.modifiers);
  applyResourceChange(option.effects, `${event.title}：${option.label}`);
  addInsight(`事件決策：${event.title}選擇「${option.label}」，後果是${option.text}`);
  playSfx("paper");
  renderResourcePanel();
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function addInsight(text) {
  if (!insightLog.includes(text)) insightLog.push(text);
}

function blankRecord() {
  return {
    saveVersion: SAVE_VERSION,
    completed: {},
    bestScores: {},
    archives: {},
    archiveAnswers: {},
    shop: { level: 1, coins: 0, reputation: 0, research: 0, culture: 0, upgrades: {} },
    lastPlayed: null
  };
}

function normalizeRecord(record = {}) {
  const upgrades = record.shop?.upgrades || {};
  const boughtCount = Object.values(upgrades).filter(Boolean).length;
  return {
    saveVersion: SAVE_VERSION,
    completed: record.completed || {},
    bestScores: record.bestScores || {},
    archives: record.archives || {},
    archiveAnswers: record.archiveAnswers || {},
    shop: {
      level: Math.max(record.shop?.level || 1, Math.min(5, 1 + boughtCount)),
      coins: record.shop?.coins || 0,
      reputation: record.shop?.reputation || 0,
      research: record.shop?.research || 0,
      culture: record.shop?.culture || 0,
      upgrades
    },
    lastPlayed: record.lastPlayed || null
  };
}

function migrateSaveData(store) {
  const migrated = store?.profiles ? store : { activePlayer: DEFAULT_PLAYER, profiles: { [DEFAULT_PLAYER]: store || blankRecord() } };
  migrated.saveVersion = SAVE_VERSION;
  migrated.activePlayer = sanitizePlayerName(migrated.activePlayer);
  migrated.profiles = migrated.profiles || {};
  Object.keys(migrated.profiles).forEach((player) => {
    migrated.profiles[player] = normalizeRecord(migrated.profiles[player]);
  });
  return migrated;
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
      return migrateSaveData(parsed);
    }

    const legacy = JSON.parse(localStorage.getItem(LEGACY_RECORD_KEY) || "{}");
    const migrated = {
      activePlayer: DEFAULT_PLAYER,
      profiles: {
        [DEFAULT_PLAYER]: {
          completed: legacy.completed || {},
          bestScores: legacy.bestScores || {},
          archives: legacy.archives || {},
          archiveAnswers: legacy.archiveAnswers || {},
          lastPlayed: legacy.lastPlayed || null
        }
      }
    };
    const ready = migrateSaveData(migrated);
    localStorage.setItem(RECORD_KEY, JSON.stringify(ready));
    return ready;
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
  return normalizeRecord(store.profiles[player] || blankRecord());
}

function saveRecord(record) {
  const store = loadRecordStore();
  const player = sanitizePlayerName(store.activePlayer);
  store.saveVersion = SAVE_VERSION;
  store.activePlayer = player;
  store.profiles[player] = normalizeRecord(record);
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

function hasUpgrade(id, record = loadRecord()) {
  return Boolean(record.shop?.upgrades?.[id]);
}

function upgradeEffects(record = loadRecord()) {
  return Object.entries(UPGRADES).reduce((effects, [id, upgrade]) => {
    if (!record.shop?.upgrades?.[id]) return effects;
    Object.entries(upgrade.effects || {}).forEach(([key, value]) => {
      effects[key] = (effects[key] || 0) + value;
    });
    return effects;
  }, {});
}

function buyUpgrade(id) {
  const upgrade = UPGRADES[id];
  if (!upgrade) return;
  const record = loadRecord();
  record.shop = record.shop || { level: 1, coins: 0, reputation: 0, research: 0, culture: 0, upgrades: {} };
  record.shop.upgrades = record.shop.upgrades || {};
  if (record.shop.upgrades[id]) {
    coachLine.textContent = `${upgrade.name} 已經購買，不需要重複購買。`;
    return;
  }
  if (activeTea && resources.money <= 0) {
    coachLine.textContent = "任務中的銅錢已用盡，不能即場升級設備。請先完成或重開任務。";
    playSfx("wrong");
    return;
  }
  if ((record.shop.coins || 0) < upgrade.cost) {
    coachLine.textContent = `研習幣不足，購買 ${upgrade.name} 需要 ${upgrade.cost}，目前只有 ${record.shop.coins || 0}。`;
    playSfx("wrong");
    return;
  }
  record.shop.coins -= upgrade.cost;
  record.shop.upgrades[id] = true;
  record.shop.level = Math.max(record.shop.level || 1, upgrade.level || 1, Math.min(5, 1 + Object.values(record.shop.upgrades).filter(Boolean).length));
  saveRecord(record);
  renderPersonalRecord(record);
  coachLine.textContent = `已購買 ${upgrade.name}。之後煲製和實驗會得到相應支援。`;
  playSfx("success");
}

function renderUpgradeShop(record) {
  const shop = record.shop || { coins: 0, upgrades: {} };
  return `
    <section class="upgrade-shop">
      <div class="shop-head">
        <h4>升級茶舖</h4>
        <span>研習幣 ${shop.coins || 0}</span>
      </div>
      <div class="upgrade-grid">
        ${Object.entries(UPGRADES).map(([id, upgrade]) => {
          const bought = Boolean(shop.upgrades?.[id]);
          const affordable = (shop.coins || 0) >= upgrade.cost;
          return `
            <article class="${bought ? "is-owned" : ""}">
              <strong>Lv.${upgrade.level} ${upgrade.name}</strong>
              <p>${upgrade.text}</p>
              <button class="mini-button" type="button" data-buy-upgrade="${id}" ${bought || !affordable ? "disabled" : ""}>
                ${bought ? "已擁有" : `購買 ${upgrade.cost}`}
              </button>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function updateRecord(total, breakdown = null) {
  const record = loadRecord();
  record.completed[activeTea.id] = true;
  record.bestScores[activeTea.id] = Math.max(record.bestScores[activeTea.id] || 0, total);
  record.shop = record.shop || { level: 1, coins: 0, reputation: 0, research: 0, culture: 0, upgrades: {} };
  record.shop.upgrades = record.shop.upgrades || {};
  record.shop.coins += Math.max(24, Math.round(total * 0.72));
  record.shop.reputation += Math.max(1, Math.round(resources.satisfaction / 24));
  record.shop.research += Math.max(1, Math.round(((breakdown?.lab || 0) + (modifiers.research || 0)) / 4));
  record.shop.culture += Math.max(1, Math.round(((breakdown?.history || 0) + (modifiers.culture || 0)) / 4));
  record.shop.level = Math.max(record.shop.level || 1, Math.min(5, 1 + Object.values(record.shop.upgrades).filter(Boolean).length));
  record.lastPlayed = {
    teaId: activeTea.id,
    teaName: activeTea.name,
    score: total,
    breakdown,
    resources: { ...resources },
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
  const archiveState = archiveProgress(record);
  const player = currentPlayerName();
  const shop = record.shop || { level: 1, coins: 0, reputation: 0, research: 0, culture: 0 };
  personalRecordPanel.innerHTML = `
    <section class="record-card">
      <div>
        <span class="era-chip">個人記錄</span>
        <h3>${master ? "涼茶宗師徽章已解鎖" : "涼茶任務收集中"}</h3>
        <p>目前身份：<b>${escapeHtml(player)}</b>。已完成 ${completed.length}/${teas.length} 款涼茶任務，已解鎖 ${archiveState.unlocked.length}/${archiveState.requiredIds.length} 份歷史檔案。完成全部任務可得到「涼茶宗師」徽章。</p>
        <p class="shop-progress">涼茶舖等級 ${shop.level}/5 · 研習幣 ${shop.coins} · 街坊信任 ${shop.reputation} · 科研點 ${shop.research} · 文化點 ${shop.culture}</p>
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
            ${record.completed[tea.id] ? "已完成" : "未完成"} · ${tea.name}${archiveForTea(tea) ? ` · ${record.archives?.[tea.id] ? "檔案已讀" : "檔案未解鎖"}` : " · 入門任務"}${record.bestScores[tea.id] ? ` · 最高 ${record.bestScores[tea.id]}` : ""}
          </span>
        `).join("")}
      </div>
      ${renderUpgradeShop(record)}
    </section>
  `;
}

function setStage(name, title, label, options = {}) {
  document.querySelectorAll(".stage").forEach((stage) => stage.classList.remove("active-stage"));
  $(`#${name}-screen`).classList.add("active-stage");
  stageTitle.textContent = title;
  stageLabel.textContent = label;
  const sceneMap = { history: activeTea ? "street" : "menu", gather: "ingredient", prep: "ingredient", cook: "brewing", lab: "lab", innovation: "innovation", result: "result" };
  setAudioScene(sceneMap[name] || "menu");
  renderResourcePanel();
  if (options.scroll !== false) {
    requestAnimationFrame(() => {
      $("#game-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
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

function archiveForTea(tea) {
  return archiveUnlocks[tea.id];
}

function isTeaUnlocked(tea, record = loadRecord()) {
  const archive = archiveForTea(tea);
  return !archive || Boolean(record.archives?.[tea.id]);
}

function archiveProgress(record = loadRecord()) {
  const requiredIds = Object.keys(archiveUnlocks);
  const unlocked = requiredIds.filter((id) => record.archives?.[id]);
  return { requiredIds, unlocked };
}

function renderArchiveUnlock(tea, record) {
  const archive = archiveForTea(tea);
  if (!archive || record.archives?.[tea.id]) return "";
  return `<p class="archive-teaser">鎖定考證：點擊卡片進入歷史檔案館，完成兩道推理題後解鎖配方。</p>`;
}

function renderTeaGrid() {
  const record = loadRecord();
  teaGrid.innerHTML = teas.map((tea) => {
    const unlocked = isTeaUnlocked(tea, record);
    const archive = archiveForTea(tea);
    return `
      <article class="tea-card ${unlocked ? "" : "is-locked"} ${archive ? "has-archive" : "starter-card"}">
        <button class="tea-card-main" type="button" data-tea="${tea.id}" aria-disabled="${unlocked ? "false" : "true"}">
          <span class="tea-image sprite" style='${spriteStyle("tea", tea.sprite)}' role="img" aria-label="${tea.name}"></span>
          <span class="tea-card-content">
            <span class="era-chip">${tea.level} · ${tea.concept}</span>
            ${record.completed[tea.id] ? `<span class="complete-chip">已完成${record.bestScores[tea.id] ? ` · ${record.bestScores[tea.id]}分` : ""}</span>` : ""}
            ${archive && unlocked ? `<span class="archive-chip">史料已解鎖</span>` : ""}
            <h3>${tea.name}</h3>
            <p>${tea.summary}</p>
            <span class="start-chip">${unlocked ? "開始課堂任務" : "鎖定考證：歷史檔案解鎖"}</span>
          </span>
        </button>
        ${renderArchiveUnlock(tea, record)}
      </article>
    `;
  }).join("");
  renderPersonalRecord(record);
}

function renderArchiveQuestion(question, questionIndex) {
  const inputType = question.type === "multi" ? "checkbox" : "radio";
  return `
    <section class="archive-question">
      <span class="era-chip">${question.tag}</span>
      <h4>${question.question}</h4>
      <div class="archive-options">
        ${question.options.map((option, optionIndex) => `
          <label class="archive-option">
            <input
              type="${inputType}"
              name="archive-q-${questionIndex}"
              value="${optionIndex}"
              data-question-index="${questionIndex}"
            />
            <span>${option}</span>
          </label>
        `).join("")}
      </div>
      <p class="archive-explain" id="archive-explain-${questionIndex}"></p>
    </section>
  `;
}

function openArchiveModal(teaId) {
  const tea = teas.find((item) => item.id === teaId);
  const archive = archiveUnlocks[teaId];
  if (!tea || !archive || !archiveModalRoot) return;
  setAudioScene("archive");
  archiveModalRoot.innerHTML = `
    <div class="archive-modal-backdrop" role="presentation"></div>
    <section class="archive-modal" role="dialog" aria-modal="true" aria-labelledby="archive-modal-title">
      <div class="archive-modal-head">
        <div>
          <span class="era-chip">歷史檔案館</span>
          <h3 id="archive-modal-title">${archive.label}</h3>
          <p>精讀電子史料，完成歷史情境題與 STEAM 科學整合題，才可解鎖「${tea.name}」配方。</p>
        </div>
        <button class="icon-button archive-close" type="button" aria-label="關閉歷史檔案館">×</button>
      </div>
      <div class="archive-documents">
        ${archive.documents.map((doc) => `
          <article class="archive-document">
            ${doc.sourceType ? `<span class="source-type">${doc.sourceType}</span>` : ""}
            <h4>${doc.title}</h4>
            <p>${doc.text}</p>
          </article>
        `).join("")}
      </div>
      <form class="archive-report" data-archive-report="${teaId}">
        ${archive.questions.map((question, index) => renderArchiveQuestion(question, index)).join("")}
        <p class="archive-feedback" id="archive-modal-feedback">請完成所有考證題，然後提交考證報告。</p>
        <div class="button-row">
          <button class="solid-button" type="submit">提交考證報告</button>
          <button class="ghost-button archive-close" type="button">稍後再讀</button>
        </div>
      </form>
    </section>
  `;
  document.body.classList.add("has-archive-modal");
}

function closeArchiveModal() {
  archiveModalRoot && (archiveModalRoot.innerHTML = "");
  document.body.classList.remove("has-archive-modal");
  setAudioScene(activeTea ? "street" : "menu");
}

function selectedArchiveAnswers(questionIndex) {
  return [...document.querySelectorAll(`[name="archive-q-${questionIndex}"]:checked`)]
    .map((input) => Number(input.value))
    .sort((a, b) => a - b);
}

function sameAnswers(selected, answers) {
  const expected = [...answers].sort((a, b) => a - b);
  return selected.length === expected.length && selected.every((value, index) => value === expected[index]);
}

function verifyArchiveReport(teaId) {
  const archive = archiveUnlocks[teaId];
  const tea = teas.find((item) => item.id === teaId);
  if (!archive || !tea) return;

  const answerSnapshots = [];
  const results = archive.questions.map((question, index) => {
    const selected = selectedArchiveAnswers(index);
    const correct = sameAnswers(selected, question.answers);
    answerSnapshots.push({
      tag: question.tag,
      question: question.question,
      selected,
      selectedText: selected.map((optionIndex) => question.options[optionIndex]),
      answers: question.answers,
      answerText: question.answers.map((optionIndex) => question.options[optionIndex])
    });
    const explain = $(`#archive-explain-${index}`);
    if (explain) {
      explain.textContent = `${correct ? "正確。" : "未完成或答案未準確。"}${question.explain}`;
      explain.classList.toggle("is-correct", correct);
      explain.classList.toggle("is-wrong", !correct);
    }
    return correct;
  });

  const feedback = $("#archive-modal-feedback");
  if (!results.every(Boolean)) {
    if (feedback) feedback.textContent = "考證未通過：請重新閱讀文獻，留意人物處境、社會背景與科學變數。";
    coachLine.textContent = "先別急著煲茶。評審想看見你由史料推論問題，再用 STEAM 作出合理決策。";
    return;
  }

  const record = loadRecord();
  record.archives[teaId] = true;
  record.archiveAnswers[teaId] = answerSnapshots;
  saveRecord(record);
  addInsight(`歷史檔案館：${archive.successText}`);
  if (feedback) {
    feedback.innerHTML = `
      <b>${archive.successTitle}</b><br />
      【解鎖回饋】${archive.successText}<br />
      【遊戲道具解鎖】${archive.unlockEffect}<br />
      【任務指引】${archive.taskHint}
    `;
  }
  coachLine.textContent = `考證成功！${tea.name} 已解鎖。你已把歷史閱讀轉化成遊戲內的解難資源。`;
  renderTeaGrid();
  setTimeout(closeArchiveModal, 2200);
}

function renderGuide() {
  guide.innerHTML = ingredients.map((item) => `
    <article class="ingredient-card guide-card">
      ${renderIngredientPhoto(item)}
      <span class="tag-pill">${item.tag}</span>
      <strong>${item.name}</strong>
      <p>${item.clue}</p>
      <ul class="specimen-notes">${ingredientSpecimen(item).map((note) => `<li>${note}</li>`).join("")}</ul>
      <small>${item.lore}</small>
    </article>
  `).join("");
}

function renderIngredientPhoto(item) {
  return `
    <span class="ingredient-image ingredient-photo" role="img" aria-label="${item.name}真實圖片">
      <img src="./assets/ingredient-photos/${item.id}.jpg" alt="${item.name}" loading="lazy" />
    </span>
  `;
}

function renderSpecimenImage(item) {
  return `
    <span class="ingredient-image specimen-image specimen-${item.id}" role="img" aria-label="${item.name}藥材外觀">
      <i></i><i></i><i></i><i></i>
    </span>
  `;
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
  if (!activeTea) return;
  if (!isTeaUnlocked(activeTea)) {
    coachLine.textContent = "這張任務卡仍未解鎖。請進入歷史檔案館，完成考證報告後再開始任務。";
    openArchiveModal(activeTea.id);
    return;
  }
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
  reliabilityAnswered = false;
  reliabilityCorrect = false;
  hintsUsed = 0;
  insightLog = [];
  const config = configForTea(activeTea);
  lab = { water: config.labTarget.water, time: config.labTarget.brewTime, heat: 55, ratio: 100 };
  labInquiry = defaultLabInquiry();
  labMetrics = calculateLabMetrics();
  innovation = { product: null, sensor: null, audience: null, value: null };
  innovationAppliedEffects = { product: null, sensor: null, audience: null, value: null };
  innovationJustification = "";
  intelUnlocked = false;
  lastScoreBreakdown = null;
  resetResources();
  stopNeedle();
  stopCooking();
  coachLine.textContent = `今日你是涼茶舖小師傅。任務是煲好「${activeTea.name}」，再把歷史變成 STEAM 創新方案。`;
  renderHistory();
  history.replaceState(null, "", "#game-panel");
  requestAnimationFrame(() => {
    $("#game-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function renderHistory() {
  const question = activeTea.historyQuestion;
  const dilemma = activeTea.dilemma;
  const frame = socialProblemFrames[activeTea.id];
  $("#history-screen").innerHTML = `
    <div class="history-layout">
      <div class="history-visual-wrap">
        <div class="history-visual sprite" style='${spriteStyle("tea", activeTea.sprite)}' role="img" aria-label="${activeTea.name}"></div>
        ${renderNpcCard(activeTea)}
        <div class="mission-card">
          <span class="era-chip">街坊個案</span>
          <p>${activeTea.scenario}</p>
        </div>
      </div>
      <div class="history-copy">
        <span class="era-chip">${activeTea.level}任務 · ${activeTea.concept}</span>
        <h3>${activeTea.name}</h3>
        <p>${activeTea.story}</p>
        ${frame ? `
          <section class="research-chain" aria-label="閱讀到解難流程">
            <span class="era-chip">本關研究鏈</span>
            <p><b>讀史料：</b>${frame.reading}</p>
            <p><b>推論問題：</b>${frame.problem}</p>
            <p><b>STEAM 解難：</b>用配方實驗、數據觀察和創新方案回應問題。</p>
          </section>
        ` : ""}
        ${renderTargetContext(activeTea)}
        ${renderIntelPanel(activeTea)}
        <div class="learning-goals">
          ${activeTea.learningGoals.map((goal) => `<span>${goal}</span>`).join("")}
        </div>
        <div id="fact-strip-wrap">${renderFactStrip()}</div>
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
        ${currentDifficulty === "expert" ? renderReliabilityQuestion() : ""}
        <button class="solid-button" type="button" id="start-gather">開始採藥</button>
      </div>
    </div>
  `;
  $("#start-gather").addEventListener("click", () => {
    if (activeEvents.some((event) => !event.resolved)) {
      coachLine.textContent = "請先在資源欄處理今日的社區事件，再開始採藥。事件選擇會影響後續煲製。";
      playSfx("wrong");
      return;
    }
    renderGather();
  });
  $("#unlock-intel")?.addEventListener("click", unlockIntel);
  document.querySelectorAll("[data-history-answer]").forEach((button) => {
    button.addEventListener("click", () => verifyHistory(Number(button.dataset.historyAnswer)));
  });
  document.querySelectorAll("[data-dilemma-answer]").forEach((button) => {
    button.addEventListener("click", () => verifyDilemma(Number(button.dataset.dilemmaAnswer)));
  });
  document.querySelectorAll("[data-reliability-answer]").forEach((button) => {
    button.addEventListener("click", () => verifyReliability(Number(button.dataset.reliabilityAnswer)));
  });
  setStage("history", activeTea.name, "第一關：理解情境");
}

function renderReliabilityQuestion() {
  return `
    <section class="history-quiz source-reliability" aria-live="polite">
      <span class="source-type">【Source Reliability】</span>
      <h4>${sourceReliabilityQuestion.question}</h4>
      <div class="choice-row">
        ${sourceReliabilityQuestion.options.map((option, index) => `<button class="choice-button" type="button" data-reliability-answer="${index}">${option}</button>`).join("")}
      </div>
      <p id="reliability-feedback">高手模式要判斷資料的年代、作者、目的和局限。</p>
    </section>
  `;
}

function renderTargetContext(tea) {
  const config = configForTea(tea);
  const [minTime, maxTime] = config.historicalRange.brewTime;
  const [minWater, maxWater] = config.historicalRange.water;
  return `
    <section class="target-context">
      <article>
        <span class="source-type">【歷史資料】</span>
        <p>傳統煲製約 ${minTime}-${maxTime} 分鐘，水量約 ${minWater}-${maxWater} ml，火候多為「${config.historicalRange.heat}」。</p>
      </article>
      <article>
        <span class="source-type">【遊戲模擬】</span>
        <p>${simulationTargetText(tea)}</p>
      </article>
    </section>
  `;
}

function simulationTargetText(tea = activeTea) {
  const config = configForTea(tea);
  if (difficulty().revealTargets) {
    return `本遊戲為課堂節奏縮短成模擬操作；評分目標為水量 ${config.simulationTarget.water} ml、時間 ${config.simulationTarget.brewTime} 分鐘、火候「${heatTargetLabel(tea)}」。`;
  }
  if (currentDifficulty === "expert") {
    return `本遊戲為課堂節奏縮短成模擬操作；高手模式隱藏精確目標，請根據史料、NPC 症狀、茶色與火候推斷。`;
  }
  return `本遊戲為課堂節奏縮短成模擬操作；請根據史料判斷水量、時間與「${heatTargetLabel(tea)}」是否配合。`;
}

function renderNpcCard(tea) {
  return `
    <article class="npc-card npc-${tea.npc.type}" aria-label="NPC 角色">
      <div class="npc-portrait">
        <img src="./assets/npc/${tea.npc.type}.jpg" alt="${tea.npc.name}" loading="lazy" />
        <span class="npc-symbol" aria-hidden="true">${tea.npc.symbol}</span>
      </div>
      <div>
        <span class="era-chip">NPC 來店</span>
        <h4>${tea.npc.name}</h4>
        <p>${tea.npc.role}</p>
      </div>
    </article>
  `;
}

function renderIntelPanel(tea) {
  return `
    <section class="intel-card ${intelUnlocked ? "is-unlocked" : ""}" aria-label="歷史情報">
      <div class="intel-head">
        <span class="era-chip">史料情報</span>
        <strong id="intel-status">${intelUnlocked ? "已整理成破關線索" : "閱讀後可解鎖配方與火候"}</strong>
      </div>
      <h4>${tea.intel.title}</h4>
      <p class="source-text">${tea.intel.source}</p>
      <ul>
        ${tea.intel.clues.map((clue) => `<li>${clue}</li>`).join("")}
      </ul>
      <p class="recipe-hint">${tea.intel.recipeHint}</p>
      <button class="solid-button" type="button" id="unlock-intel" ${intelUnlocked ? "disabled" : ""}>整理情報線索</button>
    </section>
  `;
}

function renderFactStrip() {
  const config = configForTea(activeTea);
  const waterText = !intelUnlocked ? "閱讀情報後解鎖" : difficulty().revealTargets ? `${config.simulationTarget.water} ml` : currentDifficulty === "expert" ? "由茶色與藥材推斷" : "避免過濃或過淡";
  const timeText = !intelUnlocked ? "閱讀情報後解鎖" : difficulty().revealTargets ? `${config.simulationTarget.brewTime} 分鐘` : currentDifficulty === "expert" ? "由史料與火候推斷" : "按藥材類型估算";
  return `
    <div class="fact-strip ${intelUnlocked ? "" : "is-locked"}" aria-label="煲製資料">
      <div><span>模擬水量</span><strong>${waterText}</strong></div>
      <div><span>模擬時間</span><strong>${timeText}</strong></div>
      <div><span>味道記憶</span><strong>${intelUnlocked ? activeTea.taste : "從 NPC 線索推敲"}</strong></div>
    </div>
  `;
}

function unlockIntel() {
  if (intelUnlocked || !activeTea) return;
  intelUnlocked = true;
  hintsUsed = Math.max(0, hintsUsed - 1);
  addInsight(`史料情報：${activeTea.intel.recipeHint}`);
  $("#intel-status") && ($("#intel-status").textContent = "已整理成破關線索");
  $(".intel-card")?.classList.add("is-unlocked");
  $("#unlock-intel") && ($("#unlock-intel").disabled = true);
  $("#fact-strip-wrap") && ($("#fact-strip-wrap").innerHTML = renderFactStrip());
  applyResourceChange({ time: 6, satisfaction: 3 }, "整理史料情報，少走冤枉路");
  playSfx("paper");
  coachLine.textContent = "情報整理完成。讀懂史料，就等於拿到配方、火候和服務對象的破關提示。";
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
  playSfx(dilemmaCorrect ? "correct" : "wrong");
  applyResourceChange(
    dilemmaCorrect ? { satisfaction: 6, time: -4 } : { satisfaction: -6, time: -8 },
    dilemmaCorrect ? `${activeTea.npc.name}覺得你理解他的處境` : `${activeTea.npc.name}仍未感到被理解`
  );
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
  playSfx(historyCorrect ? "correct" : "wrong");
  applyResourceChange(
    historyCorrect ? { money: 4, satisfaction: 4 } : { time: -6, satisfaction: -3 },
    historyCorrect ? "史料推理準確，街坊更信任你" : "史料推理未準確，需要多花時間補救"
  );
  coachLine.textContent = historyCorrect ? "文化分到手。懂得來龍去脈，煲出來才不只是糖水。" : "答錯也算學到。下一步用手藝補分。";
}

function verifyReliability(answerIndex) {
  if (reliabilityAnswered) return;
  reliabilityAnswered = true;
  reliabilityCorrect = answerIndex === sourceReliabilityQuestion.answer;
  $("#reliability-feedback").textContent = reliabilityCorrect
    ? `判斷正確。${sourceReliabilityQuestion.explain}`
    : `這個結論證據不足。${sourceReliabilityQuestion.explain}`;
  markChoiceButtons("[data-reliability-answer]", sourceReliabilityQuestion.answer, answerIndex, reliabilityCorrect);
  applyModifierChanges(reliabilityCorrect ? { culture: 4, research: 3, authenticity: 2 } : { authenticity: -3 });
  applyResourceChange(
    reliabilityCorrect ? { satisfaction: 3, time: -3 } : { time: -8, satisfaction: -3 },
    reliabilityCorrect ? "史料可靠性判斷準確" : "史料可靠性判斷需修正"
  );
  addInsight(sourceReliabilityQuestion.explain);
  playSfx(reliabilityCorrect ? "correct" : "wrong");
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
                  ${renderIngredientPhoto(item)}
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
    const penalty = difficulty().hintPenalty;
    gatherScore = Math.max(0, gatherScore - penalty);
    applyResourceChange({ time: -2 }, `使用提示，採藥分扣 ${penalty} 分`);
    playSfx("paper");
    document.querySelector(".mobile-progress div:first-child strong").textContent = gatherScore;
    document.querySelector(".mobile-progress div:nth-child(3) strong").textContent = hintsUsed;
  });
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => verifyIngredient(button.dataset.answer));
  });
  setStage("gather", "採藥問答", "第二關：辨認藥材", { scroll: gathered.size === 0 && wrongPicks === 0 });
}

function verifyIngredient(answerId) {
  const expectedId = activeTea.ingredients.find((id) => !gathered.has(id));
  if (!expectedId) return;
  if (answerId === expectedId) {
    gathered.add(answerId);
    const item = ingredientById(answerId);
    addInsight(`${item.name}：${item.lore}`);
    applyResourceChange({ herbs: 3, satisfaction: 2 }, `採到正確藥材：${item.name}`);
    playSfx("herb");
    coachLine.textContent = `答中：${item.name}。你不只認得名字，也把它放回嶺南生活脈絡。`;
    renderGather();
  } else {
    wrongPicks += 1;
    const penalty = difficulty().wrongPenalty;
    gatherScore = Math.max(0, gatherScore - penalty);
    applyResourceChange({ herbs: -3, money: -2, satisfaction: -4 }, `${ingredientById(answerId).name} 不是這一味，採藥分扣 ${penalty} 分`);
    playSfx("wrong");
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
        ${renderIngredientPhoto(item)}
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
  applyResourceChange(hit ? { herbs: 2, satisfaction: 2 } : { herbs: -2, time: -3 }, hit ? "炮製手勢準確，藥材香氣保存" : "炮製時機偏差，需要用時間補救");
  playSfx(hit ? "correct" : "wrong");
  coachLine.textContent = hit ? "手勢漂亮。老店師傅會點頭，雖然未必會把祖傳秘方告訴你。" : "差一點點。藥材還能用，只是香氣沒那麼完整。";
  prepIndex += 1;
  if (prepIndex >= activeTea.ingredients.length) {
    stopNeedle();
    renderCook();
  } else {
    renderPrepStep();
  }
}

function maxWaterAvailableMl() {
  const config = configForTea(activeTea);
  const cap = Math.max(600, Math.round(config.simulationTarget.water * 1.45 + (modifiers.maxWaterMl || 0)));
  return Math.min(cap, (resources.water || 0) * 100);
}

function canAddWater(change) {
  if (change <= 0) return true;
  return resources.water > 0 && water + change <= maxWaterAvailableMl();
}

function estimatedCookTemperature() {
  if (heat === "high") return Math.min(100, 92 + Math.floor(cookTime / 6));
  if (heat === "medium") return Math.min(88, 72 + Math.floor(cookTime / 8));
  if (heat === "low") return Math.min(72, 58 + Math.floor(cookTime / 10));
  return Math.max(28, 42 - Math.floor(cookTime / 12));
}

function autoTemperatureAlert() {
  if (containsIngredient("honeysuckle") && heat === "high" && cookTime > 8) {
    return "智能煲警示：花葉類藥材正在高溫久煮，請轉中火或提早出爐。";
  }
  const target = configForTea(activeTea).simulationTarget;
  if (Math.abs(cookTime - target.brewTime) <= 3 && heat === target.heat) {
    return "智能煲警示：接近最佳火候區，可準備完成出爐。";
  }
  return "智能煲正在監察溫度與時間。";
}

function renderBrewResourceActions() {
  const waterProblem = resources.water <= 0;
  const herbProblem = resources.herbs <= 0;
  if (!waterProblem && !herbProblem) return "";
  return `
    <section class="resource-actions">
      <h4>${waterProblem ? "水量不足，無法繼續煲製" : "藥材不足，無法開始煲茶"}</h4>
      <div class="button-row">
        ${waterProblem ? `
          <button class="mini-button" type="button" data-brew-action="buy-water">購買水</button>
          <button class="mini-button" type="button" data-brew-action="smaller-serving">減少份量</button>
        ` : ""}
        ${herbProblem ? `<button class="mini-button" type="button" data-brew-action="buy-herbs">購買藥材</button>` : ""}
        <button class="mini-button danger-button" type="button" data-brew-action="abandon">放棄本次任務</button>
      </div>
    </section>
  `;
}

function handleBrewResourceAction(action) {
  if (action === "buy-water") {
    const effects = { money: -20, water: 20 };
    if (!canApplyResourceEffects(effects)) {
      coachLine.textContent = "銅錢不足，不能購買額外食水。";
      playSfx("wrong");
      return;
    }
    applyResourceChange(effects, "購買額外食水");
  }
  if (action === "smaller-serving") {
    applyModifierChanges({ tasteQuality: -5, communityImpact: -3 });
    applyResourceChange({ water: 8, satisfaction: -6 }, "減少份量，換取少量食水");
  }
  if (action === "buy-herbs") {
    const effects = { money: -24, herbs: 12 };
    if (!canApplyResourceEffects(effects)) {
      coachLine.textContent = "銅錢不足，不能購買額外藥材。";
      playSfx("wrong");
      return;
    }
    applyResourceChange(effects, "購買額外藥材");
  }
  if (action === "abandon") {
    forcedOutcome = { title: "任務放棄", reason: "你選擇停止本次煲製，保留反思但本關不會得分。" };
    renderForcedResult(forcedOutcome.title, forcedOutcome.reason);
    return;
  }
  playSfx("click");
  renderCook();
}

function brewingIntensity() {
  const target = configForTea(activeTea).simulationTarget;
  const closeness = 100 - Math.abs(cookTime - target.brewTime) * 5;
  if (closeness >= 84 && heat === target.heat) return 2;
  if (heat !== "off") return 1;
  return 0;
}

function renderCook() {
  const config = configForTea(activeTea);
  const effects = upgradeEffects();
  const canReadTemperature = hasUpgrade("thermometer") || hasUpgrade("smartPot");
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
          <span class="pot-belly">
            <span class="tea-liquid"></span>
            <span class="bubble bubble-one"></span>
            <span class="bubble bubble-two"></span>
            <span class="bubble bubble-three"></span>
          </span>
          <span class="pot-handle left"></span>
          <span class="pot-handle right"></span>
          <span class="pot-foot"></span>
          <span class="fire-glow"></span>
        </div>
      </div>
      <div class="cook-controls">
        <section class="target-context compact-target">
          <article>
            <span class="source-type">【歷史資料】</span>
            <p>${activeTea.name} 傳統煲製約 ${config.historicalRange.brewTime[0]}-${config.historicalRange.brewTime[1]} 分鐘。</p>
          </article>
          <article>
            <span class="source-type">【遊戲模擬】</span>
            <p>${simulationTargetText(activeTea)}</p>
          </article>
        </section>
        <div class="control-group">
          <h3>水量控制</h3>
          ${renderModeHint("water")}
          <p>目前 <strong id="water-value">${water}</strong> ml。可用水量上限約 ${maxWaterAvailableMl()} ml。</p>
          <div class="meter-line"><span id="water-fill" class="meter-fill"></span></div>
          ${renderBrewResourceActions()}
          <div class="button-row">
            <button class="mini-button" type="button" data-water="100">加 100 ml</button>
            <button class="mini-button" type="button" data-water="500">加 500 ml</button>
            <button class="mini-button" type="button" data-water="-100">減 100 ml</button>
          </div>
        </div>
        <div class="control-group">
          <h3>火候選擇</h3>
          ${renderModeHint("heat")}
          <p>現在是 <strong id="heat-value">${heatLabel()}</strong>。${canReadTemperature ? `溫度計估算 ${estimatedCookTemperature()}°C。` : "購買溫度計後可查看實時溫度。"}</p>
          ${effects.autoTemperatureAlert ? `<p class="mode-hint mode-${currentDifficulty}">${autoTemperatureAlert()}</p>` : ""}
          <div class="button-row">
            <button class="mini-button" type="button" data-heat="high">猛火 100°C</button>
            <button class="mini-button" type="button" data-heat="medium">中火 80°C</button>
            <button class="mini-button" type="button" data-heat="low">文火 65°C</button>
            <button class="mini-button" type="button" data-heat="off">熄火</button>
          </div>
        </div>
        <div class="control-group">
          <h3>煲製時間</h3>
          ${renderModeHint("time")}
          <p>目前 <strong id="time-value">${cookTime}</strong> 分鐘。</p>
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
      const change = Number(button.dataset.water);
      if (change > 0 && !canAddWater(change)) {
        coachLine.textContent = resources.water <= 0 ? "水量不足，無法繼續煲製。請先購買水或減少份量。" : `超過本關可用水量上限 ${maxWaterAvailableMl()} ml，請改用少量多次或節水方案。`;
        playSfx("wrong");
        return;
      }
      water = Math.max(0, water + change);
      if (change > 0) {
        const waterCost = Math.max(1, Math.ceil((change / 100) * (1 - (effects.waterSaving || 0))));
        applyResourceChange({ water: -waterCost, satisfaction: change >= 500 ? -1 : 1 }, `加水 ${change} ml：茶味變淡、可服務口感怕苦的街坊`);
        playSfx("click");
      } else {
        applyResourceChange({ satisfaction: -1 }, `減水 ${Math.abs(change)} ml：濃度上升，但可能變苦`);
      }
      updateCookUi();
    });
  });
  document.querySelectorAll("[data-brew-action]").forEach((button) => {
    button.addEventListener("click", () => handleBrewResourceAction(button.dataset.brewAction));
  });
  document.querySelectorAll("[data-heat]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.heat !== "off" && resources.money <= 0) {
        coachLine.textContent = "銅錢不足，不能再添燃料或使用高耗能火候。";
        playSfx("wrong");
        return;
      }
      heat = button.dataset.heat;
      coachLine.textContent =
        heat === "medium" && containsIngredient("honeysuckle") ? "中火平煎正確。金銀花質地輕浮，微沸即可，能保留芳香成分。" :
        heat === "high" && containsIngredient("honeysuckle") ? "溫度過高。金銀花的揮發性有效成分會隨大量蒸氣流失，綠原酸也可能因久熱而降解。" :
        heat === "low" ? "文火適合久煲根莖或複方，水面只有細小氣泡。" :
        heat === "medium" ? "中火保持微沸，適合需要溫和釋放的花葉類藥材。" :
        heat === "high" ? "猛火會劇烈翻滾，適合短時間煮沸，不宜長時間強煎。" :
        "先熄火觀察，別忘記時間仍是分數關鍵。";
      if (heat !== "off") applyResourceChange({ money: -1, time: -2 }, `選擇${heatLabel()}，燃料與操作時間同步消耗`);
      playSfx("click");
      updateCookUi();
    });
  });
  $("#start-cook").addEventListener("click", startCooking);
  $("#finish-cook").addEventListener("click", finishCooking);
  updateCookUi();
  setStage("cook", "煲茶火候", "第四關：水量與時間");
}

function finishCooking() {
  stopCooking();
  if (forcedOutcome) return;
  if (water <= 0 || resources.water <= 0) {
    coachLine.textContent = "水量不足，無法完成煲製。請先購買水或減少份量。";
    playSfx("wrong");
    renderCook();
    return;
  }
  const quality = brewingQualityScore();
  const satisfactionDelta = quality >= 80 ? 8 : quality >= 60 ? 2 : -8;
  const waterDelta = water > configForTea(activeTea).simulationTarget.water * 1.25 ? -5 : 0;
  applyResourceChange(
    { satisfaction: satisfactionDelta, money: quality >= 75 ? 8 : 2, water: waterDelta },
    npcReactionForBrew(quality)
  );
  playSfx(quality >= 70 ? "success" : "wrong");
  renderLab();
}

function brewingQualityScore() {
  const config = configForTea(activeTea);
  const effects = upgradeEffects();
  const tolerance = 1 + (effects.timingTolerance || 0);
  const waterScore = Math.max(0, 100 - Math.abs(water - config.simulationTarget.water) / (12 * tolerance));
  const timeScore = Math.max(0, 100 - Math.abs(cookTime - config.simulationTarget.brewTime) * (4 / tolerance));
  const heatScore = heat === config.simulationTarget.heat ? 100 : heat === "off" ? 25 : 62;
  const flowerPenalty = containsIngredient("honeysuckle") && heat === "high" && cookTime > 8 ? 22 : 0;
  return Math.round(clamp((waterScore + timeScore + heatScore) / 3 - flowerPenalty + (modifiers.tasteQuality || 0) + (effects.heatStability || 0), 0, 100));
}

function npcReactionForBrew(quality) {
  if (quality >= 82) return `${activeTea.npc.name}：今次份量剛剛好，味道、火候同資源都平衡`;
  if (water > configForTea(activeTea).simulationTarget.water * 1.25) return `${activeTea.npc.name}：味道溫和，但今日剩返嘅水唔多`;
  if (quality < 55 && labMetrics?.bitterness > 80) return `${activeTea.npc.name}：太苦了，街坊未必飲得落`;
  return `${activeTea.npc.name}：可以入口，但火候和資源仍有改良空間`;
}

function heatLabel() {
  if (heat === "high") return "猛火";
  if (heat === "medium") return "中火";
  if (heat === "low") return "慢火";
  return "未開火";
}

function startCooking() {
  if (cookTimer) return;
  if (forcedOutcome) return;
  if (resources.herbs <= 0) {
    coachLine.textContent = "藥材不足，無法開始煲茶。請先購買補給或重新規劃份量。";
    playSfx("wrong");
    renderCook();
    return;
  }
  if (resources.water <= 0 || water <= 0) {
    coachLine.textContent = "水量不足，無法繼續煲製。請先處理食水問題。";
    playSfx("wrong");
    renderCook();
    return;
  }
  if (resources.money <= 0) {
    coachLine.textContent = "銅錢不足，不能再添燃料開始煲製。";
    playSfx("wrong");
    return;
  }
  if (heat === "off") {
    coachLine.textContent = "先開火。清水與藥草都準備好了，只欠火候。";
    return;
  }
  if (!cookStarted) {
    const herbCost = Math.max(5, activeTea.ingredients.length * 2);
    if (resources.herbs < herbCost) {
      coachLine.textContent = `藥材不足，這款茶至少需要 ${herbCost} 份藥材，現在只有 ${resources.herbs}。`;
      playSfx("wrong");
      renderCook();
      return;
    }
    cookStarted = true;
    applyResourceChange({ herbs: -herbCost, time: -6, money: -2 }, "開始煲製，藥材、燃料成本與課堂時間開始消耗");
  } else {
    applyResourceChange({ time: -3, money: -1 }, "繼續煲製，燃料與時間持續消耗");
  }
  if (forcedOutcome) return;
  playSfx("click");
  cookTimer = setInterval(() => {
    cookTime += heat === "high" ? difficulty().cookHighStep : heat === "medium" ? 3 : difficulty().cookLowStep;
    if (cookTime % 12 === 0) applyResourceChange({ time: -2, money: heat === "high" ? -2 : -1 }, "煲製持續進行，時間與燃料繼續消耗", { silent: true });
    setMusicIntensity(brewingIntensity());
    updateCookUi();
  }, 650);
}

function stopCooking() {
  if (cookTimer) clearInterval(cookTimer);
  cookTimer = null;
  setMusicIntensity(0);
}

function updateCookUi() {
  const config = configForTea(activeTea);
  $("#water-value") && ($("#water-value").textContent = water);
  $("#heat-value") && ($("#heat-value").textContent = heatLabel());
  $("#time-value") && ($("#time-value").textContent = cookTime);
  $("#water-fill")?.style.setProperty("--fill", `${Math.min(100, (water / config.simulationTarget.water) * 100)}%`);
  $("#time-fill")?.style.setProperty("--fill", `${Math.min(100, (cookTime / config.simulationTarget.brewTime) * 100)}%`);
  $(".pot-visual")?.style.setProperty("--steam-opacity", heat === "off" ? 0.08 : heat === "high" ? 0.88 : 0.58);
  $(".pot-visual")?.classList.toggle("is-cooking", heat !== "off");
  $(".pot-visual")?.classList.toggle("heat-high", heat === "high");
  $(".pot-visual")?.classList.toggle("heat-medium", heat === "medium");
  $(".pot-visual")?.classList.toggle("heat-low", heat === "low");
  $(".pot-visual")?.style.setProperty("--brew-depth", `${labMetrics?.color || teaColorEstimate()}%`);
}

function teaColorEstimate() {
  const darkFromSelfheal = containsIngredient("selfheal") ? 34 : 0;
  const yellowFromHoneysuckle = containsIngredient("honeysuckle") ? 12 : 0;
  const base = activeTea?.id === "twenty-four" ? 70 : activeTea?.id === "three-winter" ? 62 : 42;
  return Math.min(94, base + darkFromSelfheal + yellowFromHoneysuckle);
}

function calculateLabMetrics(sample = lab) {
  const config = configForTea(activeTea);
  const ratio = sample.ratio / 100;
  const concentration = Math.max(0.45, Math.min(1.9, (config.labTarget.water / sample.water) * ratio));
  const heatFactor = sample.heat / 55;
  const timeFactor = sample.time / config.labTarget.brewTime;
  const flowerPenalty = containsIngredient("honeysuckle") && sample.heat > 85 ? 16 : 0;
  const bitterness = Math.round(Math.min(100, 22 + concentration * 30 + timeFactor * 18 + (activeTea.id === "twenty-four" ? 22 : 0)));
  const accuracy = upgradeEffects().labAccuracy || 0;
  const temperature = Math.round(55 + sample.heat * 0.55 + Math.min(18, sample.time * 0.28) - accuracy * 0.35);
  const ph = Math.max(5.2, Math.min(7.4, 7.2 - concentration * 0.55 - timeFactor * 0.22 + (sample.water > config.labTarget.water ? 0.18 : 0)));
  const selfhealDark = containsIngredient("selfheal") ? 24 : 0;
  const honeysuckleYellow = containsIngredient("honeysuckle") ? 8 : 0;
  const color = Math.round(Math.min(100, 18 + concentration * 28 + timeFactor * 18 + heatFactor * 8 + selfhealDark + honeysuckleYellow));
  const heatSuitability =
    activeTea.preferredHeat === "medium" ? Math.max(0, 22 - Math.abs(sample.heat - 80) * 0.8) :
    activeTea.preferredHeat === "low" ? Math.max(0, 22 - Math.abs(sample.heat - 65) * 0.7) :
    Math.max(0, 18 - Math.abs(sample.heat - 95) * 0.5);
  const dampHeat = Math.round(Math.min(100, concentration * 34 + timeFactor * 22 + heatSuitability + (sample.water >= config.labTarget.water * 0.85 ? 10 : 0) - flowerPenalty));
  return { bitterness, temperature, ph: ph.toFixed(1), color, dampHeat, concentration: concentration.toFixed(2), flowerPenalty };
}

function labVariableLabel(value = labInquiry.variable) {
  return { water: "水量", time: "煲製時間", heat: "火力", ratio: "藥材比例" }[value] || "變項";
}

function labMetricLabel(value = labInquiry.result) {
  return { color: "茶色深度", temperature: "溫度", ph: "pH", concentration: "濃度" }[value] || "結果";
}

function trialValuesFor(variable) {
  const config = configForTea(activeTea);
  const values = {
    water: [config.labTarget.water * 0.8, config.labTarget.water, config.labTarget.water * 1.2],
    time: [config.labTarget.brewTime * 0.6, config.labTarget.brewTime, config.labTarget.brewTime * 1.4],
    heat: [55, 78, 95],
    ratio: [70, 100, 130]
  }[variable] || [1, 2, 3];
  return values.map((value) => Math.round(value));
}

function runLabTrials() {
  if (!labInquiry.hypothesis) {
    coachLine.textContent = "請先提出 Hypothesis，再進行三次試驗。";
    playSfx("wrong");
    return;
  }
  const values = trialValuesFor(labInquiry.variable);
  labInquiry.trials = values.map((value, index) => {
    const sample = { ...lab, [labInquiry.variable]: value };
    const metrics = calculateLabMetrics(sample);
    return { trial: index + 1, value, sample, metrics };
  });
  labInquiry.evidence = null;
  addInsight(`Lab 探究：以${labVariableLabel()}為自變項，完成三次模擬試驗。`);
  playSfx("sensor");
  renderLab();
}

function isLabInquiryComplete() {
  return Boolean(labInquiry.hypothesis && labInquiry.trials.length >= 3 && labInquiry.conclusion && labInquiry.evidence);
}

function renderLabChoiceGroup(key, title, choices) {
  return `
    <div class="lab-choice-group">
      <h4>${title}</h4>
      <div class="choice-row">
        ${choices.map((choice) => `
          <button class="choice-button ${labInquiry[key] === choice.id ? "is-correct" : ""}" type="button" data-lab-choice="${key}" data-value="${choice.id}">
            ${choice.label}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderTrialTable() {
  if (!labInquiry.trials.length) return `<p class="hint-text">選好假設、自變項與結果指標後，按「進行三次試驗」。</p>`;
  return `
    <table class="trial-table">
      <thead>
        <tr>
          <th>Trial</th>
          <th>${labVariableLabel()}</th>
          <th>Temperature</th>
          <th>Colour</th>
          <th>pH</th>
          <th>Concentration</th>
        </tr>
      </thead>
      <tbody>
        ${labInquiry.trials.map((trial) => `
          <tr>
            <td>${trial.trial}</td>
            <td>${trial.value}</td>
            <td>${trial.metrics.temperature}</td>
            <td>${trial.metrics.color}</td>
            <td>${trial.metrics.ph}</td>
            <td>${trial.metrics.concentration}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function resultValueForTrial(trial) {
  const value = trial.metrics[labInquiry.result];
  return Number(value);
}

function renderTrialGraph() {
  if (!labInquiry.trials.length) return "";
  const values = labInquiry.trials.map(resultValueForTrial);
  const max = Math.max(...values, 1);
  return `
    <div class="trial-graph" aria-label="試驗圖表">
      <div class="graph-head">
        <strong>X 軸：${labVariableLabel()}</strong>
        <strong>Y 軸：${labMetricLabel()}</strong>
      </div>
      ${labInquiry.trials.map((trial) => {
        const value = resultValueForTrial(trial);
        return `
          <div class="graph-row">
            <span>Trial ${trial.trial}</span>
            <i style="--bar:${Math.max(8, (value / max) * 100)}%"></i>
            <b>${value}</b>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function evidenceChoices() {
  if (labInquiry.trials.length < 3) return [];
  const first = labInquiry.trials[0];
  const last = labInquiry.trials[labInquiry.trials.length - 1];
  const firstResult = resultValueForTrial(first);
  const lastResult = resultValueForTrial(last);
  return [
    {
      id: "trend",
      label: `Trial 1-3 顯示${labVariableLabel()}由 ${first.value} 變成 ${last.value}，${labMetricLabel()}由 ${firstResult} 變成 ${lastResult}。`
    },
    {
      id: "single",
      label: `只看 Trial 2 的數據已足夠作結論。`
    },
    {
      id: "memory",
      label: `單靠記憶中的味道判斷，不需要數據。`
    }
  ];
}

function renderLabInquiry() {
  const variableChoices = [
    { id: "water", label: "Water 水量" },
    { id: "time", label: "Time 時間" },
    { id: "heat", label: "Heat 火力" },
    { id: "ratio", label: "Herb Ratio 藥材比例" }
  ];
  const metricChoices = [
    { id: "color", label: "Colour 茶色" },
    { id: "temperature", label: "Temperature 溫度" },
    { id: "ph", label: "pH" },
    { id: "concentration", label: "Concentration 濃度" }
  ];
  return `
    <section class="lab-inquiry">
      <div class="simulation-warning">本實驗室數據為遊戲模擬模型，用作學習變項、控制變量及數據分析，不代表真實藥效或醫療效果。</div>
      ${renderLabChoiceGroup("hypothesis", "Step 1 Hypothesis：增加煲製時間會令茶色變深。", [
        { id: "support", label: "支持" },
        { id: "not-support", label: "不支持" },
        { id: "unknown", label: "未能判斷" }
      ])}
      ${renderLabChoiceGroup("variable", "Step 2 Independent Variable：只改變一項自變項。", variableChoices)}
      ${renderLabChoiceGroup("result", "Step 3 Graph Y-axis：選擇觀察結果。", metricChoices)}
      <div class="button-row">
        <button class="solid-button" type="button" id="run-trials">進行三次試驗</button>
      </div>
      <div class="lab-data-block">
        <h4>Step 4 Data Table</h4>
        ${renderTrialTable()}
      </div>
      <div class="lab-data-block">
        <h4>Step 5 Graph</h4>
        ${renderTrialGraph()}
      </div>
      ${renderLabChoiceGroup("conclusion", "Step 6 Conclusion：數據是否支持原來的假設？", [
        { id: "support", label: "支持" },
        { id: "partial", label: "部分支持" },
        { id: "not-support", label: "不支持" },
        { id: "insufficient", label: "證據不足" }
      ])}
      <div class="lab-choice-group">
        <h4>Step 7 Evidence：選出最有力證據。</h4>
        <div class="choice-row">
          ${evidenceChoices().map((choice) => `
            <button class="choice-button ${labInquiry.evidence === choice.id ? "is-correct" : ""}" type="button" data-lab-choice="evidence" data-value="${choice.id}">
              ${choice.label}
            </button>
          `).join("") || "<p class='hint-text'>完成三次試驗後才可選證據。</p>"}
        </div>
      </div>
    </section>
  `;
}

function renderLab() {
  stopCooking();
  labMetrics = calculateLabMetrics();
  const hasPhSensor = hasUpgrade("phSensor");
  const hasThermometer = hasUpgrade("thermometer") || hasUpgrade("smartPot");
  $("#lab-screen").innerHTML = `
    <div class="lab-layout">
      <section class="lab-panel">
        <span class="era-chip">STEAM 科學探究</span>
        <h3>涼茶科學實驗室</h3>
        <p>調整水量、時間、火力和藥材比例，觀察苦味值、茶色、溫度、pH 與「濕熱應對指數」如何變化。這些數據會同時對照中醫藥學的「藥食同源」與「辨證論治」，讓學生明白涼茶是嶺南民間中醫智慧的實踐。</p>
        ${renderSlider("water", "水量", lab.water, 1200, 2600, 100, "ml")}
        ${renderSlider("time", "煲製時間", lab.time, 10, 60, 1, "分鐘")}
        ${renderSlider("heat", "火力（文火／武火）", lab.heat, 30, 100, 5, "%")}
        ${renderSlider("ratio", "藥材比例", lab.ratio, 60, 150, 5, "%")}
        ${renderTcmLabBridge()}
        ${renderFormulaNote()}
        ${renderLabInquiry()}
        <div class="button-row">
          <button class="solid-button" type="button" id="record-lab">記錄實驗結果</button>
          <button class="ghost-button" type="button" id="go-innovation" ${isLabInquiryComplete() ? "" : "disabled"}>進入創新方案</button>
        </div>
        <p class="mode-hint mode-${currentDifficulty}">${isLabInquiryComplete() ? "探究記錄完整，可以進入創新方案。" : "請完成 Hypothesis、三次 Trial、Conclusion 和 Evidence，才可進入創新方案。"}</p>
      </section>
      <section class="lab-dashboard" aria-live="polite">
        ${renderMetric("苦味值", labMetrics.bitterness, "越高越苦，適合討論可接受味道與藥材濃度。")}
        ${renderMetric("茶色深度", labMetrics.color, "由藥材比例、時間和火力共同影響。")}
        ${renderMetric("濕熱應對指數", labMetrics.dampHeat, "綜合濃度、時間與慢火表現的模擬指標。")}
        <div class="metric-card">
          <span>溫度</span>
          <strong>${hasThermometer ? `${labMetrics.temperature}°C` : "估算"}</strong>
          <p>${hasThermometer ? "火力越高，溫度上升越快；溫度計令讀數更清楚。" : "購買溫度計後可查看較清楚的溫度讀數。"}</p>
        </div>
        <div class="metric-card">
          <span>pH</span>
          <strong>${hasPhSensor ? labMetrics.ph : "推測範圍"}</strong>
          <p>${hasPhSensor ? "pH Sensor 已解鎖，可比較酸鹼度隨濃度變化。" : "購買 pH Sensor 後可顯示精準 pH Measurement；現在只作概念推測。"}</p>
        </div>
        <div class="tea-color-sample" style="--tea-depth:${labMetrics.color}%">
          <span>${renderTeaAppearance()}</span>
        </div>
        <div class="serving-vessel" style="--tea-depth:${labMetrics.color}%">
          <span class="porcelain-bowl" aria-hidden="true"><i></i></span>
          <p>1894 年街頭涼茶宜用厚底瓷碗、帶蓋瓷盅或由銅葫蘆倒出；茶湯多為深褐至黑棕，帶微渾濁與少量藥渣。</p>
        </div>
        ${renderLabFeedback()}
        <section class="principle-card">
          <h3>STEAM 與中醫藥原理說明</h3>
          <ul>
            <li><b>苦味值：</b>藥材比例越高、水量越少、時間越長，濃度上升，苦味值提高。</li>
            <li><b>pH：</b>以模擬方式表示濃度與煲製時間對酸鹼度的影響，數值越低代表越偏酸。</li>
            <li><b>顏色：</b>夏枯草會令茶湯偏深褐至黑棕；金銀花比例高時茶色較偏黃綠，但傳統涼茶通常仍帶渾濁與藥渣感。</li>
            <li><b>文火／武火：</b>武火用於迅速煮沸，文火用於慢熬萃取；花葉類藥材忌猛火久熬，根莖硬材則需要較長時間讓黃酮類、生物鹼、苦味素等成分釋放。</li>
            <li><b>藥食同源：</b>涼茶不是普通汽水，而是把可食、可飲的草木材料變成日常調理方法，體現中醫藥學在民間生活中的實踐。</li>
            <li><b>辨證論治：</b>不同體質、季節和症狀不應飲同一款茶；濕熱、風熱、喉痛、清潤或勞工疲累，都要配合不同配方與火候。</li>
            <li><b>濕熱應對指數：</b>綜合濃度、時間、火候是否符合藥材特性和水量是否足夠，用來討論配方是否能回應嶺南濕熱環境。</li>
          </ul>
        </section>
      </section>
    </div>
  `;
  document.querySelectorAll("[data-lab]").forEach((input) => {
    input.addEventListener("input", () => {
      lab[input.dataset.lab] = Number(input.value);
      labInquiry.trials = [];
      labInquiry.evidence = null;
      labInquiry.recorded = false;
      renderLab();
    });
  });
  document.querySelectorAll("[data-lab-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.labChoice;
      labInquiry[key] = button.dataset.value;
      if (key === "variable" || key === "result") {
        labInquiry.trials = [];
        labInquiry.evidence = null;
      }
      labInquiry.recorded = false;
      playSfx("click");
      renderLab();
    });
  });
  $("#run-trials")?.addEventListener("click", runLabTrials);
  $("#record-lab").addEventListener("click", () => {
    addInsight(`科學實驗：水量 ${lab.water}ml、時間 ${lab.time}分鐘、火力 ${lab.heat}%、藥材 ${lab.ratio}% 時，苦味 ${labMetrics.bitterness}、pH ${labMetrics.ph}、濕熱應對指數 ${labMetrics.dampHeat}。`);
    if (isLabInquiryComplete() && !labInquiry.recorded) {
      labInquiry.recorded = true;
      applyModifierChanges({ research: 6 });
      addInsight(`CER 結論：${labMetricLabel()}的變化證據已記錄，可用於支持創新方案。`);
    }
    const feedback = labTeachingFeedback();
    coachLine.textContent = feedback[0] || "已記錄實驗數據。這就是 STEAM 的 S 和 M：用變項和數據說明涼茶煲製。";
  });
  $("#go-innovation").addEventListener("click", renderInnovation);
  setStage("lab", "涼茶科學實驗室", "第五關：STEAM 數據探究");
}

function renderFormulaNote() {
  const notes = [];
  if (containsIngredient("honeysuckle")) notes.push("金銀花：花葉類，宜中火微沸或後下，忌猛火久熬。");
  if (containsIngredient("selfheal")) notes.push("夏枯草：乾燥果穗令茶色加深，常呈深褐至黑棕。");
  if (containsIngredient("licorice")) notes.push("甘草：根片帶天然甜味，可調和苦味。");
  if (containsIngredient("mint")) notes.push("薄荷：芳香葉類，宣肺利咽，宜後下短煎以保留揮發性成分。");
  if (!notes.length) return "";
  return `<section class="formula-note"><h4>藥材藥理提示</h4>${notes.map((note) => `<p>${note}</p>`).join("")}</section>`;
}

function tcmHeatLabel() {
  if (lab.heat >= 90) return { name: "武火急煎", note: "適合先煮沸或處理粗根硬莖，但花葉芳香藥材不宜長時間承受。" };
  if (lab.heat >= 70) return { name: "中火微沸", note: "適合多數花葉與複方配方，能兼顧釋放成分與保留香氣。" };
  return { name: "文火慢熬", note: "適合慢慢萃取根莖類材料，也可避免清潤配方變得過苦。" };
}

function tcmPatternLabel() {
  const patterns = {
    "five-flower": "暑濕初起：宜溫和祛濕，重視家庭日常防病。",
    "twenty-four": "熱毒瘴癘：宜複方清解，但要留意體質寒涼者不宜亂飲。",
    "cold-tea": "風熱感冒：宜宣肺利咽，芳香葉類後下短煎。",
    "three-winter": "咽喉風熱：宜清喉，重視傳統經驗與植物研究互證。",
    "jigucao-tea": "濕熱食滯：宜祛濕消滯，不是越苦越好。",
    "sugarcane-root": "清潤護喉：宜水量充足、火候平穩，適合家庭日常。",
    "old-hk": "社區照顧：在資源有限下兼顧節水、保溫與街坊需要。"
  };
  return patterns[activeTea.id] || "辨證論治：先看季節、體質和症狀，再選配方。";
}

function renderTcmLabBridge() {
  const heatLabel = tcmHeatLabel();
  return `
    <section class="tcm-bridge">
      <span class="era-chip">中醫藥學對照</span>
      <div class="tcm-grid">
        <article>
          <strong>${heatLabel.name}</strong>
          <p>${heatLabel.note}</p>
        </article>
        <article>
          <strong>藥食同源</strong>
          <p>草木既是生活飲品材料，也是民間調理身體的媒介；涼茶正是嶺南飲食與中醫藥智慧的交界。</p>
        </article>
        <article>
          <strong>辨證論治</strong>
          <p>${tcmPatternLabel()}</p>
        </article>
      </div>
    </section>
  `;
}

function labTeachingFeedback() {
  if (!labMetrics || !activeTea) return [];
  const feedback = [];
  const phValue = Number(labMetrics.ph);
  if (labMetrics.flowerPenalty > 0) {
    feedback.push("花葉或芳香類藥材受熱太久或火力太高，揮發性成分會隨蒸氣流失；可降低火力或縮短時間。");
  }
  if (activeTea.id === "twenty-four" && (lab.time < 38 || lab.heat < 65)) {
    feedback.push("廿四味多含粗根、硬莖與樹皮，萃取不足會令有效成分難以從木質部溶出；可先提高火力煮沸，再延長文火時間。");
  }
  if (activeTea.id === "cold-tea" && lab.time > 28) {
    feedback.push("感冒茶含薄荷等芳香葉類，久煎會使芳香成分散失；可改為短煎或後下。");
  }
  if (phValue < 4.8) {
    feedback.push("pH 模擬值偏低，代表濃度與煲製時間可能過高；請增加水量或降低藥材比例，觀察酸鹼度如何回到較平衡狀態。");
  }
  if (phValue > 6.6) {
    feedback.push("pH 模擬值偏高，茶湯可能過淡，部分成分溶出不足；請適度增加煲製時間或藥材比例。");
  }
  if (labMetrics.bitterness > 82) {
    feedback.push("苦味值過高會降低街坊接受度；可增加水量、降低藥材比例，或加入甘草等調和材料作比較。");
  }
  if (labMetrics.dampHeat < 58) {
    feedback.push("濕熱應對指數偏低，表示水量、時間、火力與藥材特性未配合；請先回看史料，判斷這款茶屬花葉短煎、根莖長熬，還是清潤慢火。");
  }
  return feedback.length ? feedback.slice(0, 3) : ["數據接近合理範圍。你可以用溫度探針、pH 試紙和顏色辨識，把遊戲假設帶到真實實驗驗證。"];
}

function renderLabFeedback() {
  const feedback = labTeachingFeedback();
  return `
    <section class="instruction-feedback">
      <h3>教學回饋：下一步怎樣改良？</h3>
      <ul>${feedback.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
  `;
}

function renderTeaAppearance() {
  if (containsIngredient("selfheal")) return "深褐至黑棕 · 微渾濁";
  if (containsIngredient("honeysuckle")) return "黃綠至褐色 · 微渾濁";
  return "褐色茶湯 · 微量藥渣";
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
  const rubric = calculateInnovationScore();
  const isComplete = isInnovationComplete();
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
        <label class="justification-box">
          <span>Design Justification：為甚麼你的方案適合這個使用者？</span>
          <textarea id="innovation-justification" maxlength="180" placeholder="例：因為碼頭工人工作時間長，智能涼茶煲可以用溫度感測提醒火候，減少浪費並保存老店手藝。">${escapeHtml(innovationJustification)}</textarea>
        </label>
        <div class="button-row">
          <button class="solid-button" type="button" id="finish-innovation" ${isComplete ? "" : "disabled"}>完成並評分</button>
        </div>
        <p class="mode-hint mode-${currentDifficulty}">${isComplete ? "設計已完成，可進入總評分。" : "請完成四項選擇，並寫下不少於 8 字的設計理由，才可取得創新分。"}</p>
      </section>
      <section class="concept-preview">
        <h3>方案預覽</h3>
        <div class="metric-card">
          <span>即時評分</span>
          <strong>${rubric.total}</strong>
          <div class="metric-bar"><i style="--metric:${rubric.total}%"></i></div>
          <p>Rubric 評分：科技運用、人物需要、可行性、可持續與文化價值各 0-5 分。</p>
        </div>
        ${renderInnovationRubric(rubric)}
        <div class="concept-card">
          <strong>${selectedOption("product").name}</strong>
          <p>${selectedOption("product").text}</p>
        </div>
        <div class="concept-card">
          <strong>${selectedOption("sensor").name}</strong>
          <p>${selectedOption("sensor").text}</p>
        </div>
        <div class="concept-card">
          <strong>${selectedOption("audience").name}</strong>
          <p>${selectedOption("audience").text}</p>
        </div>
        <div class="concept-card">
          <strong>${selectedOption("value").name}</strong>
          <p>${selectedOption("value").text}</p>
        </div>
        <div class="comparison-panel">
          <h3>與傳統方案比較</h3>
          ${renderComparison("product", "作品形式")}
          ${renderComparison("sensor", "判斷方法")}
          ${renderComparison("audience", "服務對象")}
          ${renderComparison("value", "保育價值")}
        </div>
        <div class="audience-comment">
          <h3>以「${selectedOption("audience").name}」身份評語</h3>
          <p>${innovation.audience ? audienceComments[innovation.audience] : "先選展示對象，系統會用該對象身份回應你的設計。"}</p>
        </div>
      </section>
    </div>
  `;
  document.querySelectorAll("[data-innovate]").forEach((button) => {
    button.addEventListener("click", () => {
      if (chooseInnovationOption(button.dataset.group, button.dataset.innovate)) {
        playSfx("sensor");
        renderInnovation();
      }
    });
  });
  $("#innovation-justification")?.addEventListener("input", (event) => {
    innovationJustification = event.target.value.trim();
    $("#finish-innovation").disabled = !isInnovationComplete();
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

function isInnovationComplete() {
  return Boolean(innovation.product && innovation.sensor && innovation.audience && innovation.value && innovationJustification.trim().length >= 8);
}

function calculateInnovationScore() {
  if (!isInnovationComplete()) {
    return { total: 0, technology: 0, userNeed: 0, feasibility: 0, sustainability: 0, culturalValue: 0 };
  }
  const frame = socialProblemFrames[activeTea.id] || {};
  const effects = upgradeEffects();
  const technology = effects.technology ? 5 : innovation.sensor === "temp-ph" && labMetrics ? 5 : innovation.sensor === "color-ai" && labMetrics?.color >= 45 ? 5 : innovation.sensor === "humidity" && frame.problem?.includes("濕") ? 5 : 4;
  const userNeed =
    (activeTea.npc.type === "worker" && innovation.audience === "community") ||
    (activeTea.npc.type === "student" && innovation.audience === "junior") ||
    (activeTea.id === "old-hk" && innovation.product === "school-kiosk") ||
    innovationJustification.includes(activeTea.npc.name) ? 5 : 4;
  const feasibility = innovation.product === "school-kiosk" ? 5 : innovation.product === "smart-pot" && innovation.sensor === "humidity" ? 3 : 4;
  const sustainability = effects.waterSaving ? 5 : innovation.product === "smart-pot" && innovation.sensor === "temp-ph" ? 5 : innovation.product === "school-kiosk" ? 4 : 3;
  const culturalValue = innovation.value === "identity" || innovation.product === "virtual-gallery" ? 5 : innovation.value === "care" ? 5 : 4;
  const total = Math.round(((technology + userNeed + feasibility + sustainability + culturalValue) / 25) * 100);
  return { total, technology, userNeed, feasibility, sustainability, culturalValue };
}

function renderInnovationRubric(rubric) {
  const rows = [
    ["科技運用", rubric.technology],
    ["人物需要", rubric.userNeed],
    ["可行性", rubric.feasibility],
    ["可持續", rubric.sustainability],
    ["文化價值", rubric.culturalValue]
  ];
  return `<div class="rubric-grid">${rows.map(([label, value]) => `<span><b>${label}</b>${value}/5</span>`).join("")}</div>`;
}

function innovationEffectsFor(group, id) {
  const effects = {
    product: {
      "smart-pot": { money: -28, satisfaction: 5, time: -4 },
      "virtual-gallery": { money: -18, satisfaction: 3, time: -8 },
      "school-kiosk": { money: -14, satisfaction: 6, water: 2 }
    },
    sensor: {
      "temp-ph": { money: -18, satisfaction: 4 },
      "color-ai": { money: -24, satisfaction: 3, time: -2 },
      humidity: { money: -12, satisfaction: 3, water: 3 }
    },
    audience: {
      junior: { satisfaction: 4, time: -3 },
      community: { satisfaction: 6, money: 3 },
      tourists: { satisfaction: 3, money: 6 }
    },
    value: {
      care: { satisfaction: 6 },
      responsibility: { water: 3, satisfaction: 3 },
      identity: { satisfaction: 4, money: 2 }
    }
  };
  return effects[group]?.[id] || { satisfaction: 1 };
}

function chooseInnovationOption(group, id) {
  if (innovationAppliedEffects[group] === id) {
    coachLine.textContent = "這個創新選項已經選過，資源效果不會重複計算。";
    return false;
  }
  const previousId = innovationAppliedEffects[group];
  const previousEffect = previousId ? innovationEffectsFor(group, previousId) : {};
  const nextEffect = innovationEffectsFor(group, id);
  const projected = { ...resources };
  Object.entries(previousEffect).forEach(([key, value]) => {
    projected[key] = clamp((projected[key] || 0) - value, 0, key === "satisfaction" ? 100 : 999);
  });
  Object.entries(nextEffect).forEach(([key, value]) => {
    projected[key] = (projected[key] || 0) + value;
  });
  const blocked = Object.entries(projected).find(([key, value]) => value < 0 && ["money", "water", "herbs", "time"].includes(key));
  if (blocked) {
    coachLine.textContent = `資源不足，不能選擇「${optionById(group, id)?.name || "這個方案"}」。${resourceLabel(blocked[0])}不夠。`;
    playSfx("wrong");
    return false;
  }
  if (previousId) {
    applyResourceChange(reverseEffects(previousEffect), `撤回創新選擇：${optionById(group, previousId)?.name || "上一方案"}`, { silent: true, skipConsequences: true });
  }
  innovation[group] = id;
  innovationAppliedEffects[group] = id;
  const option = optionById(group, id);
  applyResourceChange(nextEffect, `創新選擇：${option?.name || "未命名方案"}`);
  return true;
}

function renderComparison(group, label) {
  const option = selectedOption(group);
  return `
    <div class="compare-row">
      <strong>${label}</strong>
      <p><b>傳統：</b>${traditionalPlan[group]}</p>
      <p><b>創新：</b>${option.text}</p>
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

function renderArchiveAnswerReport(record) {
  const archive = archiveForTea(activeTea);
  const answers = record.archiveAnswers?.[activeTea.id] || [];
  if (!archive) return "<p>本任務沒有額外鎖定檔案，但已完成遊戲內史料判斷。</p>";
  if (!answers.length) return "<p>已解鎖檔案，但未保存作答詳情；可重新提交考證報告以加入完整答案。</p>";
  return `
    <div class="report-answer-list">
      ${answers.map((item, index) => `
        <article>
          <strong>${index + 1}. ${item.tag}</strong>
          <p>${item.question}</p>
          <p><b>我的答案：</b>${item.selectedText.join("；")}</p>
          <p><b>建議答案：</b>${item.answerText.join("；")}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderSourceTypeReport() {
  const archive = archiveForTea(activeTea);
  if (!archive) return "";
  return archive.documents.map((doc) => `<li>${doc.sourceType || "【未標註史料屬性】"}${doc.title}</li>`).join("");
}

function calculateScoreBreakdown() {
  const config = configForTea(activeTea);
  const archiveUnlocked = archiveForTea(activeTea) && loadRecord().archives?.[activeTea.id];
  const history = Math.min(20,
    (historyCorrect ? 6 : historyAnswered ? 2 : 0) +
    (dilemmaCorrect ? 6 : dilemmaAnswered ? 2 : 0) +
    (currentDifficulty === "expert" ? (reliabilityCorrect ? 3 : reliabilityAnswered ? 1 : 0) : 0) +
    (intelUnlocked ? 4 : 0) +
    (archiveUnlocked ? 4 : 0)
  );
  const ingredientRatio = activeTea?.ingredients?.length ? prepScore / (activeTea.ingredients.length * 20) : 0;
  const ingredients = Math.max(0, Math.min(15, Math.round((gatherScore / 100) * 7 + ingredientRatio * 8 - wrongPicks)));
  const brewingQuality = brewingQualityScore(config);
  const brewing = Math.max(0, Math.min(20, Math.round((brewingQuality / 100) * 20)));
  const metrics = labMetrics || calculateLabMetrics();
  const phScore = Math.abs(Number(metrics.ph) - 6.3) <= 0.7 ? 3 : 1;
  const inquiryBonus = (labInquiry.trials.length >= 3 ? 3 : 0) + (labInquiry.conclusion ? 1 : 0) + (labInquiry.evidence === "trend" ? 2 : 0);
  const lab = Math.max(0, Math.min(20, Math.round((metrics.dampHeat / 100) * 10 + phScore + (metrics.flowerPenalty ? 0 : 3) + inquiryBonus)));
  const innovationScore = calculateInnovationScore();
  const innovationPoints = Math.round((innovationScore.total / 100) * 20);
  const reflection = Math.max(0, Math.min(5, Math.round(Math.min(5, insightLog.length) * 0.75 + (innovationJustification.trim().length >= 24 ? 1 : 0) + (resources.satisfaction >= 80 ? 1 : 0))));
  const modifierScore = Math.round(
    (modifiers.authenticity || 0) * 0.25 +
    (modifiers.culture || 0) * 0.2 +
    (modifiers.research || 0) * 0.25 +
    (modifiers.communityImpact || 0) * 0.25 -
    (modifiers.timeOutPenalty || 0) -
    (modifiers.satisfactionCrisis ? 10 : 0)
  );
  const difficultyAdjusted = Math.round((history + ingredients + brewing + lab + innovationPoints + reflection + modifierScore + difficulty().supportBonus - hintsUsed * difficulty().hintPenalty) * difficulty().scoreMultiplier);
  return {
    history,
    ingredients,
    brewing,
    lab,
    innovation: innovationPoints,
    reflection,
    total: Math.max(0, Math.min(100, difficultyAdjusted)),
    innovationRubric: innovationScore,
    brewingQuality,
    modifierScore
  };
}

function renderScoreBreakdown(breakdown) {
  const rows = [
    ["史料推理", breakdown.history, 20, "能否把電子史料轉化為歷史情境判斷。"],
    ["藥材知識", breakdown.ingredients, 15, "能否辨認乾燥藥材與避免錯誤採藥。"],
    ["煲製技巧", breakdown.brewing, 20, "水量、火候、時間是否貼近遊戲模擬目標。"],
    ["STEAM實驗", breakdown.lab, 20, "能否用數據理解苦味、茶色、pH 與濕熱指數。"],
    ["創新設計", breakdown.innovation, 20, "科技運用、人物需要、可行性、可持續與文化價值。"],
    ["反思記錄", breakdown.reflection, 5, "能否累積學習筆記與回應社區需要。"]
  ];
  return `
    <article class="score-breakdown">
      <h3>STEAM 評分細項</h3>
      ${rows.map(([label, value, max, note]) => `
        <div class="score-row">
          <div><strong>${label}</strong><span>${note}</span></div>
          <b>${value}/${max}</b>
          <i style="--score:${(value / max) * 100}%"></i>
        </div>
      `).join("")}
    </article>
  `;
}

function renderResourceResult(breakdown) {
  return `
    <article class="resource-result">
      <h3>Resource Result</h3>
      <div class="resource-result-grid">
        <span><b>剩餘銅錢</b>${resources.money}</span>
        <span><b>剩餘食水</b>${resources.water}L</span>
        <span><b>剩餘藥材</b>${resources.herbs}</span>
        <span><b>街坊滿意度</b>${resources.satisfaction}%</span>
        <span><b>文化點影響</b>${modifiers.culture >= 0 ? "+" : ""}${modifiers.culture || 0}</span>
        <span><b>研究點影響</b>${modifiers.research >= 0 ? "+" : ""}${modifiers.research || 0}</span>
      </div>
      <p>資源與事件修正：${breakdown.modifierScore >= 0 ? "+" : ""}${breakdown.modifierScore} 分。${modifiers.satisfactionCrisis ? "曾觸發街坊信任危機。" : "未觸發街坊信任危機。"}</p>
    </article>
  `;
}

function endingFrame(breakdown) {
  if (breakdown.total >= 88 && resources.satisfaction >= 82) return ["街坊非遺館長", "你的方案既照顧街坊需要，也能把史料、科學數據和創新設計說清楚，適合作為展館或比賽作品展示。"];
  const candidates = [
    ["傳統守護者", breakdown.history + Math.max(0, modifiers.authenticity || 0), "文化考證與史料理解最突出，適合把作品包裝成歷史閱讀與非遺傳承項目。"],
    ["科學研究者", breakdown.lab + Math.max(0, modifiers.research || 0), "你最強的是控制變量、讀取數據和提出證據，下一步可加入真實感測器驗證。"],
    ["社區茶師", resources.satisfaction / 5 + Math.max(0, modifiers.communityImpact || 0), "你的決策最能照顧街坊感受，展現涼茶舖作為社區互助空間的價值。"],
    ["節能經營者", (resources.water + resources.money) / 8 + (upgradeEffects().waterSaving ? 4 : 0), "你善於管理水和銅錢，適合發展節水煲製和可持續校園學習站。"],
    ["STEAM創新者", breakdown.innovation, "你的創新方案最突出，能把歷史閱讀轉化為科技設計與互動體驗。"]
  ];
  const best = candidates.sort((a, b) => b[1] - a[1])[0];
  return [best[0], best[2]];
}

function renderForcedResult(title, reason) {
  stopCooking();
  lastScoreBreakdown = { history: 0, ingredients: 0, brewing: 0, lab: 0, innovation: 0, reflection: 0, total: 0, innovationRubric: calculateInnovationScore(), brewingQuality: 0, modifierScore: -100 };
  $("#result-screen").innerHTML = `
    <div class="result-layout">
      <div class="rating-panel">
        <div class="stamp-block">茶</div>
        <div class="rating">0</div>
        <p>${title}</p>
      </div>
      <div class="result-copy">
        <article class="ending-card">
          <h3>${title}</h3>
          <p>${reason}</p>
        </article>
        <article>
          <h3>反思</h3>
          <p>資源管理也是 STEAM 決策的一部分。下次可先閱讀事件、選擇應對策略，再進入煲製。</p>
        </article>
        <div class="button-row">
          <button class="solid-button" type="button" id="play-again">再挑戰一次</button>
          <a class="ghost-button" href="#tea-menu">選另一款</a>
        </div>
      </div>
    </div>
  `;
  $("#play-again").addEventListener("click", () => selectTea(activeTea.id));
  coachLine.textContent = `${title}：${reason}`;
  playSfx("wrong");
  setStage("result", title, "資源後果");
}

function renderImprovementTips(breakdown) {
  const tips = [];
  if (breakdown.history < 14) tips.push("先完成歷史檔案館題目，訓練辨識一手與二手史料。");
  if (breakdown.ingredients < 11) tips.push("重看藥材圖鑑，留意金銀花是乾燥花蕾、夏枯草是果穗、甘草是根片。");
  if (breakdown.brewing < 14) tips.push("把水量、時間和火候貼近任務目標；花葉類忌高溫久煮，根莖類需要較長萃取。");
  if (breakdown.lab < 14) tips.push("在實驗室觀察 pH、苦味和茶色變化，用數據修正配方。");
  if (breakdown.innovation < 15) tips.push("創新方案要同時說明感測器、服務對象、可行流程和保育目的。");
  if (!tips.length) tips.push("可嘗試高手模式，減少提示後再用同一套證據完成挑戰。");
  return `<ul class="insight-list">${tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>`;
}

function renderStudyReport(total, rating, frame, badges, record) {
  const product = selectedOption("product");
  const sensor = selectedOption("sensor");
  const audience = selectedOption("audience");
  const value = selectedOption("value");
  const breakdown = lastScoreBreakdown || calculateScoreBreakdown();
  const reportDate = new Date().toLocaleDateString("zh-HK");
  return `
    <section id="study-report" class="study-report" aria-label="我的研習報告">
      <header>
        <span>香港歷史閱讀 × STEAM 研習報告</span>
        <h1>一碗百苦： STEAM 探索解鎖老香港街坊的苦與樂</h1>
        <p>學生：${escapeHtml(currentPlayerName())}　日期：${reportDate}　任務：${activeTea.name}　評級：${rating}（${total} 分）</p>
      </header>
      <section>
        <h2>一、史料閱讀與辨識</h2>
        <ul>${renderSourceTypeReport() || "<li>以遊戲內史料卡與 NPC 情報作閱讀材料。</li>"}</ul>
        ${renderArchiveAnswerReport(record)}
        ${currentDifficulty === "expert" ? `<p><b>史料可靠性：</b>${reliabilityAnswered ? (reliabilityCorrect ? "能辨識年代、作者、目的與局限。" : "已嘗試判斷，但仍需更多互證。") : "未完成高手可靠性題。"}</p>` : ""}
      </section>
      <section>
        <h2>二、由史料推論香港問題</h2>
        <p><b>閱讀基礎：</b>${frame.reading}</p>
        <p><b>推論問題：</b>${frame.problem}</p>
        <p><b>價值觀：</b>${frame.value}</p>
      </section>
      <section>
        <h2>三、STEAM 實驗數據</h2>
        <table>
          <tbody>
            <tr><th>水量</th><td>${lab.water} ml</td><th>時間</th><td>${lab.time} 分鐘</td></tr>
            <tr><th>火力</th><td>${lab.heat}%（${tcmHeatLabel().name}）</td><th>藥材比例</th><td>${lab.ratio}%</td></tr>
            <tr><th>溫度</th><td>${labMetrics.temperature}°C</td><th>pH</th><td>${labMetrics.ph}</td></tr>
            <tr><th>苦味值</th><td>${labMetrics.bitterness}</td><th>濕熱應對指數</th><td>${labMetrics.dampHeat}</td></tr>
          </tbody>
        </table>
        <p><b>科學回饋：</b>${labTeachingFeedback()[0]}</p>
        <p><b>探究流程：</b>假設：${labInquiry.hypothesis || "未填"}；自變項：${labVariableLabel()}；觀察結果：${labMetricLabel()}；結論：${labInquiry.conclusion || "未填"}；證據：${evidenceChoices().find((item) => item.id === labInquiry.evidence)?.label || "未填"}。</p>
      </section>
      <section>
        <h2>四、創新方案</h2>
        <p><b>作品形式：</b>${product.name}，${product.text}</p>
        <p><b>感測工具：</b>${sensor.name}，${sensor.text}</p>
        <p><b>展示對象：</b>${audience.name}，${audience.text}</p>
        <p><b>保育目的：</b>${value.name}，${value.text}</p>
        <p><b>設計理由：</b>${escapeHtml(innovationJustification)}</p>
        <p><b>創新 Rubric：</b>科技 ${breakdown.innovationRubric.technology}/5、人物需要 ${breakdown.innovationRubric.userNeed}/5、可行性 ${breakdown.innovationRubric.feasibility}/5、可持續 ${breakdown.innovationRubric.sustainability}/5、文化價值 ${breakdown.innovationRubric.culturalValue}/5。</p>
        <p><b>徽章：</b>${badges.join("、")}</p>
      </section>
    </section>
  `;
}

function badgeForScore(total, record = loadRecord()) {
  const badges = [];
  if (archiveForTea(activeTea) && record.archives?.[activeTea.id]) badges.push("歷史檔案解謎徽章");
  if (intelUnlocked) badges.push("史料情報徽章");
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
  if (!isInnovationComplete()) {
    coachLine.textContent = "創新方案還未完成。請先選齊作品形式、感測工具、展示對象、保育目的，並寫下設計理由，才可以評分。";
    playSfx("wrong");
    renderInnovation();
    return;
  }
  labMetrics = labMetrics || calculateLabMetrics();
  const product = selectedOption("product");
  const sensor = selectedOption("sensor");
  const audience = selectedOption("audience");
  const value = selectedOption("value");
  const breakdown = calculateScoreBreakdown();
  lastScoreBreakdown = breakdown;
  const total = breakdown.total;
  const [endingTitle, endingText] = endingFrame(breakdown);
  addInsight(`創新方案：${product.name}配合${sensor.name}，以${audience.name}為對象。`);
  const record = updateRecord(total, breakdown);
  const rating = total >= 86 ? "非遺 STEAM 傳人" : total >= 68 ? "街坊科學師傅" : total >= 48 ? "學徒出壺" : "再煲一次";
  const note =
    total >= 86 ? "你既掌握配方，也能以數據和創新方案說明涼茶文化。這已經很接近 STEAM 作品雛形。" :
    total >= 68 ? "歷史和 STEAM 元素都已建立，再把實驗數據、訪問或作品模型補強，就會更完整。" :
    "味道還未穩，但你已經知道涼茶不是普通茶葉，而是可以連結歷史、科學與創新設計的文化議題。";
  const badges = badgeForScore(total, record);
  const frame = socialProblemFrames[activeTea.id] || {
    reading: "香港涼茶歷史與非物質文化遺產資料",
    problem: "如何把歷史閱讀轉化成社會解難和文化保育",
    value: "責任感、同理心和文化認同"
  };
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
        <article class="ending-card">
          <h3>${endingTitle}</h3>
          <p>${endingText}</p>
        </article>
        ${renderScoreBreakdown(breakdown)}
        ${renderResourceResult(breakdown)}
        <article>
          <h3>改善建議</h3>
          ${renderImprovementTips(breakdown)}
        </article>
        <article>
          <h3>遊戲模式</h3>
          <p>${difficulty().name}模式：${difficulty().text}</p>
        </article>
        <article>
          <h3>史料情報運用</h3>
          <p>${intelUnlocked ? `你已把「${activeTea.intel.title}」轉化為破關線索：${activeTea.intel.recipeHint}` : "你未整理史料情報。下次先讀 NPC 情報卡，會更容易推敲配方與火候。"}</p>
        </article>
        <article>
          <h3>STEAM 數據摘要</h3>
          <p>${labMetrics ? `水量 ${lab.water}ml，時間 ${lab.time}分鐘，火力 ${lab.heat}%，藥材比例 ${lab.ratio}%；苦味 ${labMetrics.bitterness}，茶色 ${labMetrics.color}，溫度 ${labMetrics.temperature}°C，pH ${labMetrics.ph}，濕熱應對指數 ${labMetrics.dampHeat}。` : "尚未完成科學實驗室。"}</p>
        </article>
        <article>
          <h3>創新方案摘要</h3>
          <p>${product.name}配合${sensor.name}，服務${audience.name}，突出${value.name}。創新方案 Rubric：${breakdown.innovationRubric.total}/100，折算為總分 ${breakdown.innovation}/20。</p>
          ${renderInnovationRubric(breakdown.innovationRubric)}
        </article>
        <article class="submission-summary">
          <h3>參賽作品定位</h3>
          <p><b>我們如何閱讀：</b>本關以「${frame.reading}」為閱讀基礎，學生先理解史料，再把文字轉化為遊戲線索。</p>
          <p><b>我們推論的香港問題：</b>${frame.problem}。</p>
          <p><b>我們如何用 STEAM 解決：</b>科學分析苦味、pH、溫度與茶色；科技使用${sensor.name}；工程設計${product.name}；藝術呈現香港涼茶舖美感；數學用分數與指數比較成效。</p>
          <p><b>我們展現的價值觀：</b>${frame.value}，並以${audience.name}為對象，突出${value.name}。</p>
          <p><b>原創設計：</b>把「閱讀史料 → 推論問題 → 遊戲實驗 → 創新設計」放進同一個互動任務，讓閱讀成為破關和解難的關鍵。</p>
          <p><b>真實驗證：</b>可用溫度探針、pH 試紙或感測器、顏色辨識和濕度感測，把遊戲假設帶回校園實驗。</p>
        </article>
        <article>
          <h3>個人記錄</h3>
          <p>你已完成 ${completedTeaIds(record).length}/${teas.length} 款涼茶任務。${hasMasterBadge(record) ? "全部任務已完成，獲得「涼茶宗師徽章」。" : "完成全部涼茶任務後，可獲得「涼茶宗師徽章」。"}</p>
        </article>
        <article>
          <h3>你的學習筆記</h3>
          <ul class="insight-list">${insightLog.slice(0, 6).map((item) => `<li>${item}</li>`).join("") || "<li>再玩一次，收集更多筆記。</li>"}</ul>
        </article>
        ${renderStudyReport(total, rating, frame, badges, record)}
        <div class="button-row">
          <button class="solid-button" type="button" id="play-again">再玩這款</button>
          <button class="ghost-button" type="button" id="print-report">導出/打印我的研習報告</button>
          <a class="ghost-button" href="#tea-menu">選另一款</a>
        </div>
      </div>
    </div>
  `;
  $("#play-again").addEventListener("click", () => selectTea(activeTea.id));
  $("#print-report").addEventListener("click", () => window.print());
  playSfx("success");
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
  reliabilityAnswered = false;
  reliabilityCorrect = false;
  hintsUsed = 0;
  insightLog = [];
  labMetrics = null;
  intelUnlocked = false;
  innovation = { product: null, sensor: null, audience: null, value: null };
  innovationAppliedEffects = { product: null, sensor: null, audience: null, value: null };
  innovationJustification = "";
  labInquiry = defaultLabInquiry();
  forcedOutcome = null;
  cookStarted = false;
  lastScoreBreakdown = null;
  stopNeedle();
  stopCooking();
  $("#history-screen").innerHTML = `
    <div class="empty-state">
      <div class="stamp-block">茶</div>
      <h3>還未選任務卡</h3>
      <p>請先到「先選一張涼茶任務卡」。點擊任務卡後，這裡會自動進入 NPC 個案和史料情報。</p>
      <a class="primary-action" href="#tea-menu">前往選任務卡</a>
    </div>
  `;
  coachLine.textContent = "先選一張任務卡，再開始 NPC 個案。好的課堂遊戲要讓路線清楚，學生才會放心探索。";
  setStage("history", "等待選擇任務卡", "準備上課", { scroll: false });
  history.replaceState(null, "", "#app");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

teaGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-tea]");
  if (card) selectTea(card.dataset.tea);
});

archiveModalRoot?.addEventListener("click", (event) => {
  if (event.target.closest(".archive-close") || event.target.classList.contains("archive-modal-backdrop")) {
    closeArchiveModal();
  }
});

archiveModalRoot?.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-archive-report]");
  if (!form) return;
  event.preventDefault();
  verifyArchiveReport(form.dataset.archiveReport);
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
  const upgradeButton = event.target.closest("[data-buy-upgrade]");
  if (upgradeButton) {
    buyUpgrade(upgradeButton.dataset.buyUpgrade);
  }
});

resourcePanel?.addEventListener("click", (event) => {
  const eventButton = event.target.closest("[data-event][data-event-option]");
  if (eventButton) {
    applyEventChoice(eventButton.dataset.event, eventButton.dataset.eventOption);
  }
});

personalRecordPanel?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.matches("#player-name-input")) {
    switchPlayer(event.target.value);
  }
});

$("#reset-button").addEventListener("click", resetGame);
musicToggle?.addEventListener("click", toggleBackgroundMusic);
musicVolumeInput?.addEventListener("input", () => {
  audioSettings.musicVolume = Number(musicVolumeInput.value);
  applyAudioSettings();
});
sfxVolumeInput?.addEventListener("input", () => {
  audioSettings.sfxVolume = Number(sfxVolumeInput.value);
  applyAudioSettings();
});
audioMutedInput?.addEventListener("change", () => {
  audioSettings.muted = audioMutedInput.checked;
  applyAudioSettings();
  if (audioSettings.muted) {
    stopSteamAmbience();
  } else if (musicState.isPlaying) {
    startSteamAmbience();
  }
});
difficultySelector?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-difficulty]");
  if (!button) return;
  currentDifficulty = button.dataset.difficulty;
  renderDifficultySelector();
  coachLine.textContent = `已切換至${difficulty().name}模式：${difficulty().text}`;
  if (document.querySelector("#gather-screen.active-stage")) renderGather();
  if (document.querySelector("#cook-screen.active-stage")) renderCook();
});

loadAudioSettings();
renderDifficultySelector();
renderTeaGrid();
renderGuide();
renderTimeline();
resetGame();
