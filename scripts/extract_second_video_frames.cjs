const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const desktopSource = 'C:/TRABAJO/GN INVESTMENT/videos web/desktop second video.mp4';
const mobileSource = 'C:/TRABAJO/GN INVESTMENT/videos web/mobile second video.mp4';

const desktopOutDir = path.resolve(__dirname, '../public/frames/process-desktop');
const mobileOutDir = path.resolve(__dirname, '../public/frames/process-mobile');

if (!fs.existsSync(desktopOutDir)) fs.mkdirSync(desktopOutDir, { recursive: true });
if (!fs.existsSync(mobileOutDir)) fs.mkdirSync(mobileOutDir, { recursive: true });

console.log('--- Extracting Desktop Process Frames (120 frames @ 20fps, 1920x1080) ---');
const t0 = Date.now();
execSync(
  `ffmpeg -y -i "${desktopSource}" -vf "fps=20,scale=1920:1080:flags=lanczos" -c:v libwebp -quality 80 -compression_level 4 "${desktopOutDir}/frame-%04d.webp"`,
  { stdio: 'inherit' }
);
const desktopFiles = fs.readdirSync(desktopOutDir);
console.log(`Extracted ${desktopFiles.length} desktop frames in ${((Date.now() - t0)/1000).toFixed(1)}s`);

console.log('--- Extracting Mobile Process Frames (120 frames @ 20fps, 1080x1920) ---');
const t1 = Date.now();
execSync(
  `ffmpeg -y -i "${mobileSource}" -vf "fps=20,scale=1080:1920:flags=lanczos" -c:v libwebp -quality 80 -compression_level 4 "${mobileOutDir}/frame-%04d.webp"`,
  { stdio: 'inherit' }
);
const mobileFiles = fs.readdirSync(mobileOutDir);
console.log(`Extracted ${mobileFiles.length} mobile frames in ${((Date.now() - t1)/1000).toFixed(1)}s`);
