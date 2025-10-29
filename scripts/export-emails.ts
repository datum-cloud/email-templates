#!/usr/bin/env tsx
import fs from 'node:fs';
import path from 'node:path';
import { render, pretty } from '@react-email/render';
import { toPlainText } from '@react-email/render';

const ROOT = path.resolve(__dirname, '..');
const EMAILS_DIR = path.join(ROOT, 'emails');
const OUT_HTML_DIR = path.join(ROOT, 'out-html');
const OUT_TEXT_DIR = path.join(ROOT, 'out-text');

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function exportOne(filePath: string, propsOverride?: Record<string, unknown>) {
  const mod = await import(filePath);
  const component = (mod.default ?? Object.values(mod)[0]) as any;
  if (!component) {
    console.warn(`No default export found for ${filePath}, skipping.`);
    return;
  }

  // Prefer explicit override, else PreviewProps on the component, else {}.
  // Always replace values with deterministic placeholders for unique matching
  const originalProps: Record<string, unknown> = propsOverride ?? (component.PreviewProps ?? {});
  const previewProps: Record<string, string> = {};
  for (const key of Object.keys(originalProps)) {
    const tokenKey = key
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .replace(/[^a-zA-Z0-9_]/g, '_')
      .toLowerCase();
    previewProps[key] = `__placeholder_${tokenKey}__`;
  }

  const html = await pretty(await render(component(previewProps)));
  const text = toPlainText(html);

  const baseName = path.basename(filePath, path.extname(filePath));

  ensureDir(OUT_HTML_DIR);
  ensureDir(OUT_TEXT_DIR);
  fs.writeFileSync(path.join(OUT_HTML_DIR, `${baseName}.html`), html, 'utf8');
  fs.writeFileSync(path.join(OUT_TEXT_DIR, `${baseName}.txt`), text, 'utf8');
  console.log(`Exported ${baseName}.html and ${baseName}.txt`);
}

function listTopLevelEmailTsx(): string[] {
  const entries = fs.readdirSync(EMAILS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.tsx'))
    .map((e) => path.join(EMAILS_DIR, e.name));
}

async function main() {
  const files = listTopLevelEmailTsx();
  const propsArgIndex = process.argv.indexOf('--props');
  let propsOverride: Record<string, unknown> | undefined;
  if (propsArgIndex !== -1 && process.argv[propsArgIndex + 1]) {
    try {
      propsOverride = JSON.parse(process.argv[propsArgIndex + 1]);
    } catch (e) {
      console.warn('Invalid JSON for --props; ignoring.');
    }
  }

  for (const file of files) {
    // Use absolute file path with file:// scheme for ESM import
    const abs = `file://${file}`;
    await exportOne(abs, propsOverride);
  }
}

main();


