const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const artDir = 'C:/Users/migue/.gemini/antigravity-ide/brain/35b9539b-5522-47d7-b964-ab6cff1c43fd';

// Extract frames at 0s, 0.5s, 1s, 2s, 3s, 4s, 5s, 6s, 7s, 7.9s
const timestamps = [0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 7.5, 7.9];

timestamps.forEach(t => {
  const outName = `timeline_logo_${String(t).replace('.', '_')}.jpg`;
  const outPath = path.join(artDir, outName);
  try {
    execSync(`ffmpeg -y -ss ${t} -i "C:/TRABAJO/GN INVESTMENT/videos web/logo desktop.mp4" -vframes 1 -vf "scale=480:-1" "${outPath}"`, { stdio: 'ignore' });
    console.log(`Extracted ${outName}`);
  } catch (e) {
    console.log(`Failed ${t}:`, e.message);
  }
});
