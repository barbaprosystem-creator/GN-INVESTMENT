const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function patchDesktopFrames() {
  const framesDir = path.resolve(__dirname, '../public/frames/desktop');
  const backupDir = path.resolve(__dirname, '../public/frames/desktop_backup_raw');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  console.log('--- Patching Desktop Frames 1-12 to remove duplicate INVESTMENT line ---');

  // Zoom trajectory for diamond and second text:
  // At frame 1:
  // copper INVESTMENT bottom is ~760
  // silver INVESTMENT is ~795-855
  // diamond line is ~875-920
  //
  // We want to keep the copper INVESTMENT and the diamond line, while removing the silver INVESTMENT text in between.
  // In pure black background, masking Y: 790 to 865 at frame 1 covers exactly the silver INVESTMENT letters.
  
  for (let f = 1; f <= 13; f++) {
    const padded = String(f).padStart(4, '0');
    const framePath = path.join(framesDir, `frame-${padded}.webp`);
    if (!fs.existsSync(framePath)) continue;

    // Backup original
    const backupPath = path.join(backupDir, `frame-${padded}.webp`);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(framePath, backupPath);
    }

    // Scale calculation as camera zooms in from frame 1 to 13
    // At frame 1, scale is 1.0. At frame 11, scale is ~1.5
    const t = (f - 1) / 10;
    const scale = 1.0 + t * 0.52;
    
    // Y center of the silver text starts around 825 and scales down
    // Center point of zoom is roughly (960, 480)
    const baseY = 480 + (825 - 480) * scale;
    const baseH = 75 * scale;
    const patchY = Math.round(baseY - baseH / 2);
    const patchH = Math.round(baseH);
    const patchW = Math.round(1100 * scale);
    const patchX = Math.round(960 - patchW / 2);

    const svg = Buffer.from(`
      <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <rect x="${patchX}" y="${patchY}" width="${patchW}" height="${patchH}" fill="black" />
      </svg>
    `);

    const tempPng = path.join(framesDir, `temp-${padded}.png`);
    await sharp(backupPath)
      .composite([{ input: svg, top: 0, left: 0 }])
      .webp({ quality: 82, effort: 4 })
      .toFile(framePath);

    console.log(`✓ Patched frame-${padded}.webp (patchY: ${patchY}, patchH: ${patchH})`);
  }

  console.log('All desktop frames patched successfully!');
}

patchDesktopFrames().catch(console.error);
