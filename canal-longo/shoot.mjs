import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
import path from 'node:path';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 2600, height: 2400 } });
await p.goto('file://' + path.resolve('brand.html')); await p.waitForTimeout(800);
await (await p.$('#profile')).screenshot({ path: 'foto-perfil.png' });
await (await p.$('#banner')).screenshot({ path: 'banner.png' });
await b.close(); console.log('ok');
