const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const artDir = 'C:/Users/migue/.gemini/antigravity-ide/brain/35b9539b-5522-47d7-b964-ab6cff1c43fd';

// Extract sample frames from 'logo desktop.mp4' and 'vista mobile logo.mp4'
const targets = [
  { file: 'C:/TRABAJO/GN INVESTMENT/videos web/logo desktop.mp4', name: 'logo_desktop' },
  { file: 'C:/TRABAJO/GN INVESTMENT/videos web/vista mobile logo.mp4', name: 'logo_mobile' }
];

targets.forEach(t => {
  // Extract 5 keyframes: start (0.1s), 2s, 4s, 6s, end (7.9s)
  [0.1, 2.0, 4.0, 6.0, 7.8].forEach((ss, idx) => {
    const outName = `${t.name}_f${idx + 1}.jpg`;
    const outPath = path.join(artDir, outName);
    try {
      execSync(`ffmpeg -y -ss ${ss} -i "${t.file}" -vframes 1 -vf "scale=640:-1" "${outPath}"`, { stdio: 'ignore' });
      console.log(`Extracted ${outName}`);
    } catch (e) {
      console.log(`Failed to extract ${outName}:`, e.message);
    }
  });
});
