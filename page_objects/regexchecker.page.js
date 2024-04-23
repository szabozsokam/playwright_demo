// @ts-check
const { expect } = require('@playwright/test');

exports.RegexCheckerPage = class RegexCheckerPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.language_js = page.getByRole('button', { name: 'ECMAScript (JavaScript)' });
    this.regex_IF = page.getByRole('textbox', { name: 'insert your regular' });
    this.test_IF = page.getByRole('textbox', { name: 'insert your test string here' });
    this.match_message = page.locator('xpath=//span[normalize-space(text())="Regular Expression"]/../div/div/div');
  }

  async load() {
    await this.page.goto('https://regex101.com/');
    await expect(this.page).toHaveTitle('regex101: build, test, and debug regex');
  }
}