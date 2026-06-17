// screenshot.mjs — capture the site in light + dark, mobile + desktop.
//
// Usage:
//   node screenshot.mjs http://localhost:8000            -> screenshot-N.png
//   node screenshot.mjs http://localhost:8000 round1     -> screenshot-N-round1.png
//
// Saves to "./temporary screenshots/", auto-incremented, never overwritten.
// Captures 4 variants per run: desktop-light, desktop-dark, mobile-light, mobile-dark.

import puppeteer from 'puppeteer';
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const url = process.argv[2] || 'http://localhost:8000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const outDir = './temporary screenshots';

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// Find the next free index so we never overwrite.
function nextIndex() {
  const nums = readdirSync(outDir)
    .map((f) => f.match(/^screenshot-(\d+)/))
    .filter(Boolean)
    .map((m) => parseInt(m[1], 10));
  return nums.length ? Math.max(...nums) + 1 : 1;
}

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];
const themes = ['light', 'dark'];

const browser = await puppeteer.launch({ headless: 'new' });

try {
  for (const vp of viewports) {
    for (const theme of themes) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });

      // Seed the theme before the page's inline script runs.
      await page.evaluateOnNewDocument((t) => {
        try { localStorage.setItem('theme', t); } catch (e) {}
      }, theme);
      // Drive CSS prefers-color-scheme so dark mode (media-query based) renders.
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: theme }]);

      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      // Let fonts settle.
      await page.evaluate(() => document.fonts && document.fonts.ready);

      // Scroll through the page so IntersectionObserver reveals fire, then
      // return to top for the full-page capture.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y <= document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
        // Guarantee all reveal elements are shown for a clean full-page capture,
        // regardless of IntersectionObserver timing during the scroll.
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      });
      await new Promise((r) => setTimeout(r, 800));

      const idx = nextIndex();
      const file = join(outDir, `screenshot-${idx}-${vp.name}-${theme}${label}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log('saved', file);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
