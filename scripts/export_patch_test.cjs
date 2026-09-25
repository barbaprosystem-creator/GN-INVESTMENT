const { execSync } = require('child_process');
const fs = require('fs');
const artDir = 'C:/Users/migue/.gemini/antigravity-ide/brain/db91a6af-f781-4831-997d-9c9b5c467798/patch_test';
if (!fs.existsSync(artDir)) fs.mkdirSync(artDir, { recursive: true });

[1, 3, 5, 7, 9, 11, 13, 15].forEach(f => {
  const padded = String(f).padStart(4, '0');
  execSync(`ffmpeg -y -i "public/frames/desktop/frame-${padded}.webp" -vframes 1 "${artDir}/f_${padded}.png"`, { stdio: 'ignore' });
});
console.log('Exported frames to patch_test');
