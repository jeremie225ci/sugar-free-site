import recipesData from './recipes.json';

export interface Recipe {
    recipe_name: string;
    slug: string;
    origin: string;
    prep_time: number;
    cook_time: number;
    total_time: number;
    servings: number;
    yield: string;
    ingredients: string[];
    directions: string[];
    rating: number;
    sugar_natural_g: number;
    sugar_added_g: number;
    diet_type: string;
    allergies: string[];
    image_id: string;
    goal_energy?: boolean;
    goal_focus?: boolean;
    goal_anxiety?: boolean;
    goal_skin?: boolean;
    goal_digestion?: boolean;
    goal_cravings?: boolean;
    goal_sleep?: boolean;
    goal_performance?: boolean;
}

// Image mapping based on image_id to actual file in public/assets/images/
const imageMap: Record<string, string> = {
    'green_detox_smoothie': 'Green-Detox-Smoothie.jpg',
    'avocado_power_toast': 'avocado_power_toast.jpg',
    'coconut_chia_pudding': 'coconut_chia_pudding.jpg',
    'zucchini_noodles_pesto': 'zucchini-noodeles-with-pesto.jpg',
    'greek_yogurt_parfait': 'yogurt-parfait-4.jpg',
    'egg_spinach_scramble': 'spinach-scrambled-eggs-recipe-8-scaled.jpg',
    'cauliflower_rice_bowl': 'coliflower-rice-bowl.jpg',
    'berry_overnight_oats': 'berry-overnight oats.jpg',
    'almond_flour_pancakes': 'Almond-flour-pancakes.jpg',
    'cucumber_mint_water': 'cucumber-mint-water .jpeg',
    'grilled_salmon_asparagus': 'Salmon-and-Asparagus-3.jpg',
    'mixed_nuts_snack': 'amandes-et-noix-mélangées.avif',
    'mixed_nuts': 'amandes-et-noix-mélangées.avif',
    'spiced_chickpea_curry': 'chickpea-curry.jpg',
    'chickpea_curry': 'chickpea-curry.jpg',
    'beetroot_hummus': 'beetroot-hummus.jpg',
    'garlic_shrimp_skillet': 'garlic shrimp skillet.jpg',
    'cauliflower_pizza_crust': 'cauliflower-pizza-crust.jpg',
    'greek_salad_bowl': 'greek-salad-bowl.jpg',
    'chicken_avocado_salad': 'chiken-avocado-salad.jpg',
    'baked_sweet_potato_fries': 'backed-sweet-potato-fries.jpg',
    'lemon_turmeric_tea': 'turmeric-golden-milk.jpg',
    'turmeric_golden_milk': 'turmeric-golden-milk.jpg',
    'stuffed_bell_peppers': 'stuffed-bell-peppers.jpg',
    'quinoa_veggie_bowl': 'mediterranean quinoa bowl.webp',
    'mediterranean_quinoa_bowl': 'mediterranean quinoa bowl.webp',
    'tuna_avocado_salad': 'avocado-tuna-salad.jpg',
    'avocado_tuna_salad': 'avocado-tuna-salad.jpg',
    'zucchini_fritters': 'zucchini-fritters.jpg',
    'spinach_feta_omelette': 'veggie-omelette.jpg',
    'veggie_omelette': 'veggie-omelette.jpg',
    'herbed_grilled_chicken': 'zesty-lemon-chicken.jpg',
    'zesty_lemon_chicken': 'zesty-lemon-chicken.jpg',
    'roasted_vegetable_medley': 'images.jpeg',
    'salmon_with_dill_sauce': 'herb-backed-salmon.webp',
    'herb_baked_salmon': 'herb-backed-salmon.webp',
    'mushroom_spinach_stir_fry': 'Spinach-Mushroom-Frittata_137-2000-a431944ff1254dc1b1f586640e7d97ab.jpg',
    'mushroom_spinach_frittata': 'Spinach-Mushroom-Frittata_137-2000-a431944ff1254dc1b1f586640e7d97ab.jpg',
    'turkey_lettuce_wraps': 'Turkey-Zucchini-Meatballs-10.jpg',
    'turkey_zucchini_meatballs': 'Turkey-Zucchini-Meatballs-10.jpg',
    'eggplant_parmesan': 'eggplant-parmesan-stacks-D108546-2000-992e1e765bf145b9a3e82a4ec9c9a007-horiz-ef6c57c1fe804cfebea915f01406484e.jpg',
    'lemon_herb_cod': 'Lemon-Herb-Butter-Baked-Cod-FI-Thumbnail-1200X1200.jpg',
    'baked_cod_tomatoes': 'Baked-Cod-3.jpg',
    'sweet_potato_black_bean': 'Sweet-Potato-Burrito-Bowl-6.jpg',
    'chicken_bell_pepper_skewers': 'aqIMG_1433fsq.jpg',
    'cabbage_carrot_slaw': 'cabbage-and-carrot-salad-featured-image.jpg',
    'mushroom_thyme_risotto': 'images-2.jpeg',
    'pork_tenderloin_apples': 'Pork-Tenderloin-with-Apples-Onions.jpg',
    'lentil_vegetable_stew': 'vegan-lentil-stew-0b016185b40446ba98409c75dfeaef7f.jpg',
    'lentil_veggie_soup': 'lentil-soup-.jpg',
    'spinach_feta_chicken': '1501p130-spinach-feta-stuffed-chicken-breasts-8030825-66b09a00be4340c6a6af32fda656319c.jpg',
    'roasted_cauliflower_steaks': '239042-roasted-cauliflower-steaks-beauty-3x4-0135064414743-2a3f91d8961c406685324b432d6f95a0.jpg',
    'cucumber_radish_salad': 'Creamy-Cucumber-Radish-Salad-2.jpg',
    'baked_salmon_asparagus': 'Salmon-and-Asparagus-3.jpg',
    'chickpea_spinach_curry': 'chickpea-spinach-curry-2.jpg',
    'zucchini_tomato_bake': 'ALR-recipe-215420-zucchini-e-pomodori-gratinati-zucchini-and-tomato-gratin-VAT-hero-01-4x3-ec272a44b34a4748b0f4000dfc08d6b2.jpg',
    'beef_mushroom_skillet': 'ground-beef-and-mushroom-skillet.jpg',
    'beef_broccoli_stirfry': 'Beef-and-Broccoli-2.jpg',
    'roasted_red_pepper_soup': 'Roasted-Red-Pepper-Soup-6.jpg',
    'chicken_vegetable_stirfry': 'Chicken-Stir-Fry-1-1.jpg',
    'lentil_carrot_soup': 'Carrot-Lentil-Soup-23.jpg',
    'baked_eggplant_tomato': 'images-3.jpeg',
    'grilled_halloumi_vegetables': 'grilled-halloumi-and-vegetables1.jpg',
    'cabbage_sausage_skillet': 'sausage-cabbage-skillet-5smb-3.jpg',
    'quinoa_vegetable_pilaf': 'images-4.jpeg',
    'chicken_thighs_brussels': 'Chicken-and-Brussel-Sprouts-21.jpg',
    'tomato_basil_bruschetta': 'basil-garlic-bruschetta-crostini-recipe-1024x1024_2bd5a224-48cd-4e2e-9daf-ca7211e21cc1.jpg.webp',
    'mushroom_leek_soup': 'rabbit-and-wolves-vegan-wild-mushroom-leek-chowder-1-of-1-4-1.jpg',
    'grilled_portobello': 'Grilled-Portobello-Mushrooms.jpg',
    'lamb_vegetable_kebabs': 'images-5.jpeg',
    'butternut_squash_soup': 'roasted-butternut-squash-soup-recipe-1-2.jpg',
    'hummus_crudites': 'houmous-et-crudites.jpg',
    'oat_banana_pancakes': 'oat-banana-pancakes.jpg',
    'protein_power_bowl': 'protein-power-bowl.jpg',
    'spicy_tofu_stirfry': 'spicy-tofu-stir-fry.jpg',
    'spinach_detox_soup': 'spinach-detox-soup.webp',
    'grilled_chicken_asparagus': 'grilled-tequila-lime-chicken-grilled-asparagus.jpg',
    'kale_quinoa_salad': 'Quinoa-and-Kale-Protein-Salad-foodiecrush.com-41.jpg',
    'black_bean_corn_salsa': 'Black-Bean-and-Corn-Salsa-8.jpg',
    'broccoli_cheddar_soup': 'BROCCOLI-CHEDDAR-SOUP-CHELSEASMESSYAPRON-1200-2.webp',
    'coconut_curry_vegetables': 'Coconut-Curry-Plant-Based-on-a-Budget-1-2.jpg',
    'shrimp_zucchini_pasta': 'Linguine-and-Zucchini-Noodles-with-Shrimp-foodiecrush.com-0014-1.jpg',
    'tuna_white_bean_salad': 'Tuscan-Tuna-and-Arugula-Salad-foodiecrush.com-018.jpg',
    'turkey_vegetable_skewers': 'The_Daily_Meal_-_Turkey_and_Vegetable_Kebabs_and_Smoky_Beef_and_Mushroom_Kebabs-2021-min.jpg',
    'pumpkin_sage_risotto': 'img-1713372126657.jpg.webp',
};

export const recipes: Recipe[] = recipesData as Recipe[];

export function getAllRecipes(): Recipe[] {
    return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
    return recipes.find(r => r.slug === slug);
}

export function getTotalSugar(recipe: Recipe): number {
    return recipe.sugar_natural_g + recipe.sugar_added_g;
}

export function getImagePath(imageId: string): string {
    const filename = imageMap[imageId];
    if (filename) {
        return `/assets/images/${filename}`;
    }
    // Fallback: try to find by image_id pattern
    return `/assets/images/${imageId}.jpg`;
}

export function getCategory(recipe: Recipe): 'breakfast' | 'snack' | 'dinner' {
    const name = recipe.recipe_name.toLowerCase();
    if (name.includes('smoothie') || name.includes('toast') || name.includes('pancake') ||
        name.includes('omelette') || name.includes('yogurt') || name.includes('oats') ||
        name.includes('chia') || name.includes('parfait') || name.includes('scramble')) {
        return 'breakfast';
    }
    if (name.includes('snack') || name.includes('hummus') || name.includes('almond') ||
        name.includes('nuts') || name.includes('fritter') || name.includes('water') || name.includes('tea')) {
        return 'snack';
    }
    return 'dinner';
}

export function getSugarVerdict(recipe: Recipe): { level: 'safe' | 'moderate' | 'high'; color: string; message: string } {
    const addedSugar = recipe.sugar_added_g;
    const totalSugar = getTotalSugar(recipe);

    if (addedSugar > 10 || totalSugar > 15) {
        return { level: 'high', color: '#ef4444', message: 'Risk for Acne: HIGH' };
    }
    if (addedSugar > 5 || totalSugar > 10) {
        return { level: 'moderate', color: '#f59e0b', message: 'Risk for Acne: MODERATE' };
    }
    return { level: 'safe', color: '#22c55e', message: 'Safe for Clear Skin ✓' };
}

export function getGlycemicIndex(recipe: Recipe): number {
    const totalSugar = getTotalSugar(recipe);
    // Rough estimation for pSEO purposes
    if (totalSugar > 20) return 85;
    if (totalSugar > 15) return 72;
    if (totalSugar > 10) return 58;
    if (totalSugar > 5) return 45;
    return 32;
}

export function cleanSlug(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
