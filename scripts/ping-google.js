/**
 * Google Indexing API Script
 * 
 * This script uses the Google Indexing API to request rapid indexing
 * of all recipe pages in the sitemap.
 * 
 * Prerequisites:
 * 1. Enable the Indexing API in Google Cloud Console
 * 2. Create a service account and download the JSON key
 * 3. Add the service account email as an owner in Google Search Console
 * 4. Place the service account JSON file in the project root
 * 
 * Usage:
 *   node scripts/ping-google.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://sukali.app';
const SERVICE_ACCOUNT_FILE = path.join(__dirname, '..', 'service-account.json');
const RECIPES_FILE = path.join(__dirname, '..', 'data', 'recipes.json');

// Rate limiting: Google allows 200 requests per day
const RATE_LIMIT_DELAY_MS = 500;

async function getAuthClient() {
    try {
        const keyFile = fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf8');
        const key = JSON.parse(keyFile);

        const auth = new google.auth.GoogleAuth({
            credentials: key,
            scopes: ['https://www.googleapis.com/auth/indexing'],
        });

        return auth.getClient();
    } catch (error) {
        console.error('❌ Failed to load service account:', error.message);
        console.log('\n📝 Setup instructions:');
        console.log('1. Go to Google Cloud Console > APIs & Services > Enable APIs');
        console.log('2. Enable "Web Search Indexing API"');
        console.log('3. Create a service account and download the JSON key');
        console.log('4. Save the key as "service-account.json" in the project root');
        console.log('5. Add the service account email as an "Owner" in Google Search Console');
        process.exit(1);
    }
}

async function indexUrl(authClient, url, type = 'URL_UPDATED') {
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    try {
        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: type, // 'URL_UPDATED' or 'URL_DELETED'
            },
        });

        return { success: true, url, data: response.data };
    } catch (error) {
        return { success: false, url, error: error.message };
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    console.log('🚀 Google Indexing API - Sukali Recipe Pages\n');

    // Get auth client
    const authClient = await getAuthClient();
    console.log('✅ Authenticated with Google\n');

    // Load recipes
    const recipes = JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf8'));

    // Build list of URLs to index
    const urls = [
        BASE_URL,
        `${BASE_URL}/food`,
        ...recipes.map(r => `${BASE_URL}/food/${r.slug}`)
    ];

    console.log(`📋 Found ${urls.length} URLs to index:\n`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const progress = `[${i + 1}/${urls.length}]`;

        process.stdout.write(`${progress} Indexing: ${url}...`);

        const result = await indexUrl(authClient, url);

        if (result.success) {
            console.log(' ✅');
            successCount++;
        } else {
            console.log(` ❌ ${result.error}`);
            failCount++;
        }

        // Rate limiting
        if (i < urls.length - 1) {
            await sleep(RATE_LIMIT_DELAY_MS);
        }
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📄 Total: ${urls.length}`);

    if (successCount > 0) {
        console.log('\n🎉 Google should index these pages within 24-48 hours!');
    }
}

main().catch(console.error);
