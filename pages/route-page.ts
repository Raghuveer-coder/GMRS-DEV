import { type Page, type Locator } from '@playwright/test';

export class RoutePage {
  readonly page: Page;

  // Locators
  readonly zoneIdDropdown: Locator;
  readonly blockIdDropdown: Locator;
  readonly routeInput: Locator;
  readonly routeNameInput: Locator; // Alias for routeInput
  readonly remarkInput: Locator;
  readonly tariffCodeIdDropdown: Locator;
  readonly supplyByAccountTypeDropdown: Locator;
  readonly billingCompanyDropdown: Locator;
  readonly consumerNoDropdown: Locator;
  readonly chargeCodeDropdown: Locator;
  readonly calcValueInput: Locator;
  readonly minQtyInput: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  readonly searchInput: Locator;
  readonly actionButton: Locator;
  readonly addDiscountLink: Locator;
  readonly routeListTableBody: Locator;
  readonly routeListTable: Locator;
  readonly updateSuccessMessage: Locator;
  readonly discountInput: Locator;
  readonly discountSaveButton: Locator;
  readonly discountSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Form Locators
    this.zoneIdDropdown = page.locator('#ZoneID');
    this.blockIdDropdown = page.locator('#BlockID');
    this.routeInput = page.locator('#Route');
    this.routeNameInput = this.routeInput; // Alias for consistency
    this.remarkInput = page.locator('#Remark');
    this.tariffCodeIdDropdown = page.locator('#TariffCodeID');
    this.supplyByAccountTypeDropdown = page.locator('#SupplyByAccountType');
    this.billingCompanyDropdown = page.locator('#BillingCompany');
    this.consumerNoDropdown = page.locator('#ConsumerNo');
    this.chargeCodeDropdown = page.locator('#ChargeCode');
    this.calcValueInput = page.locator('#CalcValue');
    this.minQtyInput = page.locator('#MinQty');
    this.saveButton = page.getByRole('button', { name: ' Save' });

    // Verification Locators
    this.successMessage = page.getByText(/Route No \d+ saved/);
    this.actionButton = page.getByRole('button', { name: 'Action' });
    this.addDiscountLink = page.getByRole('link', { name: 'Add Discount' });

    // Search
    this.searchInput = page.locator('div.dataTables_filter input[type="search"]');
    this.routeListTableBody = page.locator('#route_list tbody');
    this.routeListTable = page.locator('#route_list');

    // Update
    this.updateSuccessMessage = page.getByText('Route updated successfully');

    // Discount
    this.discountInput = page.locator('#DiscountAmount');
    this.discountSaveButton = page.getByRole('button', { name: 'Save' });
    this.discountSuccessMessage = page.getByText('Saved succesfully.');
  }

  async gotoNewRouteForm() {
    await this.page.locator('a', { hasText: 'Route Management' }).click();
    await this.page.getByRole('link', { name: ' New Route' }).click();
  }

  async createRoute(routeData: any, routeName: string) {
    await this.zoneIdDropdown.selectOption(routeData.zoneId);
    await this.blockIdDropdown.selectOption(routeData.blockId);
    await this.routeInput.fill(routeName);
    await this.tariffCodeIdDropdown.selectOption(routeData.tariffCodeId);
    await this.supplyByAccountTypeDropdown.selectOption(routeData.supplyByAccountType);
    await this.billingCompanyDropdown.selectOption(routeData.billingCompany);
    await this.consumerNoDropdown.selectOption(routeData.consumerNo);
    await this.chargeCodeDropdown.selectOption(routeData.chargeCode);
    await this.calcValueInput.fill(routeData.calcValue);
    await this.minQtyInput.fill(routeData.minQty);
    await this.saveButton.click();
  }

  async saveForm() {
    await this.saveButton.click();
  }

  async gotoEditRouteForm() {
    await this.page.locator('a', { hasText: 'Route Management' }).click();
    await this.page.getByRole('link', { name: ' New Route' }).click();
   await this.page.getByRole('link', { name: ' All area routes' }).click();

   // await expect(this.routeListTable).toBeVisible();
  }

  async gotoRouteHome() {
    await this.page.locator('a', { hasText: 'Route Management' }).click();
    await this.page.getByRole('link', { name: ' All area routes' }).click();
  }

  async searchForRoute(routeName: string) {
    await this.searchInput.fill(routeName);
  }
}