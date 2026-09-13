const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = 'C:/Users/migue/.gemini/antigravity-ide/brain/35b9539b-5522-47d7-b964-ab6cff1c43fd/second_video_samples';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const timestamps = [0, 0.5, 1.0, 2.0, 3.0, 4.0, 5.0, 5.5, 5.9];
for (const t of timestamps) {
  const safeName = String(t).replace('.', '_');
  execSync(`ffmpeg -y -ss ${t} -i "C:/TRABAJO/GN INVESTMENT/videos web/desktop second video.mp4" -vframes 1 -vf "scale=640:-1" "${outDir}/desktop_t${safeName}.jpg"`, { stdio: 'ignore' });
  execSync(`ffmpeg -y -ss ${t} -i "C:/TRABAJO/GN INVESTMENT/videos web/mobile second video.mp4" -vframes 1 -vf "scale=360:-1" "${outDir}/mobile_t${safeName}.jpg"`, { stdio: 'ignore' });
}

console.log('Sample frames extracted to:', outDir);
