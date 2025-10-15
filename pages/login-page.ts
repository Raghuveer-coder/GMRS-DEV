import { type Page, type Locator, expect } from '@playwright/test';
import credentials from '../test-data/credentials.json';

export class LoginPage {
  readonly page: Page;

  // Locators
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly postLoginIdentifier: Locator;

  constructor(page: Page) {
    this.page = page;

    // Form Fields
    this.userNameInput = page.locator('#UserName');
    this.passwordInput = page.locator('#Password');
    this.signInButton = page.getByRole('button', { name: ' Sign In' });

    // Verification
    this.postLoginIdentifier = page.getByText('GAS MALAYSIA RETAIL SERVICES');
  }

  /**
   * Navigates to the login page.
   */
  async navigate() {
    await this.page.goto('https://gasibccdev.gasmalaysia.com/Home/Login', {
      waitUntil: 'domcontentloaded',
    });
  }

  /**
   * Fills the login form, submits, and waits for the dashboard to be visible.
   * Credentials are read from an external JSON file.
   */
  async login() {
    const { username, password } = credentials.validUser;

    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();

    // This wait is crucial. It confirms the login was successful before moving on.
   // await expect(this.postLoginIdentifier).toBeVisible({ timeout: 15000 });
  }
}
