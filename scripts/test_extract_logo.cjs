const { execSync } = require('child_process');
const fs = require('fs');

const testDir = 'C:/Users/migue/.gemini/antigravity-ide/brain/35b9539b-5522-47d7-b964-ab6cff1c43fd/test_logo_frames';
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

console.log('Testing extraction of 12fps webp frames from logo desktop.mp4...');
const start = Date.now();
execSync(`ffmpeg -y -i "C:/TRABAJO/GN INVESTMENT/videos web/logo desktop.mp4" -vf "fps=12,scale=1920:1080:flags=lanczos" -c:v libwebp -quality 80 -compression_level 4 "${testDir}/frame-%04d.webp"`, { stdio: 'ignore' });
const duration = (Date.now() - start) / 1000;
const files = fs.readdirSync(testDir);
console.log('Extracted', files.length, 'frames in', duration, 's');

let totalSize = 0;
files.forEach(f => {
  totalSize += fs.statSync(`${testDir}/${f}`).size;
});
console.log('Total size:', (totalSize / (1024 * 1024)).toFixed(2), 'MB');
console.log('Average frame size:', (totalSize / files.length / 1024).toFixed(1), 'KB');
