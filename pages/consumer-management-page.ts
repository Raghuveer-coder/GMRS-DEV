import { type Page, type Locator, expect } from '@playwright/test';

export class ConsumerManagementPage {
  readonly page: Page;

  // Locators for the consumer management page
  readonly pageHeading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page verification locators
    this.pageHeading = page.getByRole('heading', { name: 'Consumer Management' });

    // Search locators
    this.searchInput = page.locator('#SearchVal');
    this.searchButton = page.getByRole('button', { name: /Search/i });
  }

  /**
   * Searches for a consumer by a given value and clicks on the result.
   * @param searchValue The value to search for (e.g., '321').
   */
  async searchAndSelectConsumer(searchValue: string) {
    await this.searchInput.fill(searchValue);
    await this.searchButton.click();

    // Using the specific XPath to select the second link with the matching text.
    const searchResult = this.page.locator(`(//a[@href='#'][normalize-space()='${searchValue}'])[2]`);
    await expect(searchResult).toBeVisible();
    await searchResult.click();
  }
}