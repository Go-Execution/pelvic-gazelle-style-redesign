const fs = require('fs');

const blogsFilePath = 'src/data/blogs.js';
let content = fs.readFileSync(blogsFilePath, 'utf8');

const blogTitle = "Postpartum Pelvic Floor Recovery: What New Mothers Should Know";
const imagePath = "/images/postpartum-recovery.jpg";

const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regex = new RegExp(`(title:\\s*"${escapeRegex(blogTitle)}"[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
content = content.replace(regex, `$1${imagePath}$2`);

fs.writeFileSync(blogsFilePath, content);
console.log('Updated Postpartum blog image.');
