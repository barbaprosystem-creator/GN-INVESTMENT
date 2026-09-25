const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const masks = {
  1: { y: 785, h: 80 },
  2: { y: 788, h: 80 },
  3: { y: 790, h: 80 },
  4: { y: 798, h: 85 },
  5: { y: 810, h: 95 },
  6: { y: 822, h: 98 },
  7: { y: 850, h: 105 },
  8: { y: 870, h: 110 },
  9: { y: 910, h: 125 },
  10: { y: 965, h: 115 },
  11: { y: 1000, h: 80 },
  12: { y: 1040, h: 40 },
  13: { y: 1060, h: 20 },
};

async function patchExact() {
  const framesDir = path.resolve(__dirname, '../public/frames/desktop');
  const backupDir = path.resolve(__dirname, '../public/frames/desktop_backup_raw');

  for (const [frameNum, m] of Object.entries(masks)) {
    const padded = String(frameNum).padStart(4, '0');
    const rawPath = path.join(backupDir, `frame-${padded}.webp`);
    const outPath = path.join(framesDir, `frame-${padded}.webp`);

    const svg = Buffer.from(`
      <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="${m.y}" width="1920" height="${m.h}" fill="black" />
      </svg>
    `);

    await sharp(rawPath)
      .composite([{ input: svg, top: 0, left: 0 }])
      .webp({ quality: 82, effort: 4 })
      .toFile(outPath);

    console.log(`✓ Perfectly patched frame-${padded}.webp [Y: ${m.y}, H: ${m.h}]`);
  }

  console.log('--- All frames patched with exact coordinates! ---');
}

patchExact().catch(console.error);
