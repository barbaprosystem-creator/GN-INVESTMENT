const { execSync } = require('child_process');
const fs = require('fs');
const dir = 'C:/TRABAJO/GN INVESTMENT/videos web';
const artDir = 'C:/Users/migue/.gemini/antigravity-ide/brain/db91a6af-f781-4831-997d-9c9b5c467798';
fs.readdirSync(dir).filter(f => f.endsWith('.mp4')).forEach(f => {
  const safe = f.replace(/[^a-zA-Z0-9]/g, '_');
  try {
    execSync(`ffmpeg -y -i "${dir}/${f}" -vframes 1 "${artDir}/test_${safe}.png"`, { stdio: 'ignore' });
    console.log(`Exported: ${f} -> test_${safe}.png`);
  } catch(e){
    console.error(e);
  }
});
