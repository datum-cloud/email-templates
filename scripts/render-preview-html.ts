#!/usr/bin/env tsx
/*
 Renders email templates with their literal PreviewProps values (no
 placeholder tokenization) — used for PR screenshots, where a real name
 reads a lot better than `__placeholder_user_name__`.

 Usage:
   node scripts/render-preview-html.ts [names-file]

 Requirements:
   - Each email file in `emails/` should define `Component.PreviewProps = { ... }`
 */
import fs from 'node:fs';
import path from 'node:path';
import { pretty, render } from 'react-email';

const ROOT = path.resolve(__dirname, '..');
const EMAILS_DIR = path.join(ROOT, 'emails');
const OUT_DIR = path.join(ROOT, 'out-html-preview');

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function listTopLevelEmailTsx(): string[] {
  const entries = fs.readdirSync(EMAILS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.tsx'))
    .map((e) => path.join(EMAILS_DIR, e.name));
}

async function main() {
  ensureDir(OUT_DIR);

  const namesFile = process.argv[2];
  const wantedNames = namesFile
    ? fs
        .readFileSync(namesFile, 'utf8')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    : null;

  for (const filePath of listTopLevelEmailTsx()) {
    const baseName = path.basename(filePath, '.tsx');
    if (wantedNames && !wantedNames.includes(baseName)) continue;

    const mod = await import(`file://${filePath}`);
    const component = (mod.default ?? Object.values(mod)[0]) as any;
    if (!component) {
      console.warn(`No default export found for ${filePath}, skipping.`);
      continue;
    }

    const previewProps = component.PreviewProps ?? {};
    const html = await pretty(await render(component(previewProps)));
    fs.writeFileSync(path.join(OUT_DIR, `${baseName}.html`), html, 'utf8');
    console.log(`Rendered ${baseName}.html`);
  }
}

main();
