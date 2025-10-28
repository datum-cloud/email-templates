#!/usr/bin/env node
/*
 Generates YAML EmailTemplate CRDs from exported HTML/text, replacing
 PreviewProps literal values with Go template placeholders ({{.prop}}).

 Usage:
   node scripts/generate-yaml.js

 Requirements:
   - Run `pnpm export:all` first so out-html/ and out-text/ exist
   - Each email file in `emails/` should define `Component.PreviewProps = { ... }`
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EMAILS_DIR = path.join(ROOT, 'emails');
const OUT_HTML_DIR = path.join(ROOT, 'out-html');
const OUT_TEXT_DIR = path.join(ROOT, 'out-text');
const OUT_YAML_DIR = path.join(ROOT, 'out-yaml');

function readFileSafe(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function listTopLevelEmailTsx() {
  const entries = fs.readdirSync(EMAILS_DIR, { withFileTypes: true });
  return entries
    .filter(
      (e) =>
        e.isFile() &&
        e.name.endsWith('.tsx') &&
        e.name !== 'index.ts' &&
        // skip folders like components/, layouts/, config/
        true
    )
    .map((e) => path.join(EMAILS_DIR, e.name));
}

function extractPreviewProps(tsxContent) {
  // Match: Something.PreviewProps = { ... } as SomethingProps;
  const re = /\.PreviewProps\s*=\s*\{([\s\S]*?)\}\s*as\s*[A-Za-z0-9_]+\s*;/m;
  const m = tsxContent.match(re);
  if (!m) return {};
  const body = m[1];
  const props = {};
  // Capture key: 'value' or "value"
  const kvRe = /(\w+)\s*:\s*(["'])([\s\S]*?)\2\s*,?/g;
  let km;
  while ((km = kvRe.exec(body)) !== null) {
    const key = km[1];
    const val = km[3];
    props[key] = val;
  }
  return props;
}

function escapeForRegex(literal) {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replacePreviewValuesWithPlaceholders(content, previewProps) {
  let result = content;
  for (const [key, value] of Object.entries(previewProps)) {
    if (!value) continue;
    // Also support deterministic placeholder tokens from exporter
    const tokenKey = String(key)
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .replace(/[^a-zA-Z0-9_]/g, '_')
      .toLowerCase();
    const token = `__placeholder_${tokenKey}__`;

    const patterns = [String(value), token, token.toUpperCase()];
    for (const pat of patterns) {
      if (!pat) continue;
      const re = new RegExp(escapeForRegex(pat), 'g');
      result = result.replace(re, `{{.${key}}}`);
    }
  }
  return result;
}

function extractSubjectFromHtml(html) {
  // naive: first <h1> or <h2>
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripHtml(h1[1]).trim();
  const h2 = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  if (h2) return stripHtml(h2[1]).trim();
  // fallback to title-like text
  return 'Notification';
}

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function toMetadataName(baseName) {
  // baseName is like user-invitation -> userinvitationemailtemplate
  const compact = baseName.replace(/-/g, '');
  return `emailtemplates.notification.miloapis.com-${compact}emailtemplate`;
}

function wrapYamlBlock(label, content, indent = '  ') {
  // Indent each line by two spaces for YAML block scalars
  const indented = content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => `${indent}  ${line}`)
    .join('\n');
  return `${indent}${label}: |\n${indented}\n`;
}

function generateYaml({ baseName, subject, html, text, variables = [] }) {
  const parts = [];
  parts.push('apiVersion: notification.miloapis.com/v1alpha1');
  parts.push('kind: EmailTemplate');
  parts.push('metadata:');
  parts.push(`  name: ${toMetadataName(baseName)}`);
  parts.push('spec:');
  parts.push(`  subject: "${subject.replace(/"/g, '\\"')}"`);
  parts.push(wrapYamlBlock('htmlBody', html));
  parts.push(wrapYamlBlock('textBody', text));
  
  if (variables.length > 0) {
    parts.push('  variables:');
    for (const variable of variables) {
      parts.push(`  - name: "${variable.name}"`);
      parts.push(`    required: ${variable.required ? 'true' : 'false'}`);
      parts.push(`    type: "${variable.type}"`);
    }
  }
  
  return parts.join('\n');
}

function main() {
  ensureDir(OUT_YAML_DIR);
  const files = listTopLevelEmailTsx();
  if (files.length === 0) {
    console.warn('No email templates found in emails/*.tsx');
  }

  let generated = 0;
  for (const tsxPath of files) {
    const baseName = path.basename(tsxPath, '.tsx');
    const htmlPath = path.join(OUT_HTML_DIR, `${baseName}.html`);
    const textPath = path.join(OUT_TEXT_DIR, `${baseName}.txt`);
    const tsx = readFileSafe(tsxPath);
    const html = readFileSafe(htmlPath);
    const text = readFileSafe(textPath);

    if (!tsx || !html || !text) {
      console.warn(`Skipping ${baseName}: missing exported html/text or source.`);
      continue;
    }

    const previewProps = extractPreviewProps(tsx);
    const htmlRepl = replacePreviewValuesWithPlaceholders(html, previewProps);
    const textRepl = replacePreviewValuesWithPlaceholders(text, previewProps);
    const subject = extractSubjectFromHtml(htmlRepl);

    // Convert PreviewProps to variables format
    const variables = Object.keys(previewProps).map(key => ({
      name: key,
      required: true,
      type: 'string'
    }));

    const yaml = generateYaml({ baseName, subject, html: htmlRepl, text: textRepl, variables });
    const outPath = path.join(OUT_YAML_DIR, `${baseName.replace(/-/g, '')}-emailtemplate.yaml`);
    fs.writeFileSync(outPath, yaml, 'utf8');
    console.log(`Generated ${path.relative(ROOT, outPath)}`);
    generated++;
  }

  if (generated === 0) {
    console.warn('No YAML files generated. Ensure you have run `pnpm export:all`.');
  }
}

main();


