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
  '/images/Maria L Valenzuela.png',
  '/images/senior_swimming_1790700678781.jpg',
  '/images/pregnant_woman_yoga_1790700689179.jpg',
  '/images/pelvic_imageavif.jpg'
];

let imageIndex = 0;

fileContent = fileContent.replace(/image:\s*['"][^'"]+['"]/g, (match) => {
    const assignedImage = uniqueImages[imageIndex % uniqueImages.length];
    imageIndex++;
    return `image: "${assignedImage}"`;
});

fs.writeFileSync('src/data/blogs.js', fileContent);
console.log("Updated blogs.js with 20 completely unique images.");
