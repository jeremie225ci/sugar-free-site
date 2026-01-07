const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

// Load recipes
const recipes = require(path.join(__dirname, '../data/recipes.json'));

// Create PDF
const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 }
});

// Output file
const outputPath = path.join(__dirname, '../public/downloads/14-day-no-sugar-diet-food-list.pdf');

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Pipe to file
doc.pipe(fs.createWriteStream(outputPath));

// Colors
const GREEN = '#22c55e';
const DARK = '#1C1C1E';
const GRAY = '#8E8E93';

// Image path
const imagesDir = path.join(__dirname, '../public/assets/images/recipes');

// Helper to add image if exists
function addRecipeImage(imageId, x, y, width) {
    const possibleExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    for (const ext of possibleExtensions) {
        const imagePath = path.join(imagesDir, imageId + ext);
        if (fs.existsSync(imagePath)) {
            try {
                doc.image(imagePath, x, y, { width: width, height: width * 0.6 });
                return true;
            } catch (e) {
                console.log('Could not add image:', imageId);
                return false;
            }
        }
    }
    return false;
}

// ============ PAGE 1: COVER ============
doc.rect(0, 0, 595.28, 841.89).fill('#000000');

// Title
doc.fillColor('#FFFFFF')
    .fontSize(36)
    .font('Helvetica-Bold')
    .text('14-Day No Sugar', 50, 200, { align: 'center' })
    .text('Diet Food List', 50, 250, { align: 'center' });

// Subtitle
doc.fillColor(GREEN)
    .fontSize(22)
    .font('Helvetica-Bold')
    .text('50 Sugar-Free Recipes', 50, 330, { align: 'center' });

// Description
doc.fillColor('#CCCCCC')
    .fontSize(14)
    .font('Helvetica')
    .text('Your complete guide to eating delicious food', 50, 390, { align: 'center' })
    .text('without added sugar', 50, 410, { align: 'center' });

// App promo box
doc.rect(50, 500, 495, 120).fillAndStroke('#1C1C1E', GREEN);
doc.fillColor('#FFFFFF')
    .fontSize(18)
    .font('Helvetica-Bold')
    .text('Want 100+ More Recipes?', 70, 520);
doc.fillColor('#CCCCCC')
    .fontSize(12)
    .font('Helvetica')
    .text('Download the Sukali app for hundreds of sugar-free recipes,', 70, 550)
    .text('meal plans, and instant sugar scanning for any food.', 70, 567);
doc.fillColor(GREEN)
    .fontSize(14)
    .font('Helvetica-Bold')
    .text('Download FREE: apps.apple.com/app/sukali', 70, 595);

// Footer
doc.fillColor(GRAY)
    .fontSize(10)
    .font('Helvetica')
    .text('2026 Sukali - sugar-frees.com', 50, 780, { align: 'center' });

// ============ PAGE 2: INTRO ============
doc.addPage();
doc.rect(0, 0, 595.28, 841.89).fill('#FFFFFF');

doc.fillColor('#000000')
    .fontSize(28)
    .font('Helvetica-Bold')
    .text('Welcome to Your Sugar-Free Journey', 50, 50);

doc.fillColor('#333333')
    .fontSize(12)
    .font('Helvetica')
    .text('This food list contains 50 delicious sugar-free recipes to help you through', 50, 100)
    .text('your 14-day no sugar diet. Each recipe has been carefully selected to be:', 50, 117);

doc.fillColor('#333333')
    .fontSize(12)
    .font('Helvetica')
    .text('* Zero added sugar', 70, 150)
    .text('* Naturally low in sugar', 70, 167)
    .text('* Easy to prepare', 70, 184)
    .text('* Delicious and satisfying', 70, 201);

doc.fillColor('#333333')
    .fontSize(12)
    .text('The recipes are organized by meal type:', 50, 240);

doc.text('- Breakfast (15 recipes)', 70, 260)
    .text('- Lunch (15 recipes)', 70, 277)
    .text('- Dinner (15 recipes)', 70, 294)
    .text('- Snacks (5 recipes)', 70, 311);

doc.fillColor('#333333')
    .fontSize(12)
    .text('For each recipe, you will find:', 50, 350);

doc.text('- Ingredients list', 70, 370)
    .text('- Step-by-step directions', 70, 387)
    .text('- Preparation and cooking time', 70, 404)
    .text('- Servings information', 70, 421);

// App CTA box
doc.rect(50, 480, 495, 140).fillAndStroke('#000000', GREEN);
doc.fillColor(GREEN)
    .fontSize(18)
    .font('Helvetica-Bold')
    .text('GET THE SUKALI APP', 70, 500);
doc.fillColor('#FFFFFF')
    .fontSize(11)
    .font('Helvetica')
    .text('This PDF contains 50 recipes. The Sukali app has 100+ more, plus:', 70, 530);
doc.fillColor('#CCCCCC')
    .fontSize(11)
    .text('- Scan any food to see its sugar content instantly', 70, 555)
    .text('- Personalized meal plans based on your goals', 70, 572)
    .text('- Track your sugar-free progress', 70, 589);

// ============ RECIPE PAGES ============
// Get first 50 recipes
const selectedRecipes = recipes.slice(0, 50);

// Group by meal type
const breakfastKeywords = ['smoothie', 'toast', 'pudding', 'pancake', 'omelette', 'scramble', 'yogurt', 'parfait', 'oat', 'egg', 'overnight', 'frittata'];
const snackKeywords = ['bar', 'bites', 'hummus', 'dip', 'balls', 'amandes', 'noix', 'water', 'milk'];
const dinnerKeywords = ['shrimp', 'salmon', 'cod', 'beef', 'steak', 'risotto', 'curry', 'pizza', 'soup', 'stir-fry', 'skewer'];

const categorized = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
};

selectedRecipes.forEach(recipe => {
    const name = recipe.recipe_name.toLowerCase();
    if (breakfastKeywords.some(k => name.includes(k))) {
        if (categorized.breakfast.length < 15) categorized.breakfast.push(recipe);
        else categorized.lunch.push(recipe);
    } else if (snackKeywords.some(k => name.includes(k))) {
        if (categorized.snacks.length < 5) categorized.snacks.push(recipe);
        else categorized.lunch.push(recipe);
    } else if (dinnerKeywords.some(k => name.includes(k))) {
        if (categorized.dinner.length < 15) categorized.dinner.push(recipe);
        else categorized.lunch.push(recipe);
    } else if (categorized.lunch.length < 15) {
        categorized.lunch.push(recipe);
    } else if (categorized.dinner.length < 15) {
        categorized.dinner.push(recipe);
    } else {
        categorized.breakfast.push(recipe);
    }
});

// Function to add recipe
function addRecipe(recipe, index, showImage) {
    // Recipe number and name
    doc.fillColor(GREEN)
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(index + '. ' + recipe.recipe_name, 50);

    // Origin and time
    doc.fillColor(GRAY)
        .fontSize(9)
        .font('Helvetica')
        .text(recipe.origin + ' | Time: ' + recipe.total_time + ' min | Servings: ' + recipe.servings, 50);

    doc.moveDown(0.3);

    // Try to add image
    if (showImage && recipe.image_id) {
        const imageAdded = addRecipeImage(recipe.image_id, 50, doc.y, 200);
        if (imageAdded) {
            doc.moveDown(8);
        }
    }

    // Ingredients
    doc.fillColor('#333333')
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('Ingredients:', 50);

    doc.fillColor('#555555')
        .fontSize(9)
        .font('Helvetica');

    recipe.ingredients.forEach(ing => {
        doc.text('- ' + ing, 60);
    });

    doc.moveDown(0.3);

    // Directions (abbreviated)
    doc.fillColor('#333333')
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('Directions:', 50);

    doc.fillColor('#555555')
        .fontSize(9)
        .font('Helvetica');

    recipe.directions.slice(0, 4).forEach((dir, i) => {
        // Clean emojis from directions
        const cleanDir = dir.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[0-9]\uFE0F?\u20E3|[\u{1F1E0}-\u{1F1FF}]/gu, '').replace(/^\s*/, '');
        doc.text((i + 1) + '. ' + cleanDir, 60, undefined, { width: 480 });
    });

    // Sugar info
    doc.moveDown(0.2);
    doc.fillColor(GREEN)
        .fontSize(9)
        .font('Helvetica')
        .text('Sugar: ' + recipe.sugar_natural_g + 'g natural | ' + recipe.sugar_added_g + 'g added', 50);

    doc.moveDown(0.8);

    // Add separator
    doc.strokeColor('#EEEEEE').lineWidth(0.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(0.5);
}

// Add recipes by category
const categories = [
    { name: 'BREAKFAST RECIPES', recipes: categorized.breakfast },
    { name: 'LUNCH RECIPES', recipes: categorized.lunch },
    { name: 'DINNER RECIPES', recipes: categorized.dinner },
    { name: 'SNACK RECIPES', recipes: categorized.snacks }
];

let recipeNumber = 1;

categories.forEach((cat, catIndex) => {
    if (cat.recipes.length === 0) return;

    doc.addPage();
    doc.rect(0, 0, 595.28, 841.89).fill('#FFFFFF');

    // Category header
    doc.fillColor(GREEN)
        .fontSize(24)
        .font('Helvetica-Bold')
        .text(cat.name, 50, 50);

    doc.moveDown(1);

    cat.recipes.forEach((recipe, idx) => {
        // Check if we need a new page
        if (doc.y > 680) {
            doc.addPage();
            doc.rect(0, 0, 595.28, 841.89).fill('#FFFFFF');
            doc.y = 50;
        }
        // Show image only for first recipe of each category
        addRecipe(recipe, recipeNumber, idx === 0);
        recipeNumber++;
    });
});

// ============ FINAL PAGE: APP CTA ============
doc.addPage();
doc.rect(0, 0, 595.28, 841.89).fill('#000000');

doc.fillColor('#FFFFFF')
    .fontSize(32)
    .font('Helvetica-Bold')
    .text('Want More Recipes?', 50, 180, { align: 'center' });

doc.fillColor('#CCCCCC')
    .fontSize(18)
    .font('Helvetica')
    .text('This PDF has 50 recipes.', 50, 260, { align: 'center' })
    .text('The Sukali app has 100+ more!', 50, 290, { align: 'center' });

// Features
doc.fillColor('#FFFFFF')
    .fontSize(14)
    .font('Helvetica')
    .text('* Scan any food for hidden sugars', 150, 370)
    .text('* 100+ sugar-free recipes', 150, 395)
    .text('* Personalized meal plans', 150, 420)
    .text('* Track your sugar-free progress', 150, 445)
    .text('* New recipes added weekly', 150, 470);

// Download box
doc.rect(100, 530, 395, 100).fillAndStroke(GREEN, GREEN);
doc.fillColor('#000000')
    .fontSize(22)
    .font('Helvetica-Bold')
    .text('Download Sukali FREE', 100, 555, { align: 'center', width: 395 });
doc.fillColor('#000000')
    .fontSize(14)
    .font('Helvetica')
    .text('iOS: apps.apple.com/app/sukali', 100, 590, { align: 'center', width: 395 })
    .text('Android: play.google.com/store/apps/sukali', 100, 610, { align: 'center', width: 395 });

// Footer
doc.fillColor(GRAY)
    .fontSize(11)
    .font('Helvetica')
    .text('Visit sugar-frees.com to download', 50, 680, { align: 'center' });

doc.fillColor(GRAY)
    .fontSize(10)
    .font('Helvetica')
    .text('2026 Sukali | sugar-frees.com', 50, 780, { align: 'center' });

// Finalize
doc.end();

console.log('PDF created successfully at:', outputPath);
console.log('Recipes included:');
console.log('- Breakfast:', categorized.breakfast.length);
console.log('- Lunch:', categorized.lunch.length);
console.log('- Dinner:', categorized.dinner.length);
console.log('- Snacks:', categorized.snacks.length);
