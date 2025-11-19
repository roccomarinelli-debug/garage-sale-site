import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const websiteUrl = 'https://garage-sale-suffolk.netlify.app';

async function generateQR() {
  try {
    // Generate QR code as SVG
    const qrSvg = await QRCode.toString(websiteUrl, {
      type: 'svg',
      width: 400,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Save to public folder
    const outputPath = path.join(process.cwd(), 'public', 'qr-code.svg');
    fs.writeFileSync(outputPath, qrSvg);

    console.log('✅ QR code generated at public/qr-code.svg');
    console.log(`📱 Scanning will go to: ${websiteUrl}`);
  } catch (error) {
    console.error('❌ Error generating QR code:', error);
  }
}

generateQR();
