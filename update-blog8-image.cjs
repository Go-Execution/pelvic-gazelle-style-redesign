const fs = require('fs');

const blogsFilePath = 'src/data/blogs.js';
let content = fs.readFileSync(blogsFilePath, 'utf8');

const blogTitle = "Pelvic Floor Strengthening Without Surgery: Exploring Your Options in San Antonio";
const imagePath = "/images/postpartum-recovery.jpg";

const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regex = new RegExp(`(title:\\s*"${escapeRegex(blogTitle)}"[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
content = content.replace(regex, `$1${imagePath}$2`);

fs.writeFileSync(blogsFilePath, content);
console.log('Updated Blog 8 image.');
