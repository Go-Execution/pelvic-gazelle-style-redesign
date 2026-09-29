const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER PAGE ERROR:', err.message));

  console.log('Navigating to localhost:5173...');
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    console.log('Navigation successful.');
  } catch (e) {
    console.error('Failed to navigate to localhost:5173. Let me try 5174...');
    try {
      await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
      console.log('Navigation to 5174 successful.');
    } catch (e2) {
      console.error('Failed 5174 as well:', e2.message);
    }
  }

  const content = await page.content();
  console.log('HTML Length:', content.length);
  if (content.length < 500) {
    console.log('HTML Snippet:', content);
  }

  await browser.close();
})();
