(opts) => {
  // Dijalankan di dalam halaman oleh Playwright. Mengembalikan data ukur semua elemen terlihat.
  const ignoreSel = ((opts && opts.ignore) || []).join(',');
  const MAXEL = 6000;
  const SKIP = new Set(['SCRIPT','STYLE','NOSCRIPT','TEMPLATE','HEAD','META','LINK','TITLE','BR','WBR',
    'COLGROUP','COL','OPTION','OPTGROUP','DATALIST','SOURCE','TRACK','PARAM']);
  const rgbRe = /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,\/]+([\d.]+%?))?\s*\)/i;

  const cvs = document.createElement('canvas'); cvs.width = cvs.height = 1;
  const ctx = cvs.getContext('2d', { willReadFrequently: true });
  const cc = new Map();
  function parseColor(s) {
    if (!s || s === 'transparent') return [0, 0, 0, 0];
    if (cc.has(s)) return cc.get(s);
    let out;
    const m = s.match(rgbRe);
    if (m) {
      const a = m[4] === undefined ? 1 : (m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]));
      out = [+m[1], +m[2], +m[3], a];
    } else {
      try {
        ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = 'rgba(0,0,0,0)'; ctx.fillStyle = s; ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data; out = [d[0], d[1], d[2], d[3] / 255];
      } catch (e) { out = [0, 0, 0, 0]; }
    }
    cc.set(s, out); return out;
  }
  const over = (fg, bg) => { const a = fg[3]; return [fg[0]*a + bg[0]*(1-a), fg[1]*a + bg[1]*(1-a), fg[2]*a + bg[2]*(1-a)]; };
  const csCache = new Map();
  const gcs = (el) => { let c = csCache.get(el); if (!c) { c = getComputedStyle(el); csCache.set(el, c); } return c; };

  function effBg(el) {
    const layers = []; let unknown = false; let cur = el;
    while (cur && cur.nodeType === 1) {
      const c = gcs(cur);
      if (c.backgroundImage && c.backgroundImage !== 'none') { unknown = true; break; }
      const bg = parseColor(c.backgroundColor);
      if (bg[3] > 0) layers.push(bg);
      if (bg[3] >= 0.99) break;
      cur = cur.parentElement;
    }
    let base = [255, 255, 255];
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
    return { rgb: base, unknown };
  }
  function effOpacity(el) {
    let o = 1, cur = el;
    while (cur && cur.nodeType === 1) { o *= parseFloat(gcs(cur).opacity); cur = cur.parentElement; }
    return o;
  }
  function sel(el) {
    if (el.id) return el.tagName.toLowerCase() + '#' + CSS.escape(el.id);
    const parts = []; let cur = el;
    for (let i = 0; i < 3 && cur && cur !== document.body; i++) {
      let s = cur.tagName.toLowerCase();
      s += [...cur.classList].slice(0, 2).map(c => '.' + CSS.escape(c)).join('');
      parts.unshift(s);
      if (cur.id) break;
      cur = cur.parentElement;
    }
    return parts.join(' > ');
  }
  function accName(el) {
    const al = el.getAttribute('aria-label'); if (al && al.trim()) return al.trim();
    const lb = el.getAttribute('aria-labelledby');
    if (lb) { const t = lb.split(/\s+/).map(i => (document.getElementById(i) || {}).textContent || '').join(' ').trim(); if (t) return t; }
    if (el.labels && el.labels.length) { const t = [...el.labels].map(l => l.textContent).join(' ').trim(); if (t) return t; }
    if (el.tagName === 'INPUT') {
      const t = (el.type || '').toLowerCase();
      if (['submit', 'button', 'reset'].includes(t)) return (el.value || '').trim();
      if (t === 'image') return (el.alt || '').trim();
    }
    const txt = (el.innerText || el.textContent || '').trim(); if (txt) return txt;
    const img = el.querySelector('img[alt]'); if (img && img.alt.trim()) return img.alt.trim();
    const st = el.querySelector('svg title'); if (st && st.textContent.trim()) return st.textContent.trim();
    const t = el.getAttribute('title'); if (t && t.trim()) return t.trim();
    return '';
  }
  const INTERACTIVE = 'a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link],' +
    '[role=checkbox],[role=radio],[role=tab],[role=menuitem],[role=switch],[onclick],[tabindex]:not([tabindex="-1"])';
  const px = (v) => parseFloat(v) || 0;
  const snap = (el) => {
    const f = (e) => { if (!e) return ''; const c = getComputedStyle(e);
      return [c.outlineStyle, c.outlineWidth, c.outlineColor, c.boxShadow, c.borderTopColor, c.borderTopWidth,
        c.backgroundColor, c.textDecorationLine, c.color, c.transform].join('|'); };
    return f(el) + '##' + f(el.parentElement);
  };
  window.__uia_snap = snap;

  const sx = window.scrollX, sy = window.scrollY;
  const all = Array.from(document.body.querySelectorAll('*'));
  const els = []; const idx = new Map();

  for (const el of all) {
    if (els.length >= MAXEL) break;
    if (SKIP.has(el.tagName) || el.ownerSVGElement) continue;
    try { if (ignoreSel && el.closest(ignoreSel)) continue; } catch (e) {}
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) continue;
    if (r.width < 2 && r.height < 2) continue;
    if (el.checkVisibility && !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
    const c = gcs(el);
    const tag = el.tagName.toLowerCase();
    const direct = Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.textContent).join(' ').replace(/\s+/g, ' ').trim();
    const isInter = el.matches(INTERACTIVE);
    const type = (el.getAttribute('type') || '').toLowerCase();
    let tr = { x: r.x + sx, y: r.y + sy, w: r.width, h: r.height };
    if (tag === 'input' && ['checkbox', 'radio'].includes(type) && el.labels && el.labels[0]) {
      const lr = el.labels[0].getBoundingClientRect();
      if (lr.width * lr.height > r.width * r.height) tr = { x: lr.x + sx, y: lr.y + sy, w: lr.width, h: lr.height };
    }
    let inlineLink = false;
    if (tag === 'a' && c.display === 'inline' && el.parentElement) {
      const pt = (el.parentElement.textContent || '').trim().length, at = (el.textContent || '').trim().length;
      inlineLink = pt > at + 15;
    }
    const name = isInter ? accName(el) : '';
    const visText = isInter ? (el.innerText || el.value || '').trim() : '';
    const bgSelf = effBg(el);
    const bgPar = effBg(el.parentElement || el);
    const own = parseColor(c.backgroundColor);
    let radius = 0;
    const brs = c.borderTopLeftRadius;
    if (brs.endsWith('%')) { radius = parseFloat(brs) >= 50 ? 9999 : parseFloat(brs) * Math.min(r.width, r.height) / 100; }
    else { radius = px(brs); if (radius > Math.min(r.width, r.height) / 2 + 1) radius = 9999; }
    const rec = {
      id: els.length, tag, sel: sel(el), cls: (el.getAttribute('class') || '').trim(),
      text: direct.slice(0, 80), tlen: direct.length,
      r: { x: r.x + sx, y: r.y + sy, w: r.width, h: r.height }, tr,
      inter: isInter, inlineLink, type, disabled: !!el.disabled || el.getAttribute('aria-disabled') === 'true',
      name, visText: visText.slice(0, 40), hasIcon: !!el.querySelector('svg,img,i,[class*=icon]'),
      placeholder: el.getAttribute('placeholder') || '', required: el.required === true,
      hasAlt: el.hasAttribute('alt'), alt: el.getAttribute('alt') || '',
      role: el.getAttribute('role') || '', tabindex: el.getAttribute('tabindex'),
      nw: tag === 'img' ? el.naturalWidth : 0, nh: tag === 'img' ? el.naturalHeight : 0,
      imgDone: tag === 'img' ? el.complete : true,
      fs: px(c.fontSize), fw: parseInt(c.fontWeight) || 400,
      ff: c.fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase(),
      lh: c.lineHeight === 'normal' ? null : px(c.lineHeight),
      color: parseColor(c.color), bgOwn: own, bgEff: bgSelf.rgb, bgPar: bgPar.rgb, bgUnknown: bgSelf.unknown,
      bgImg: !!(c.backgroundImage && c.backgroundImage !== 'none'),
      op: effOpacity(el), tt: c.textTransform, fst: c.fontStyle, ta: c.textAlign,
      td: c.textDecorationLine, pos: c.position, disp: c.display,
      ovx: c.overflowX, tov: c.textOverflow, ws: c.whiteSpace,
      scrollW: el.scrollWidth, clientW: el.clientWidth,
      radius, bw: px(c.borderTopWidth), bc: parseColor(c.borderTopColor), bs: c.borderTopStyle,
      shadow: c.boxShadow !== 'none',
      pad: [px(c.paddingTop), px(c.paddingRight), px(c.paddingBottom), px(c.paddingLeft)],
      mar: [px(c.marginTop), px(c.marginRight), px(c.marginBottom), px(c.marginLeft)],
      gap: [px(c.rowGap), px(c.columnGap)],
      outlineNone: c.outlineStyle === 'none' || px(c.outlineWidth) === 0,
      parent: null, snap: isInter ? snap(el) : null,
      placeholderColor: null,
    };
    if ((tag === 'input' || tag === 'textarea') && rec.placeholder) {
      try { rec.placeholderColor = parseColor(getComputedStyle(el, '::placeholder').color); } catch (e) {}
    }
    el.setAttribute('data-uia', String(rec.id));
    idx.set(el, rec.id);
    els.push(rec);
  }
  for (const el of all) {
    const i = idx.get(el); if (i === undefined) continue;
    let p = el.parentElement;
    while (p && !idx.has(p)) p = p.parentElement;
    els[i].parent = p ? idx.get(p) : null;
  }

  const vm = document.querySelector('meta[name=viewport]');
  const idCount = {};
  document.querySelectorAll('[id]').forEach(e => { if (e.id) idCount[e.id] = (idCount[e.id] || 0) + 1; });
  const visible = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const root = document.documentElement;
  const meta = {
    lang: root.getAttribute('lang') || '', title: (document.title || '').trim(),
    viewportMeta: vm ? vm.getAttribute('content') || '' : null,
    dupIds: Object.keys(idCount).filter(k => idCount[k] > 1).slice(0, 10),
    autoplay: document.querySelectorAll('video[autoplay],audio[autoplay],marquee,blink').length,
    posTabindex: [...document.querySelectorAll('[tabindex]')].filter(e => parseInt(e.getAttribute('tabindex')) > 0).length,
    navCounts: [...document.querySelectorAll('nav,[role=navigation],body > header')].map(n => [...n.querySelectorAll('a')].filter(visible).length),
    docW: root.scrollWidth, docH: root.scrollHeight, cw: root.clientWidth,
    vw: window.innerWidth, vh: window.innerHeight, rootFs: px(getComputedStyle(root).fontSize),
  };
  return { meta, els };
}