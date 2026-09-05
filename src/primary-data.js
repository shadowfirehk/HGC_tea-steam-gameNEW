/* Short teaching adaptations, not transcriptions or medical recipes. */
const PRIMARY_DATA = (() => {
  const sources = {
    culture: { name: '非物質文化遺產辦事處：涼茶', date: '現代介紹', who: '非物質文化遺產辦事處', why: '介紹與保存涼茶文化', type: '二手史料', url: 'https://www.icho.hk/tc/web/icho/representative_list_herbaltea.html' },
    water: { name: '水務署：香港供水里程碑', date: '現代回顧1963年', who: '水務署', why: '整理香港供水歷史', type: '二手史料', url: 'https://www.wsd.gov.hk/tc/water-matters/water-supply-milestones/' },
    poster: { name: '政府檔案處：當年制水宣傳資料', date: '1963年資料，由檔案處收藏', who: '當年的政府宣傳部門', why: '通知市民制水安排', type: '一手史料（連結內原件）', url: 'https://www.grs.gov.hk/ws/online/GPM/en/highlights/index.html' }
  };
  const herbs = {
    honeysuckle: ['金銀花', '細長的乾花蕾'], chrysanthemum: ['菊花', '皺起的乾花瓣'], selfheal: ['夏枯草', '棕色的乾果穗'],
    licorice: ['甘草', '淡黃切面的乾根片'], mint: ['薄荷', '皺起的乾葉片'], jigucao: ['雞骨草', '紮成束的乾草'],
    imperatae: ['茅根', '淡色的乾根段'], herbBundle: ['廿四味藥材包', '多種乾藥材'], sophora: ['槐花', '細小的乾花蕾']
  };
  const missions = [
    { id: 'five-flower', tea: '五花茶', npc: '阿晴', portrait: 'student', title: '花香的小秘密', era: '嶺南生活',
      request: '我想認識家人常說的五花茶。一起找花材的秘密吧！',
      clue: '香港位處炎熱潮濕的嶺南，人們利用本地草木煲涼茶。這慢慢成為地方飲食習慣，五花茶就是其中一種。',
      key: '本地草木', source: 'culture', question: '哪個線索說明涼茶與地方環境有關？',
      evidence: ['人們利用本地草木煲茶', '每間店都有同一個配方', '只有香港才有草木'], answer: 0,
      help: '留意「本地」兩個字。', materials: ['honeysuckle', 'chrysanthemum'], heat: 1, fill: 2, event: 'water',
      found: '花材可以有不同形狀。', reward: '花材觀察員' },
    { id: 'twenty-four', tea: '廿四味', npc: '強叔', portrait: 'worker', title: '工人歇一歇', era: '舊香港街坊故事',
      request: '搬貨後，我想找個地方歇一歇。幫茶舖照顧來休息的街坊吧！',
      clue: '強叔搬完貨，來到涼茶舖休息，看見街坊一邊喝茶，一邊聊天。茶舖除了賣飲品，也可以讓人交流；這是教學創作故事。',
      key: '一邊聊天', source: 'culture', fictional: true, question: '哪句話支持「茶舖讓街坊交流」？',
      evidence: ['強叔正在搬貨', '街坊一邊喝茶，一邊聊天', '每位工人都只飲廿四味'], answer: 1,
      help: '交流就是大家互相說話。', materials: ['herbBundle', 'licorice'], heat: 2, fill: 2, event: 'queue',
      found: '聽別人的需要，也是照顧。', reward: '街坊好幫手' },
    { id: 'three-winter', tea: '三冬茶', npc: '俊彥', portrait: 'researcher', title: '小小研究員', era: '今天的文化研究',
      request: '我找到不同的涼茶介紹！一張圖片能告訴我們全部事情嗎？',
      clue: '這張照片讓我們看見乾藥材的形狀和顏色，卻沒有記錄煲茶時間。要回答其他問題，我們還需要找不同資料互相比較。',
      key: '沒有記錄煲茶時間', source: 'culture', fictional: true, question: '照片沒有告訴我們甚麼？',
      evidence: ['材料的顏色', '材料的外形', '煲茶用了多少時間'], answer: 2,
      help: '照片是靜止的一刻，沒有計時紀錄。', materials: ['selfheal', 'licorice'], heat: 1, fill: 2, event: 'visit',
      found: '一份資料不能回答所有問題。', reward: '找線索高手', photo: 'selfheal' },
    { id: 'cold-tea', tea: '傳統感冒茶', npc: '阿芬', portrait: 'worker', title: '放工的等候', era: '1960年代情境故事',
      request: '我放工後想休息，茶舖卻排長龍。一起想個好辦法吧！',
      clue: '阿芬放工後來到茶舖，看見排隊的街坊站累了，想坐下等候。這個創作故事讓我們想想，怎樣照顧不同人的需要。',
      key: '想坐下等候', source: 'culture', fictional: true, question: '哪個線索支持加設等候座位？',
      evidence: ['有人站累了，想坐下等候', '涼茶有不同名字', '茶舖的招牌很好看'], answer: 0,
      help: '找出街坊不舒服的等候情況。', materials: ['mint', 'chrysanthemum'], heat: 1, fill: 2, event: 'queue',
      found: '看見別人的困難，才想到好設計。', reward: '細心觀察員' },
    { id: 'jigucao-tea', tea: '雞骨草茶', npc: '美姨', portrait: 'neighbor', title: '把手藝留下來', era: '2006年至今天',
      request: '孩子想學老茶舖的手藝。只留下招牌，夠不夠呢？',
      clue: '涼茶在2006年列入國家級非物質文化遺產名錄。保育也包括學習煲製知識，把生活習俗和手藝傳給下一代。',
      key: '傳給下一代', source: 'culture', question: '哪個做法能讓手藝繼續傳下去？',
      evidence: ['只保存茶舖的價錢牌', '讓下一代跟師傅學習', '把所有做法保密到失傳'], answer: 1,
      help: '手藝需要有人學，也需要有人教。', materials: ['jigucao', 'licorice'], heat: 2, fill: 2, event: 'visit',
      found: '文化要有人學，才會延續。', reward: '文化小傳人' },
    { id: 'sugarcane-root', tea: '竹蔗茅根', npc: '婆婆', portrait: 'elder', title: '珍惜每一滴', era: '1963年香港制水',
      request: '以前制水，接一桶水不容易。今天一起練習慳水吧！',
      clue: '水務署回顧1963年香港缺水，最嚴時每四天只供水四小時。人們需要等待供水和儲水，日常用水更要小心安排。',
      key: '每四天只供水四小時', source: 'water', question: '哪個線索說明當時需要慳水？',
      evidence: ['每天隨時都有水', '每四天只供水四小時', '所有地方都不需要儲水'], answer: 1,
      help: '找出可以用水的時間有多少。', materials: ['imperatae', 'licorice'], heat: 1, fill: 1, event: 'water',
      found: '少用一點水，也能幫到街坊。', reward: '慳水小達人' },
    { id: 'old-hk', tea: '舊香港街坊涼茶', npc: '華叔', portrait: 'master', title: '小茶舖亮燈了', era: '今天與過去',
      request: '我想把茶舖故事傳給小朋友。你會怎樣讓大家參與？',
      clue: '我們可以記錄師傅的手藝，邀請街坊說故事，再讓小朋友一起學習。文化不只留在書中，也在人與人之間傳承。',
      key: '邀請街坊說故事', source: 'culture', question: '哪個做法讓街坊一起傳承文化？',
      evidence: ['把茶舖永久關門', '只看杯子的價格', '邀請街坊分享茶舖故事'], answer: 2,
      help: '留意「一起」和「分享」。', materials: ['selfheal', 'honeysuckle'], heat: 1, fill: 2, event: 'visit',
      found: '一碗茶，連起不同年代的人。', reward: '茶舖故事家' }
  ];
  const modes = { learn: { name: '學習模式', icon: '🌱', choices: 2, spot: 40, money: 80, water: 50 }, challenge: { name: '挑戰模式', icon: '⭐', choices: 3, spot: 30, money: 65, water: 40 }, master: { name: '小茶師模式', icon: '🏆', choices: 3, spot: 25, money: 50, water: 30 } };
  const events = {
    water: { title: '水桶快空了', text: '今日水少咗，我哋點算好？', choices: [
      { text: '買多一桶水', money: -10, water: 20, happy: 0, reply: '多了水，金幣就少了一點。' },
      { text: '今天煲少一點', money: 0, water: 10, happy: -5, reply: '預留的水多了，街坊要分批等候。', small: true },
      { text: '借水桶，幫街坊收拾', money: 0, water: 15, happy: 5, reply: '互相幫忙，也是一種辦法。' }
    ] },
    queue: { title: '街坊排長龍', text: '有人站累了，我們怎樣幫忙？', choices: [
      { text: '租椅子讓街坊坐', money: -10, water: 0, happy: 10, reply: '街坊坐下休息，開心多了。' },
      { text: '安排分批回來', money: 0, water: 0, happy: 5, reply: '不用一直站著等，安排也很有用。' },
      { text: '借椅子，答應幫忙清潔', money: 0, water: -5, happy: 10, reply: '用一點清潔用水，換來街坊互助。' }
    ] },
    visit: { title: '小朋友來探訪', text: '他們想學茶文化，我們怎樣歡迎？', choices: [
      { text: '印材料觀察卡', money: -10, water: 0, happy: 10, reply: '小朋友可以一邊看，一邊找線索。' },
      { text: '請師傅說一個故事', money: 0, water: 0, happy: 5, reply: '聽故事也能認識茶舖的人情。' },
      { text: '借平板展示乾藥材照片', money: -5, water: 0, happy: 10, reply: '照片讓大家看清材料的細節。' }
    ] }
  };
  const inventions = [
    { id: 'temperature', name: '溫度提醒茶壺', icon: '🌡', problem: '太熱', tool: '溫度探針＋提示燈', process: '量溫度 → 高於設定值亮燈 → 等涼一點', help: '提醒等涼一點才拿取', waste: 2 },
    { id: 'water', name: '節水茶壺', icon: '💧', problem: '水不夠', tool: '水位感測器＋停止開關', process: '量水位 → 到設定線 → 停止加水', help: '避免加太多水', waste: 3 },
    { id: 'cup', name: '易拿茶杯', icon: '☕', problem: '很難拿', tool: '隔熱杯套＋大把手', process: '畫把手 → 做模型 → 測試是否好拿', help: '更穩地拿起杯子', waste: 3 },
    { id: 'queue', name: '排隊提示燈', icon: '🚦', problem: '等太久', tool: '按鈕＋號碼提示燈', process: '領號碼 → 師傅按鈕 → 亮燈通知', help: '坐著等候，不用一直排隊', waste: 2 }
  ];
  return { sources, herbs, missions, modes, events, inventions };
})();
