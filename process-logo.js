import sharp from 'sharp';
import fs from 'fs';

async function processLogo() {
  const inputPath = 'public/images/gn-logo.png';
  const transparentPath = 'public/images/gn-logo-transparent.png';
  const croppedPath = 'public/images/gn-logo-cropped.png';

  // 1. Trim surrounding white space
  const trimmedBuffer = await sharp(inputPath)
    .trim({ background: '#FFFFFF', threshold: 10 })
    .toBuffer();

  await sharp(trimmedBuffer).toFile(croppedPath);
  console.log('Saved cropped logo.');

  // 2. Make white background transparent
  const image = sharp(trimmedBuffer);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const threshold = 245; // brightness threshold for white

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Check if pixel is white or near-white
    if (r >= threshold && g >= threshold && b >= threshold) {
      // Smooth alpha transition
      const minVal = Math.min(r, g, b);
      if (minVal >= 252) {
        data[i + 3] = 0; // Fully transparent
      } else {
        const factor = (255 - minVal) / (255 - threshold);
        data[i + 3] = Math.round(255 * factor);
      }
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .png({ quality: 100 })
  .toFile(transparentPath);

  console.log('Saved transparent logo.');

  // Generate favicon png
  await sharp(transparentPath)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('public/favicon.png');

  console.log('Favicon generated.');
}

processLogo().catch(console.error);
