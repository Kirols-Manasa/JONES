 import sharp from 'sharp';
import { readdirSync, unlinkSync, renameSync } from 'fs';
import { join, extname, basename } from 'path';

const INPUT_DIR = './public/images';
const TARGET_KB = 50;

const files = readdirSync(INPUT_DIR).filter(f =>
  ['.png', '.webp'].includes(extname(f).toLowerCase())
);

for (const file of files) {
  const inputPath = join(INPUT_DIR, file);
  const nameWithoutExt = basename(file, extname(file));
  const tempPath = join(INPUT_DIR, nameWithoutExt + '_temp.webp');
  const outputPath = join(INPUT_DIR, nameWithoutExt + '.webp');

  let quality = 85;
  let outputBuffer;

  do {
    outputBuffer = await sharp(inputPath)
      .webp({
        quality,
        lossless: false,
        alphaQuality: 100,
        effort: 6
      })
      .toBuffer();
    quality -= 5;
  } while (outputBuffer.length > TARGET_KB * 1024 && quality > 20);

  // اكتب على ملف مؤقت الأول
  await sharp(outputBuffer).toFile(tempPath);

  // امسح الأصلي واعمل rename للمؤقت
  unlinkSync(inputPath);
  renameSync(tempPath, outputPath);

  console.log(`✅ ${file} → ${nameWithoutExt}.webp (${(outputBuffer.length / 1024).toFixed(1)}KB)`);
}

console.log('\n🎉 خلص! كل الصور اتضغطت وبقت WebP');