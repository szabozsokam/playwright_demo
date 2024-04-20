// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://regex101.com/');
    await expect(page).toHaveTitle('regex101: build, test, and debug regex');
  });

// regex to validate if a string pattern is a valid ip address
var regex = '^((0?[0-9]?\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(0?[0-9]?\\d|1\\d\\d|2[0-4]\\d|25[0-5])$';  
// IP addresses to validate:
var pattern_valid =  '121.234.12.12';
var pattern_invalid_1 = '101.504.16.23'; // value > 255
var pattern_invalid_2 = '12.123.1234.123' // nr of digits > 3 

test('check validity of IP addresses with regex', async ({ page }) => {
    const language_js = page.getByRole('button', { name: 'ECMAScript (JavaScript)' });
    const regex_IF = page.getByRole('textbox', { name: 'insert your regular' });
    const test_IF = page.getByRole('textbox', { name: 'insert your test string here' });
    const match_message = page.locator('xpath=//span[normalize-space(text())="Regular Expression"]/../div/div/div');
    const match_info_firstrow = ["Match 1", "0-13", pattern_valid];
    
    await expect(page.locator('#regex-app')).toContainText('Regular Expression');
    await language_js.click();
    await regex_IF.fill(regex);

    // mismatch message for invalid IP address 1:
    await test_IF.fill(pattern_invalid_1);
    await expect(match_message).toContainText('No Match');
    await expect(match_message).toHaveCSS('background-color', 'rgb(197, 197, 197)');  // grey background
    await expect(page.locator('#regex-app')).toContainText('Your regular expression does not match the subject string.');
    
    // mismatch message for invalid IP address 2:
    await test_IF.fill(pattern_invalid_2);
    await expect(match_message).toContainText('No Match');
    await expect(match_message).toHaveCSS('background-color', 'rgb(197, 197, 197)');  // grey background
    await expect(page.locator('#regex-app')).toContainText('Your regular expression does not match the subject string.');
    
    // match message for valid IP address: 
    await test_IF.fill(pattern_valid);
    await expect(match_message).toContainText('1 match');
    await expect(match_message).toHaveCSS('background-color', 'rgb(78, 132, 117)');  // green background
    for (let i = 0; i < match_info_firstrow.length; i++) {
      await expect(page.getByRole('table')).toContainText(match_info_firstrow[i]);
    }
});
