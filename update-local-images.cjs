const fs = require('fs');

const blogsFilePath = 'src/data/blogs.js';
let content = fs.readFileSync(blogsFilePath, 'utf8');
const { blogs } = require('./src/data/blogs.js');

const localImages = [
  '/images/old_woman_yoga_1790700261128.jpg',
  '/images/pregnant_woman_yoga_1790700689179.jpg',
  '/images/young_mother_baby_1790700282766.jpg',
  '/images/old_man_stretching_1790700305693.jpg',
  '/images/old_woman_walking_1790700294046.jpg',
  '/images/senior_swimming_1790700678781.jpg',
  '/images/young_parents_baby_1790700444108.jpg',
  '/images/old_couple_active_1790700399743.jpg',
  '/images/old_woman_gardening_1790700421950.jpg',
  '/images/old_man_cycling_1790700433294.jpg',
  '/images/young_mother_toddler_1790700410198.jpg'
];

let updatedContent = content;

// Blogs 10th to 20th (index 9 to 19)
for (let i = 9; i < 20; i++) {
    if (blogs[i]) {
        const blogTitle = blogs[i].title;
        const newImage = localImages[i - 9];
        
        const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(title:\\s*"${escapeRegex(blogTitle)}"[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
        updatedContent = updatedContent.replace(regex, `$1${newImage}$2`);
    }
}

fs.writeFileSync(blogsFilePath, updatedContent);
console.log('Successfully updated blogs.js with perfect local custom images!');
