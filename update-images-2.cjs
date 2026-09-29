const fs = require('fs');

let fileContent = fs.readFileSync('src/data/blogs.js', 'utf8');

const uniqueImages = [
  '/images/active_man.png',
  '/images/active_woman.png',
  '/images/old_couple_active_1790700399743.jpg',
  '/images/old_man_active_1790642029931.jpg',
  '/images/old_man_cycling_1790700433294.jpg',
  '/images/old_man_jogging_1790700271743.jpg',
  '/images/old_man_stretching_1790700305693.jpg',
  '/images/old_woman_active_1790642019147.jpg',
  '/images/old_woman_gardening_1790700421950.jpg',
  '/images/old_woman_walking_1790700294046.jpg',
  '/images/old_woman_yoga_1790700261128.jpg',
  '/images/young_mother_1790642042734.jpg',
  '/images/young_mother_baby_1790700282766.jpg',
  '/images/young_mother_toddler_1790700410198.jpg',
  '/images/young_parents_baby_1790700444108.jpg',
  '/images/Dr-Dianna.png',
  '/images/Maria L Valenzuela.png'
];

const gazelleImage = '/images/pelvic imageavif.jpg';
let imageIndex = 0;

fileContent = fileContent.replace(/image:\s*['"][^'"]+['"]/g, (match, offset, string) => {
    // Determine context around the match to decide if it should be gazelle or human
    // By default, just assign cyclically from uniqueImages unless we know it's a gazelle blog
    
    // We already know blogs 7, 9, 17 are Gazelle. We can do it by counting
    // However, it's easier to just do it sequentially.
    // In our last mapping: 
    // 0: old_woman, 1: old_man, 2: young_mother, 3: old_man, 4: old_woman, 5: young_mother, 6: gazelle (7th blog), 7: young_mother, 8: gazelle (9th blog), 9: old_woman, 10: old_man, 11: old_woman, 12: old_man, 13: young_mother, 14: old_man, 15: old_woman, 16: gazelle (17th blog), 17: young_mother, 18: old_man, 19: old_woman
    
    // Let's just use a counter for all 20 occurrences.
    if (imageIndex === 6 || imageIndex === 8 || imageIndex === 16) {
        imageIndex++;
        return `image: "${gazelleImage}"`;
    }
    
    const assignedImage = uniqueImages[(imageIndex % uniqueImages.length)];
    imageIndex++;
    return `image: "${assignedImage}"`;
});

fs.writeFileSync('src/data/blogs.js', fileContent);
console.log("Updated blogs.js with unique images.");
