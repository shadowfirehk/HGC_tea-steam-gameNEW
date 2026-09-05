(() => {
  'use strict';
  const D = PRIMARY_DATA;
  const KEY = 'hgcTeaPrimary.v1';
  const $ = s => document.querySelector(s);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const freshProfile = name => ({ id: uid(), name, mode: 'learn', resources: { money: 80, water: 50, happy: 75 }, upgrades: [], records: {}, run: null, tutorial: false });
  const defaultStore = () => { const p = freshProfile('小茶師'); return { version: 1, active: p.id, profiles: [p], settings: { music: false, musicVolume: 25, sfxVolume: 45, muted: false, large: false, reduced: matchMedia('(prefers-reduced-motion: reduce)').matches } }; };
  let storageOK = true;
  let store;
  try {
    store = JSON.parse(localStorage.getItem(KEY));
    if (!store || store.version !== 1 || !Array.isArray(store.profiles) || !store.profiles.length || !store.profiles.some(p => p.id === store.active)) store = defaultStore();
  } catch { store = defaultStore(); storageOK = false; }
  const profile = () => store.profiles.find(p => p.id === store.active);
  const run = () => profile().run;
  const mission = () => D.missions.find(m => m.id === run()?.mission);
  const mode = () => D.modes[run()?.mode || profile().mode];
  let view = 'home', selectPage = 0, bookTab = 'tea', bookPage = 0, timer = null, noticeTimer, tick = 0, guideStep = 0, needle = 0;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { storageOK = false; } }
  function notify(message) { $('#notice').textContent = message; $('#notice').classList.add('visible'); clearTimeout(noticeTimer); noticeTimer = setTimeout(() => $('#notice').classList.remove('visible'), 4500); }
  function button(text, action, value = '', primary = false, disabled = false) { return `<button type="button" data-action="${action}" data-value="${esc(value)}" ${primary ? 'class="primary"' : ''} ${disabled ? 'disabled' : ''}>${text}</button>`; }
  function image(id, kind = 'herb', cls = '') { const path = kind === 'npc' ? `npc/${id}.jpg` : `ingredient-photos/${id}.jpg`; return `<img class="${cls}" src="./assets/${path}" alt="${esc(kind === 'npc' ? '街坊角色插畫' : D.herbs[id]?.[0] || '傳統銅壺照片')}">`; }
  function guide(text, portrait = '', name = '阿茶仔') { return `<aside class="guide">${portrait ? image(portrait, 'npc') : '<img src="./assets/tea-history-teacher-logo.png" alt="阿茶仔">'}<div><strong>${name}</strong><p id="spoken">${text}</p></div>${button('🔊', 'speak')}</aside>`; }
  function heading(kicker, title) { return `<div class="heading"><p class="eyebrow">${kicker}</p><h1>${title}</h1></div>`; }
  function stars(n) { return `<span class="stars" aria-label="${n}顆星，最多3顆">${'★'.repeat(n)}${'☆'.repeat(3 - n)}</span>`; }
  function resources() { const r = profile().resources; return `<div class="resources" aria-label="茶舖資源"><span>💰 <b>${r.money}</b><small>金幣</small></span><span>💧 <b>${r.water}</b><small>水</small></span><span>♥ <b aria-label="街坊開心度${Math.ceil(r.happy / 20)}級">${['😟', '😐', '🙂', '😀', '🤩'][clamp(Math.ceil(r.happy / 20) - 1, 0, 4)]}</b><small>街坊開心度</small></span></div>`; }
  function changeResources(effects, reason) {
    const before = { ...profile().resources };
    for (const key of ['money', 'water', 'happy']) profile().resources[key] = clamp(before[key] + (effects[key] || 0), 0, key === 'happy' ? 100 : 999);
    const entry = { reason, before, after: { ...profile().resources } };
    if (run()) run().resources.push(entry);
    save(); return entry;
  }
  function effectView(entry) { return `<div class="effects">${['money', 'water', 'happy'].filter(k => entry.before[k] !== entry.after[k]).map(k => `<span>${{ money: '💰', water: '💧', happy: '♥' }[k]} ${k === 'happy' ? '街坊心情有變化' : `${entry.before[k]} → <b>${entry.after[k]}</b>`}</span>`).join('')}</div>`; }
  function clearNotice() { clearTimeout(noticeTimer); $('#notice').classList.remove('visible'); }
  function next(screen) { clearInterval(timer); timer = null; clearNotice(); if (run()) run().screen = screen; view = screen; save(); render(); window.scrollTo({ top: 0, behavior: 'instant' }); $('#app').focus({ preventScroll: true }); }
  function navigate(screen) { clearInterval(timer); timer = null; clearNotice(); view = screen; render(); window.scrollTo({ top: 0, behavior: 'instant' }); $('#app').focus({ preventScroll: true }); }
  function learnMore(m) { const s = D.sources[m.source]; return `<details><summary>想知更多</summary><p>誰說的？${esc(m.fictional ? '遊戲編寫者' : s.who)}</p><p>甚麼時候？${esc(m.era)}</p><p>為甚麼？${esc(m.fictional ? '讓我們練習找證據和關心別人' : s.why)}</p><p>這段是${m.fictional ? '教學創作，不是當年的真實證詞' : '根據現代介紹寫成的短摘要，不是原文引述'}。</p><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)} ↗</a><p>照片或插畫只協助觀察，並非這個故事的歷史現場。</p></details>`; }
  function sourceTag(m) { return m.fictional ? '教學創作 · 不是史料原件' : '二手史料 · 教學摘要'; }
  function options(items, action, selected = null, primary = false) { return `<div class="choices">${items.map(item => `<button type="button" data-action="${action}" data-value="${esc(item.value)}" class="choice ${selected === item.value ? 'selected' : ''} ${primary ? 'primary' : ''}" ${selected !== null ? `aria-pressed="${selected === item.value}"` : ''}>${item.html || esc(item.label)}</button>`).join('')}</div>`; }
  const stageIndex = { intro: 0, clue: 0, compare: 0, evidence: 0, story: 1, gather: 2, brew: 3, npc: 3, guess: 4, method: 4, trial: 4, observe: 4, conclude: 4, invent: 5, result: 6 };
  function render() {
    document.documentElement.classList.toggle('large', store.settings.large);
    document.documentElement.classList.toggle('reduced', store.settings.reduced);
    $('#player-name').textContent = profile().name;
    let content = screens[view]?.() || screens.home();
    if (view in stageIndex && run()) content = `<div class="journey"><button data-go="home" title="返回茶舖，保留進度" aria-label="返回茶舖">⌂</button><span>${esc(mission().tea)} · ${stageIndex[view] + 1} / 7</span><progress max="7" value="${stageIndex[view] + 1}" aria-label="任務進度"></progress></div>${resources()}${content}`;
    $('#app').innerHTML = content;
    $('#app [data-action="speak"]')?.setAttribute('aria-label', '朗讀對話');
    $('#app [data-action="speak"]')?.setAttribute('title', '朗讀');
    if (view === 'brew' && run().brewing && !run().brewResult) startMeter();
    audioScene = ({ clue: 'clue', evidence: 'clue', compare: 'clue', gather: 'gather', brew: 'brew', guess: 'lab', method: 'lab', trial: 'lab', observe: 'lab', conclude: 'lab', invent: 'lab', result: 'result' })[view] || 'menu';
  }
  const screens = {
    home() {
      const completed = Object.keys(profile().records).length;
      return `<section class="home-scene ${completed ? 'lit-shop' : ''}"><div class="home-title"><p class="eyebrow">香港涼茶文化 · 高小冒險</p><h1>一碗百苦</h1><p>STEAM 探索解鎖老香港街坊的苦與樂</p>${profile().upgrades.includes('sign') ? '<span class="shop-sign">小茶師的街坊茶舖 · 營業中</span>' : ''}</div></section><section class="home-actions">${button(run() && run().screen !== 'result' ? '🍵 繼續冒險' : '🍵 開始冒險', 'start', '', true)}${button('🏮 我的茶舖', 'shop')}${button('🏅 我的徽章', 'book')}${button('⚙ 設定', 'settings')}</section><p class="quiet">${completed} / ${D.missions.length} 位街坊的任務已完成</p>${!storageOK ? '<p class="inline-feedback">這個瀏覽器暫時不能保存記錄。離開前可到設定下載個人記錄。</p>' : ''}`;
    },
    select() {
      const cards = D.missions.slice(selectPage * 3, selectPage * 3 + 3);
      return `${heading('約 8–12 分鐘的小冒險', '今天想幫哪位街坊？')}${guide('選一位街坊，聽聽他的故事。')}
      <div class="mission-grid">${cards.map(m => `<button class="mission-card" data-action="mission" data-value="${m.id}">${image(m.portrait, 'npc')}<span><small>${m.era}</small><strong>${m.npc} · ${m.title}</strong><span>${m.tea}</span>${profile().records[m.id] ? stars(profile().records[m.id].stars) : '<small>等待你的幫忙</small>'}</span></button>`).join('')}</div><div class="pagination">${button('←', 'page', -1, false, selectPage === 0)}<span>${selectPage + 1} / ${Math.ceil(D.missions.length / 3)}</span>${button('→', 'page', 1, false, (selectPage + 1) * 3 >= D.missions.length)}</div>`;
    },
    intro() { const m = mission(); return `${heading(m.era, m.title)}${guide(m.request, m.portrait, m.npc)}<p class="quiet">${m.npc}是遊戲角色。一起從線索認識茶文化。</p>${button('知道！去找線索', 'next', 'clue', true)}`; },
    clue() {
      const m = mission();
      const text = run().mode === 'master' ? esc(m.clue) : esc(m.clue).replace(esc(m.key), `<mark>${esc(m.key)}</mark>`);
      return `${heading('🔎 找歷史線索', '看一看，找一找')}
      <figure class="clue-image">${m.photo ? image(m.photo) : '<img src="./assets/hong-kong-herbal-shop.webp" alt="涼茶舖情境插畫">'}<figcaption>${m.photo ? '現代材料照片 · 觀察外形' : '遊戲情境圖 · 非歷史照片'}</figcaption></figure>
      <article class="clue-text"><span class="tag">${sourceTag(m)}</span><p id="spoken">${text}</p>${button('🔊 朗讀', 'speak')}</article>${learnMore(m)}${button('我找到線索了！', 'next', run().mode === 'master' ? 'compare' : 'evidence', true)}`;
    },
    compare() {
      const m = mission(), isWater = m.source === 'water';
      return `${heading('🔎 小茶師的比較', '兩份資料，一樣嗎？')}${guide('看看誰說、何時說、為甚麼說。')}
      <div class="compare"><article><h2>資料 A</h2><p>${sourceTag(m)}</p><p>${esc(m.clue)}</p></article><article><h2>資料 B · 教學創作</h2><p>${isWater ? '今天的遊客說：「我住的酒店每天都有水。」' : '今天的茶舖廣告說：「本店最受所有人歡迎！」'}</p></article></div>
      <h2>這兩份資料能證明甚麼？</h2>${options([{ value: 'all', label: '一個人的說法，就代表所有年代和所有人' }, { value: 'context', label: '要看年代和目的，不能直接代表所有人' }], 'compare')}
      ${isWater ? `<details><summary>看看當年的一手史料</summary><a href="${D.sources.poster.url}" target="_blank" rel="noopener">政府檔案處的制水宣傳資料 ↗</a><p>連結內的當年原件是一手史料；本頁摘要是二手資料。</p></details>` : ''}<div class="inline-feedback" role="status">${esc(run().feedback || '')}</div>`;
    },
    evidence() {
      const m = mission();
      const indices = m.evidence.map((_, i) => i).filter(i => mode().choices === 3 || i === m.answer || i === (m.answer + 1) % 3);
      return `${heading('🔎 找到證據', m.question)}${guide(run().mode === 'learn' ? m.help : '把支持你想法的線索放進證據盒。')}
      <details><summary>再看線索</summary><p>${esc(m.clue)}</p></details>
      <div class="choices">${indices.map(i => `<button draggable="true" data-action="evidence-pick" data-value="${i}" class="choice ${run().evidencePick === i ? 'selected' : ''}" aria-pressed="${run().evidencePick === i}">${esc(m.evidence[i])}</button>`).join('')}</div>
      <button class="evidence-box" data-action="evidence-submit" id="evidence-box">${run().evidenceDone ? '✓ 證據收好了！' : `證據盒${run().evidencePick !== null ? '：按這裡放入' : '：拖進來，或點選線索'}`}</button>
      <div class="inline-feedback" role="status">${esc(run().feedback || '')}</div>${run().evidenceDone ? button('去幫街坊', 'next', 'story', true) : button('給我一點提示', 'hint')}`;
    },
    story() {
      const r = run(), eventId = r.eventIds[r.eventIndex], e = D.events[eventId];
      if (r.eventResult) return `${heading('街坊的小故事', '你的選擇有改變！')}${guide(r.eventResult.reply, mission().portrait, mission().npc)}${effectView(r.eventResult.entry)}${button('知道！', 'event-next', '', true)}`;
      return `${heading('街坊的小故事', e.title)}${guide(e.text, mission().portrait, mission().npc)}${options(e.choices.slice(0, r.mode === 'master' ? 3 : 2).map((c, i) => ({ value: i, html: `<strong>${c.text}</strong><small>${c.money ? `💰 ${c.money}　` : ''}${c.water ? `💧 ${c.water > 0 ? '+' : ''}${c.water}　` : ''}${c.happy ? `♥ ${c.happy > 0 ? '更開心' : '要等一等'}` : ''}</small>` })), 'event')}<div class="inline-feedback">${esc(r.feedback || '')}</div>`;
    },
    gather() {
      const r = run(), m = mission(), wanted = m.materials[r.materialIndex];
      if (!wanted) return `${heading('材料找到啦', '你的材料貼紙到手！')}${guide(m.found)}<div class="material-row">${m.materials.map(id => `<figure>${image(id)}<figcaption>${D.herbs[id][0]}</figcaption></figure>`).join('')}</div><p class="quiet">這是材料觀察練習，不是完整處方。</p>${button('去煲茶', 'next', 'brew', true)}`;
      const pool = [wanted, ...Object.keys(D.herbs).filter(id => !m.materials.includes(id)).slice(r.materialIndex, r.materialIndex + mode().choices - 1)];
      const rotated = pool.slice(r.materialIndex + 1).concat(pool.slice(0, r.materialIndex + 1));
      return `${heading(`選材料 · ${r.materialIndex + 1} / ${m.materials.length}`, `哪張是${D.herbs[wanted][0]}？`)}${guide(r.mode === 'learn' ? D.herbs[wanted][1] : '仔細看乾藥材的樣子。')}${options(rotated.map(id => ({ value: id, html: `${image(id)}<span>${r.mode === 'learn' || r.materialErrors >= 2 ? D.herbs[id][0] : D.herbs[id][1]}</span>` })), 'material')}<div class="inline-feedback" role="status">${esc(r.feedback || '')}</div>`;
    },
    brew() {
      const r = run(), m = mission(), heatNames = ['小火', '中火', '大火'];
      if (r.brewResult) return `${heading('🍵 茶煲好了', '看看你的成果')}${pot()}${stars(r.brewResult.stars)}${guide(r.brewResult.feedback)}${button('端給街坊', 'next', 'npc', true)}${button('再練習一次', 'brew-retry')}`;
      const hint = r.mode === 'learn' ? `今天的遊戲目標：${heatNames[m.heat]}，${['', '三分一壺', '三分二壺', '滿壺'][m.fill]}水。` : '留意火力和水量，再試著停在綠色區。';
      if (!r.brewing) {
        return `${heading('🍵 一起煲茶', r.brewPage === 0 ? '先選火力' : '再加多少水？')}${guide(hint)}${pot()}
        ${r.brewPage === 0 ? options(heatNames.map((name, i) => ({ value: i, label: `${'🔥'.repeat(i + 1)} ${name}` })), 'heat', r.heat) : options([1, 2, 3].map(i => ({ value: i, label: `${['', '⅓ 壺', '⅔ 壺', '滿壺'][i]}${r.mode === 'learn' ? '' : ` · ${i * 500} ml`}` })), 'fill', r.fill)}
        ${button(r.brewPage === 0 ? '下一步：加水' : '開始煲茶', r.brewPage === 0 ? 'brew-page' : 'brew-start', '', true)}${r.brewPage ? button('← 調整火力', 'brew-back') : ''}<p class="quiet">遊戲參數不是煎藥方法；真實加熱要由成人指導。</p>`;
      }
      return `${heading('🍵 煲製進度', store.settings.reduced ? '慢慢調整到綠色區' : '指針到綠色區，按停火！')}${pot()}<div class="timing" role="meter" aria-label="煲製進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="target" style="left:${50 - mode().spot / 2}%;width:${mode().spot}%"></span><span id="needle"></span></div>
      ${store.settings.reduced ? button('前進一格', 'meter-step') : ''}${button('停火', 'brew-stop', '', true)}<p class="quiet">可以再練習，不用重新開始任務。</p>`;
    },
    npc() { return `${heading('街坊的回應', '你幫到人啦！')}${guide('多謝你留心照顧！我們再試試，怎樣讓茶色不一樣？', mission().portrait, mission().npc)}${button('到小小實驗室', 'next', run().mode === 'master' ? 'method' : 'guess', true)}`; },
    guess() { return `${heading('🔬 我估 → 我試 → 我看看 → 我發現', run().variable === 'water' ? '加多一點水，茶色會更淺嗎？' : '煲久一點，茶色會更深嗎？')}${labSafety()}${guide('先猜一猜。猜錯也沒關係！')}${options([{ value: 'yes', label: '👍 我估會' }, { value: 'no', label: '👎 我估不會' }, { value: 'unsure', label: '🤔 我還不知道' }], 'guess')}`; },
    method() { return `${heading('🔬 我試', '今次想改甚麼？')}${guide('公平測試，一次只改一樣。')}${options([{ value: 'time', label: '煲茶時間' }, { value: 'water', label: '水量' }], 'method')}`; },
    trial() {
      const r = run(), variable = r.variable, vals = variable === 'time' ? [10, 20, 30] : [500, 1000, 1500];
      return `${heading('🔬 我試', `只改${variable === 'time' ? '煲茶時間' : '水量'}`)}${labSafety()}${guide('其他條件不變，這才是公平測試！')}
      <div class="locked">🔒 ${variable === 'time' ? '水量 1000 ml' : '時間 20 分鐘'} · 溫度 80°C · 材料 10 g</div>
      ${options(vals.map((v, i) => ({ value: v, html: `<strong>${(variable === 'time' ? ['短時間', '中時間', '長時間'] : ['少水', '中水', '多水'])[i]}</strong>${r.mode === 'learn' ? '' : `<span>${v} ${variable === 'time' ? 'min' : 'ml'}</span>`}<small>${r.trials.some(t => t.value === v) ? '✓ 已有結果' : '按下試一試'}</small>` })), 'trial')}
      ${trialCups()}<p class="quiet">${r.trials.length} / 3 次結果${r.mode === 'learn' ? ' · 第一杯由阿茶仔示範' : ''}</p>${r.trials.length === 3 ? button('看看三杯的分別', 'next', 'observe', true) : ''}${scienceDetails()}`;
    },
    observe() { return `${heading('🔬 我看看', '三杯有甚麼不同？')}${labSafety()}${trialCups()}${chart()}${scienceDetails()}${button('說說我的發現', 'next', 'conclude', true)}`; },
    conclude() {
      const r = run(), more = r.variable === 'time' ? '煲得越久，茶色越深' : '水越多，茶色越淺';
      return `${heading('🔬 我發現', '你的實驗告訴你甚麼？')}${trialCups()}${r.conclusion ? `<p class="sentence">我看到${more}，所以我認為${r.variable === 'time' ? '時間' : '水量'}會影響茶色。</p>${guide(r.guess === 'yes' && r.variable === 'time' ? '數據支持了你的猜想！' : '跟著觀察修正想法，就是科學家的做法。')}${button('成為小小發明家', 'next', 'invent', true)}` : options([{ value: 'same', label: '三杯顏色完全一樣' }, { value: 'change', label: more }], 'conclusion')}<div class="inline-feedback" role="status">${esc(r.feedback || '')}</div>`;
    },
    invent() {
      const r = run(), i = r.invent, found = D.inventions.find(p => p.id === i.product);
      const audiences = [{ value: '長者', label: '👴 長者' }, { value: '工人', label: '👷 工人' }, { value: '小朋友與家庭', label: '👨‍👩‍👧 小朋友與家庭' }];
      if (i.step === 0) return `${heading('💡 小小發明家 · 1 / 3', '你想幫誰？')}${guide('想想你在茶舖遇到的街坊。')}${options(audiences, 'audience')}`;
      if (i.step === 1) return `${heading('💡 小小發明家 · 2 / 3', `${esc(i.audience)}遇到甚麼問題？`)}${options([{ value: '太熱', label: '🌡 茶太熱' }, { value: '水不夠', label: '💧 水不夠' }, { value: 'other', label: '想幫忙拿杯或等候' }], 'problem')}${button('← 換一位街坊', 'invent-back', 0)}`;
      if (i.step === 2) return `${heading('💡 再看清楚', '哪一個問題？')}${options([{ value: '很難拿', label: '☕ 茶杯很難拿' }, { value: '等太久', label: '🚦 排隊等太久' }], 'problem')}`;
      if (i.step === 3) {
        const matched = D.inventions.find(p => p.problem === i.problem), alternative = D.inventions.find(p => p.problem !== i.problem);
        return `${heading('💡 小小發明家 · 3 / 3', '你想發明甚麼？')}${guide(`要幫${esc(i.audience)}解決「${esc(i.problem)}」。`)}${options([matched, alternative].map(p => ({ value: p.id, html: `<span class="invention-icon">${p.icon}</span><strong>${p.name}</strong><small>${p.tool}</small>` })), 'product')}${button('← 再想想問題', 'invent-back', 1)}`;
      }
      return `${heading('💡 我的設計', found.name)}<div class="prototype"><span>${found.icon}</span><strong>${found.tool}</strong></div><p class="flow">${found.process}</p><p class="sentence">我選${found.name}，因為它可以幫${esc(i.audience)}${found.help}。</p><label class="field">加一句自己的想法（可不填）<input id="reason" maxlength="100" value="${esc(i.reason)}" placeholder="例如：提示燈要放在看得見的地方"></label>${button('完成並評分', 'finish', '', true)}${button('← 改良設計', 'invent-back', 3)}`;
    },
    result() {
      const r = run(), record = profile().records[r.mission], result = r.result;
      return `${heading('🎉 任務完成！', `你幫${mission().npc}完成任務啦！`)}<div class="celebrate">${stars(result.stars)}</div>${guide('茶舖亮燈了！謝謝你用觀察和實驗來幫忙。', mission().portrait, mission().npc)}
      <div class="result-grid">${Object.entries(result.sections).map(([name, n]) => `<div><span>${name}</span>${stars(n)}</div>`).join('')}</div><div class="reward"><strong>🏅 ${mission().reward}</strong><p>獲得${mission().tea}、材料及街坊貼紙！</p></div>
      <div class="rubric">${Object.entries(result.rubric).map(([key, n]) => `<div>${key}${stars(n)}</div>`).join('')}</div><p>你做得最好：${esc(result.best)}</p><p>下次可以試：${esc(result.improve)}</p>
      ${button('看看我的茶舖', 'shop', '', true)}${button('導出/打印我的研習報告', 'print')}${button('再幫一位街坊', 'select')}<p class="quiet">本關最高紀錄：${record.stars} 星</p>`;
    },
    shop() {
      const upgrades = [{ id: 'thermometer', name: '🌡 買溫度計', price: 30, text: '煲茶時看見溫度' }, { id: 'saver', name: '💧 裝節水器', price: 40, text: '每次煲茶節省5份水' }, { id: 'sign', name: '🏮 裝新招牌', price: 35, text: '首頁掛上茶舖招牌' }];
      const available = upgrades.filter(u => !profile().upgrades.includes(u.id)).slice(0, 2);
      return `${heading('🏮 我的涼茶舖', '每次幫忙，茶舖都長大一點')}${resources()}<div class="shop-picture ${Object.keys(profile().records).length ? 'lit-shop' : ''}"><img src="./assets/hong-kong-herbal-shop.webp" alt="我的涼茶舖">${profile().upgrades.map(id => `<span class="shop-item">${upgrades.find(u => u.id === id)?.name.replace('買', '').replace('裝', '')}</span>`).join('')}</div>${options(available.map(u => ({ value: u.id, html: `<strong>${u.name}</strong><span>💰 ${u.price}</span><small>${u.text}</small>` })), 'upgrade')}<p class="quiet">${available.length ? '挑一樣喜歡的升級。' : '茶舖設備齊全了！再去收集街坊故事吧。'}</p>${button('返回茶舖首頁', 'home')}`;
    },
    book() {
      const records = profile().records, done = Object.keys(records), allHerbs = [...new Set(done.flatMap(id => D.missions.find(m => m.id === id).materials))];
      const badges = ['找線索高手', '科學小茶師', '小小發明家', ...done.map(id => D.missions.find(m => m.id === id).reward)];
      const list = bookTab === 'tea' ? D.missions.map(m => ({ name: m.tea, unlocked: !!records[m.id], art: image(m.materials[0]), text: m.found })) : bookTab === 'herb' ? Object.entries(D.herbs).map(([id, [name, text]]) => ({ name, text, art: image(id), unlocked: allHerbs.includes(id) })) : bookTab === 'npc' ? D.missions.map(m => ({ name: m.npc, text: m.request, art: image(m.portrait, 'npc'), unlocked: !!records[m.id] })) : [{ name: '傳統銅壺', text: '觀察傳統器物的形狀。', art: image('pot'), unlocked: done.length > 0 }, { name: '茶舖招牌', text: '招牌讓街坊認得茶舖。', art: '<img src="./assets/hong-kong-herbal-shop.webp" alt="茶舖情境圖">', unlocked: profile().upgrades.includes('sign') }];
      return `${heading('🏅 我的徽章', '我的香港涼茶圖鑑')}<div class="badges">${done.length ? [...new Set(badges)].map(b => `<span>🏅 ${b}</span>`).join('') : '<p>完成第一個任務，收集你的第一枚徽章！</p>'}${done.length === D.missions.length ? '<strong class="master-badge">🏆 涼茶宗師</strong>' : `<span>涼茶宗師：${done.length} / ${D.missions.length}</span>`}</div><div class="tabs" role="tablist">${[['tea', '涼茶'], ['herb', '藥材'], ['npc', '街坊'], ['object', '舊物']].map(([id, label]) => `<button role="tab" aria-selected="${bookTab === id}" data-action="book-tab" data-value="${id}">${label}</button>`).join('')}</div><div class="stickers">${list.slice(bookPage * 6, bookPage * 6 + 6).map(item => `<article class="sticker ${item.unlocked ? '' : 'locked-sticker'}">${item.unlocked ? item.art : '<span class="unknown">?</span>'}<strong>${item.name}</strong><p>${item.unlocked ? item.text : '完成相關任務解鎖'}</p></article>`).join('')}</div><div class="pagination">${button('←', 'book-page', -1, false, !bookPage)}<span>${bookPage + 1} / ${Math.ceil(list.length / 6)}</span>${button('→', 'book-page', 1, false, (bookPage + 1) * 6 >= list.length)}</div>${button('返回茶舖', 'home')}`;
    },
    settings() { return `${heading('⚙ 設定', '按自己的步伐玩')}<label class="field">我的名字<input id="name" maxlength="16" value="${esc(profile().name)}"></label><fieldset><legend>支援程度（下一個任務生效）</legend>${Object.entries(D.modes).map(([id, m]) => `<label class="setting"><input type="radio" name="mode" value="${id}" ${profile().mode === id ? 'checked' : ''}>${m.icon} ${m.name}<small>${{ learn: '有提示、兩個答案、示範實驗', challenge: '少提示、自己試三次', master: '比較資料、選實驗方法' }[id]}</small></label>`).join('')}</fieldset><fieldset><legend>聲音與閱讀</legend>${[['music', '背景音樂'], ['muted', '全部靜音'], ['large', '大字模式'], ['reduced', '減少動畫']].map(([id, label]) => `<label class="setting"><input type="checkbox" data-setting="${id}" ${store.settings[id] ? 'checked' : ''}>${label}</label>`).join('')}<label class="field">音樂音量<input type="range" min="0" max="100" data-setting="musicVolume" value="${store.settings.musicVolume}"></label><label class="field">音效音量<input type="range" min="0" max="100" data-setting="sfxVolume" value="${store.settings.sfxVolume}"></label></fieldset>
      <details><summary>個人記錄與新身份</summary><p>記錄儲存在這部裝置的瀏覽器。新身份會有獨立進度。</p><label class="field">新玩家名字<input id="new-name" maxlength="16" placeholder="輸入暱稱"></label>${button('建立新身份', 'new-profile')}<label class="field">切換玩家<select id="profile">${store.profiles.map(p => `<option value="${p.id}" ${p.id === store.active ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select></label>${button('下載個人記錄', 'export')}<label class="field">匯入自己的記錄<input id="import" type="file" accept="application/json,.json"></label></details>
      <details><summary>教師資料與已完成報告</summary><p>高小版另存個人記錄，不會覆蓋原版進度。</p>${Object.entries(profile().records).filter(([, record]) => record.latest?.result).map(([id]) => button(`打印${D.missions.find(m => m.id === id).tea}報告`, 'past-report', id)).join('')}<p><a href="./classroom.html">開啟原版教學遊戲</a></p><p>本遊戲只模擬可觀察數據，不推算藥效。實驗配方並非飲用處方。</p><a href="./assets/ingredient-photos/sources.json" target="_blank">材料照片來源</a></details>${button('儲存並返回', 'home', '', true)}`; }
  };
  function pot() { const r = run(); return `<div class="brew-visual"><figure>${image('pot')}<figcaption>傳統銅壺 · 圖片觀察</figcaption></figure><div class="water-vessel" aria-label="${r.fill || 0}份水"><div style="height:${(r.fill || 0) * 30}%;background:#63371d" class="water ${r.brewing && !r.brewResult ? `bubbles heat-${r.heat}` : ''}"><i></i><i></i><i></i></div></div><div class="pot-label">${'🔥'.repeat((r.heat ?? 1) + 1)}${profile().upgrades.includes('thermometer') ? `<p>🌡 ${[60, 80, 100][r.heat ?? 1]}°C</p>` : ''}${profile().upgrades.includes('saver') ? '<p>💧 節水器已安裝</p>' : ''}</div></div>`; }
  function labSafety() { return '<p class="lab-safety">🔬 這是遊戲模擬！我們練習公平測試，數字不代表真實藥效。</p>'; }
  function simulate(value, variable) {
    const time = variable === 'time' ? value : 20, water = variable === 'water' ? value : 1000;
    const strength = clamp((1 - Math.exp(-time / 25)) * 1000 / water, 0, 1);
    return { value, time, water, temperature: 80, grams: 10, color: Math.round(strength * 100), bitterness: Math.round(strength * 60), ph: 6.5, rgb: `rgb(${Math.round(225 - strength * 155)},${Math.round(194 - strength * 159)},${Math.round(116 - strength * 99)})` };
  }
  function trialCups() { return `<div class="trial-cups">${[...run().trials].sort((a, b) => a.value - b.value).map((t, i) => `<figure><div class="tea-cup" style="--tea:${t.rgb}"></div><figcaption>第${i + 1}杯${t.demo ? '（示範）' : ''}<strong>${run().variable === 'time' ? ['短', '中', '長'][[10, 20, 30].indexOf(t.value)] + '時間' : ['少', '中', '多'][[500, 1000, 1500].indexOf(t.value)] + '水'}</strong><span>${t.color < 40 ? '淺' : t.color < 65 ? '中' : '深'}</span></figcaption></figure>`).join('')}</div>`; }
  function chart() { return `<div class="pictograph" aria-label="三次實驗茶色比較圖"><span>深<br>中<br>淺</span>${[...run().trials].sort((a, b) => a.value - b.value).map((t, i) => `<div><span class="dot" style="bottom:${t.color}%;background:${t.rgb}"></span><small>第${i + 1}杯</small></div>`).join('')}</div>`; }
  function scienceDetails() { return `<details><summary>🔬 科學家資料</summary><div class="table-scroll"><table><caption>固定80°C及10g材料的教學模擬</caption><thead><tr><th>時間 min</th><th>水 ml</th><th>茶色</th><th>苦味</th><th>pH</th></tr></thead><tbody>${run().trials.map(t => `<tr><td>${t.time}</td><td>${t.water}</td><td>${t.color}</td><td>${t.bitterness}</td><td>${t.ph}</td></tr>`).join('')}</tbody></table></div><p>模擬濃度 = (1 − e^(−時間/25)) × 1000/水量，限制在0至1。茶色 = 濃度 × 100；苦味 = 濃度 × 60。</p><p>pH 固定為6.5作示例，不由顏色或苦味推算。溫度固定為80°C；不代表水在沸騰。</p><p>可在成人指導下，用溫度探針、pH試紙及固定光源拍照驗證。每組用相同材料，重複測量，不飲用實驗樣本。</p></details>`; }
  function newRun(id) {
    const m = D.missions.find(x => x.id === id); if (!m) return;
    const difficulty = profile().mode;
    profile().run = { id: uid(), mission: id, mode: difficulty, screen: 'intro', started: Date.now(), resources: [], answers: [], hints: 0, feedback: '', evidencePick: null, evidenceDone: false, evidenceErrors: 0, compareErrors: 0, materialIndex: 0, materialErrors: 0, eventIds: difficulty === 'learn' ? [m.event] : [m.event, m.event === 'visit' ? 'queue' : 'visit'], eventIndex: 0, eventResult: null, brewPage: 0, heat: 1, fill: 2, brewing: false, brewPaid: false, brewResult: null, guess: null, variable: 'time', trials: [], conclusion: '', invent: { step: 0, audience: '', problem: '', product: '', reason: '' }, result: null };
    if (!Object.keys(profile().records).length) profile().resources = { money: mode().money, water: mode().water, happy: 75 };
    next('intro');
  }
  function showTutorial() {
    const lines = ['幫街坊完成涼茶任務！', '看線索、選材料、試一試！', '完成任務，讓你的茶舖升級！'];
    $('#guide-dialog').innerHTML = `<img src="./assets/tea-history-teacher-logo.png" alt="阿茶仔"><p>${guideStep + 1} / 3</p><h2 id="guide-title">阿茶仔</h2><p id="tutorial-line">${lines[guideStep]}</p>${button(guideStep === 2 ? '開始！' : '知道！', 'tutorial', '', true)}`;
    if (!$('#guide-dialog').open) $('#guide-dialog').showModal();
  }
  function retry(kind, message, example) {
    const r = run(); r[kind] = (r[kind] || 0) + 1;
    r.feedback = r[kind] < 2 ? `再想一想：${message}` : r[kind] < 3 ? `小提示：${example}` : `阿茶仔示範：${example}。請你再試一次。`;
    r.hints++; sfx(false); save(); render();
  }
  function submitEvidence() {
    const r = run(), m = mission(); if (r.evidenceDone) return;
    if (r.evidencePick === null) { notify('先選一個線索，再放進證據盒。'); return; }
    const correct = r.evidencePick === m.answer;
    r.answers.push({ type: '史料分析', question: m.question, answer: m.evidence[r.evidencePick], correct });
    if (!correct) { retry('evidenceErrors', m.help, m.evidence[m.answer]); return; }
    r.evidenceDone = true; r.feedback = '找到支持想法的證據了！'; sfx(true); save(); render();
  }
  function startMeter() {
    clearInterval(timer); tick = 0; needle = 0;
    if (store.settings.reduced) return updateMeter();
    timer = setInterval(() => { tick += 0.7; needle = 50 - 50 * Math.cos(tick * Math.PI / 100); updateMeter(); }, 50);
  }
  function updateMeter() { const el = $('#needle'); if (!el) return; el.style.left = `${needle}%`; el.parentElement.setAttribute('aria-valuenow', Math.round(needle)); }
  function complete() {
    const r = run(); if (r.result || !r.conclusion || r.trials.length !== 3 || !r.invent.product) return;
    const p = D.inventions.find(x => x.id === r.invent.product);
    const helpful = p.problem === r.invent.problem ? 3 : 1;
    const rubric = { '♥ 有沒有幫到人？': helpful, '🛠 做不做得到？': 3, '🌱 有沒有浪費？': p.waste };
    const sections = { '🔎 找線索': r.evidenceErrors > 1 ? 2 : 3, '🍵 煲茶': r.brewResult.stars, '🔬 做實驗': 3, '💡 發明': helpful === 3 ? 3 : 2 };
    const finalStars = clamp(Math.round(Object.values(sections).reduce((a, b) => a + b, 0) / 4), 1, 3);
    const best = Object.entries(sections).sort((a, b) => b[1] - a[1])[0][0];
    r.result = { stars: finalStars, sections, rubric, best, improve: helpful < 3 ? '選一個更貼近街坊問題的發明。' : r.fill > mission().fill ? '煲少一點，看看能節省多少水。' : '把你的發現告訴另一位同學。' };
    r.finished = Date.now();
    const previous = profile().records[r.mission];
    if (!previous) changeResources({ money: 30, water: 15, happy: 10 }, '首次完成任務獎勵');
    profile().records[r.mission] = { stars: Math.max(previous?.stars || 0, finalStars), latest: JSON.parse(JSON.stringify(r)) };
    sfx(true, true); next('result');
  }
  const actions = {
    start() { if (!profile().tutorial) { guideStep = 0; showTutorial(); } else if (run() && run().screen !== 'result') next(run().screen); else navigate('select'); },
    tutorial() { if (guideStep < 2) { guideStep++; showTutorial(); } else { profile().tutorial = true; save(); $('#guide-dialog').close(); navigate('select'); } },
    mission: newRun,
    next(screen) { run().feedback = ''; next(screen); },
    page(v) { selectPage = clamp(selectPage + Number(v), 0, Math.ceil(D.missions.length / 3) - 1); render(); },
    hint() { run().hints++; notify(mission().help); save(); },
    compare(v) { run().answers.push({ type: '比較資料', answer: v === 'context' ? '要看年代和目的' : '一個說法代表所有年代和所有人', correct: v === 'context' }); if (v === 'context') { run().feedback = ''; sfx(true); next('evidence'); } else retry('compareErrors', '今天的情況能代表所有年代嗎？', '要看年代和目的'); },
    'evidence-pick'(v) { if (run().evidenceDone) return; run().evidencePick = Number(v); run().feedback = ''; save(); render(); },
    'evidence-submit': submitEvidence,
    event(v) {
      const r = run(); if (r.eventResult) return;
      const c = D.events[r.eventIds[r.eventIndex]].choices[Number(v)]; if (!c) return;
      if (profile().resources.money + c.money < 0 || profile().resources.water + c.water < 0) { r.feedback = '暫時不夠資源，試試不用花錢或用水的方法。'; save(); render(); return; }
      const entry = changeResources(c, c.text); r.eventResult = { reply: c.reply, entry }; if (c.small) r.fill = 1;
      sfx(true); next('story');
    },
    'event-next'() { const r = run(); if (!r.eventResult) return; r.eventIndex++; r.eventResult = null; r.feedback = ''; next(r.eventIndex < r.eventIds.length ? 'story' : 'gather'); },
    material(id) { const r = run(), wanted = mission().materials[r.materialIndex]; if (id !== wanted) { retry('materialErrors', D.herbs[wanted][1], `選${D.herbs[wanted][0]}：${D.herbs[wanted][1]}`); return; } r.materialIndex++; r.feedback = ''; sfx(true); next('gather'); },
    heat(v) { run().heat = clamp(Number(v), 0, 2); save(); render(); },
    fill(v) { run().fill = clamp(Number(v), 1, 3); save(); render(); },
    'brew-page'() { run().brewPage = 1; save(); render(); },
    'brew-back'() { run().brewPage = 0; save(); render(); },
    'brew-start'() {
      const r = run(), cost = Math.max(5, r.fill * 10 - (profile().upgrades.includes('saver') ? 5 : 0));
      if (!r.brewPaid && profile().resources.water < cost) {
        $('#guide-dialog').innerHTML = `<h2 id="guide-title">水唔夠喇！你想點做？</h2><p>補充水，或安排小批煲製。</p>${button('💰 -10 · 💧 +20 買水', 'refill', 'buy', false, profile().resources.money < 10)}${button('煲少一點 · 預留10份水', 'refill', 'small')}`;
        $('#guide-dialog').showModal(); return;
      }
      if (!r.brewPaid) { changeResources({ water: -cost }, '煲製用水'); r.brewPaid = true; }
      r.brewing = true; save(); render();
    },
    refill(v) { if (v === 'buy' && profile().resources.money < 10) return; changeResources(v === 'buy' ? { money: -10, water: 20 } : { water: 10, happy: -5 }, v === 'buy' ? '補買水' : '小批煲製，預留用水'); if (v !== 'buy') run().fill = 1; $('#guide-dialog').close(); save(); render(); },
    'meter-step'() { needle = (needle + 10) % 110; updateMeter(); },
    'brew-stop'() {
      const r = run(); if (!r.brewing || r.brewResult) return; clearInterval(timer); timer = null;
      const timing = Math.abs(needle - 50) <= mode().spot / 2, heatOK = r.heat === mission().heat, waterOK = r.fill <= mission().fill;
      const n = clamp(Number(timing) + Number(heatOK) + Number(waterOK), 1, 3);
      r.brewResult = { stars: n, heat: r.heat, fill: r.fill, temperature: [60, 80, 100][r.heat], timing: Math.round(needle), feedback: !waterOK ? '完成了！下次少加一點水，看看能否減少浪費。' : !heatOK ? '完成了！下次試試不同火力，觀察加熱的變化。' : !timing ? '完成了！下次等指針走進綠色區再停火。' : '火力、水量和時機都掌握得很好！' };
      sfx(true); save(); render();
    },
    'brew-retry'() { run().brewResult = null; run().brewing = false; run().brewPage = 0; save(); render(); },
    guess(v) { const r = run(); r.guess = v; r.trials = r.mode === 'learn' ? [{ ...simulate(10, 'time'), demo: true }] : []; next('trial'); },
    method(v) { if (!['time', 'water'].includes(v)) return; run().variable = v; next('guess'); },
    trial(v) { const r = run(), value = Number(v); if (!(r.variable === 'time' ? [10, 20, 30] : [500, 1000, 1500]).includes(value)) return; if (r.trials.some(t => t.value === value)) { notify('這杯已經有結果，試試另一個條件。'); return; } r.trials.push({ ...simulate(value, r.variable), demo: false }); sfx(true); save(); render(); },
    conclusion(v) { if (run().trials.length !== 3) return; run().answers.push({ type: '實驗結論', answer: v === 'change' ? (run().variable === 'time' ? '煲得越久茶色越深' : '水越多茶色越淺') : '三杯顏色一樣', correct: v === 'change' }); if (v !== 'change') { retry('conclusionErrors', '比較第一杯和第三杯。', run().variable === 'time' ? '時間越長，模擬茶色越深' : '水量越多，模擬茶色越淺'); return; } run().conclusion = run().variable === 'time' ? '我看到煲得越久茶色越深，所以我認為時間會影響茶色。' : '我看到水越多茶色越淺，所以我認為水量會影響茶色。'; run().feedback = ''; sfx(true); save(); render(); },
    audience(v) { run().invent.audience = v; run().invent.step = 1; next('invent'); },
    problem(v) { if (v === 'other') run().invent.step = 2; else { run().invent.problem = v; run().invent.step = 3; } next('invent'); },
    product(v) { if (!D.inventions.some(p => p.id === v)) return; run().invent.product = v; run().invent.step = 4; next('invent'); },
    'invent-back'(v) { run().invent.step = Number(v); next('invent'); },
    finish: complete,
    upgrade(id) {
      const price = { thermometer: 30, saver: 40, sign: 35 }[id]; if (!price || profile().upgrades.includes(id)) return;
      if (profile().resources.money < price) { notify('金幣還不夠。完成新街坊的任務，就有獎勵！'); return; }
      changeResources({ money: -price }, `茶舖升級：${id}`); profile().upgrades.push(id); save(); sfx(true); render(); notify('茶舖有新設備啦！');
    },
    'book-tab'(v) { bookTab = v; bookPage = 0; render(); },
    'book-page'(v) { bookPage = Math.max(0, bookPage + Number(v)); render(); },
    'new-profile'() { const name = $('#new-name').value.trim(); if (!name) { notify('先給新茶師起個名字吧。'); return; } if (store.profiles.length >= 20) { notify('這部裝置已有20位玩家，可先下載記錄備份。'); return; } const p = freshProfile(name); store.profiles.push(p); store.active = p.id; save(); navigate('home'); },
    export() { const blob = new Blob([JSON.stringify({ version: 1, profile: profile() }, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'my-tea-adventure.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); },
    speak() {
      if (!('speechSynthesis' in window)) { notify('這個瀏覽器未支援朗讀，可以慢慢看文字。'); return; }
      const content = $('#spoken')?.textContent; if (!content) return;
      try {
        const voices = speechSynthesis.getVoices(), voice = voices.find(v => /zh[-_]HK|yue/i.test(v.lang)) || voices.find(v => /^zh/i.test(v.lang));
        if (!voice) { notify('暫時沒有可用的中文聲音，文字會保留在畫面。'); return; }
        speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(content); utterance.voice = voice; utterance.lang = voice.lang; utterance.rate = 0.85; utterance.onerror = () => notify('暫時無法朗讀，可以繼續看文字。'); speechSynthesis.speak(utterance);
      } catch { notify('暫時無法朗讀，可以繼續看文字。'); }
    },
    print() { $('#report').innerHTML = reportHTML(); window.print(); },
    'past-report'(id) { const r = profile().records[id]?.latest; if (!r?.result) return; $('#report').innerHTML = reportHTML(r); window.print(); }
  };
  for (const screen of ['home', 'shop', 'book', 'settings', 'select']) actions[screen] = () => navigate(screen);
  function reportHTML(r = run()) {
    if (!r?.result) return '';
    const m = D.missions.find(x => x.id === r.mission), p = D.inventions.find(x => x.id === r.invent.product), res = r.result;
    return `<header><h1>一碗百苦 · 我的研習報告</h1><p>${esc(profile().name)} | ${m.tea} | ${D.modes[r.mode].name} | ${new Date(r.finished).toLocaleDateString('zh-HK')}</p></header><h2>一、史料分析與歷史同理</h2><p>${m.question}</p><p>證據：${m.evidence[m.answer]}。來源屬性：${sourceTag(m)}。</p><p>參考：${D.sources[m.source].name}（${D.sources[m.source].url}）</p><p>答題紀錄：${r.answers.map(a => `${esc(a.type)}：${esc(a.answer)}（${a.correct ? '找到證據' : '再試'}）`).join('；')}。提示 ${r.hints} 次。</p><h2>二、公平測試：假設、變項與數據</h2><p>我估：${{ yes: '會', no: '不會', unsure: '不知道' }[r.guess]}。自變項：${r.variable === 'time' ? '時間' : '水量'}；量度：茶色。固定80°C、10g材料。</p><table><thead><tr><th>時間 min</th><th>水 ml</th><th>溫度 °C</th><th>茶色</th><th>苦味</th><th>pH 示例</th><th>來源</th></tr></thead><tbody>${r.trials.map(t => `<tr><td>${t.time}</td><td>${t.water}</td><td>${t.temperature}</td><td>${t.color}</td><td>${t.bitterness}</td><td>${t.ph}</td><td>${t.demo ? '示範' : '學生試驗'}</td></tr>`).join('')}</tbody></table><p>${esc(r.conclusion)}</p><p>上述皆為教學模擬，不是藥效或真實測量。可用溫度探針、pH試紙及固定光源拍照驗證，保持其他條件相同並重複測量。</p><h2>三、工程設計與價值觀</h2><p>幫誰：${esc(r.invent.audience)}；問題：${esc(r.invent.problem)}。設計：${p.name}。</p><p>工具／感測器：${p.tool}。流程：${p.process}。</p><p>理由：${p.help}。${esc(r.invent.reason)}</p><p>關心街坊、珍惜資源、傳承文化。下一步：${res.improve}</p><h2>四、教師評量與資源紀錄</h2><p>${Object.entries(res.sections).map(([k, v]) => `${k} ${v}/3`).join('；')}。${Object.entries(res.rubric).map(([k, v]) => `${k} ${v}/3`).join('；')}。</p><p>煲製設定：${[60, 80, 100][r.heat]}°C、${r.fill * 500}ml，停火位置${r.brewResult.timing}/100。材料重試${r.materialErrors}次。</p><p>${r.resources.map(e => `${esc(e.reason)}：金幣${e.before.money}→${e.after.money}，水${e.before.water}→${e.after.water}，開心度${e.before.happy}→${e.after.happy}`).join('；')}</p><footer>基督教聖約教會堅樂中學 · 高小學生版</footer>`;
  }
  document.addEventListener('click', event => {
    const go = event.target.closest('[data-go]'); if (go) { event.preventDefault(); navigate(go.dataset.go); return; }
    const target = event.target.closest('[data-action]'); if (!target || target.disabled) return;
    actions[target.dataset.action]?.(target.dataset.value);
  });
  document.addEventListener('input', event => {
    const el = event.target;
    if (el.id === 'reason' && run()) { run().invent.reason = el.value.slice(0, 100); save(); }
    if (el.id === 'name') { profile().name = el.value.slice(0, 16) || '小茶師'; save(); $('#player-name').textContent = profile().name; }
    if (el.dataset.setting) { const key = el.dataset.setting; store.settings[key] = el.type === 'checkbox' ? el.checked : Number(el.value); save(); document.documentElement.classList.toggle('large', store.settings.large); document.documentElement.classList.toggle('reduced', store.settings.reduced); audioUpdate(); }
  });
  document.addEventListener('change', async event => {
    const el = event.target;
    if (el.name === 'mode' && D.modes[el.value]) { profile().mode = el.value; save(); }
    if (el.id === 'profile') { store.active = el.value; save(); navigate('home'); }
    if (el.id === 'import' && el.files[0]) {
      try {
        if (el.files[0].size > 1000000) throw new Error('large');
        const data = JSON.parse(await el.files[0].text()), p = data.profile;
        if (data.version !== 1 || !p || typeof p.name !== 'string' || !D.modes[p.mode] || !p.resources || !Array.isArray(p.upgrades) || !p.records || typeof p.records !== 'object') throw new Error('format');
        const imported = freshProfile(p.name.slice(0, 16)); imported.mode = p.mode;
        for (const key of ['money', 'water', 'happy']) { if (!Number.isFinite(p.resources[key])) throw new Error('resource'); imported.resources[key] = clamp(p.resources[key], 0, key === 'happy' ? 100 : 999); }
        imported.upgrades = [...new Set(p.upgrades.filter(u => ['thermometer', 'saver', 'sign'].includes(u)))];
        for (const m of D.missions) if (p.records[m.id]) { const r = p.records[m.id]; if (!Number.isInteger(r.stars) || r.stars < 1 || r.stars > 3) throw new Error('record'); imported.records[m.id] = { stars: r.stars }; }
        imported.tutorial = true; store.profiles.push(imported); store.active = imported.id; save(); navigate('home'); notify('已匯入徽章和茶舖。未完成的任務可重新選擇。');
      } catch { notify('未能讀取記錄，請選擇本遊戲下載的 JSON 檔案。'); }
    }
  });
  document.addEventListener('dragstart', e => { const target = e.target.closest('[draggable]'); if (target) { e.dataTransfer.setData('text/plain', target.dataset.value); e.dataTransfer.effectAllowed = 'copy'; } });
  document.addEventListener('dragover', e => { if (e.target.closest('#evidence-box')) e.preventDefault(); });
  document.addEventListener('drop', e => { if (!e.target.closest('#evidence-box') || view !== 'evidence') return; e.preventDefault(); const v = e.dataTransfer.getData('text/plain'); if (!/^[0-2]$/.test(v)) return; run().evidencePick = Number(v); submitEvidence(); });
  $('#guide-dialog').addEventListener('cancel', e => { if (!profile().tutorial) e.preventDefault(); });
  // Pentatonic phrases alternate by scene; audio only starts after an explicit setting gesture.
  let audioContext = null, audioTimer = null, audioScene = 'menu', beat = 0;
  function context() { if (!audioContext) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; audioContext = new C(); } return audioContext; }
  function tone(frequency, duration, volume, type = 'sine', delay = 0) {
    const c = context(); if (!c || store.settings.muted || volume <= 0) return;
    const osc = c.createOscillator(), gain = c.createGain(), at = c.currentTime + delay;
    osc.type = type; osc.frequency.value = frequency; gain.gain.setValueAtTime(0, at); gain.gain.linearRampToValueAtTime(volume * 0.13, at + 0.02); gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    osc.connect(gain); gain.connect(c.destination); osc.start(at); osc.stop(at + duration + 0.02);
  }
  function sfx(good, celebration = false) { try { const c = context(); if (!c) return; c.resume().catch(() => {}); const notes = good ? celebration ? [523, 659, 784, 1046] : [659, 784] : [392]; notes.forEach((f, i) => tone(f, 0.24, store.settings.sfxVolume / 100, 'sine', i * 0.13)); } catch { /* Silent fallback keeps the task playable. */ } }
  function musicBeat() {
    if (!store.settings.music || store.settings.muted || document.hidden) return;
    const settings = { menu: [90, 'triangle', 1], clue: [76, 'sine', 0.5], gather: [108, 'triangle', 1], brew: [92 + (needle > 30 && needle < 70 ? 4 : 0), 'sine', 0.65], lab: [92, 'sine', 0.8], result: [96, 'triangle', 1] }[audioScene];
    const phrases = [[0, 2, 4, 2, 1, 0, 1, 3], [4, 3, 2, 0, 1, 2, 1, 0], [0, 1, 3, 4, 2, 1, 0, 2]], scale = [262, 294, 330, 392, 440];
    const note = phrases[Math.floor(beat / 8) % 3][beat % 8];
    tone(scale[note] * (audioScene === 'lab' ? 2 : 1), 0.32, store.settings.musicVolume / 100 * settings[2], settings[1]);
    if (beat % 4 === 0) tone(131, 0.5, store.settings.musicVolume / 300, 'sine');
    beat++; audioTimer = setTimeout(musicBeat, 60000 / settings[0]);
  }
  function audioUpdate() { clearTimeout(audioTimer); try { if (!store.settings.music || store.settings.muted || document.hidden) { if (store.settings.muted || document.hidden) audioContext?.suspend().catch(() => {}); return; } const c = context(); c?.resume().then(musicBeat).catch(() => notify('音樂暫時不能播放，遊戲可照常進行。')); } catch { notify('這個瀏覽器暫時不能播放音樂。'); } }
  document.addEventListener('visibilitychange', () => { if (document.hidden) { clearTimeout(audioTimer); audioContext?.suspend().catch(() => {}); } else if (audioContext) audioUpdate(); });
  document.addEventListener('pointerdown', () => { if (store.settings.music && !audioTimer) audioUpdate(); }, { once: true });
  window.addEventListener('beforeunload', save);
  history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  save(); render(); window.scrollTo(0, 0);
})();
