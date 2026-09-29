const fs = require('fs');

const blogsFilePath = 'src/data/blogs.js';
let content = fs.readFileSync(blogsFilePath, 'utf8');
const { blogs } = require('./src/data/blogs.js');

const unsplashIds = [
  '1544367567-0f2fcb009e0b',
  '1517836357463-d25dfeac3438',
  '1583454110551-21f2fa2afe61',
  '1506126613408-eca07ce68773',
  '1574680096145-d05b474e2155',
  '1571019614242-c5c5dee9f50b',
  '1594381898411-846e7d193883',
  '1444731961956-751ed90465a5',
  '1579684385127-1ef15d508118',
  '1581056771107-24ca5f033842',
  '1519494026892-80bbd2d6fd0d'
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
console.log('Successfully updated blogs.js with specific relevant Unsplash images!');
