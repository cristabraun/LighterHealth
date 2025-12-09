import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceIcon = path.join(__dirname, '../attached_assets/generated_images/lighter_app_icon_coral_gradient.png');
const outputDir = path.join(__dirname, '../public/icons');

const sizes = [
  { name: 'icon-512x512-v2.png', size: 512 },
  { name: 'icon-192x192-v2.png', size: 192 },
  { name: 'apple-touch-icon-180x180-v2.png', size: 180 },
  { name: 'favicon-32x32-v2.png', size: 32 },
];

async function generateIcons() {
  console.log('Generating icons from:', sourceIcon);
  console.log('Output directory:', outputDir);
  
  for (const { name, size } of sizes) {
    const outputPath = path.join(outputDir, name);
    await sharp(sourceIcon)
      .resize(size, size, {
        fit: 'cover',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
    console.log(`Created: ${name} (${size}x${size})`);
  }
  
  // Also create maskable versions with padding for safe zone
  const maskableSizes = [
    { name: 'icon-512x512-maskable-v2.png', size: 512, padding: 64 },
    { name: 'icon-192x192-maskable-v2.png', size: 192, padding: 24 },
  ];
  
  for (const { name, size, padding } of maskableSizes) {
    const outputPath = path.join(outputDir, name);
    const innerSize = size - (padding * 2);
    
    // Create the icon with padding and dark background for maskable
    await sharp(sourceIcon)
      .resize(innerSize, innerSize, { fit: 'cover' })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 15, g: 15, b: 17, alpha: 1 } // #0f0f11 dark background
      })
      .png()
      .toFile(outputPath);
    console.log(`Created: ${name} (${size}x${size} with ${padding}px padding)`);
  }
  
  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
