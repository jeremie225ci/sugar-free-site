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

// Helper function for text
function addSection(title, yPos) {
    doc.fillColor(GREEN).fontSize(18).font('Helvetica-Bold').text(title, 50, yPos);
    return doc.y + 10;
}

// ============ PAGE 1: COVER ============
doc.rect(0, 0, 595.28, 841.89).fill('#000000');

// Title
doc.fillColor('#FFFFFF')
    .fontSize(36)
    .font('Helvetica-Bold')
    .text('14-Day No Sugar', 50, 250, { align: 'center' })
    .text('Diet Food List', 50, 300, { align: 'center' });

// Subtitle
doc.fillColor(GREEN)
    .fontSize(20)
    .font('Helvetica')
    .text('50 Sugar-Free Recipes', 50, 370, { align: 'center' });

// Description
doc.fillColor('#CCCCCC')
    .fontSize(14)
    .font('Helvetica')
    .text('Your complete guide to eating delicious food', 50, 420, { align: 'center' })
    .text('without added sugar', 50, 440, { align: 'center' });

// App promo box
doc.rect(50, 550, 495, 100).fillAndStroke('#1C1C1E', GREEN);
doc.fillColor('#FFFFFF')
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('🚀 Want 100+ More Recipes?', 70, 570);
doc.fillColor('#CCCCCC')
    .fontSize(12)
    .font('Helvetica')
    .text('Download the Sukali app for hundreds of sugar-free recipes,', 70, 595)
    .text('meal plans, and instant sugar scanning for any food.', 70, 612);
doc.fillColor(GREEN)
    .fontSize(12)
    .font('Helvetica-Bold')
    .text('Download: apps.apple.com/app/sukali', 70, 635);

// Footer
doc.fillColor(GRAY)
    .fontSize(10)
    .font('Helvetica')
    .text('© 2026 Sukali - sugar-frees.com', 50, 780, { align: 'center' });

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
    .text(`
This food list contains 50 delicious sugar-free recipes to help you through your 14-day no sugar diet. Each recipe has been carefully selected to be:

✓ Zero added sugar
✓ Naturally low in sugar
✓ Easy to prepare
✓ Delicious and satisfying

The recipes are organized by meal type:
• Breakfast (15 recipes)
• Lunch (15 recipes)  
• Dinner (15 recipes)
• Snacks (5 recipes)

For each recipe, you'll find:
• Ingredients list
• Step-by-step directions
• Preparation and cooking time
• Servings information
`, 50, 100, { width: 495 });

// App CTA box
doc.rect(50, 400, 495, 120).fillAndStroke('#000000', GREEN);
doc.fillColor(GREEN)
    .fontSize(18)
    .font('Helvetica-Bold')
    .text('📱 Get the Sukali App', 70, 420);
doc.fillColor('#FFFFFF')
    .fontSize(11)
    .font('Helvetica')
    .text('This PDF contains 50 recipes. The Sukali app has 100+ more, plus:', 70, 450);
doc.fillColor('#CCCCCC')
    .fontSize(11)
    .text('• Scan any food to see its sugar content instantly', 70, 470)
    .text('• Personalized meal plans based on your goals', 70, 485)
    .text('• Progress tracking for your sugar-free journey', 70, 500);

// ============ RECIPE PAGES ============
// Get first 50 recipes
const selectedRecipes = recipes.slice(0, 50);

// Group by meal type
const breakfastKeywords = ['smoothie', 'toast', 'pudding', 'pancake', 'omelette', 'scramble', 'yogurt', 'parfait', 'oat', 'egg'];
const snackKeywords = ['bar', 'bites', 'hummus', 'dip', 'balls'];

const categorized = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
};

selectedRecipes.forEach(recipe => {
    const name = recipe.recipe_name.toLowerCase();
    if (breakfastKeywords.some(k => name.includes(k))) {
        categorized.breakfast.push(recipe);
    } else if (snackKeywords.some(k => name.includes(k))) {
        categorized.snacks.push(recipe);
    } else if (categorized.lunch.length < 15) {
        categorized.lunch.push(recipe);
    } else {
        categorized.dinner.push(recipe);
    }
});

// Function to add recipe
function addRecipe(recipe, index) {
    const startY = doc.y;

    // Recipe number and name
    doc.fillColor(GREEN)
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(`${index}. ${recipe.recipe_name}`, 50);

    // Origin and time
    doc.fillColor(GRAY)
        .fontSize(9)
        .font('Helvetica')
        .text(`${recipe.origin} | ⏱ ${recipe.total_time} min | 🍽 ${recipe.servings} serving(s)`, 50);

    doc.moveDown(0.3);

    // Ingredients
    doc.fillColor('#333333')
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('Ingredients:', 50);

    doc.fillColor('#555555')
        .fontSize(9)
        .font('Helvetica');

    recipe.ingredients.forEach(ing => {
        doc.text(`• ${ing}`, 60);
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
        const cleanDir = dir.replace(/[0-9]️⃣ /g, '');
        doc.text(`${i + 1}. ${cleanDir}`, 60, undefined, { width: 480 });
    });

    // Sugar info
    doc.moveDown(0.2);
    doc.fillColor(GREEN)
        .fontSize(9)
        .font('Helvetica')
        .text(`Sugar: ${recipe.sugar_natural_g}g natural | ${recipe.sugar_added_g}g added`, 50);

    doc.moveDown(0.8);

    // Add separator
    doc.strokeColor('#EEEEEE').lineWidth(0.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(0.5);
}

// Add recipes by category
const categories = [
    { name: '🌅 BREAKFAST RECIPES', recipes: categorized.breakfast },
    { name: '☀️ LUNCH RECIPES', recipes: categorized.lunch },
    { name: '🌙 DINNER RECIPES', recipes: categorized.dinner },
    { name: '🍎 SNACK RECIPES', recipes: categorized.snacks }
];

let recipeNumber = 1;

categories.forEach(cat => {
    if (cat.recipes.length === 0) return;

    doc.addPage();
    doc.rect(0, 0, 595.28, 841.89).fill('#FFFFFF');

    // Category header
    doc.fillColor('#000000')
        .fontSize(24)
        .font('Helvetica-Bold')
        .text(cat.name, 50, 50);

    doc.moveDown(1);

    cat.recipes.forEach(recipe => {
        // Check if we need a new page
        if (doc.y > 700) {
            doc.addPage();
            doc.rect(0, 0, 595.28, 841.89).fill('#FFFFFF');
            doc.y = 50;
        }
        addRecipe(recipe, recipeNumber);
        recipeNumber++;
    });
});

// ============ FINAL PAGE: APP CTA ============
doc.addPage();
doc.rect(0, 0, 595.28, 841.89).fill('#000000');

doc.fillColor('#FFFFFF')
    .fontSize(32)
    .font('Helvetica-Bold')
    .text('Want More Recipes?', 50, 200, { align: 'center' });

doc.fillColor('#CCCCCC')
    .fontSize(16)
    .font('Helvetica')
    .text('This PDF has 50 recipes.', 50, 280, { align: 'center' })
    .text('The Sukali app has 100+ more!', 50, 305, { align: 'center' });

// Features
doc.fillColor('#FFFFFF')
    .fontSize(14)
    .font('Helvetica')
    .text('✓ Scan any food for hidden sugars', 150, 380)
    .text('✓ 100+ sugar-free recipes', 150, 405)
    .text('✓ Personalized meal plans', 150, 430)
    .text('✓ Track your sugar-free progress', 150, 455)
    .text('✓ New recipes added weekly', 150, 480);

// Download box
doc.rect(100, 530, 395, 80).fillAndStroke(GREEN, GREEN);
doc.fillColor('#000000')
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('Download Sukali Free', 100, 555, { align: 'center', width: 395 });
doc.fillColor('#000000')
    .fontSize(12)
    .font('Helvetica')
    .text('iOS: apps.apple.com/app/sukali', 100, 585, { align: 'center', width: 395 });

// QR code placeholder text
doc.fillColor(GRAY)
    .fontSize(10)
    .font('Helvetica')
    .text('Visit sugar-frees.com to download', 50, 650, { align: 'center' });

// Footer
doc.fillColor(GRAY)
    .fontSize(10)
    .font('Helvetica')
    .text('© 2026 Sukali | sugar-frees.com', 50, 780, { align: 'center' });

// Finalize
doc.end();

console.log('✅ PDF created successfully at:', outputPath);
