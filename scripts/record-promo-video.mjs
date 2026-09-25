/**
 * G&N Investment — Complete Full-Page Cinematic Showcase Recording Script
 * Records the entire scrollytelling experience from the exterior house
 * through the living room 3D wall, the metallic logo reveal, the arched
 * process walkthrough, and into the homepage body — with NO button interruptions.
 *
 * Usage:
 *   node scripts/record-promo-video.mjs
 */

import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

async function runFullShowcaseRecording() {
  const outputDir = path.resolve('./recordings');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  console.log('🚀 Iniciando Chrome en modo Retina 2x (1920x1080 60fps)...');
  const browser = await chromium.launch({
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    headless: false, // Visible para apreciar la coreografía en tiempo real
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

  // Mathematical smooth scroll targeting exact GSAP progress
  async function smoothScrollToHeroProgress(targetProgress, durationMs) {
    const totalHeroScrollable = await page.evaluate(() => {
      const sec = document.getElementById('portalHeroSection');
      return sec ? sec.getBoundingClientRect().height - window.innerHeight : 5000;
    });
    const targetY = totalHeroScrollable * targetProgress;
    const currentY = await page.evaluate(() => window.scrollY);
    const distance = targetY - currentY;
    const steps = 75;
    const stepDelay = durationMs / steps;

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      // Smooth easeInOutCubic for fluid camera motion
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const nextY = currentY + distance * ease;
      await page.evaluate((y) => window.scrollTo(0, y), nextY);
      await page.waitForTimeout(stepDelay);
    }
  }

  // Smooth scroll past the hero into the rest of the homepage
  async function smoothScrollPastHero(additionalPixels, durationMs) {
    const currentY = await page.evaluate(() => window.scrollY);
    const targetY = currentY + additionalPixels;
    const steps = 60;
    const stepDelay = durationMs / steps;

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const nextY = currentY + (targetY - currentY) * ease;
      await page.evaluate((y) => window.scrollTo(0, y), nextY);
      await page.waitForTimeout(stepDelay);
    }
  }

  console.log('🎬 [00s-03s] Acto 1: Vista exterior Kentucky house...');
  await page.waitForTimeout(2500);

  console.log('🎬 [03s-09s] Entrada cinemática hacia el living y pared de yeso 3D...');
  await smoothScrollToHeroProgress(0.42, 5200);
  console.log('⏸️ Pausa en la pared de yeso 3D (SELL YOUR HOUSE AS-IS)...');
  await page.waitForTimeout(2500);

  console.log('🎬 [09s-16s] Avanzando por los arcos hacia el muro de proceso (Acto 2)...');
  await smoothScrollToHeroProgress(0.89, 5600);
  console.log('⏸️ Pausa en la pared de proceso de 4 pasos...');
  await page.waitForTimeout(2500);

  console.log('🎬 [16s-22s] Desanclaje diurno hacia el cuerpo de la web (Trust Strip + Oferta)...');
  await smoothScrollToHeroProgress(1.00, 3500);
  await page.waitForTimeout(1000);

  console.log('🎬 [26s-30s] Desplazamiento final por el formulario, tabla y contenido...');
  await smoothScrollPastHero(1200, 4000);
  console.log('⏸️ Pausa final para apreciar el diseño completo...');
  await page.waitForTimeout(3000);

  // Get video object before closing context
  const videoObj = page.video();
  const videoPath = videoObj ? await videoObj.path() : null;

  await context.close();
  await browser.close();

  if (videoPath && fs.existsSync(videoPath)) {
    const finalWebm = path.join(outputDir, 'gn-investment-full-showcase.webm');
    fs.copyFileSync(videoPath, finalWebm);
    console.log(`\n🎉 ¡VIDEO COMPLETO GRABADO CON ÉXITO!\n   Archivo: ${finalWebm}\n`);
  } else {
    console.log(`\n✅ Grabación finalizada en ${outputDir}\n`);
  }
}

runFullShowcaseRecording().catch((err) => {
  console.error('Error durante la grabación:', err);
});
