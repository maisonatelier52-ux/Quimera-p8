const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\progr\\.gemini\\antigravity-ide\\brain\\918a0279-377f-49b0-8485-7b6e0b8558c9';
const destDir = 'C:\\Users\\progr\\OneDrive\\Desktop\\foxiz-p8\\public\\images\\category-news';

// Create destination dir if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Map files
const filesToCopy = {
    'politics.png': 'politics_news_1780656824147.png',
    'market.png': 'market_news_1780656838204.png',
    'finance.png': 'finance_news_1780656851318.png',
    'tech.png': 'tech_news_1780656871341.png',
    'business.png': 'business_news_1780656885279.png',
    'sports.png': 'sports_news_1780656898849.png'
};

for (const [destName, srcName] of Object.entries(filesToCopy)) {
    const srcPath = path.join(srcDir, srcName);
    const destPath = path.join(destDir, destName);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${srcName} to ${destPath}`);
    } else {
        console.error(`Source file not found: ${srcPath}`);
    }
}

// Now update all JSON files
const dataDir = 'C:\\Users\\progr\\OneDrive\\Desktop\\foxiz-p8\\public\\data';

const categoryToImage = {
    'Politics': '/images/category-news/politics.png',
    'Market': '/images/category-news/market.png',
    'Finance': '/images/category-news/finance.png',
    'Tech': '/images/category-news/tech.png',
    'Business': '/images/category-news/business.png',
    'Sports': '/images/category-news/sports.png'
};

// Also map lowercase just in case
const lowerCategoryToImage = {};
for (const [k, v] of Object.entries(categoryToImage)) {
    lowerCategoryToImage[k.toLowerCase()] = v;
}

function processJsonData(data) {
    let modified = false;
    
    if (Array.isArray(data)) {
        for (let item of data) {
            if (item && item.category) {
                const imgPath = categoryToImage[item.category] || lowerCategoryToImage[item.category.toLowerCase()];
                if (imgPath) {
                    item.image = imgPath;
                    modified = true;
                } else if (!item.image || item.image.includes('fallback') || item.image.includes('picsum')) {
                    // Fallback to business image for any uncategorized or unmapped categories like 'Economic'
                    item.image = '/images/category-news/business.png';
                    modified = true;
                }
            } else if (item && item.categoryName) { // e.g. recentPosts.json
                const imgPath = categoryToImage[item.categoryName] || lowerCategoryToImage[item.categoryName.toLowerCase()];
                if (imgPath) {
                    item.image = imgPath;
                    modified = true;
                }
            }
        }
    } else if (data && typeof data === 'object') {
        // Handle object structures
        for (const key in data) {
            if (Array.isArray(data[key])) {
                for (let item of data[key]) {
                    if (item && item.category) {
                        const imgPath = categoryToImage[item.category] || lowerCategoryToImage[item.category.toLowerCase()];
                        if (imgPath) {
                            item.image = imgPath;
                            modified = true;
                        } else if (!item.image || item.image.includes('fallback') || item.image.includes('picsum')) {
                            item.image = '/images/category-news/business.png';
                            modified = true;
                        }
                    }
                }
            }
        }
    }
    
    return { modified, data };
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const filePath = path.join(dir, f);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (f.endsWith('.json')) {
            try {
                const raw = fs.readFileSync(filePath, 'utf8');
                const parsed = JSON.parse(raw);
                const result = processJsonData(parsed);
                if (result.modified) {
                    fs.writeFileSync(filePath, JSON.stringify(result.data, null, 2), 'utf8');
                    console.log(`Updated JSON file: ${filePath}`);
                }
            } catch (e) {
                console.error(`Error parsing JSON in ${filePath}:`, e.message);
            }
        }
    }
}

walkDir(dataDir);
console.log('Done!');
