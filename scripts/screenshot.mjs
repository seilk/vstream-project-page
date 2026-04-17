/**
 * Capture a series of viewport screenshots of the running prototype
 * so a headless host can preview the live attention-graph animation.
 *
 * Usage:
 *   node scripts/screenshot.mjs
 * Requires: a static server on http://localhost:8123 (or set $URL).
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../screenshots');
const URL = process.env.URL || 'http://localhost:8123/';

// Capture cadence (ms after first paint).
const FRAMES = [500, 2500, 4500, 7000, 10000, 14000];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  args: [
    // Force WebGL via SwiftShader software rasterizer in headless.
    '--use-gl=swiftshader',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--no-sandbox',
  ],
});
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

page.on('pageerror', (e) => console.error('PAGEERROR:', e.message));
page.on('console', (msg) => {
  if (msg.type() === 'error') console.error('CONSOLE.error:', msg.text());
});

console.log(`→ navigating to ${URL}`);
await page.goto(URL, { waitUntil: 'networkidle' });

// Wait until the canvas mounts (R3F dynamic-imports it client-side).
await page.waitForSelector('canvas', { timeout: 10_000 });
console.log('✓ canvas mounted');

// Give R3F a beat to initialize the scene.
await page.waitForTimeout(400);

const start = Date.now();
for (const targetMs of FRAMES) {
  const wait = targetMs - (Date.now() - start);
  if (wait > 0) await page.waitForTimeout(wait);
  const path = `${OUT_DIR}/frame-${String(targetMs).padStart(5, '0')}ms.png`;
  await page.screenshot({ path, fullPage: false });
  console.log(`✓ ${path}`);
}

await browser.close();
console.log(`\nWrote ${FRAMES.length} frames to ${OUT_DIR}`);
