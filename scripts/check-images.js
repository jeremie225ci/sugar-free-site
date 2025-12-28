const fs = require('fs');
const path = require('path');

const recipes = JSON.parse(fs.readFileSync('./data/recipes.json', 'utf8'));
const dataIndex = fs.readFileSync('./data/index.ts', 'utf8');

// Extract the imageMap object content
const imageMapMatch = dataIndex.match(/const imageMap: Record<string, string> = {([\s\S]+?)};/);
if (!imageMapMatch) {
    console.error('Could not find imageMap in data/index.ts');
    process.exit(1);
}

const imageMapContent = imageMapMatch[1];
const mappedIds = new Set();
const regex = /'([^']+)':/g;
let match;
while ((match = regex.exec(imageMapContent)) !== null) {
    mappedIds.add(match[1]);
}

const missingMappings = [];
recipes.forEach(recipe => {
    if (!mappedIds.has(recipe.image_id)) {
        missingMappings.push({
            name: recipe.recipe_name,
            image_id: recipe.image_id
        });
    }
});

if (missingMappings.length > 0) {
    console.log('Missing mappings in data/index.ts:');
    missingMappings.forEach(m => console.log(`- ${m.name} (${m.image_id})`));
} else {
    console.log('All recipes have image mappings.');
}

// Check if mapped files exist in public/assets/images/
const imageFilesList = fs.readdirSync('./public/assets/images/');
const imageFiles = new Set(imageFilesList);
const missingFiles = [];
const mappedFiles = new Set();
const fileRegex = /: '([^']+)'/g;
while ((match = fileRegex.exec(imageMapContent)) !== null) {
    mappedFiles.add(match[1]);
    if (!imageFiles.has(match[1])) {
        missingFiles.push(match[1]);
    }
}

if (missingFiles.length > 0) {
    console.log('\nMapped files missing in public/assets/images/:');
    [...new Set(missingFiles)].forEach(f => console.log(`- ${f}`));
} else {
    console.log('\nAll mapped image files exist.');
}

const unmappedFiles = imageFilesList.filter(f => !mappedFiles.has(f) && (f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.avif') || f.endsWith('.jpeg')));
if (unmappedFiles.length > 0) {
    console.log('\nUnmapped files in public/assets/images/:');
    unmappedFiles.forEach(f => console.log(`- ${f}`));
} else {
    console.log('\nAll image files are mapped.');
}

// Check Blog Posts
const blogData = fs.readFileSync('./data/blog.ts', 'utf8');
const blogImageMatches = blogData.matchAll(/image: "([^"]+)"/g);
const missingBlogImages = [];
for (const match of blogImageMatches) {
    const imgPath = match[1];
    const fileName = imgPath.replace('/assets/images/', '');
    if (!imageFiles.has(fileName)) {
        missingBlogImages.push(fileName);
    }
}

if (missingBlogImages.length > 0) {
    console.log('\nMissing blog images:');
    missingBlogImages.forEach(f => console.log(`- ${f}`));
} else {
    console.log('\nAll blog images exist.');
}
