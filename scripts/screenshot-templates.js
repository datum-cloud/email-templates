#!/usr/bin/env node
/*
 Screenshots rendered email HTML files with a headless browser.

 Usage:
   node scripts/screenshot-templates.js [file-with-one-template-name-per-line]

 With no argument, screenshots every template found in out-html-preview/.

 Requirements:
   - Run `tsx scripts/render-preview-html.ts` first so out-html-preview/ exists
   - Run `pnpm exec playwright install --with-deps chromium` first
*/

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const OUT_HTML_DIR = path.join(ROOT, 'out-html-preview');
const SCREENSHOTS_DIR = path.join(ROOT, 'screenshots');

async function main() {
  const namesFile = process.argv[2];

  const names = namesFile
    ? fs
        .readFileSync(namesFile, 'utf8')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    : fs
        .readdirSync(OUT_HTML_DIR)
        .filter((f) => f.endsWith('.html'))
        .map((f) => f.slice(0, -'.html'.length));

  if (names.length === 0) {
    console.log('No template names given, nothing to screenshot.');
    return;
  }

  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 640, height: 800 } });

  for (const name of names) {
    const htmlPath = path.join(OUT_HTML_DIR, `${name}.html`);
    if (!fs.existsSync(htmlPath)) {
      console.warn(`Skipping ${name}: no exported HTML at ${htmlPath}`);
      continue;
    }

    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
    const outPath = path.join(SCREENSHOTS_DIR, `${name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Screenshotted ${name} -> ${path.relative(ROOT, outPath)}`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
