const fs = require('fs');

const blogsFilePath = 'src/data/blogs.js';
let content = fs.readFileSync(blogsFilePath, 'utf8');

// The script will update the image for the blog that contains "Gazelle Chair Session"
// Or we can just evaluate it, modify the array, and dump it back.

const match = content.match(/export const blogs = (\[[\s\S]+\]);/);
if (match) {
  const blogs = eval(match[1]);
  blogs[6].image = '/images/gazelle-chair-new.png'; // Update Blog 6
  
  // Format exactly like before (if we want to preserve spacing, we can just replace the string)
}

// Actually, replacing string directly might be safer to preserve formatting
content = content.replace(
  /title: "What Happens During a Gazelle Chair Session\?",\s+image: ".*?",/g,
  `title: "What Happens During a Gazelle Chair Session?",\n    image: "/images/gazelle-chair-new.png",`
);

fs.writeFileSync(blogsFilePath, content);
console.log('Updated Blog 6 image.');
