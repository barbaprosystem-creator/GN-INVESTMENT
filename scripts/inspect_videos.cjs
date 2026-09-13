const { execSync } = require('child_process');
const fs = require('fs');

const dir = 'C:/TRABAJO/GN INVESTMENT/videos web';
console.log('Files in directory:', fs.readdirSync(dir));

const videos = [
  'logo desktop.mp4',
  'vista mobile logo.mp4',
  'vista desktop.mp4',
  'vista mobile.mp4'
];

videos.forEach(file => {
  const fullPath = `${dir}/${file}`;
  if (fs.existsSync(fullPath)) {
    try {
      const probe = execSync(`ffprobe -v error -show_entries stream=width,height,r_frame_rate,nb_frames,duration -select_streams v:0 -of json "${fullPath}"`).toString();
      console.log(`=== ${file} ===`);
      console.log(probe);
    } catch(e) {
      console.log(`Error probing ${file}:`, e.message);
    }
  } else {
    console.log(`File does not exist: ${file}`);
  }
});
