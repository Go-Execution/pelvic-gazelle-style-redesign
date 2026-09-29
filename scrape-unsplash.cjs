const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://unsplash.com/s/photos/healthy-lifestyle-yoga', { waitUntil: 'domcontentloaded' });
  
  // Wait for images to load
  await page.waitForTimeout(3000);
  
  // Scroll down a bit to trigger lazy loading
  await page.evaluate(() => window.scrollBy(0, 2000));
  await page.waitForTimeout(2000);

  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src && src.startsWith('https://images.unsplash.com/photo-'))
      .map(src => {
        // Strip off the query params and add our own to get good size
        const base = src.split('?')[0];
        return base + '?q=80&w=800&auto=format&fit=crop';
      });
  });
  
  const uniqueImages = [...new Set(images)].slice(0, 11);
  console.log('Found images:', uniqueImages.length);
  
  if (uniqueImages.length >= 11) {
    const blogsFilePath = 'src/data/blogs.js';
    let content = fs.readFileSync(blogsFilePath, 'utf8');
    
    // We need to parse and replace the images for blogs at index 9 to 19
    const { blogs } = require('./src/data/blogs.js');
    
    for (let i = 9; i < 20; i++) {
        if (blogs[i]) {
            const blogTitle = blogs[i].title;
            const newImage = uniqueImages[i - 9];
            
            const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Look for the block with this title and replace its image
            const regex = new RegExp(`(title:\\s*"${escapeRegex(blogTitle)}"[\\s\\S]*?image:\\s*")[^"]+(")`, 'g');
            content = content.replace(regex, `$1${newImage}$2`);
        }
    }
    
    fs.writeFileSync(blogsFilePath, content);
    console.log('Successfully updated blogs.js with Unsplash images!');
  } else {
    console.log('Not enough images found. Found:', uniqueImages.length);
  }

  await browser.close();
})();
