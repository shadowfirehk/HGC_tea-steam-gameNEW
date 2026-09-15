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
  const VISITOR_KEY = 'hgcTeaOpenDay.v1';
  let visitor = null;
  try { const saved = JSON.parse(sessionStorage.getItem(VISITOR_KEY)); if (saved?.visitor && saved.resources && saved.records) visitor = saved; } catch { /* A visitor can still play without session storage. */ }
  const profile = () => visitor || store.profiles.find(p => p.id === store.active);
  const run = () => profile().run;
  const mission = () => D.missions.find(m => m.id === run()?.mission);
  const mode = () => D.modes[run()?.mode || profile().mode];
  let view = 'home', selectPage = 0, bookTab = 'tea', bookPage = 0, timer = null, noticeTimer, tick = 0, guideStep = 0, needle = 0;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { storageOK = false; }
    try { if (visitor) sessionStorage.setItem(VISITOR_KEY, JSON.stringify(visitor)); else sessionStorage.removeItem(VISITOR_KEY); } catch { /* Keep the current visit in memory. */ }
  }
  const reduceMotion = () => store.settings.reduced || matchMedia('(prefers-reduced-motion: reduce)').matches;
  function notify(message) { $('#notice').textContent = message; $('#notice').classList.add('visible'); clearTimeout(noticeTimer); noticeTimer = setTimeout(() => $('#notice').classList.remove('visible'), 4500); }
  function button(text, action, value = '', primary = false, disabled = false) { return `<button type="button" data-action="${action}" data-value="${esc(value)}" ${primary ? 'class="primary"' : ''} ${disabled ? 'disabled' : ''}>${text}</button>`; }
  function image(id, kind = 'herb', cls = '') { const path = kind === 'npc' ? `npc/${id}.jpg` : `ingredient-photos/${id}.jpg`; return `<img class="${cls}" src="./assets/${path}" alt="${esc(kind === 'npc' ? '街坊角色插畫' : D.herbs[id]?.[0] || '傳統銅壺照片')}">`; }
  function guide(text, portrait = '', name = '阿茶仔') { return `<aside class="guide">${portrait ? image(portrait, 'npc') : '<img src="./assets/tea-history-teacher-logo.png" alt="阿茶仔">'}<div><strong>${name}</strong><p id="spoken">${text}</p></div>${button('🔊', 'speak')}</aside>`; }
  function heading(kicker, title) { return `<div class="heading"><p class="eyebrow">${kicker}</p><h1>${title}</h1></div>`; }
  function stars(n) { return `<span class="stars" aria-label="${n}顆星，最多3顆">${'★'.repeat(n)}${'☆'.repeat(3 - n)}</span>`; }
  function startVisitor(quick = false) {
    visitor = { ...freshProfile('參觀小茶師'), visitor: true, tutorial: true, quick };
    selectPage = 0;
    save(); if (quick) newRun('sugarcane-root'); else navigate('select');
  }
  function rewardAnimation(label, big = false) {
    notify(label);
    if (reduceMotion()) return;
    const layer = document.createElement('div');
    layer.className = 'reward-animation'; layer.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < (big ? 18 : 7); i++) {
      const star = document.createElement('span'); star.textContent = '★';
      star.style.setProperty('--x', `${(i * 137 % 90) + 5}%`);
      star.style.setProperty('--delay', `${i % 5 * 70}ms`);
      star.style.setProperty('--turn', `${i % 2 ? 110 : -110}deg`);
      layer.append(star);
    }
    document.body.append(layer); setTimeout(() => layer.remove(), 1900);
  }
  function flyMaterial(id, from) {
    if (reduceMotion() || !from) return;
    const target = $('.collection-basket')?.getBoundingClientRect(); if (!target) return;
    const flyer = document.createElement('img'); flyer.src = `./assets/ingredient-photos/${id}.jpg`;
    flyer.className = 'flying-material'; flyer.alt = '';
    Object.assign(flyer.style, { left: `${from.left}px`, top: `${from.top}px`, width: '90px', height: '90px' });
    document.body.append(flyer);
    flyer.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${target.left + target.width / 2 - from.left - 45}px,${target.top - from.top}px) scale(.35)`, opacity: .25 }], { duration: 650, easing: 'cubic-bezier(.2,.8,.3,1)' });
    setTimeout(() => flyer.remove(), 700);
  }
  function decorateScene() {
    const app = $('#app');
    if (view === 'home' && !visitor?.run) {
      const full = app.querySelector('[data-action="visitor-start"]');
      full.classList.remove('primary'); full.textContent = '完整開放日體驗';
      app.querySelector('.home-actions').insertAdjacentHTML('afterbegin', button('3–5分鐘 · 幫婆婆慳水', 'quick-start', '', true));
    }
    if (visitor && view === 'select') app.querySelector('.pagination')?.remove();
    if (visitor && view === 'settings') app.insertAdjacentHTML('afterbegin', `<div class="visitor-tools">${button('下一位小茶師', 'next-visitor')}${button('回到個人遊戲', 'leave-visitor')}</div>`);
    if (view in stageIndex && run()) {
      const quick = run().quick;
      const labels = quick ? ['找證據', '做發明', '幫街坊'] : ['找線索', '幫街坊', '認藥材', '煲涼茶', '做實驗', '小發明', '領獎勵'];
      const index = quick ? view === 'quick-result' ? 2 : view === 'invent' ? 1 : 0 : stageIndex[view];
      app.querySelector('.journey>span').textContent = `${index + 1} / ${labels.length} · ${labels[index]}`;
      app.querySelector('.journey progress').max = labels.length;
      app.querySelector('.journey progress').value = index + 1;
      app.querySelector('.journey').insertAdjacentHTML('beforeend', '<button data-action="stage-help" class="stage-help" aria-label="阿茶仔提示" title="阿茶仔提示">?</button>');
      app.querySelector('.journey').insertAdjacentHTML('afterend', `<ol class="adventure-track" aria-label="冒險路線">${labels.map((label, i) => `<li class="${i < index ? 'done' : ''} ${i === index ? 'current' : ''}" ${i === index ? 'aria-current="step"' : ''}><span>${(quick ? ['🔎', '💡', '♥'] : ['🔎', '♥', '🌿', '🍵', '🔬', '💡', '🏅'])[i]}</span><small>${label}</small></li>`).join('')}</ol>`);
      const cta = app.querySelector(':scope > button.primary');
      if (cta) { const dock = document.createElement('div'); dock.className = 'action-dock'; cta.before(dock); dock.append(cta); }
    }
    if (view === 'clue') {
      const figure = app.querySelector('.clue-image'), text = app.querySelector('.clue-text');
      const layout = document.createElement('div'); layout.className = 'reading-layout'; figure.before(layout); layout.append(figure, text);
      if (run().quick) app.querySelector('.heading').insertAdjacentHTML('afterend', '<p class="short-brief">婆婆想慳水：先找歷史證據，再做一個會自動停水的茶壺。</p>');
    }
    if (view === 'evidence' && run().quick && run().evidenceDone) {
      const cta = app.querySelector('[data-action="next"][data-value="story"]');
      cta.dataset.value = 'invent'; cta.textContent = '用證據幫婆婆設計';
    }
    if (view === 'gather') {
      const r = run(), m = mission();
      app.querySelector('.heading').insertAdjacentHTML('afterend', `<div class="collection-basket" aria-label="材料收集籃"><strong>🧺 我的材料籃</strong><div>${m.materials.map((id, i) => `<span class="basket-slot ${i < r.materialIndex ? 'collected' : ''}">${i < r.materialIndex ? image(id) : '?'}</span>`).join('')}</div><span>${r.materialIndex} / ${m.materials.length}</span></div>`);
    }
    if (view === 'evidence' && run().evidenceDone) app.querySelector('.evidence-box').classList.add('evidence-stamped');
    if (view === 'brew') {
      const visual = app.querySelector('.brew-visual'); const controls = visual?.nextElementSibling;
      if (controls?.matches('.choices,.timing')) { const layout = document.createElement('div'); layout.className = 'brew-layout'; visual.before(layout); layout.append(visual, controls); }
    }
    if (view === 'trial') {
      const controls = app.querySelector('.choices'), cups = app.querySelector('.trial-cups');
      controls.classList.add('trial-controls');
      const layout = document.createElement('div'); layout.className = 'experiment-layout'; controls.before(layout); layout.append(controls, cups);
      if (run().trials.length === 3) app.querySelector('.guide').remove();
    }
    if (view === 'result') {
      const r = run(), m = mission();
      app.querySelector('.reward').insertAdjacentHTML('afterend', `<section class="takeaways"><h2>今天帶走三個發現</h2><p>🔎 ${esc(m.found)}</p><p>🔬 ${esc(r.conclusion)}</p><p>♥ 好發明，從關心別人的需要開始。</p></section>`);
      if (visitor) {
        app.querySelector('.rubric').hidden = true;
        const dock = app.querySelector('.action-dock'); dock.innerHTML = button('交給下一位小茶師', 'next-visitor', '', true);
        app.querySelector('[data-action="select"]').textContent = '我還想幫另一位街坊';
      }
    }
  }
  function resources() { const r = profile().resources; return `<div class="resources" aria-label="茶舖資源"><span>💰 <b>${r.money}</b><small>金幣</small></span><span>💧 <b>${r.water}</b><small>水</small></span><span>♥ <b aria-label="街坊開心度${Math.ceil(r.happy / 20)}級">${['😟', '😐', '🙂', '😀', '🤩'][clamp(Math.ceil(r.happy / 20) - 1, 0, 4)]}</b><small>街坊開心度</small></span></div>`; }
  function changeResources(effects, reason) {
    const before = { ...profile().resources };
    for (const key of ['money', 'water', 'happy']) profile().resources[key] = clamp(before[key] + (effects[key] || 0), 0, key === 'happy' ? 100 : 999);
    const entry = { reason, before, after: { ...profile().resources } };
    if (run()) run().resources.push(entry);
    save(); return entry;
  }
  function effectView(entry) { return `<div class="effects">${['money', 'water', 'happy'].filter(k => entry.before[k] !== entry.after[k]).map(k => `<span>${{ money: '💰', water: '💧', happy: '♥' }[k]} ${k === 'happy' ? '街坊心情有變化' : `${entry.before[k]} → <b>${entry.after[k]}</b>`}</span>`).join('')}</div>`; }
  function clearNotice() { clearTimeout(noticeTimer); $('#notice').classList.remove('visible'); document.querySelectorAll('.reward-animation,.flying-material').forEach(el => el.remove()); }
  function stopSpeech() { try { window.speechSynthesis?.cancel(); } catch { /* Text remains available without speech. */ } }
  function pauseMeter() { clearInterval(timer); timer = null; document.documentElement.classList.add('brew-paused'); save(); }
  function next(screen) { pauseMeter(); stopSpeech(); clearNotice(); if (run()) run().screen = screen; view = screen; save(); render(); window.scrollTo({ top: 0, behavior: 'instant' }); $('#app').focus({ preventScroll: true }); }
  function navigate(screen) { pauseMeter(); stopSpeech(); clearNotice(); view = screen; render(); window.scrollTo({ top: 0, behavior: 'instant' }); $('#app').focus({ preventScroll: true }); }
  function learnMore(m) { const s = D.sources[m.source]; return `<details><summary>想知更多</summary><p>誰說的？${esc(m.fictional ? '遊戲編寫者' : s.who)}</p><p>甚麼時候？${esc(m.era)}</p><p>為甚麼？${esc(m.fictional ? '讓我們練習找證據和關心別人' : s.why)}</p><p>這段是${m.fictional ? '教學創作，不是當年的真實證詞' : '根據現代介紹寫成的短摘要，不是原文引述'}。</p><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)} ↗</a><p>照片或插畫只協助觀察，並非這個故事的歷史現場。</p></details>`; }
  function sourceTag(m) { return m.fictional ? '教學創作 · 不是史料原件' : '二手史料 · 教學摘要'; }
  function options(items, action, selected = null, primary = false) { return `<div class="choices">${items.map(item => `<button type="button" data-action="${action}" data-value="${esc(item.value)}" class="choice ${selected === item.value ? 'selected' : ''} ${primary ? 'primary' : ''}" ${selected !== null ? `aria-pressed="${selected === item.value}"` : ''}>${item.html || esc(item.label)}</button>`).join('')}</div>`; }
  const stageIndex = { intro: 0, clue: 0, compare: 0, evidence: 0, story: 1, gather: 2, brew: 3, npc: 3, guess: 4, method: 4, trial: 4, observe: 4, conclude: 4, invent: 5, result: 6, 'quick-result': 6 };
  function render() {
    clearInterval(timer); timer = null;
    $('#app').dataset.view = view;
    $('#app').classList.toggle('visitor-mode', !!visitor);
    document.documentElement.classList.toggle('large', store.settings.large);
    document.documentElement.classList.toggle('reduced', store.settings.reduced);
    $('#player-name').textContent = profile().name;
    let content = screens[view]?.() || screens.home();
    if (view in stageIndex && run()) content = `<div class="journey"><button data-go="home" title="返回茶舖，保留進度" aria-label="返回茶舖">⌂</button><span>${esc(mission().tea)} · ${stageIndex[view] + 1} / 7</span><progress max="7" value="${stageIndex[view] + 1}" aria-label="任務進度"></progress></div>${resources()}${content}`;
    $('#app').innerHTML = content;
    decorateScene();
    $('#app [data-action="speak"]')?.setAttribute('aria-label', '朗讀對話');
    $('#app [data-action="speak"]')?.setAttribute('title', '朗讀');
    if (view === 'brew' && run().brewing && !run().brewResult) startMeter();
    audioScene = ({ clue: 'clue', evidence: 'clue', compare: 'clue', gather: 'gather', brew: 'brew', guess: 'lab', method: 'lab', trial: 'lab', observe: 'lab', conclude: 'lab', invent: 'lab', result: 'result' })[view] || 'menu';
  }
  const screens = {
    home() {
      const completed = Object.keys(profile().records).length;
      return `<section class="home-scene ${completed ? 'lit-shop' : ''}"><div class="home-title"><p class="eyebrow">歡迎來到我們的中學 · 開放日</p><h1>一碗百苦</h1><p>當一次小茶師，幫街坊找出茶的秘密！</p>${profile().upgrades.includes('sign') ? '<span class="shop-sign">小茶師的街坊茶舖 · 營業中</span>' : ''}</div><img class="welcome-guide" src="./assets/tea-history-teacher-logo.png" alt="阿茶仔歡迎你"><div class="hanging-lantern" aria-hidden="true">茶</div></section><section class="home-actions">${button(visitor && run() && run().screen !== 'result' ? '🍵 繼續我的體驗' : '🍵 開始開放日體驗', 'visitor-start', '', true)}<div class="adventure-promise"><span>🔎 找線索</span><span>🍵 煲涼茶</span><span>🔬 做實驗</span></div>${button('🏮 我的茶舖', 'shop')}${button('🏅 我的徽章', 'book')}${button(visitor ? '回到個人遊戲' : (run() && run().screen !== 'result' ? '繼續個人冒險' : '完整七關冒險'), visitor ? 'leave-visitor' : 'start')}</section><p class="quiet">${visitor ? '訪客體驗 · 不用輸入姓名' : `${completed} / ${D.missions.length} 位街坊的任務已完成`}</p>${!storageOK ? '<p class="inline-feedback">這個瀏覽器暫時不能保存記錄。離開前可到設定下載個人記錄。</p>' : ''}`;
    },
    select() {
      const cards = visitor ? ['five-flower', 'sugarcane-root', 'old-hk'].map(id => D.missions.find(m => m.id === id)) : D.missions.slice(selectPage * 3, selectPage * 3 + 3);
      return `${heading(visitor ? '開放日小任務 · 按自己的步伐玩' : '約 8–12 分鐘的小冒險', '今天想幫哪位街坊？')}${guide('選一位街坊，聽聽他的故事。')}
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
      return `${heading('🍵 煲製進度', reduceMotion() ? '慢慢調整到綠色區' : '指針到綠色區，按停火！')}${pot()}<div class="timing" role="meter" aria-label="煲製進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="target" style="left:${50 - mode().spot / 2}%;width:${mode().spot}%"></span><span id="needle"></span></div>
      ${reduceMotion() ? button('前進一格', 'meter-step') : ''}${button('停火', 'brew-stop', '', true)}<p class="quiet">可以再練習，不用重新開始任務。</p>`;
    },
    npc() { return `${heading('街坊的回應', '你幫到人啦！')}${guide('多謝你留心照顧！我們再試試，怎樣讓茶色不一樣？', mission().portrait, mission().npc)}${button('到小小實驗室', 'next', run().mode === 'master' ? 'method' : 'guess', true)}`; },
    guess() { return `${heading('🔬 我估 → 我試 → 我看看 → 我發現', run().variable === 'water' ? '加多一點水，茶色會更淺嗎？' : '煲久一點，茶色會更深嗎？')}${labSafety()}${guide('先猜一猜。猜錯也沒關係！')}${options([{ value: 'yes', label: '👍 我估會' }, { value: 'no', label: '👎 我估不會' }, { value: 'unsure', label: '🤔 我還不知道' }], 'guess')}`; },
    method() { return `${heading('🔬 我試', '今次想改甚麼？')}${guide('公平測試，一次只改一樣。')}${options([{ value: 'time', label: '煲茶時間' }, { value: 'water', label: '水量' }], 'method')}`; },
    trial() {
      const r = run(), variable = r.variable, vals = variable === 'time' ? [10, 20, 30] : [500, 1000, 1500];
      return `${heading('🔬 我試', `只改${variable === 'time' ? '煲茶時間' : '水量'}`)}${labSafety()}${guide('其他條件不變，這才是公平測試！')}
      <div class="locked">🔒 ${r.mode === 'learn' ? '同樣的水、火力和材料，只改時間' : `${variable === 'time' ? '水量 1000 ml' : '時間 20 分鐘'} · 溫度 80°C · 材料 10 g`}</div>
      ${options(vals.map((v, i) => ({ value: v, html: `<strong>${(variable === 'time' ? ['短時間', '中時間', '長時間'] : ['少水', '中水', '多水'])[i]}</strong>${r.mode === 'learn' ? '' : `<span>${v} ${variable === 'time' ? 'min' : 'ml'}</span>`}<small>${r.trials.some(t => t.value === v) ? '✓ 已有結果' : '按下試一試'}</small>` })), 'trial')}
      ${trialCups()}<p class="quiet">${r.trials.length} / 3 次結果${r.mode === 'learn' ? ' · 第一杯由阿茶仔示範' : ''}</p>${r.trials.length === 3 ? button('看看三杯的分別', 'next', 'observe', true) : ''}${scienceDetails()}`;
    },
    observe() { return `${heading('🔬 我看看', '三杯有甚麼不同？')}${labSafety()}${trialCups()}${chart()}${scienceDetails()}${button('說說我的發現', 'next', 'conclude', true)}`; },
    conclude() {
      const r = run(), more = r.variable === 'time' ? '煲得越久，茶色越深' : '水越多，茶色越淺';
      return `${heading('🔬 我發現', '你的實驗告訴你甚麼？')}${trialCups()}${r.conclusion ? `<p class="sentence">我看到${more}，所以我認為${r.variable === 'time' ? '時間' : '水量'}會影響茶色。</p>${guide(r.guess === 'yes' ? '數據支持了你的猜想！' : '跟著觀察修正想法，就是科學家的做法。')}${button('成為小小發明家', 'next', 'invent', true)}` : options([{ value: 'same', label: '三杯顏色完全一樣' }, { value: 'change', label: more }], 'conclusion')}<div class="inline-feedback" role="status">${esc(r.feedback || '')}</div>`;
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
      if (!i.designVersion) prepareDesign(i, i.product);
      return designScreen(i, found);
    },
    'quick-result'() {
      const r = run();
      return `${heading('開放日小任務完成', '婆婆收到你的慳水設計！')}${guide(designResponse(r.invent), mission().portrait, mission().npc)}<div class="reward"><strong>獲得「小小改良家」體驗章</strong></div><section class="takeaways"><h2>我帶走的發現</h2><p>歷史證據：${esc(mission().evidence[mission().answer])}。</p><p>設計設定：${esc(designSettingText(r.invent))}。</p><p>先猜、測試、聽意見，再改良。這次沒有進行煲茶和茶色實驗。</p></section>${button('交給下一位小茶師', 'next-visitor', '', true)}${button('繼續煲茶與科學實驗', 'extend-visit')}${button('打印我的體驗報告', 'print')}`;
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
  const prototypeCases = {
    temperature: {
      first: { label: '較熱的茶 · 80°C', value: '80°C', active: true, reply: '超過模型設定的45°C，提示燈亮起。' },
      second: { label: '較涼的茶 · 35°C', value: '35°C', active: false, reply: '低於模型設定的45°C，提示燈熄滅。這不代表可以安全飲用。' }
    },
    water: {
      first: { label: '水未到線 · 250ml', value: '250ml', active: false, reply: '水位未到500ml，加水開關保持開啟。' },
      second: { label: '水剛到線 · 500ml', value: '500ml', active: true, reply: '感測器發現水到設定線，自動停止加水。' }
    },
    cup: {
      first: { label: '試試小把手', value: '小把手', active: false, reply: '手指模型的空間很少。怎樣讓把手更容易握住？' },
      second: { label: '換上大把手', value: '大把手', active: true, reply: '手指模型的空間增加了！仍要請使用者試握，才能知道是否舒適。' }
    },
    queue: {
      first: { label: '通知 1 號街坊', value: '01', active: false, reply: '師傅按一下，1號燈亮起。其他街坊可以坐著等。' },
      second: { label: '通知 2 號街坊', value: '02', active: true, reply: '師傅再按一下，換成2號。提示燈方便等候，但不會令煲茶加快。' }
    }
  };
  function prototypeReady(i) { return !!(i.tests?.first && i.tests?.second); }
  const designConfigs = {
    temperature: { initial: 0, label: '提示燈位置', unit: '', min: 0, max: 1, step: 1 },
    water: { initial: 700, label: '自動停水線', unit: 'ml', min: 300, max: 700, step: 100 },
    cup: { initial: 42, label: '模型把手寬度', unit: '格', min: 28, max: 70, step: 14 },
    queue: { initial: 20, label: '模型號碼大小', unit: '格', min: 20, max: 64, step: 22 }
  };
  const designColors = { amber: '#eabb32', blue: '#439bd3', rose: '#d85268' };
  function prepareDesign(i, product) {
    Object.assign(i, { product, designVersion: 2, phase: 'test', revision: 0, setting: designConfigs[product].initial, tint: 'amber', tests: {}, lastTest: null, prediction: null, reviewedRevision: -1, rounds: [] });
  }
  function designReady(i) { return prototypeReady(i) && !!i.prediction && i.revision > 0 && i.reviewedRevision === i.revision; }
  function designSettingText(i, value = i.setting) {
    const c = designConfigs[i.product];
    return `${c.label}：${i.product === 'temperature' ? value ? '正面' : '側面' : `${value}${c.unit}`}`;
  }
  function designEffective(i) { return { temperature: i.setting === 1, water: i.setting === 500, cup: i.setting >= 58, queue: i.setting >= 42 }[i.product]; }
  function designResponse(i) {
    const product = D.inventions.find(p => p.id === i.product);
    if (product.problem !== i.problem) return `這個發明有自己的用途，但我遇到的是「${i.problem}」。下次可以選一個更貼近需要的設計。`;
    if (designEffective(i)) return {
      temperature: '提示燈放在正面，我容易看見了！亮起時提醒我先等一等。還要用實物測試，不能只靠燈號判斷飲用安全。',
      water: '我只需要500ml，現在水到線就停！謝謝你聽我的需要，避免多加水。',
      cup: '大把手留出了更多空間！謝謝你留意我的手；下一步請我試握真正的模型。',
      queue: '號碼放大後，模型看清楚多了！我可以坐下等叫號。實物還要在不同距離試看。'
    }[i.product];
    return {
      temperature: '我站在茶壺前面，側面的燈很難看見。可以把提示燈移到正面嗎？',
      water: i.setting > 500 ? '我只需要500ml，可是到500ml還在加水。請把停水線調低，試試剛好500ml。' : '我需要500ml，但現在太早停水，還未夠用。請把停水線調高一點。',
      cup: '我的手指模型需要40格空間。把手扣除兩邊共18格厚度後，空間還不夠。可以加闊嗎？',
      queue: '小號碼離遠看不清楚。我想坐在後面等，能不能把號碼放大一點？'
    }[i.product];
  }
  function designCases(i) {
    const cases = structuredClone(prototypeCases[i.product]);
    if (i.product === 'water') {
      for (const [key, amount] of [['first', 250], ['second', 500]]) {
        cases[key].label = `測試水位 · ${amount}ml`;
        cases[key].active = amount >= i.setting;
        cases[key].reply = `${amount}ml${cases[key].active ? '已到' : '未到'}${i.setting}ml設定線，${cases[key].active ? '停止' : '繼續'}加水。`;
        cases[key].signal = cases[key].active;
      }
    } else if (i.product === 'cup') {
      for (const [key, width] of [['first', 28], ['second', i.setting]]) {
        cases[key].label = `${key === 'first' ? '小把手' : '我的把手'} · ${width}格`;
        cases[key].active = width - 18 >= 40;
        cases[key].width = width;
        cases[key].reply = `把手寬${width}格，扣除邊框後有${width - 18}格空間。${cases[key].active ? '40格的手指模型放得下。' : '40格的手指模型放不下。'}`;
        cases[key].signal = cases[key].active;
      }
    } else for (const item of Object.values(cases)) item.signal = i.product === 'queue' ? item.value : item.active;
    return cases;
  }
  function designModel(i, test) {
    if (i.product === 'water') return `<div class="model-tank"><span class="model-water" style="height:${test ? test.value === '500ml' ? 65 : 32.5 : 0}%"></span><span class="model-line" style="top:${100 - i.setting / 500 * 65}%">${i.setting}ml</span></div>`;
    if (i.product === 'cup') return `<div class="model-cup"><span class="model-handle" style="width:${test?.width || i.setting}px"></span><span class="model-finger" style="width:40px;height:40px;top:30px"></span></div>`;
    if (i.product === 'queue') return `<div class="model-number" style="font-size:${i.setting}px;color:${designColors[i.tint]}">${test?.value || '--'}</div>`;
    return `<div class="model-lamp ${test?.active ? 'lamp-on' : ''} ${i.setting ? 'front-lamp' : 'side-lamp'}" style="--signal-color:${designColors[i.tint]}"><span></span></div>`;
  }
  function designScreen(i, product) {
    const title = heading(`小小發明家 · ${i.revision ? '改良版' : '第一版'}`, product.name);
    const customer = ['長者', '婆婆'].includes(i.audience) ? ['elder', '婆婆'] : i.audience === '工人' ? ['worker', '強叔'] : ['student', '阿晴'];
    const feedback = guide(designResponse(i), ...customer);
    if (i.phase === 'review') return `${title}<section class="customer-trial ${designEffective(i) && product.problem === i.problem ? 'customer-happy' : ''}">${feedback}<div class="customer-device" aria-label="街坊試用的設計模型">${designModel(i, designCases(i).second)}</div></section><p class="model-note">街坊試用情節是教學模擬，不是實物測試結果。</p>${i.revision > 0 ? button('完成並評分', 'finish', '', true) : ''}${button(i.revision ? '再改良一次' : '聽了意見，我來改良！', 'design-improve', '', i.revision === 0)}${button('換另一款發明', 'invent-back', 3)}`;
    if (i.phase === 'improve') {
      const c = designConfigs[i.product];
      const preview = { ...i, setting: i.draftSetting };
      return `${title}${feedback}<section class="design-editor"><div class="prototype-model" aria-hidden="true">${designModel(preview, null)}</div><div><label class="field">${c.label}<strong id="design-value">${esc(designSettingText(i, i.draftSetting))}</strong>${i.product === 'temperature' ? `<select id="design-setting"><option value="0" ${i.draftSetting === 0 ? 'selected' : ''}>側面</option><option value="1" ${i.draftSetting === 1 ? 'selected' : ''}>正面</option></select>` : `<input id="design-setting" type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${i.draftSetting}">`}</label>${['temperature', 'queue'].includes(i.product) ? `<fieldset class="signal-swatches"><legend>提示顏色</legend>${Object.entries(designColors).map(([key, color]) => `<button data-action="design-color" data-value="${key}" aria-label="${{ amber: '金黃', blue: '藍色', rose: '玫紅' }[key]}" title="${{ amber: '金黃', blue: '藍色', rose: '玫紅' }[key]}" aria-pressed="${i.tint === key}" style="--swatch:${color}"><span></span></button>`).join('')}</fieldset>` : ''}</div></section><p class="model-note">改變設定後，用原來兩種情況再試，才可以比較前後。</p>${button('用新設計再測試', 'design-retest', '', true, i.draftSetting === i.setting)}`;
    }
    return `${title}${prototypeLab(i, product)}<details><summary>我的設計想法</summary><p>${product.process}</p><label class="field">加一句自己的想法（可不填）<input id="reason" maxlength="100" value="${esc(i.reason)}"></label></details>${button('請街坊試用', 'design-review', '', true, !prototypeReady(i))}${button('換另一款發明', 'invent-back', 3)}`;
  }
  function prototypeLab(i, product) {
    const cases = designCases(i), test = cases[i.lastTest];
    const count = Object.keys(cases).filter(key => i.tests?.[key]).length;
    const same = cases.first.signal === cases.second.signal;
    const question = { temperature: '80°C和35°C，提示燈會一樣嗎？', water: `停水線是${i.setting}ml。在250ml和500ml時，開關會一樣嗎？`, cup: '手指模型在兩種把手中，都一樣放得下嗎？', queue: '通知1號和2號時，燈牌會顯示相同號碼嗎？' }[i.product];
    return `<section class="prototype-lab" aria-label="發明模型測試"><p class="design-setting-label">${esc(designSettingText(i))}</p>${!i.prediction ? `<h2>我先猜：${question}</h2>${options([{ value: 'same', label: '我估一樣' }, { value: 'different', label: '我估不一樣' }], 'design-predict')}<p class="model-note">猜想可以修正，不會因為猜錯而扣分。</p>` : `<div class="prototype-stage"><div class="prototype-model" aria-hidden="true">${designModel(i, test)}</div><div class="prototype-readout" role="status" aria-live="polite" aria-atomic="true"><strong>${test?.value || '等待測試'}</strong><p>${test?.reply || question}</p></div></div><p class="prototype-progress">已測試 ${count} / 2 種情況</p><div class="prototype-controls">${Object.entries(cases).map(([key, item]) => `<button data-action="prototype-test" data-value="${key}" aria-pressed="${i.lastTest === key}" class="${i.lastTest === key ? 'selected' : ''}">${i.tests?.[key] ? '✓ ' : ''}${item.label}</button>`).join('')}</div>${count === 2 ? `<p class="prediction-feedback" role="status">${(i.prediction === 'same') === same ? '數據支持你的猜想！' : '結果和猜想不同，這是新發現！'}這兩種情況的回應${same ? '一樣' : '不一樣'}。</p>` : ''}`}<p class="model-note">${product.id === 'temperature' ? '45°C只是模型的示範門檻，不是飲用安全標準。' : '這是模型預測；製作實物後，要再量度和測試。'}</p></section>`;
  }
  function stageHelp() {
    const r = run();
    const help = {
      intro: '先聽街坊遇到甚麼困難，再從資料找出線索。',
      clue: '誰寫這段資料？是當年的原件，還是今天寫的摘要？找一句與街坊需要有關的證據。',
      compare: '年代和寫作目的不同，說法也可能不同。一個人的經驗不能代表所有人。',
      evidence: mission().help,
      story: '除了金幣和用水，也想想街坊的感受。不同選擇會帶來甚麼影響？',
      gather: '看看照片的形狀和顏色，再找出這一味材料。錯了可以再觀察，不會扣走材料。',
      brew: r.brewing && !r.brewResult ? '煲茶已暫停，放心慢慢看。指針在綠色區時停火；關閉提示後會從原來位置繼續。' : '先選火力，再選水量。火力改變加熱；水加得太多會浪費。完成後可以免費再試一次。',
      npc: '回想街坊原來的困難：你的選擇幫到他甚麼？',
      guess: '先說出你的猜想。猜錯也沒關係，稍後用三杯數據檢查。',
      method: '一次只改一個條件，其他條件相同，才是公平比較。',
      trial: '試齊三個條件，其他條件保持不變。不要只看最喜歡的一杯。',
      observe: '由第一杯看到第三杯：哪一杯深？哪一杯淺？找出變化的方向。',
      conclude: '用「我看到……所以我認為……」說明發現。數據不支持猜想時，可以修正想法。',
      invent: '先猜兩種情況的反應，再動手測試。聽街坊的意見，改一個設定，用相同情況再試一次。',
      'quick-result': '你已完成歷史閱讀和設計改良。還有時間，可以繼續煲茶和茶色實驗。',
      result: '想一想：哪條歷史線索最有用？你用甚麼實驗證據改良了設計？'
    };
    return help[view];
  }
  function printReport(r) {
    if (r?.quick) {
      $('#report').innerHTML = `<header><h1>一碗百苦 · 我的開放日體驗</h1><p>${esc(profile().name)} · 歷史閱讀與節水設計</p></header><h2>歷史證據</h2><p>${esc(mission().clue)}</p><p>${sourceTag(mission())} · ${esc(D.sources[mission().source].name)}</p><p>我的答案：${r.answers.map(a => `${esc(a.answer)}（${a.correct ? '有證據支持' : '再思考'}）`).join('；')}</p><h2>我的設計改良</h2>${designReport(r.invent)}<p>${esc(designResponse(r.invent))}</p><p>本次完成短任務，未進行煲茶和茶色實驗；模型不代表真實藥效或飲用安全。</p><footer>基督教聖約教會堅樂中學</footer>`;
      window.print(); return;
    }
    $('#report').innerHTML = reportHTML(r);
    if (r?.invent.tests) {
      const tests = document.createElement('div');
      tests.innerHTML = designReport(r.invent);
      $('#report').querySelectorAll('h2')[3]?.before(tests);
    }
    window.print();
  }
  function designReport(i) {
    const rounds = i.rounds?.length ? i.rounds : [{ setting: i.setting, tests: i.tests, prediction: i.prediction }];
    return rounds.map((r, index) => `<p>模型測試第${index + 1}版${r.setting === undefined ? '' : `，${esc(designSettingText(i, r.setting))}`}。我估：${r.prediction ? r.prediction === 'same' ? '一樣' : '不一樣' : '未記錄'}。${Object.values(r.tests || {}).map(t => `${esc(t.input)} → ${esc(t.output)}`).join('；')}</p>`).join('');
  }
  function pot() {
    const r = run(), boiling = r.brewing && !r.brewResult;
    return `<div class="brew-visual ${boiling ? 'is-brewing' : ''}" data-heat="${r.heat}"><figure>${image('pot')}<figcaption>傳統銅壺 · 圖片觀察</figcaption></figure><div class="animated-kettle"><div class="steam-trails" aria-hidden="true"><i></i><i></i><i></i></div><div class="water-vessel" aria-label="${['', '三分一壺', '三分二壺', '滿壺'][r.fill] || '未加水'}"><div style="height:${(r.fill || 0) * 30}%;background:#63371d" class="water ${boiling ? `bubbles heat-${r.heat}` : ''}"><i></i><i></i><i></i><i></i><i></i></div></div><div class="flame-bed" aria-hidden="true">${'<i></i>'.repeat((r.heat ?? 1) + 1)}</div></div><div class="pot-label"><strong>${['小火', '中火', '大火'][r.heat ?? 1]}</strong>${profile().upgrades.includes('thermometer') ? `<p>🌡 ${[60, 80, 100][r.heat ?? 1]}°C</p>` : ''}${profile().upgrades.includes('saver') ? '<p>💧 節水器已安裝</p>' : ''}</div></div>`;
  }
  function labSafety() { return '<p class="lab-safety">🔬 這是遊戲模擬！我們練習公平測試，數字不代表真實藥效。</p>'; }
  function simulate(value, variable) {
    const time = variable === 'time' ? value : 20, water = variable === 'water' ? value : 1000;
    const strength = clamp((1 - Math.exp(-time / 25)) * 1000 / water, 0, 1);
    return { value, time, water, temperature: 80, grams: 10, color: Math.round(strength * 100), bitterness: Math.round(strength * 60), ph: 6.5, rgb: `rgb(${Math.round(225 - strength * 155)},${Math.round(194 - strength * 159)},${Math.round(116 - strength * 99)})` };
  }
  function trialCups() {
    const r = run(), values = r.variable === 'time' ? [10, 20, 30] : [500, 1000, 1500];
    return `<div class="trial-cups">${values.map((value, i) => { const t = r.trials.find(t => t.value === value); return `<figure class="${t ? 'filled-sample' : 'empty-sample'}"><div class="tea-cup" style="--tea:${t?.rgb || '#e3eeea'}"><span class="sample-liquid"></span></div><figcaption><span>第${i + 1}杯${t?.demo ? '（示範）' : ''}</span><strong>${r.variable === 'time' ? ['短', '中', '長'][i] + '時間' : ['少', '中', '多'][i] + '水'}</strong><span>${t ? t.color < 40 ? '淺' : t.color < 65 ? '中' : '深' : '等你來試'}</span></figcaption></figure>`; }).join('')}</div>`;
  }
  function chart() { return `<div class="pictograph" aria-label="三次實驗茶色比較圖"><span>深<br>中<br>淺</span>${[...run().trials].sort((a, b) => a.value - b.value).map((t, i) => `<div><span class="dot" style="bottom:${t.color}%;background:${t.rgb}"></span><small>第${i + 1}杯</small></div>`).join('')}</div>`; }
  function scienceDetails() { return `<details><summary>🔬 科學家資料</summary><div class="table-scroll"><table><caption>固定80°C及10g材料的教學模擬</caption><thead><tr><th>時間 min</th><th>水 ml</th><th>茶色</th><th>苦味</th><th>pH</th></tr></thead><tbody>${run().trials.map(t => `<tr><td>${t.time}</td><td>${t.water}</td><td>${t.color}</td><td>${t.bitterness}</td><td>${t.ph}</td></tr>`).join('')}</tbody></table></div><p>模擬濃度 = (1 − e^(−時間/25)) × 1000/水量，限制在0至1。茶色 = 濃度 × 100；苦味 = 濃度 × 60。</p><p>pH 固定為6.5作示例，不由顏色或苦味推算。溫度固定為80°C；不代表水在沸騰。</p><p>可在成人指導下，用溫度探針、pH試紙及固定光源拍照驗證。每組用相同材料，重複測量，不飲用實驗樣本。</p></details>`; }
  function newRun(id) {
    const m = D.missions.find(x => x.id === id); if (!m) return;
    const difficulty = profile().mode;
    profile().run = { id: uid(), mission: id, mode: difficulty, screen: 'intro', started: Date.now(), resources: [], answers: [], hints: 0, feedback: '', evidencePick: null, evidenceDone: false, evidenceErrors: 0, compareErrors: 0, materialIndex: 0, materialErrors: 0, eventIds: difficulty === 'learn' ? [m.event] : [m.event, m.event === 'visit' ? 'queue' : 'visit'], eventIndex: 0, eventResult: null, brewPage: 0, heat: 1, fill: 2, brewing: false, brewPaid: false, brewResult: null, guess: null, variable: 'time', trials: [], conclusion: '', invent: { step: 0, audience: '', problem: '', product: '', reason: '' }, result: null };
    if (!Object.keys(profile().records).length) profile().resources = { money: mode().money, water: mode().water, happy: 75 };
    if (visitor?.quick) {
      run().quick = true; run().invent = { step: 3, audience: '婆婆', problem: '水不夠', product: '', reason: '' };
      next('clue');
    } else next('intro');
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
    r.evidenceDone = true; r.feedback = '找到支持想法的證據了！'; sfx(true); save(); render(); rewardAnimation('線索找到啦！你有證據支持想法。');
  }
  function startMeter() {
    clearInterval(timer); timer = null;
    if (view !== 'brew' || !run()?.brewing || run().brewResult || document.hidden || $('#guide-dialog').open) return;
    tick = run().meter?.tick || 0; needle = run().meter?.needle || 0;
    document.documentElement.classList.remove('brew-paused');
    updateMeter();
    if (reduceMotion()) return;
    timer = setInterval(() => { tick = (tick + 0.7) % 200; needle = 50 - 50 * Math.cos(tick * Math.PI / 100); updateMeter(); }, 50);
  }
  function updateMeter() { const el = $('#needle'); if (!el) return; run().meter = { tick, needle }; el.style.left = `${needle}%`; el.parentElement.setAttribute('aria-valuenow', Math.round(needle)); }
  function complete() {
    const r = run(); if (r.result || !r.evidenceDone || !r.invent.product) return;
    if (!designReady(r.invent)) { notify('先猜、測試，聽街坊意見後改良並再試一次。'); return; }
    if (r.quick) { r.shortDone = true; r.finished = Date.now(); next('quick-result'); rewardAnimation('你是小小改良家！', true); return; }
    if (!r.conclusion || r.trials.length !== 3) return;
    const p = D.inventions.find(x => x.id === r.invent.product);
    const helpful = p.problem !== r.invent.problem ? 1 : designEffective(r.invent) ? 3 : 2;
    const rubric = { '♥ 有沒有幫到人？': helpful, '🛠 做不做得到？': 3, '🌱 有沒有浪費？': p.waste };
    const sections = { '🔎 找線索': r.evidenceErrors > 1 ? 2 : 3, '🍵 煲茶': r.brewResult.stars, '🔬 做實驗': 3, '💡 發明': helpful === 3 ? 3 : 2 };
    const finalStars = clamp(Math.round(Object.values(sections).reduce((a, b) => a + b, 0) / 4), 1, 3);
    const best = Object.entries(sections).sort((a, b) => b[1] - a[1])[0][0];
    r.result = { stars: finalStars, sections, rubric, best, improve: p.problem !== r.invent.problem ? '選一個更貼近街坊問題的發明。' : !designEffective(r.invent) ? '參考街坊意見，調整設定後用相同條件再試。' : r.fill > mission().fill ? '煲少一點，看看能節省多少水。' : '把你的發現告訴另一位同學。' };
    r.finished = Date.now();
    const previous = profile().records[r.mission];
    if (!previous) changeResources({ money: 30, water: 15, happy: 10 }, '首次完成任務獎勵');
    profile().records[r.mission] = { stars: Math.max(previous?.stars || 0, finalStars), latest: JSON.parse(JSON.stringify(r)) };
    sfx(true, true); next('result'); rewardAnimation('任務完成！你是細心的小茶師。', true);
  }
  const actions = {
    'quick-start'() { startVisitor(true); },
    'extend-visit'() { if (!run()?.quick || !run().shortDone) return; run().quick = false; visitor.quick = false; next('story'); },
    'design-predict'(value) { const i = run()?.invent; if (view !== 'invent' || i?.phase !== 'test' || i.prediction || !['same', 'different'].includes(value)) return; i.prediction = value; save(); render(); },
    'design-review'() {
      const i = run()?.invent; if (!i?.prediction || !prototypeReady(i) || i.phase !== 'test') return;
      i.reviewedRevision = i.revision;
      i.rounds.push({ setting: i.setting, prediction: i.prediction, tests: structuredClone(i.tests), feedback: designResponse(i) });
      i.phase = 'review'; next('invent');
    },
    'design-improve'() { const i = run()?.invent; if (i?.phase !== 'review') return; i.draftSetting = i.setting; i.phase = 'improve'; next('invent'); },
    'design-color'(value) { const i = run()?.invent; if (i?.phase !== 'improve' || !designColors[value]) return; i.tint = value; save(); render(); },
    'design-retest'() {
      const i = run()?.invent; if (i?.phase !== 'improve' || i.draftSetting === i.setting) return;
      i.setting = i.draftSetting; i.revision++; i.tests = {}; i.lastTest = null; i.prediction = null; i.phase = 'test'; next('invent');
    },
    'stage-help'() {
      if (!(view in stageIndex) || !run()) return;
      pauseMeter(); stopSpeech(); run().hints++;
      const text = stageHelp();
      $('#guide-dialog').innerHTML = `<img src="./assets/tea-history-teacher-logo.png" alt="阿茶仔"><h2 id="guide-title">阿茶仔陪你想一想</h2><p>${esc(text)}</p>${button(view === 'brew' && run().brewing && !run().brewResult ? '繼續煲茶' : '我再試試', 'close-dialog', '', true)}`;
      $('#guide-dialog').showModal(); save();
    },
    'prototype-test'(value) {
      const i = run()?.invent;
      if (view !== 'invent' || i?.step !== 4 || i.phase !== 'test' || !i.prediction) return;
      const cases = designCases(i); if (!cases[value]) return;
      i.tests ||= {};
      i.tests[value] = { input: cases[value].label, output: cases[value].reply };
      i.lastTest = value; save(); sfx(true); render();
      $(`[data-action="prototype-test"][data-value="${value}"]`)?.focus({ preventScroll: true });
    },
    'visitor-start'() { if (visitor?.run && visitor.run.screen !== 'result') next(visitor.run.screen); else startVisitor(); },
    'next-visitor'() {
      $('#guide-dialog').innerHTML = `<h2 id="guide-title">交給下一位小茶師？</h2><p>這次訪客體驗會重新開始。已儲存的個人遊戲不會改變。</p>${button('下一位，開始！', 'confirm-visitor', '', true)}${button('我還想看看', 'close-dialog')}`;
      $('#guide-dialog').showModal();
    },
    'confirm-visitor'() { const quick = !!visitor?.quick; $('#guide-dialog').close(); startVisitor(quick); },
    'close-dialog'() { $('#guide-dialog').close(); },
    'leave-visitor'() { visitor = null; save(); navigate('home'); },
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
    material(id) { const r = run(), wanted = mission().materials[r.materialIndex]; if (id !== wanted) { retry('materialErrors', D.herbs[wanted][1], `選${D.herbs[wanted][0]}：${D.herbs[wanted][1]}`); return; } const from = $(`[data-action="material"][data-value="${id}"] img`)?.getBoundingClientRect(); r.materialIndex++; r.feedback = ''; sfx(true); next('gather'); flyMaterial(id, from); notify(`${D.herbs[id][0]}放入籃子了！`); },
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
      r.meter = { tick: 0, needle: 0 }; r.brewing = true; save(); render();
    },
    refill(v) { if (v === 'buy' && profile().resources.money < 10) return; changeResources(v === 'buy' ? { money: -10, water: 20 } : { water: 10, happy: -5 }, v === 'buy' ? '補買水' : '小批煲製，預留用水'); if (v !== 'buy') run().fill = 1; $('#guide-dialog').close(); save(); render(); },
    'meter-step'() { needle = (needle + 10) % 110; tick = Math.acos(1 - needle / 50) * 100 / Math.PI; updateMeter(); save(); },
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
    product(v) { if (!D.inventions.some(p => p.id === v)) return; const i = run().invent; if (i.product !== v || !i.designVersion) prepareDesign(i, v); i.step = 4; next('invent'); },
    'invent-back'(v) { run().invent.step = Number(v); next('invent'); },
    finish: complete,
    upgrade(id) {
      const price = { thermometer: 30, saver: 40, sign: 35 }[id]; if (!price || profile().upgrades.includes(id)) return;
      if (profile().resources.money < price) { notify('金幣還不夠。完成新街坊的任務，就有獎勵！'); return; }
      changeResources({ money: -price }, `茶舖升級：${id}`); profile().upgrades.push(id); save(); sfx(true); render(); notify('茶舖有新設備啦！');
    },
    'book-tab'(v) { bookTab = v; bookPage = 0; render(); },
    'book-page'(v) { bookPage = Math.max(0, bookPage + Number(v)); render(); },
    'new-profile'() { const name = $('#new-name').value.trim(); if (!name) { notify('先給新茶師起個名字吧。'); return; } if (store.profiles.length >= 20) { notify('這部裝置已有20位玩家，可先下載記錄備份。'); return; } const p = freshProfile(name); visitor = null; store.profiles.push(p); store.active = p.id; save(); navigate('home'); },
    export() { const blob = new Blob([JSON.stringify({ version: 1, profile: profile() }, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'my-tea-adventure.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); },
    speak() {
      if (!('speechSynthesis' in window)) { notify('這個瀏覽器未支援朗讀，可以慢慢看文字。'); return; }
      const content = $('#spoken')?.textContent; if (!content) return;
      try {
        const voices = speechSynthesis.getVoices(), voice = voices.find(v => /zh[-_]HK|yue/i.test(v.lang)) || voices.find(v => /^zh/i.test(v.lang));
        if (!voice) { notify('暫時沒有可用的中文聲音，文字會保留在畫面。'); return; }
        speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(content); utterance.voice = voice; utterance.lang = voice.lang; utterance.rate = 0.85; utterance.onerror = e => { if (!['canceled', 'interrupted'].includes(e.error)) notify('暫時無法朗讀，可以繼續看文字。'); }; speechSynthesis.speak(utterance);
      } catch { notify('暫時無法朗讀，可以繼續看文字。'); }
    },
    print() { printReport(run()); },
    'past-report'(id) { const r = profile().records[id]?.latest; if (!r?.result) return; printReport(r); }
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
    if (el.id === 'design-setting' && run()?.invent.phase === 'improve') {
      const i = run().invent, c = designConfigs[i.product];
      i.draftSetting = clamp(c.min + Math.round((Number(el.value) - c.min) / c.step) * c.step, c.min, c.max);
      $('#design-value').textContent = designSettingText(i, i.draftSetting);
      $('[data-action="design-retest"]').disabled = i.draftSetting === i.setting;
      $('.design-editor .prototype-model').innerHTML = designModel({ ...i, setting: i.draftSetting }, null);
      save();
    }
    if (el.id === 'reason' && run()) { run().invent.reason = el.value.slice(0, 100); save(); }
    if (el.id === 'name') { profile().name = el.value.slice(0, 16) || '小茶師'; save(); $('#player-name').textContent = profile().name; }
    if (el.dataset.setting) { const key = el.dataset.setting; store.settings[key] = el.type === 'checkbox' ? el.checked : Number(el.value); save(); document.documentElement.classList.toggle('large', store.settings.large); document.documentElement.classList.toggle('reduced', store.settings.reduced); audioUpdate(); }
  });
  document.addEventListener('change', async event => {
    const el = event.target;
    if (el.name === 'mode' && D.modes[el.value]) { profile().mode = el.value; save(); }
    if (el.id === 'profile') { visitor = null; store.active = el.value; save(); navigate('home'); }
    if (el.id === 'import' && el.files[0]) {
      try {
        if (el.files[0].size > 1000000) throw new Error('large');
        const data = JSON.parse(await el.files[0].text()), p = data.profile;
        if (data.version !== 1 || !p || typeof p.name !== 'string' || !D.modes[p.mode] || !p.resources || !Array.isArray(p.upgrades) || !p.records || typeof p.records !== 'object') throw new Error('format');
        const imported = freshProfile(p.name.slice(0, 16)); imported.mode = p.mode;
        for (const key of ['money', 'water', 'happy']) { if (!Number.isFinite(p.resources[key])) throw new Error('resource'); imported.resources[key] = clamp(p.resources[key], 0, key === 'happy' ? 100 : 999); }
        imported.upgrades = [...new Set(p.upgrades.filter(u => ['thermometer', 'saver', 'sign'].includes(u)))];
        for (const m of D.missions) if (p.records[m.id]) { const r = p.records[m.id]; if (!Number.isInteger(r.stars) || r.stars < 1 || r.stars > 3) throw new Error('record'); imported.records[m.id] = { stars: r.stars }; }
        imported.tutorial = true; visitor = null; store.profiles.push(imported); store.active = imported.id; save(); navigate('home'); notify('已匯入徽章和茶舖。未完成的任務可重新選擇。');
      } catch { notify('未能讀取記錄，請選擇本遊戲下載的 JSON 檔案。'); }
    }
  });
  document.addEventListener('dragstart', e => { const target = e.target.closest('[draggable]'); if (target) { e.dataTransfer.setData('text/plain', target.dataset.value); e.dataTransfer.effectAllowed = 'copy'; } });
  document.addEventListener('dragover', e => { if (e.target.closest('#evidence-box')) e.preventDefault(); });
  document.addEventListener('drop', e => { if (!e.target.closest('#evidence-box') || view !== 'evidence') return; e.preventDefault(); const v = e.dataTransfer.getData('text/plain'); if (!/^[0-2]$/.test(v)) return; run().evidencePick = Number(v); submitEvidence(); });
  $('#guide-dialog').addEventListener('cancel', e => { if (!profile().tutorial) e.preventDefault(); });
  $('#guide-dialog').addEventListener('close', () => startMeter());
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
  document.addEventListener('visibilitychange', () => { document.documentElement.classList.toggle('page-hidden', document.hidden); if (document.hidden) { pauseMeter(); stopSpeech(); clearTimeout(audioTimer); audioContext?.suspend().catch(() => {}); } else { startMeter(); if (audioContext) audioUpdate(); } });
  document.addEventListener('pointerdown', () => { if (store.settings.music && !audioTimer) audioUpdate(); }, { once: true });
  window.addEventListener('beforeunload', save);
  history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  save(); render(); window.scrollTo(0, 0);
})();
