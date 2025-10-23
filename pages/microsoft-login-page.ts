import { type Page, type Locator, expect } from '@playwright/test';

export class MicrosoftLoginPage {
  readonly page: Page;

  // Locators for the Microsoft login page
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly nextButton: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Using robust locators that are resilient to UI changes
    this.usernameInput = page.getByPlaceholder('username@gasmalaysia.com');
    this.passwordInput = page.getByPlaceholder('Password');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  /**
   * Navigates to the application's entry point, which will trigger the login redirect.
   * @param url The URL of the application to navigate to.
   */
  async navigate(url: string) {
    await this.page.goto(url);
  }

  /**
   * Fills the login form and submits it to log the user in.
   * This method encapsulates the entire login flow.
   * @param username The user's email address.
   * @param password The user's password.
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.nextButton.click();
    await this.passwordInput.fill(password);
    await this.signInButton.click();

    // Maximize the window to ensure a consistent viewport
    await this.page.setViewportSize({ width: 1280, height: 720 });
  }
}