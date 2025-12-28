const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// To use this script:
// 1. Go to Google Cloud Console
// 2. Create a Service Account and download the JSON key
// 3. Rename it to 'google-services.json' and place it in the project root
// 4. Add the service account email to your Search Console as an Owner

const KEY_FILE = path.join(__dirname, '../google-services.json');
const RECIPES_FILE = path.join(__dirname, '../data/recipes.json');
const BLOG_FILE = path.join(__dirname, '../data/blog.ts');

async function indexUrls() {
    if (!fs.existsSync(KEY_FILE)) {
        console.error('Error: google-services.json not found in root directory.');
        console.log('Follow steps in comments to generate one.');
        process.exit(1);
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({
        version: 'v3',
        auth,
    });

    const baseUrl = 'https://sukali.app';
    const urls = [
        `${baseUrl}/`,
        `${baseUrl}/blog`,
        `${baseUrl}/food`,
    ];

    // 1. Add Food URLs from recipes.json
    if (fs.existsSync(RECIPES_FILE)) {
        console.log('Parsing recipes database...');
        try {
            const recipes = JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf8'));
            recipes.forEach(recipe => {
                if (recipe.slug) urls.push(`${baseUrl}/food/${recipe.slug}`);
            });
        } catch (e) {
            console.error('Error parsing recipes.json:', e.message);
        }
    }

    // 2. Add Blog URLs from blog.ts (Simple Regex Parse)
    if (fs.existsSync(BLOG_FILE)) {
        console.log('Parsing blog articles...');
        try {
            const blogContent = fs.readFileSync(BLOG_FILE, 'utf8');
            const slugMatches = blogContent.matchAll(/slug:\s*["']([^"']+)["']/g);
            for (const match of slugMatches) {
                urls.push(`${baseUrl}/blog/${match[1]}`);
            }
        } catch (e) {
            console.error('Error parsing blog.ts:', e.message);
        }
    }

    const uniqueUrls = [...new Set(urls)];
    console.log(`🚀 Starting bulk indexing for ${uniqueUrls.length} URLs...`);

    for (const url of uniqueUrls) {
        try {
            const res = await indexing.urlNotifications.publish({
                requestBody: {
                    url: url,
                    type: 'URL_UPDATED',
                },
            });
            console.log(`✅ Indexed: ${url} -> Status: ${res.status}`);
        } catch (err) {
            console.error(`❌ Failed to index: ${url}`, err.response?.data?.error?.message || err.message);
        }
    }
    console.log('🏁 Indexing process completed.');
}

indexUrls();
