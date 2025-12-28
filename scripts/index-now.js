const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// To use this script:
// 1. Go to Google Cloud Console
// 2. Create a Service Account and download the JSON key
// 3. Rename it to 'google-services.json' and place it in the project root
// 4. Add the service account email to your Search Console as an Owner

const KEY_FILE = path.join(__dirname, '../google-services.json');

async function indexUrls() {
    if (!fs.existsSync(KEY_FILE)) {
        console.error('Error: google-services.json not found in root directory.');
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

    // Example: Getting URLs from your sitemap logic
    // For Sukali, we want to notify Google about all food pages
    const baseUrl = 'https://sukali.app';

    // You would ideally fetch slugs from your data file here
    // For now, this is a template script.
    const urls = [
        `${baseUrl}/`,
        `${baseUrl}/blog`,
        `${baseUrl}/food`,
        // Add dynamic URLs here
    ];

    for (const url of urls) {
        try {
            const res = await indexing.urlNotifications.publish({
                requestBody: {
                    url: url,
                    type: 'URL_UPDATED',
                },
            });
            console.log(`Indexed: ${url} -> Status: ${res.status}`);
        } catch (err) {
            console.error(`Failed to index: ${url}`, err.message);
        }
    }
}

indexUrls();
