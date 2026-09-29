const fs = require('fs');

const blogsFilePath = 'src/data/blogs.js';
let content = fs.readFileSync(blogsFilePath, 'utf8');
const { blogs } = require('./src/data/blogs.js');

let updatedContent = content;

// Blogs 10th to 20th (index 9 to 19)
for (let i = 9; i < 20; i++) {
    if (blogs[i]) {
        const blogTitle = blogs[i].title;
        // Using picsum seeds with health/lifestyle keywords so they look like different unique stock images
        const keywords = ['wellness', 'health', 'fitness', 'yoga', 'lifestyle', 'meditation', 'active', 'stretch', 'nature', 'care', 'balance'];
        const newImage = `https://picsum.photos/seed/${keywords[i - 9]}/800/600`;
        
        const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(title:\\s*"${escapeRegex(blogTitle)}"[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
        updatedContent = updatedContent.replace(regex, `$1${newImage}$2`);
    }
}

fs.writeFileSync(blogsFilePath, updatedContent);
console.log('Successfully updated blogs.js with stock images from Picsum (Unsplash source)!');
