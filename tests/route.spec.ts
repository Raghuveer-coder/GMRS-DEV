import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { RoutePage } from '../pages/route-page';
import * as fs from 'fs';
import * as path from 'path';
import routeData from '../test-data/route-data.json';

test.describe('Route Management', () => {
  let loginPage: LoginPage;
  let routePage: RoutePage;
  // Use path.join for creating a robust file path.
  const outputPath = path.join(process.cwd(), 'test-output', 'Output-route.json');

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    routePage = new RoutePage(page);

    await loginPage.navigate();
    await loginPage.login();
  });

  // This single test now handles the entire workflow: create, search, and verify.
  // This removes dependencies between tests and resolves the test discovery issue.
  test('should create, search for, and verify a new route', async ({ page }) => {
    const routeName = `Test_Route_${Math.floor(Math.random() * 10000)}`;

    await test.step('Create a new route', async () => {
      await routePage.gotoNewRouteForm();
      await routePage.createRoute(routeData.fullRoute, routeName);
      await expect(routePage.successMessage).toBeVisible();
      // Verify the success message contains the route number.
      await expect(routePage.successMessage).toContainText(/Route No \d+ saved./);
    });

    await test.step('Search for the new route and verify its details', async () => {
      //await routePage.gotoEditRouteForm();
      await routePage.searchForRoute(routeName);

      const row = page.locator("#products tbody tr").first();
      await expect(row).toContainText(routeName);

      const editLink = row.locator('td:nth-child(11) a:has-text("Edit")');
      await editLink.click();

      // Use soft assertions to check multiple values without stopping on the first failure.
      await expect.soft(page.locator('#ZoneID')).toHaveValue(routeData.fullRoute.zoneId);
      await expect.soft(page.locator('#BlockID')).toHaveValue(routeData.fullRoute.blockId);
      await expect.soft(page.locator('#Route')).toHaveValue(routeName);
      await expect.soft(page.locator('#TariffCodeID')).toHaveValue(routeData.fullRoute.tariffCodeId);
      await expect.soft(page.locator('#SupplyByAccountType')).toHaveValue(routeData.fullRoute.supplyByAccountType);
      await expect.soft(page.locator('#ConsumerNo')).toHaveValue(routeData.fullRoute.consumerNo);
      await expect.soft(page.locator('#ChargeCode')).toHaveValue(routeData.fullRoute.chargeCode);
      await expect.soft(page.locator('#CalcValue')).toHaveValue(routeData.fullRoute.calcValue);
    });
  });
  test('P2: should search for an existing route and verify its details', async ({ page }) => {
    const testData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));

    await test.step('Search for the route and verify its details', async () => {
      await routePage.gotoEditRouteForm();
      await routePage.searchForRoute(testData.routeName);

      const row = routePage.routeListTableBody.locator("tr").first();
      await expect(row).toContainText(testData.routeName);
      
      const editLink = row.locator('td:nth-child(11) a:has-text("Edit")');
      await editLink.click();

      // Use soft assertions to check multiple values without stopping on the first failure.
      await expect.soft(page.locator('#ZoneID')).toHaveValue(routeData.fullRoute.zoneId);
      await expect.soft(page.locator('#BlockID')).toHaveValue(routeData.fullRoute.blockId);
      await expect.soft(page.locator('#Route')).toHaveValue(testData.routeName);
      await expect.soft(page.locator('#TariffCodeID')).toHaveValue(routeData.fullRoute.tariffCodeId);
      await expect.soft(page.locator('#SupplyByAccountType')).toHaveValue(routeData.fullRoute.supplyByAccountType);
      await expect.soft(page.locator('#ConsumerNo')).toHaveValue(routeData.fullRoute.consumerNo);
      await expect.soft(page.locator('#ChargeCode')).toHaveValue(routeData.fullRoute.chargeCode);
      await expect.soft(page.locator('#CalcValue')).toHaveValue(routeData.fullRoute.calcValue);
    });
  });

  test('P3: should show validation errors for empty required fields', async ({ page }) => {
    await routePage.gotoNewRouteForm();
    await test.step('Attempt to save the empty form to trigger validation', async () => {
      await routePage.saveButton.click();
    });

    await test.step('Verify validation summary and specific field errors', async () => {
      // Now, these assertions will pass because the validation has been triggered.
    await expect(page.getByText('Please fill in all mandatory fields.')).toBeVisible();
     // await expect(page.getByText('Route name is mandatory')).toBeVisible();
     //await expect(page.getByText('ZoneID and BlockID are mandatory')).toBeVisible();
   //  await expect(page.getByText('Tariff code is mandatory')).toBeVisible();
      await expect(page.getByText('Supply by account type is mandatory')).toBeVisible();
    });
  });

  test('P3: should not show availability message when route name field is left blank', async ({ page }) => {
    // Arrange: Navigate to the new route form
    await routePage.gotoNewRouteForm();

    // Act: Focus the route name input, then click away to trigger on-blur validation
    await routePage.routeNameInput.focus();
   // await routePage.remarkInput.focus(); 

    // Assert: Verify that the availability message is not shown and the required field error is visible
    await expect(page.getByText('Congratulations, Route is')).not.toBeVisible();
    await expect(page.locator('#Route-error')).toBeVisible();
    await expect(page.locator('#Route-error')).toHaveText('This field is required.');
  });

  test('P5: should add a discount to a newly created route', async ({ page }) => {
    const uniqueRouteName = `Test_Discount_${Math.random().toString(36).substring(2, 8)}`;

    await test.step('Create a new route to add a discount to', async () => {
      await routePage.gotoNewRouteForm();
      // Use the createRoute method to ensure all required fields are filled.
      await routePage.createRoute(routeData.fullRoute, uniqueRouteName);
      await expect(routePage.successMessage).toBeVisible();
    });

    await test.step('Find the route and navigate to add discount', async () => {
     // await routePage.gotoRouteHome();
      await expect(routePage.searchInput).toBeVisible();
      await routePage.searchForRoute(uniqueRouteName);
      const row = page.locator("#products tbody tr").first();
      await expect(row).toContainText(uniqueRouteName);

      const editLink = row.locator('td:nth-child(11) a:has-text("Edit")');
      await editLink.click();
      await routePage.actionButton.click();
      await routePage.addDiscountLink.click();
      await routePage.discountInput.fill(routeData.discount.discount);
      await routePage.discountSaveButton.click();
      await expect(routePage.discountSuccessMessage).toBeVisible();

    });
}); });