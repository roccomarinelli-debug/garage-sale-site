import fs from 'fs';
import path from 'path';

// Read photos from public/photos directory
const photosDir = path.join(process.cwd(), 'public', 'photos');
const photoFiles = fs.readdirSync(photosDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext) && file !== '.gitkeep';
});

// Group photos by item name (remove numbers and extensions)
const groupedPhotos: Record<string, string[]> = {};

photoFiles.forEach(file => {
  // Remove extension
  const nameWithoutExt = file.replace(/\.[^/.]+$/, '');

  // Remove trailing numbers and spaces (e.g., "Coffee Table 2" -> "Coffee Table")
  const baseName = nameWithoutExt.replace(/\s*\d+\s*$/, '').trim();

  if (!groupedPhotos[baseName]) {
    groupedPhotos[baseName] = [];
  }

  groupedPhotos[baseName].push(`/photos/${file}`);
});

// Generate listings template
const listings = Object.entries(groupedPhotos).map(([name, images]) => ({
  title: name,
  price: 0, // TO DO: Fill in price
  description: '', // Optional: Add description
  category: 'Other', // TO DO: Choose from: Electronics, Furniture, Clothing, Books, Toys, Kitchen, Sports, Garden, Tools, Other
  images: images,
  available_date: null, // Optional: Set to "2025-12-15" format if item available later
  sold: false
}));

// Write to JSON file
const outputPath = path.join(process.cwd(), 'listings-template.json');
fs.writeFileSync(outputPath, JSON.stringify(listings, null, 2));

console.log(`✅ Generated listings template for ${listings.length} items!`);
console.log(`📄 File: ${outputPath}`);
console.log('\nFound items:');
listings.forEach((listing, i) => {
  console.log(`  ${i + 1}. ${listing.title} (${listing.images.length} photo${listing.images.length > 1 ? 's' : ''})`);
});
console.log('\n📝 Next steps:');
console.log('1. Edit listings-template.json and fill in prices, categories, and descriptions');
console.log('2. Run: npm run import-listings');
