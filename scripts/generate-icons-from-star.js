import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceIcon = path.join(__dirname, '../attached_assets/Screenshot_2025-12-08_at_9.14.07_PM_1765256779419.png');
const outputDir = path.join(__dirname, '../public');

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon.png', size: 32 },
];

async function generateIcons() {
  console.log('Generating icons from:', sourceIcon);
  
  // Generate regular icons
  for (const { name, size } of sizes) {
    const outputPath = path.join(outputDir, name);
    await sharp(sourceIcon)
      .resize(size, size, { fit: 'contain', background: { r: 15, g: 15, b: 17, alpha: 1 } })
      .png()
      .toFile(outputPath);
    console.log(`Created: ${name} (${size}x${size})`);
  }
  
  // Generate maskable versions with padding
  const maskableSizes = [
    { name: 'icon-192-maskable.png', size: 192, padding: 24 },
    { name: 'icon-512-maskable.png', size: 512, padding: 64 },
  ];
  
  for (const { name, size, padding } of maskableSizes) {
    const outputPath = path.join(outputDir, name);
    const innerSize = size - (padding * 2);
    
    await sharp(sourceIcon)
      .resize(innerSize, innerSize, { fit: 'contain' })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 15, g: 15, b: 17, alpha: 1 }
      })
      .png()
      .toFile(outputPath);
    console.log(`Created: ${name} (${size}x${size} maskable)`);
  }
  
  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
