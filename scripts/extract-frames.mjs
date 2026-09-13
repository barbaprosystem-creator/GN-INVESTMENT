import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const CONFIG = {
  desktopVideo: "C:\\TRABAJO\\GN INVESTMENT\\videos web\\vista desktop.mp4",
  mobileVideo: "C:\\TRABAJO\\GN INVESTMENT\\videos web\\vista mobile.mp4",
  fps: 15, // 8 seconds * 15 fps = 120 frames exactly
  desktopMaxWidth: 1920,
  mobileMaxWidth: 1080,
  quality: 82,
  compressionLevel: 4,
  desktopOutDir: path.resolve(projectRoot, 'public/frames/desktop'),
  mobileOutDir: path.resolve(projectRoot, 'public/frames/mobile')
};

function runFfmpeg(commandArgs) {
  return new Promise((resolve, reject) => {
    console.log('Running ffmpeg with args:', commandArgs.join(' '));
    const proc = spawn('ffmpeg', commandArgs, { stdio: 'inherit' });
    proc.on('close', (code) => code === 0 ? resolve() : reject(new Error(`FFmpeg exited with code ${code}`)));
    proc.on('error', (err) => reject(err));
  });
}

function ensureCleanDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  } else {
    fs.readdirSync(dirPath).filter(f => f.endsWith('.webp')).forEach(f => fs.unlinkSync(path.join(dirPath, f)));
  }
}

async function extract() {
  console.log('Starting WebP frame extraction pipeline...');

  // 1. Desktop Horizontal Sequence
  ensureCleanDir(CONFIG.desktopOutDir);
  console.log('Extracting Desktop frames (1920px, 15 fps)...');
  await runFfmpeg([
    '-y', '-i', CONFIG.desktopVideo,
    '-vf', `fps=${CONFIG.fps},scale=${CONFIG.desktopMaxWidth}:-2:flags=lanczos`,
    '-c:v', 'libwebp',
    '-quality', String(CONFIG.quality),
    '-compression_level', String(CONFIG.compressionLevel),
    '-vframes', '120',
    path.join(CONFIG.desktopOutDir, 'frame-%04d.webp')
  ]);

  // 2. Mobile Vertical Sequence
  ensureCleanDir(CONFIG.mobileOutDir);
  console.log('Extracting Mobile frames (1080px, 15 fps)...');
  await runFfmpeg([
    '-y', '-i', CONFIG.mobileVideo,
    '-vf', `fps=${CONFIG.fps},scale=${CONFIG.mobileMaxWidth}:-2:flags=lanczos`,
    '-c:v', 'libwebp',
    '-quality', String(CONFIG.quality),
    '-compression_level', String(CONFIG.compressionLevel),
    '-vframes', '120',
    path.join(CONFIG.mobileOutDir, 'frame-%04d.webp')
  ]);

  // Verify frame counts
  const desktopCount = fs.readdirSync(CONFIG.desktopOutDir).filter(f => f.endsWith('.webp')).length;
  const mobileCount = fs.readdirSync(CONFIG.mobileOutDir).filter(f => f.endsWith('.webp')).length;

  console.log(`✓ Desktop frames extracted: ${desktopCount}`);
  console.log(`✓ Mobile frames extracted: ${mobileCount}`);

  // Duplicate last frame to 120 if needed
  if (desktopCount < 120 && desktopCount > 0) {
    const last = path.join(CONFIG.desktopOutDir, `frame-${String(desktopCount).padStart(4, '0')}.webp`);
    for (let i = desktopCount + 1; i <= 120; i++) {
      fs.copyFileSync(last, path.join(CONFIG.desktopOutDir, `frame-${String(i).padStart(4, '0')}.webp`));
    }
  }
  if (mobileCount < 120 && mobileCount > 0) {
    const last = path.join(CONFIG.mobileOutDir, `frame-${String(mobileCount).padStart(4, '0')}.webp`);
    for (let i = mobileCount + 1; i <= 120; i++) {
      fs.copyFileSync(last, path.join(CONFIG.mobileOutDir, `frame-${String(i).padStart(4, '0')}.webp`));
    }
  }

  console.log('Frame extraction pipeline completed successfully!');
}

extract().catch(console.error);
