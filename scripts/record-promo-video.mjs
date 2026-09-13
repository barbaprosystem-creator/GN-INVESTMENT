/**
 * G&N Investment — Automated 60fps Promo Video Capture Script
 * Part of the 'website-promo-video' skill toolkit.
 *
 * Requirements:
 *   npm install -D playwright
 *
 * Usage:
 *   node scripts/record-promo-video.mjs
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function runShowcaseRecording() {
  const outputDir = path.resolve('./recordings');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Iniciando navegador en modo Retina (deviceScaleFactor: 2)...');
  const browser = await chromium.launch({
    headless: false, // Visible so you can watch the choreography
    args: ['--force-device-scale-factor=2', '--disable-infobars', '--no-sandbox']
  });

  // Desktop 16:9 Showcase Preset
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: outputDir,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  console.log('🌐 Navegando a http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Cubic bezier easing for human-like momentum scroll
  async function smoothScroll(distance, durationMs) {
    const steps = 75;
    const stepDist = distance / steps;
    const stepDelay = durationMs / steps;
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      await page.mouse.wheel(0, stepDist * (ease * 1.4));
      await page.waitForTimeout(stepDelay);
    }
  }

  // Helper for natural smooth cursor glide
  async function smoothMouseMove(targetX, targetY, steps = 30) {
    await page.mouse.move(targetX, targetY, { steps });
  }

  console.log('🎬 Acto 1: Vista exterior Kentucky house (3.0s)...');
  await page.waitForTimeout(3000);

  console.log('🎬 Acto 2: Recorrido hacia el living con pared de yeso 3D...');
  await smoothScroll(2150, 4200);
  await page.waitForTimeout(2000);

  console.log('🎬 Acto 3: Mover cursor hacia "Get My Offer" con zoom e interacción...');
  const ctaBtn = page.locator('#portalCtaBtn');
  const box = await ctaBtn.boundingBox();
  if (box) {
    await smoothMouseMove(box.x + box.width / 2, box.y + box.height / 2, 35);
    await page.waitForTimeout(800);
    await ctaBtn.click();
    console.log('👆 Clic realizado en "Get My Offer"');
  }

  console.log('🎬 Acto 4: Demostración del formulario dedicado de valoración (3.5s)...');
  await page.waitForTimeout(3500);

  await context.close();
  await browser.close();

  console.log(`\n✅ Grabación 60fps guardada con éxito en:\n   ${outputDir}\n`);
}

runShowcaseRecording().catch((err) => {
  console.error('Error durante la grabación:', err);
});
