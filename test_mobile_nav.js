const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  
  // Navigate to site
  await page.goto('http://localhost:8081');
  
  console.log('📱 Testing Mobile Navigation...\n');
  
  // Step 1: Check if hamburger menu exists
  const menuButton = await page.$('button:has-text("Menu")');
  if (!menuButton) {
    const buttons = await page.$$('button');
    console.log('❌ Menu button not found clearly. Found ' + buttons.length + ' buttons');
  } else {
    console.log('✅ Menu button found');
  }
  
  // Step 2: Click hamburger menu
  try {
    const mobileMenuBtn = await page.locator('button.md\:hidden').first();
    await mobileMenuBtn.click();
    await page.waitForTimeout(500);
    console.log('✅ Menu opened');
  } catch (e) {
    console.log('❌ Failed to open menu: ' + e.message);
  }
  
  // Step 3: Check if menu items are visible
  const menuItems = await page.locator('button').filter({ hasText: /About|Experience|Projects|Skills|Contact/ });
  const count = await menuItems.count();
  console.log(`📊 Found ${count} menu items in mobile menu`);
  
  // Step 4: Click on About link
  try {
    const aboutBtn = await page.locator('button').filter({ hasText: 'About' });
    await aboutBtn.click();
    await page.waitForTimeout(500);
    const aboutSection = await page.locator('#about');
    const isVisible = await aboutSection.isVisible();
    console.log(isVisible ? '✅ About section navigated to' : '❌ About section not visible after click');
  } catch (e) {
    console.log('❌ Failed to navigate to About: ' + e.message);
  }
  
  // Step 5: Take screenshot
  await page.screenshot({ path: 'mobile-nav-test.png' });
  console.log('\n📸 Screenshot saved: mobile-nav-test.png');
  
  await browser.close();
})().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
