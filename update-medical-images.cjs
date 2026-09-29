const fs = require('fs');

const blogsFilePath = 'src/data/blogs.js';
let content = fs.readFileSync(blogsFilePath, 'utf8');
const { blogs } = require('./src/data/blogs.js');

const unsplashIds = [
  '1579684385127-1ef15d508118', // doctor clinical
  '1581056771107-24ca5f033842', // healthcare professional
  '1519494026892-80bbd2d6fd0d', // clinical infrastructure
  '1532938911079-1b06ac7ceec7', // doctor medical
  '1584515933487-779824d29309', // medical setting
  '1516549655169-df83a0774514', // hospital
  '1517836357463-d25dfeac3438', // health wellness gentle
  '1544367567-0f2fcb009e0b',    // yoga peaceful
  '1571019614242-c5c5dee9f50b', // stretching peaceful
  '1506126613408-eca07ce68773', // yoga outside peaceful
  '1594381898411-846e7d193883'  // meditation peaceful
];

let updatedContent = content;

// Blogs 10th to 20th (index 9 to 19)
for (let i = 9; i < 20; i++) {
    if (blogs[i]) {
        const blogTitle = blogs[i].title;
        const newImage = `https://images.unsplash.com/photo-${unsplashIds[i - 9]}?auto=format&fit=crop&q=80&w=800`;
        
        const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(title:\\s*"${escapeRegex(blogTitle)}"[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
        updatedContent = updatedContent.replace(regex, `$1${newImage}$2`);
    }
}

fs.writeFileSync(blogsFilePath, updatedContent);
console.log('Successfully updated blogs.js with purely medical/clinic/yoga Unsplash images!');
