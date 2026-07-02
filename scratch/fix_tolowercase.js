const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, regex, replacement) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    if (regex.test(content)) {
        content = content.replace(regex, replacement);
        fs.writeFileSync(filePath, content);
        console.log('Fixed:', filePath);
    }
}

const basePath = 'c:/Users/progr/OneDrive/Desktop/foxiz-p8/app/components';
const cardsPath = path.join(basePath, 'cards');
const homePath = path.join(basePath, 'home');

// 1. CircleHorizontalCard.tsx
replaceInFile(path.join(cardsPath, 'CircleHorizontalCard.tsx'), /category\.toLowerCase\(\)/g, "(category?.slug || category || '')");

// 2. FeaturedVerticalCard.tsx
replaceInFile(path.join(cardsPath, 'FeaturedVerticalCard.tsx'), /category\.toLowerCase\(\)/g, "(category?.slug || category || '')");

// 3. FeatureMainCard.tsx
replaceInFile(path.join(cardsPath, 'FeatureMainCard.tsx'), /article\.subcategory\.toLowerCase\(\)/g, "(article?.subcategory?.slug || article?.subcategory || '')");

// 4. JustIn.tsx
replaceInFile(path.join(homePath, 'JustIn.tsx'), /mainArticle\.category\.toLowerCase\(\)\.replace\(\/\\s\+\/g, '-'\)/g, "(mainArticle?.category?.slug || '')");
replaceInFile(path.join(homePath, 'JustIn.tsx'), /\{mainArticle\.category\}/g, "{mainArticle?.category?.name || mainArticle?.category}");

// 5. LatestVerticalCard.tsx
replaceInFile(path.join(cardsPath, 'LatestVerticalCard.tsx'), /category\.toLowerCase\(\)/g, "(category?.slug || category || '')");

// 6. OverlayCard.tsx
replaceInFile(path.join(cardsPath, 'OverlayCard.tsx'), /category\.toLowerCase\(\)\.replace\(\/\\s\+\/g, '-'\)/g, "(category?.slug || category || '')");

// 7. StandardCard.tsx
replaceInFile(path.join(cardsPath, 'StandardCard.tsx'), /category\.toLowerCase\(\)/g, "(category?.slug || category || '')");

// 8. WhatToRead.tsx
replaceInFile(path.join(homePath, 'WhatToRead.tsx'), /mainArticle\.category\.toLowerCase\(\)/g, "(mainArticle?.category?.slug || '')");
replaceInFile(path.join(homePath, 'WhatToRead.tsx'), /\{mainArticle\.category\}/g, "{mainArticle?.category?.name || mainArticle?.category}");

// 9. Fix name display in cards (category might be object)
['CircleHorizontalCard.tsx', 'FeaturedVerticalCard.tsx', 'LatestVerticalCard.tsx', 'OverlayCard.tsx', 'StandardCard.tsx'].forEach(file => {
    replaceInFile(path.join(cardsPath, file), /\{category\}/g, "{category?.name || category}");
});

console.log('Component fixes applied.');
