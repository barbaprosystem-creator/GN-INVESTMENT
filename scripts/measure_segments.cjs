const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function measureExactRanges() {
  const artDir = 'C:/Users/migue/.gemini/antigravity-ide/brain/db91a6af-f781-4831-997d-9c9b5c467798/measure_frames';

  for (let f = 1; f <= 13; f++) {
    const padded = String(f).padStart(4, '0');
    const imgPath = path.join(artDir, `raw_${padded}.png`);
    if (!fs.existsSync(imgPath)) continue;

    const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
    const width = info.width;
    const height = info.height;

    // Scan vertical slice at X = 960 (or X between 600 and 1300)
    // Find rows with non-black pixels in Y range 700 to 1080
    const rowMaxBrightness = [];
    for (let y = 700; y < height; y++) {
      let maxB = 0;
      for (let x = 400; x < 1500; x++) {
        const idx = (y * width + x) * 3;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const brightness = (r + g + b) / 3;
        if (brightness > maxB) maxB = brightness;
      }
      rowMaxBrightness[y] = maxB;
    }

    // Find valleys and peaks
    let activeSegments = [];
    let inSeg = false;
    let segStart = 0;
    for (let y = 700; y < height; y++) {
      if (rowMaxBrightness[y] > 20) {
        if (!inSeg) { inSeg = true; segStart = y; }
      } else {
        if (inSeg) { inSeg = false; activeSegments.push({ start: segStart, end: y - 1 }); }
      }
    }
    if (inSeg) activeSegments.push({ start: segStart, end: height - 1 });

    console.log(`Frame ${padded} segments:`, JSON.stringify(activeSegments));
  }
}

measureExactRanges().catch(console.error);
