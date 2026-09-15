import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const CONFIG = {
  mobileVideo: "C:\\TRABAJO\\GN INVESTMENT\\videos web\\vista mobile.mp4",
  fps: 15, // 8 seconds * 15 fps = 120 frames exactly
  mobileMaxWidth: 1080,
  quality: 82,
  compressionLevel: 4,
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
  console.log('--- Starting Mobile WebP Frame Extraction Pipeline ---');
  const t0 = Date.now();

  ensureCleanDir(CONFIG.mobileOutDir);
  console.log('Extracting Mobile frames (1080px wide, 15 fps, max 120 frames)...');
  await runFfmpeg([
    '-y', '-i', CONFIG.mobileVideo,
    '-vf', `fps=${CONFIG.fps},scale=${CONFIG.mobileMaxWidth}:-2:flags=lanczos`,
    '-c:v', 'libwebp',
    '-quality', String(CONFIG.quality),
    '-compression_level', String(CONFIG.compressionLevel),
    '-vframes', '120',
    path.join(CONFIG.mobileOutDir, 'frame-%04d.webp')
  ]);

  const mobileCount = fs.readdirSync(CONFIG.mobileOutDir).filter(f => f.endsWith('.webp')).length;
  console.log(`✓ Mobile frames extracted: ${mobileCount} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

  if (mobileCount < 120 && mobileCount > 0) {
    console.log(`Padding from ${mobileCount} to 120 frames...`);
    const last = path.join(CONFIG.mobileOutDir, `frame-${String(mobileCount).padStart(4, '0')}.webp`);
    for (let i = mobileCount + 1; i <= 120; i++) {
      fs.copyFileSync(last, path.join(CONFIG.mobileOutDir, `frame-${String(i).padStart(4, '0')}.webp`));
    }
  }

  const finalCount = fs.readdirSync(CONFIG.mobileOutDir).filter(f => f.endsWith('.webp')).length;
  console.log(`Done! Total mobile frames in ${CONFIG.mobileOutDir}: ${finalCount}`);
}

extract().catch((err) => {
  console.error('Extraction failed:', err);
  process.exit(1);
});
