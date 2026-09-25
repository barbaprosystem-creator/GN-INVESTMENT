const { execSync } = require('child_process');
const dir = 'C:/TRABAJO/GN INVESTMENT/videos web';
execSync(`ffmpeg -y -i "${dir}/vista desktop.backup.mp4" -vframes 1 "C:/Users/migue/.gemini/antigravity-ide/brain/db91a6af-f781-4831-997d-9c9b5c467798/backup_frame1.png"`, { stdio: 'ignore' });
execSync(`ffmpeg -y -i "${dir}/vista mobile.mp4" -vframes 1 "C:/Users/migue/.gemini/antigravity-ide/brain/db91a6af-f781-4831-997d-9c9b5c467798/mobile_frame1.png"`, { stdio: 'ignore' });
console.log('Exported backup_frame1 and mobile_frame1');
