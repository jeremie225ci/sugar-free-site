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
const GRAY = '#8E8E93';

// Image paths mapping (image_id to actual filename)
const imageMap = {
    'green_detox_smoothie': 'green-detox-smoothie.jpg',
    'avocado_power_toast': 'avocado_power_toast.jpg',
    'coconut_chia_pudding': 'coconut-chia-pudding.jpg',
    'zucchini_noodles_pesto': 'zucchini-noodles-pesto.jpg',
    'greek_yogurt_parfait': 'greek-yogurt-parfait.jpg',
    'egg_spinach_scramble': 'egg-spinach-scramble.jpg',
    'cauliflower_rice_bowl': 'cauliflower-rice-bowl.jpg',
    'lentil_veggie_soup': 'Carrot-Lentil-Soup-23.jpg',
    'chicken_avocado_salad': 'chiken-avocado-salad.jpg',
    'almond_flour_pancakes': 'Almond-flour-pancakes.jpg',
    'mediterranean_quinoa_bowl': 'mediterranean-quinoa-bowl.jpg',
    'spicy_tofu_stirfry': 'spicy-tofu-stirfry.jpg',
    'herb_baked_salmon': 'herb-baked-salmon.jpg',
    'chickpea_curry': 'chickpea-curry.jpg',
    'zesty_lemon_chicken': 'zesty-lemon-chicken.jpg',
    'oat_banana_pancakes': 'oat-banana-pancakes.jpg',
    'avocado_tuna_salad': 'avocado-tuna-salad.jpg',
    'veggie_omelette': 'veggie-omelette.jpg',
    'berry_overnight_oats': 'berry-overnight oats.jpg',
    'eggplant_parmesan': 'eggplant-parmesan.jpg',
    'baked_sweet_potato_fries': 'backed-sweet-potato-fries.jpg',
    'turmeric_golden_milk': 'turmeric-golden-milk.jpg',
    'protein_power_bowl': 'protein-power-bowl.jpg',
    'cucumber_mint_water': 'cucumber-mint-water.jpg',
    'zucchini_fritters': 'zucchini-fritters.jpg',
    'stuffed_bell_peppers': 'stuffed-bell-peppers.jpg',
    'garlic_shrimp_skillet': 'garlic-shrimp-skillet.jpg',
    'cauliflower_pizza_crust': 'cauliflower-pizza-crust.jpg',
    'greek_salad_bowl': 'greek-salad-bowl.jpg',
    'spinach_detox_soup': 'spinach-detox-soup.jpg',
    'houmous_crudites': 'beetroot-hummus.jpg',
    'beef_broccoli_stirfry': 'Beef-and-Broccoli-2.jpg',
    'mushroom_spinach_frittata': 'mushroom-spinach-frittata.jpg',
    'black_bean_corn_salsa': 'Black-Bean-and-Corn-Salsa-8.jpg',
    'broccoli_cheddar_soup': 'BROCCOLI-CHEDDAR-SOUP-CHELSEASMESSYAPRON-1200-2.webp',
    'cabbage_carrot_slaw': 'cabbage-and-carrot-salad-featured-image.jpg',
    'beetroot_hummus': 'beetroot-hummus.jpg'
};

const imagesDir = path.join(__dirname, '../public/assets/images');

// Helper to clean text - remove all non-ASCII characters
function cleanText(text) {
    if (!text) return '';
    return text
        .replace(/[\u{1F300}-\u{1FFFF}]/gu, '') // Remove emojis
        .replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII
        .replace(/\s+/g, ' ') // Clean whitespace
        .trim();
}

// Helper to add image
function addRecipeImage(imageId) {
    const filename = imageMap[imageId];
    if (!filename) return false;

    const imagePath = path.join(imagesDir, filename);
    if (fs.existsSync(imagePath)) {
        try {
            doc.image(imagePath, 50, doc.y, { width: 180, height: 120 });
            doc.moveDown(7);
            return true;
        } catch (e) {
            console.log('Could not add image:', imageId, e.message);
            return false;
        }
    }
    return false;
}

// ============ PAGE 1: COVER ============
doc.rect(0, 0, 595.28, 841.89).fill('#000000');

doc.fillColor('#FFFFFF')
    .fontSize(38)
    .font('Helvetica-Bold')
    .text('14-Day No Sugar', 50, 180, { align: 'center' })
    .text('Diet Food List', 50, 230, { align: 'center' });

doc.fillColor(GREEN)
    .fontSize(24)
    .font('Helvetica-Bold')
    .text('50 Sugar-Free Recipes', 50, 310, { align: 'center' });

doc.fillColor('#CCCCCC')
    .fontSize(14)
    .font('Helvetica')
    .text('Your complete guide to eating delicious food', 50, 380, { align: 'center' })
    .text('without added sugar', 50, 400, { align: 'center' });

// App promo box
doc.rect(50, 480, 495, 140).fillAndStroke('#1C1C1E', GREEN);
doc.fillColor('#FFFFFF')
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('Want 100+ More Recipes?', 70, 505);
doc.fillColor('#CCCCCC')
    .fontSize(12)
    .font('Helvetica')
    .text('Download the Sukali app for hundreds of sugar-free recipes,', 70, 540)
    .text('meal plans, and instant sugar scanning for any food.', 70, 557);
doc.fillColor(GREEN)
    .fontSize(14)
    .font('Helvetica-Bold')
    .text('Download FREE:', 70, 590);
doc.fillColor('#FFFFFF')
    .fontSize(12)
    .font('Helvetica')
    .text('apps.apple.com/app/sukali', 185, 591);

doc.fillColor(GRAY)
    .fontSize(10)
    .font('Helvetica')
    .text('2026 Sukali - sugar-frees.com', 50, 780, { align: 'center' });

// ============ PAGE 2: INTRO ============
doc.addPage();
doc.rect(0, 0, 595.28, 841.89).fill('#FFFFFF');

doc.fillColor('#000000')
    .fontSize(26)
    .font('Helvetica-Bold')
    .text('Welcome to Your Sugar-Free Journey', 50, 50);

doc.fillColor('#333333')
    .fontSize(12)
    .font('Helvetica')
    .text('This food list contains 50 delicious sugar-free recipes to help you through your 14-day no sugar diet.', 50, 100, { width: 495 });

doc.moveDown(0.5);
doc.text('Each recipe has been carefully selected to be:', 50);

doc.moveDown(0.5);
doc.text('  - Zero added sugar', 50);
doc.text('  - Naturally low in sugar', 50);
doc.text('  - Easy to prepare', 50);
doc.text('  - Delicious and satisfying', 50);

doc.moveDown(1);
doc.text('The recipes are organized by meal type:', 50);
doc.moveDown(0.5);
doc.text('  - Breakfast (15 recipes)', 50);
doc.text('  - Lunch (15 recipes)', 50);
doc.text('  - Dinner (15 recipes)', 50);
doc.text('  - Snacks (5 recipes)', 50);

doc.moveDown(1);
doc.text('For each recipe, you will find:', 50);
doc.moveDown(0.5);
doc.text('  - Ingredients list', 50);
doc.text('  - Step-by-step directions', 50);
doc.text('  - Preparation and cooking time', 50);
doc.text('  - Servings information', 50);

// App CTA box
doc.rect(50, 450, 495, 150).fillAndStroke('#000000', GREEN);
doc.fillColor(GREEN)
    .fontSize(18)
    .font('Helvetica-Bold')
    .text('GET THE SUKALI APP', 70, 475);
doc.fillColor('#FFFFFF')
    .fontSize(11)
    .font('Helvetica')
    .text('This PDF contains 50 recipes. The Sukali app has 100+ more, plus:', 70, 505);
doc.fillColor('#CCCCCC')
    .fontSize(11)
    .text('  - Scan any food to see its sugar content instantly', 70, 530)
    .text('  - Personalized meal plans based on your goals', 70, 547)
    .text('  - Track your sugar-free progress', 70, 564);

// ============ RECIPE PAGES ============
const selectedRecipes = recipes.slice(0, 50);

// Group recipes
const breakfastKeywords = ['smoothie', 'toast', 'pudding', 'pancake', 'omelette', 'scramble', 'yogurt', 'parfait', 'oat', 'egg', 'overnight', 'frittata'];
const snackKeywords = ['hummus', 'amandes', 'noix', 'water', 'milk', 'beetroot'];
const dinnerKeywords = ['shrimp', 'salmon', 'cod', 'beef', 'steak', 'risotto', 'pizza', 'soup', 'stir-fry', 'skewer', 'curry'];

const categorized = { breakfast: [], lunch: [], dinner: [], snacks: [] };

selectedRecipes.forEach(recipe => {
    const name = recipe.recipe_name.toLowerCase();
    if (breakfastKeywords.some(k => name.includes(k))) {
        if (categorized.breakfast.length < 12) categorized.breakfast.push(recipe);
        else categorized.lunch.push(recipe);
    } else if (snackKeywords.some(k => name.includes(k))) {
        if (categorized.snacks.length < 5) categorized.snacks.push(recipe);
        else categorized.lunch.push(recipe);
    } else if (dinnerKeywords.some(k => name.includes(k))) {
        if (categorized.dinner.length < 13) categorized.dinner.push(recipe);
        else categorized.lunch.push(recipe);
    } else if (categorized.lunch.length < 20) {
        categorized.lunch.push(recipe);
    } else {
        categorized.dinner.push(recipe);
    }
});

// Function to add recipe
function addRecipe(recipe, index, withImage) {
    doc.fillColor(GREEN)
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(index + '. ' + cleanText(recipe.recipe_name), 50);

    doc.fillColor(GRAY)
        .fontSize(9)
        .font('Helvetica')
        .text(cleanText(recipe.origin) + ' | Time: ' + recipe.total_time + ' min | Servings: ' + recipe.servings, 50);

    doc.moveDown(0.3);

    // Add image for some recipes
    if (withImage && recipe.image_id) {
        addRecipeImage(recipe.image_id);
    }

    doc.fillColor('#333333')
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('Ingredients:', 50);

    doc.fillColor('#555555')
        .fontSize(9)
        .font('Helvetica');

    recipe.ingredients.forEach(ing => {
        doc.text('  - ' + cleanText(ing), 50);
    });

    doc.moveDown(0.3);

    doc.fillColor('#333333')
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('Directions:', 50);

    doc.fillColor('#555555')
        .fontSize(9)
        .font('Helvetica');

    recipe.directions.slice(0, 4).forEach((dir, i) => {
        const cleanDir = cleanText(dir);
        doc.text('  ' + (i + 1) + '. ' + cleanDir, 50, undefined, { width: 490 });
    });

    doc.moveDown(0.2);
    doc.fillColor(GREEN)
        .fontSize(9)
        .font('Helvetica')
        .text('Sugar: ' + recipe.sugar_natural_g + 'g natural | ' + recipe.sugar_added_g + 'g added', 50);

    doc.moveDown(0.6);
    doc.strokeColor('#DDDDDD').lineWidth(0.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(0.4);
}

// Add recipes by category
const categories = [
    { name: 'BREAKFAST RECIPES', recipes: categorized.breakfast },
    { name: 'LUNCH RECIPES', recipes: categorized.lunch },
    { name: 'DINNER RECIPES', recipes: categorized.dinner },
    { name: 'SNACK RECIPES', recipes: categorized.snacks }
];

let recipeNumber = 1;

categories.forEach(cat => {
    if (cat.recipes.length === 0) return;

    doc.addPage();
    doc.rect(0, 0, 595.28, 841.89).fill('#FFFFFF');

    doc.fillColor(GREEN)
        .fontSize(22)
        .font('Helvetica-Bold')
        .text(cat.name, 50, 50);

    doc.moveDown(1);

    cat.recipes.forEach((recipe, idx) => {
        if (doc.y > 650) {
            doc.addPage();
            doc.rect(0, 0, 595.28, 841.89).fill('#FFFFFF');
            doc.y = 50;
        }
        // Add image to every 3rd recipe
        addRecipe(recipe, recipeNumber, idx % 3 === 0);
        recipeNumber++;
    });
});

// ============ FINAL PAGE: APP CTA ============
doc.addPage();
doc.rect(0, 0, 595.28, 841.89).fill('#000000');

doc.fillColor('#FFFFFF')
    .fontSize(34)
    .font('Helvetica-Bold')
    .text('Want More Recipes?', 50, 160, { align: 'center' });

doc.fillColor('#CCCCCC')
    .fontSize(18)
    .font('Helvetica')
    .text('This PDF has 50 recipes.', 50, 240, { align: 'center' })
    .text('The Sukali app has 100+ more!', 50, 270, { align: 'center' });

doc.fillColor('#FFFFFF')
    .fontSize(14)
    .font('Helvetica')
    .text('  - Scan any food for hidden sugars', 150, 350)
    .text('  - 100+ sugar-free recipes', 150, 375)
    .text('  - Personalized meal plans', 150, 400)
    .text('  - Track your sugar-free progress', 150, 425)
    .text('  - New recipes added weekly', 150, 450);

doc.rect(100, 510, 395, 110).fillAndStroke(GREEN, GREEN);
doc.fillColor('#000000')
    .fontSize(24)
    .font('Helvetica-Bold')
    .text('Download Sukali FREE', 100, 535, { align: 'center', width: 395 });
doc.fillColor('#000000')
    .fontSize(13)
    .font('Helvetica')
    .text('iOS: apps.apple.com/app/sukali', 100, 575, { align: 'center', width: 395 })
    .text('Android: play.google.com/store/apps/sukali', 100, 595, { align: 'center', width: 395 });

doc.fillColor(GRAY)
    .fontSize(11)
    .font('Helvetica')
    .text('Visit sugar-frees.com to download', 50, 680, { align: 'center' });

doc.fillColor(GRAY)
    .fontSize(10)
    .text('2026 Sukali | sugar-frees.com', 50, 780, { align: 'center' });

doc.end();

console.log('PDF created successfully!');
console.log('Recipes: Breakfast=' + categorized.breakfast.length + ', Lunch=' + categorized.lunch.length + ', Dinner=' + categorized.dinner.length + ', Snacks=' + categorized.snacks.length);
