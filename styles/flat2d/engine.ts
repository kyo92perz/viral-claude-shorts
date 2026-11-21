// =====================================================================
//  Flat 2D — engine: builds ONE (paused) GSAP timeline out of SCENES.
//  Runs in the browser: the adapter strips the types (esbuild) and the page loads it after library and visuals.
//  For every scene: inserts its SVG (VISUALS[id].html or its type's one from LIBRARY), animates the titles layer
//  (label, words, highlight when the word is SAID, stat card) and calls VISUALS[id].anim.
//  HyperFrames steps through it frame by frame (no clocks, no Math.random: everything lives on the timeline).
//  index.html registers it inline: window.__timelines.main = buildTimeline() (so the linter sees it too).
// =====================================================================
function buildTimeline(): gsap.core.Timeline {
  const norm = (w: string) => w.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ%]/g, '');
  const said = (w: string, s: Scene) => { const n = norm(w); const p = WORDS.find((p) => p.t0 >= s.t0 - 0.2 && p.t0 < s.t1 && norm(p.w) === n); return p ? p.t0 : null; };
  const tl = gsap.timeline({ paused: true });
  for (const s of SCENES.scenes) {
    const sec = document.getElementById('sc-' + s.id)!, $ = (q: string) => '#sc-' + s.id + ' ' + q;
    const K = (id: string, fb?: number) => { const c = (s.keys || []).find((c) => c.id === id); return c ? c.t : (fb ?? s.t0 + 0.5); };
    const V = VISUALS[s.id] || LIBRARY[s.type] || LIBRARY.object;
    if (V.bg) sec.style.background = V.bg;
    if (V.ink) sec.style.setProperty('--ink', V.ink);   // light backgrounds: dark title (contrast >= 3:1)
    sec.querySelector('.art')!.innerHTML = V.html(s);
    // ---- titles
    const T = sec.querySelector('.titles')!;
    if (s.label) { const e = document.createElement('div'); e.className = 'label'; e.textContent = s.label.toUpperCase(); T.appendChild(e);
      tl.fromTo($('.label'), { scale: 0.4, opacity: 0, xPercent: -50 }, { scale: 1, opacity: 1, xPercent: -50, duration: 0.35, ease: 'back.out(2.2)' }, s.t0 + 0.02); }
    if (s.title) {
      const t = document.createElement('div'); t.className = 'title' + (s.title.length > 30 ? ' long' : ''); T.appendChild(t);
      const hl = s.highlight ? norm(s.highlight) : null, ws = s.title.split(/\s+/);
      ws.forEach((w) => { const sp = document.createElement('span'); sp.className = 'word' + (hl && norm(w) === hl ? ' hl' : ''); if (hl && norm(w) === hl) sp.innerHTML = '<span class="box"></span>'; sp.appendChild(document.createTextNode(w)); t.appendChild(sp); });
      tl.fromTo($('.word'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out', stagger: 0.45 / ws.length }, s.t0 + 0.08);
      if (hl) {
        const tHl = Math.min(said(s.highlight!, s) ?? s.t0 + 0.5, s.t1 - 0.6);   // never half done at the cut
        tl.fromTo($('.box'), { scaleX: 0 }, { scaleX: 1, duration: 0.28, ease: 'power2.out' }, tHl);
        tl.fromTo($('.word.hl'), { color: 'var(--ink)' }, { color: 'var(--accent-text)', duration: 0.12 }, tHl + 0.16);   // ends once the box already covers the word
      }
    }
    if (s.stat) {
      const c = document.createElement('div'); c.className = 'card'; c.innerHTML = `<div class="value"></div><div class="text"></div>`; T.appendChild(c);
      c.querySelector('.value')!.textContent = s.stat.value; c.querySelector('.text')!.textContent = s.stat.text || '';
      const tS = (s.keys || []).find((x) => x.id === 'stat')?.t ?? said(String(s.stat.value).split(/\s+/)[0], s) ?? s.t0 + 0.7;
      tl.fromTo($('.card'), { y: 80, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.8)' }, tS);
    }
    // ---- the scene's art
    if (V.anim) V.anim(tl, s, K, $);
  }
  // captions: the voice in groups of up to 3 words; the word being said turns yellow (all on the timeline)
  const root = document.getElementById('root')!;
  if (SCENES.captions) {
    const cap = document.createElement('div'); cap.className = 'captions'; root.appendChild(cap);
    const groups: { t0: number; t1: number; w: { w: string; t0: number }[] }[] = []; let g: (typeof groups)[0] | null = null;
    WORDS.forEach((w, i) => { const prev = WORDS[i - 1], gap = prev ? w.t0 - prev.t1 : 9, chars = g ? g.w.reduce((n, x) => n + x.w.length + 1, 0) : 0;
      if (!g || g.w.length >= 3 || gap > 0.35 || chars + w.w.length > 15 || /[.!?,]$/.test(prev?.w || '')) { g = { t0: w.t0, t1: w.t1, w: [] }; groups.push(g); }
      g.w.push({ w: w.w, t0: w.t0 }); g.t1 = w.t1; });
    groups.forEach((G, gi) => {
      const el = document.createElement('div'); el.className = 'g'; cap.appendChild(el);
      G.w.forEach((x) => { const sp = document.createElement('span'); sp.className = 'w'; sp.textContent = x.w.replace(/[.,!?;:]+$/, ''); el.appendChild(sp); });
      const end = Math.min(G.t1 + 0.25, (groups[gi + 1]?.t0 ?? 1e9) - 0.04);   // gone before the next group pops in (no frame with both)
      tl.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.08, ease: 'back.out(3)' }, G.t0 - 0.04);
      tl.set(el, { opacity: 0 }, end);
      const spans = el.querySelectorAll('.w');
      G.w.forEach((x, k) => { tl.set(spans[k], { color: '#f6c744' }, x.t0); if (k < G.w.length - 1) tl.set(spans[k], { color: '#ffffff' }, G.w[k + 1].t0); });
    });
  }
  if (SCENES.badge) { const b = document.createElement('div'); b.className = 'badge'; b.textContent = SCENES.badge.title; if (SCENES.badge.ep) { const e = document.createElement('span'); e.className = 'ep'; e.textContent = SCENES.badge.ep; b.appendChild(e); } root.appendChild(b); }
  tl.set({}, {}, SCENES.duration);   // the timeline spans the whole video
  return tl;
}
