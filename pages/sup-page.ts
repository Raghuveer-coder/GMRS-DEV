import { type Page, type Locator, expect } from '@playwright/test';
import supervisorCredentials from '../test-data/supervisor-credentials.json';

export class SupervisorLoginPage {
  readonly page: Page;

  // Locators
  readonly loginHeaderButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // Device Activation Locators
  readonly registrationStatusDropdown: Locator;
  readonly registerpage: Locator;
  readonly activeStatusOption: Locator;s
  readonly confirmationCheckbox: Locator;
  readonly yesButton: Locator;
  readonly successToast: Locator;
  readonly okButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.loginHeaderButton = page.getByText('LOGIN');
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });

    // Device Activation Locators
    this.registrationStatusDropdown = page.getByLabel('Registration status');
    this.registerpage = page.locator('//div[@class="ng-tns-c16-9 ng-trigger ng-trigger-transformPanel mat-select-panel mat-primary"]');
    this.activeStatusOption = page.getByRole('option', { name: 'Active', exact: true });
    this.confirmationCheckbox = page.locator('label[for="mat-checkbox-3-input"]');
    this.yesButton = page.getByRole('button', { name: 'Yes' });
    this.successToast = page.getByText('Device activated successfully');
    this.okButton = page.getByRole('button', { name: 'Ok' });
  }

  /**
   * Navigates to the supervisor login page.
   */
  async navigate() {
    await this.page.goto(supervisorCredentials.url);
  }

  /**         
   * Fills the login form and submits it.
   */
  async login() {
    const { username, password } = supervisorCredentials.validUser;
    await this.loginHeaderButton.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Activates a device after logging in.
   */
  async activateDevice() {
    // Use force: true to bypass actionability checks if another element is in the way.
    await this.registrationStatusDropdown.click();
    await expect(this.registerpage).toBeVisible(); // Assert that the dropdown panel is visible
    await this.activeStatusOption.click();
    await this.confirmationCheckbox.click();
    await this.yesButton.click();
    await expect(this.successToast).toBeVisible();
    await this.okButton.click();
  }
}
