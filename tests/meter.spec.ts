import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { MeterPage } from '../pages/Meter-page';

test.describe('Meter Management', () => {
  let meterPage: MeterPage;

  test.beforeEach(async ({ page }) => {
    // For each test, perform a full login to ensure a clean state.
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login();

    meterPage = new MeterPage(page);
  });

  // This test now creates a meter, searches for it, edits it, and verifies the change.
  // This makes it a complete, independent, and reliable end-to-end test.
  test('should create, edit, and verify a new meter', async ({ page }) => {
    await meterPage.gotoNewMeterForm();

    // --- Fill Meter details ---
    await meterPage.manufactureDateInput.pressSequentially('01072025', { delay: 100 });

    // Generate a unique meter number to ensure the test is re-runnable
    const meterPrefix = 'Prefix01';
    const meterSuffix = 'suffix02';
    const uniqueMeterNum = Math.floor(1000 + Math.random() * 9000).toString();
    const fullMeterNumber = `${meterPrefix}${uniqueMeterNum}${meterSuffix}`;

    await meterPage.meterNumPrefixInput.fill(meterPrefix);
    await meterPage.meterNumFromInput.fill(uniqueMeterNum);
    await meterPage.meterNumSuffixInput.fill(meterSuffix);
    await meterPage.meterSerialNumInput.fill('011');
    await meterPage.meterBrandSelect.selectOption('ACTARIS');
    await meterPage.meterModelSelect.selectOption('ACD-G10');
    await meterPage.meterTypeSelect.selectOption('01');
    await meterPage.meterSizeSelect.selectOption('0.5');
    await meterPage.uomSelect.selectOption('Metric');
    await meterPage.dialLengthSelect.selectOption('5');

    // Search and select GRating
    await meterPage.gratingInput.pressSequentially('1.25', { delay: 100 });
    await meterPage.gratingSuggestionList.waitFor({ state: 'visible' });
    await meterPage.gratingExactValue.click();

    // Fill remaining details
    await meterPage.pUnitSelect.selectOption('bar');
    await meterPage.temperatureInput.fill('100');
    await meterPage.pressureInput.fill('200');
    await meterPage.zFactorInput.fill('20');
    await meterPage.cfFactorInput.fill('30');

    // Save and verify
    await meterPage.saveButton.click();
    await expect(meterPage.successMessage).toBeVisible();

    // Take screenshot after success message is visible
    await page.screenshot({ path: 'meter_purchase_saved.png', fullPage: true });

    // --- Navigate to Meter-Home to search for the newly created meter ---
    await meterPage.gotoMeterHome();
    await expect(meterPage.listPageHeading).toBeVisible({ timeout: 20000 });

    // --- Search for the meter, find the row, and click Edit ---
    await meterPage.searchInput.fill(fullMeterNumber);

    // Instead of a long static wait, we use a smart assertion that waits for the row to appear.
    const row = page.locator('table#meter_list tbody tr', { hasText: fullMeterNumber });
    await expect(row).toHaveCount(1, { timeout: 30000 }); // Wait up to 30s for search to complete
    await row.getByRole('link', { name: 'Edit' }).click();

    // --- Perform the edit and save ---
    // We are changing the Meter Type and Size
    await meterPage.meterTypeSelect.selectOption('765');
    await meterPage.meterSizeSelect.selectOption('775');
    await meterPage.saveButton.click();

    // --- Verify the edit was successful ---
    await expect(meterPage.editSuccessMessage).toBeVisible();
  });
});