const fs = require('fs');

const blogsFilePath = 'src/data/blogs.js';
let content = fs.readFileSync(blogsFilePath, 'utf8');

const match = content.match(/export const blogs = (\[[\s\S]+\]);/);
if (match) {
  const blogs = eval(match[1]);
  
  const customImages = [
    '/images/custom_1.jpg',
    '/images/custom_2.jpg',
    '/images/custom_3.jpg',
    '/images/custom_4.jpg',
    '/images/custom_5.jpg',
    '/images/custom_6.jpeg'
  ];
  
  let imgIndex = 0;
  for (let i = 0; i < blogs.length; i++) {
    // Skip the Gazelle Chair blog (index 6)
    if (i === 6) continue;
    
    // Also skip blog 16 if we want, but user said "one of the blog where gazelle chair should be go", so blog 6 is the only one.
    
    const imagePath = customImages[imgIndex % customImages.length];
    
    // Replace the image field in the content string
    const blogTitle = blogs[i].title;
    // We need to carefully replace the image for this specific blog
    // Since title is unique, we can use it to find the block
    const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    const regex = new RegExp(`(title:\\s*"${escapeRegex(blogTitle)}"[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
    content = content.replace(regex, `$1${imagePath}$2`);
    
    imgIndex++;
  }
}

fs.writeFileSync(blogsFilePath, content);
console.log('Updated all stock images with the 6 custom images.');
