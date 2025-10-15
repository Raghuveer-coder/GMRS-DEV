import { type Page, type Locator } from '@playwright/test';

export class TariffPage {
  readonly page: Page;

  // Locators
  readonly newTariffButton: Locator;
  readonly actionButton: Locator;
  readonly newTariffCodeLink: Locator;

  // Tariff Code Form Locators
  readonly suspectBillConsLimitInput: Locator;
  readonly lowBillWarnPercentageInput: Locator;
  readonly highBillWarnPercentageInput: Locator;
  readonly saveButton: Locator;

  // Verification
  readonly validationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.newTariffButton = page.getByRole('link', { name: ' New Tariff' });
    this.actionButton = page.getByRole('button', { name: 'Action' });
    this.newTariffCodeLink = page.getByRole('link', { name: ' New Tariff Code' });

    // Form
    this.suspectBillConsLimitInput = page.locator('#SuspectBillConsLimit');
    this.lowBillWarnPercentageInput = page.locator('#LowBillWarnPercentage');
    this.highBillWarnPercentageInput = page.locator('#HighBillWarnPercentage');
    this.saveButton = page.getByRole('button', { name: ' Save' });

    // Verification
    this.validationMessage = page.getByText('Select a valid tariff code');
  }

  async gotoTariffManagement() {
    await this.page.getByRole('textbox', { name: 'Search menu' }).click();
    await this.page.getByRole('textbox', { name: 'Search menu' }).pressSequentially('tariff ', { delay: 50 });
    //await this.page.keyboard.press('Enter');
    await this.page.getByRole('link', { name: 'Tariff Management' }).click();
  }

  async createTariffCode(tariffData: any) {
    await this.actionButton.click();
    await this.newTariffCodeLink.click();
    await this.suspectBillConsLimitInput.fill(tariffData.suspectBillConsLimit);
    await this.lowBillWarnPercentageInput.fill(tariffData.lowBillWarnPercentage);
    await this.highBillWarnPercentageInput.fill(tariffData.highBillWarnPercentage);
    await this.saveButton.click();
  }
}