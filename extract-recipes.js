const fs = require('fs');
const path = require('path');

// Read the Dart file
const dartFile = fs.readFileSync('/Users/jeremie/Downloads/sugarfree/lib/data/sugarfree_recipes_data.dart', 'utf8');

// Extract JSON objects from SugarFreeRecipe.fromJson calls
const recipes = [];
const regex = /SugarFreeRecipe\.fromJson\(\{([^}]+(?:\{[^}]*\}[^}]*)*)\}\)/gs;

let match;
while ((match = regex.exec(dartFile)) !== null) {
  try {
    // Clean up the JSON string
    let jsonStr = '{' + match[1] + '}';
    // Remove trailing commas before closing braces/brackets
    jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
    
    const recipe = JSON.parse(jsonStr);
    
    // Create slug from recipe name
    recipe.slug = recipe.recipe_name
      .toLowerCase()
      .replace(/[&]/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    recipes.push(recipe);
  } catch (e) {
    console.error('Failed to parse recipe:', e.message);
  }
}

console.log(`Extracted ${recipes.length} recipes`);

// Write to JSON file
fs.writeFileSync(
  path.join(__dirname, 'data', 'recipes.json'),
  JSON.stringify(recipes, null, 2)
);

console.log('Written to data/recipes.json');
