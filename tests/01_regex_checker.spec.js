// @ts-check
const { test, expect } = require('@playwright/test');
const { RegexCheckerPage } = require('../page_objects/regexchecker.page.js');


// regex to validate if a string pattern is a valid ip address
var regex = '^((0?[0-9]?\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(0?[0-9]?\\d|1\\d\\d|2[0-4]\\d|25[0-5])$';  
// IP addresses to validate:
var pattern_valid =  '121.234.12.12';
var pattern_invalid_1 = '101.504.16.23'; // value > 255
var pattern_invalid_2 = '12.123.1234.123' // nr of digits > 3 
var match_info_firstrow = ["Match 1", "0-13", pattern_valid];

test.beforeEach(async ({ page }) => {
    const regexCheckerPage = new RegexCheckerPage(page);
    regexCheckerPage.load();
  });

test('check invalid IP addresses with regex', async ({ page }) => {
    const regexCheckerPage = new RegexCheckerPage(page);
    await expect(page.locator('#regex-app')).toContainText('Regular Expression');
    await regexCheckerPage.language_js.click();
    await regexCheckerPage.regex_IF.fill(regex);

    // mismatch message for invalid IP address 1:
    await regexCheckerPage.test_IF.fill(pattern_invalid_1);
    await expect(regexCheckerPage.match_message).toContainText('No Match');
    await expect(regexCheckerPage.match_message).toHaveCSS('background-color', 'rgb(197, 197, 197)');  // grey background
    await expect(page.locator('#regex-app')).toContainText('Your regular expression does not match the subject string.');
    
    // mismatch message for invalid IP address 2:
    await regexCheckerPage.test_IF.fill(pattern_invalid_2);
    await expect(regexCheckerPage.match_message).toContainText('No Match');
    await expect(regexCheckerPage.match_message).toHaveCSS('background-color', 'rgb(197, 197, 197)');  // grey background
    await expect(page.locator('#regex-app')).toContainText('Your regular expression does not match the subject string.');
});

test('check valid IP address with regex', async ({ page }) => {
  const regexCheckerPage = new RegexCheckerPage(page);
  await expect(page.locator('#regex-app')).toContainText('Regular Expression');
  await regexCheckerPage.language_js.click();
  await regexCheckerPage.regex_IF.fill(regex);
  
  // match message for valid IP address: 
  await regexCheckerPage.test_IF.fill(pattern_valid);
  await expect(regexCheckerPage.match_message).toContainText('1 match');
  await expect(regexCheckerPage.match_message).toHaveCSS('background-color', 'rgb(78, 132, 117)');  // green background
  for (let i = 0; i < match_info_firstrow.length; i++) {
    await expect(page.getByRole('table')).toContainText(match_info_firstrow[i]);
  }
});

// useful when Run button of IDE is used to run test (in this case browser remains open after work finished)
// if you want to examine error state after run, comment this section and run with Run button of IDE
test.afterEach(async ({ page }) => {
  page.close();
});