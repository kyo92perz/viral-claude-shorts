// capture frames: node capture.cjs [only=t]  (writes frames/f0000.png ...)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  p.on('console', (m) => console.error('page:', m.text())); p.on('pageerror', (e) => console.error('err:', e.message));
  await p.setContent('<body style="margin:0;background:#000"></body>'); await p.addScriptTag({ path: path.join(__dirname, 'scene.js') });
  await p.waitForFunction(() => window.ready);
  const only = process.argv[2]; const N = only ? 1 : 240;
  for (let i = 0; i < N; i++) { const t = only ? +only : i / 24; const d = await p.evaluate((t) => window.render(t), t);
    fs.writeFileSync(path.join(__dirname, 'frames', only ? 'test.png' : `f${String(i).padStart(4, '0')}.png`), Buffer.from(d.split(',')[1], 'base64'));
    if (i % 48 === 0) console.error('frame', i); }
  await b.close();
})();
