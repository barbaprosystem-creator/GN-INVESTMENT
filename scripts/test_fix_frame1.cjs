const sharp = require('sharp');
const path = require('path');

async function testFixFrame1() {
  const inputPath = 'public/frames/desktop/frame-0001.webp';
  const outPath = 'C:/Users/migue/.gemini/antigravity-ide/brain/db91a6af-f781-4831-997d-9c9b5c467798/fixed_frame1.png';

  // Read frame 1
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  console.log('Metadata:', metadata.width, metadata.height);

  // In 1920x1080:
  // Let's create an SVG black patch over the second "— INVESTMENT —" text (Y ~ 795 to 855) or let's measure exact bounds
  const patchSvg = Buffer.from(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <rect x="400" y="790" width="1120" height="75" fill="black" />
    </svg>
  `);

  await sharp(inputPath)
    .composite([{ input: patchSvg, top: 0, left: 0 }])
    .png()
    .toFile(outPath);

  console.log('Fixed frame 1 exported to:', outPath);
}

testFixFrame1().catch(console.error);
