const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const artDir = 'C:/Users/migue/.gemini/antigravity-ide/brain/db91a6af-f781-4831-997d-9c9b5c467798/measure_frames';
if (!fs.existsSync(artDir)) fs.mkdirSync(artDir, { recursive: true });

const backupDir = 'public/frames/desktop_backup_raw';

for (let f = 1; f <= 13; f++) {
  const padded = String(f).padStart(4, '0');
  execSync(`ffmpeg -y -i "${backupDir}/frame-${padded}.webp" -vframes 1 "${artDir}/raw_${padded}.png"`, { stdio: 'ignore' });
}
console.log('Exported all raw frames');
