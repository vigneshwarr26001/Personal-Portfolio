import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  
  // Navigate to site
  await page.goto('http://localhost:8081');
  await page.waitForTimeout(1000);
  
  console.log('📱 Testing Mobile Navigation...\n');
  
  // Step 1: Click hamburger menu button
  try {
    const mobileMenuBtn = await page.locator('[class*="md:hidden"]').filter({ has: page.locator('svg') }).first();
    await mobileMenuBtn.click();
    await page.waitForTimeout(500);
    console.log('✅ Step 1: Hamburger menu clicked');
  } catch (e) {
    console.log('❌ Step 1 Failed: ' + e.message);
  }
  
  // Step 2: Check if menu items are visible
  try {
    const aboutBtn = await page.locator('button:has-text("About")');
    const isVisible = await aboutBtn.isVisible();
    console.log(isVisible ? '✅ Step 2: Menu items visible' : '❌ Step 2: Menu items not visible');
  } catch (e) {
    console.log('❌ Step 2 Failed: ' + e.message);
  }
  
  // Step 3: Click on Projects link
  try {
    const projectsBtn = await page.locator('button:has-text("Projects")');
    await projectsBtn.click();
    await page.waitForTimeout(1000);
    console.log('✅ Step 3: Projects link clicked');
    
    // Check if page scrolled to projects section
    const projectsSection = await page.locator('#projects');
    const boundingBox = await projectsSection.boundingBox();
    console.log(boundingBox ? '✅ Step 3.1: Projects section found' : '❌ Step 3.1: Projects section not found');
  } catch (e) {
    console.log('❌ Step 3 Failed: ' + e.message);
  }
  
  // Step 4: Check console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('⚠️ Console Error: ' + msg.text());
    }
  });
  
  // Step 5: Take screenshot
  await page.screenshot({ path: 'mobile-nav-test.png' });
  console.log('\n📸 Screenshot saved');
  
  await browser.close();
})().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
