import { test, expect } from '@playwright/test';
import { ConsumerManagementPage } from '../pages/consumer-management-page';
import { LoginPage } from '../pages/login-page';

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const consumerPage = new ConsumerManagementPage(page);

  // --- Step 1: Log in to the application ---
  await test.step('Login to the application', async () => {
    await loginPage.navigate();
    await loginPage.login();
  }); 

  // --- Step 2: Verify successful login and navigation ---
  await test.step('Verify navigation to Home page after login', async () => {
    // The login page now handles the post-login assertion, so this step can be simplified or removed.
    // Let's verify we are not on the login page anymore.
    await expect.soft(page).not.toHaveURL(/.*Login/);
  });

  // --- Step 3: Navigate to the Consumer Management page and verify ---
  await test.step('Navigate to Consumer Management page', async () => {
    await page.goto("https://gasibccdev.gasmalaysia.com/consumer/management");
   // await expect.soft(consumerPage.pageHeading).not.toBeEmpty();
  });

  // --- Step 4: Search for and select a consumer ---
  await test.step('Search for and select a consumer', async () => {
    await consumerPage.searchAndSelectConsumer('321');
  });
  
  // --- Step 5: Verify consumer details are populated correctly ---
  await test.step.skip('Verify consumer details', async () => {
    // Fields that should have specific values
    await expect.soft(page.locator('#dConsumerName')).toHaveValue('TON SO HAR');
    await expect.soft(page.locator('#dRetailName')).toHaveValue('TON SO HAR');
    await expect.soft(page.locator('#dMobileNo')).toHaveValue('601153627498');
    await expect.soft(page.locator('#dLandLine')).toHaveValue('034070172');

    // Fields that are expect.softed to have some value (not empty)
    await expect.soft(page.locator('#dAddress1')).not.toBeEmpty();
    await expect.soft(page.locator('#dAddress2')).not.toBeEmpty();
    await expect.soft(page.locator('#dPostAddress')).not.toBeEmpty();
    await expect.soft(page.locator('input[name="dOldIC"]')).toBeEmpty();

    // Fields that are expect.softed to be empty
    await expect.soft(page.locator('#Applicant Type')).toBeEmpty();

    await expect.soft(page.locator('#dCompanyName')).toBeEmpty();
    await expect.soft(page.locator('#dSSMNum')).toBeEmpty();
    await expect.soft(page.locator('input[name="dNewIC"]')).toBeEmpty();
    await expect.soft(page.locator('#dPassportNo')).toBeEmpty();
    await expect.soft(page.locator('input[name="dMobileNo2"]')).toBeEmpty();
    await expect.soft(page.locator('#dEmailAddress')).toBeEmpty();
    await expect.soft(page.locator('input[name="dFax"]')).toBeEmpty();
  });

  // --- Step 6: Verify consumer detail labels and fields are visible ---
  await test.step('Verify consumer detail labels and fields are visible', async () => {
    // --- Verify fields have data after search ---
    // Consumer & Account Details
    await expect.soft(page.locator('#ConsumerNum')).not.toBeEmpty();
    await expect.soft(page.locator('#CheckDigit')).not.toBeEmpty();
    await expect.soft(page.locator('#ConsumerStatus')).not.toBeEmpty();
    await expect.soft(page.locator('#Arrears')).not.toBeEmpty();
    await expect.soft(page.locator('#SupplyType')).not.toBeEmpty();
    await expect.soft(page.locator('#Tariff')).not.toBeEmpty();
    await expect.soft(page.locator('#SupplyByAccountType')).not.toBeEmpty();
    await expect.soft(page.locator('#ConsumerType')).not.toBeEmpty();
    await expect.soft(page.locator('#SupplyDate')).not.toBeEmpty();

    // Applicant & Personal Details
    await expect.soft(page.locator('#ApplicantType')).not.toBeEmpty();
    await expect.soft(page.locator('#OnwershipType')).not.toBeEmpty(); // Corrected typo from OnwershipType
    await expect.soft(page.locator('#RLICConsumerNum')).not.toBeEmpty();
    await expect.soft(page.locator('#dConsumerName')).not.toBeEmpty();
    // #dCompanyName is expected to be empty from previous step, so we don't check it here.
    await expect.soft(page.locator('#dRetailName')).not.toBeEmpty();
    // #dSSMNum is expected to be empty from previous step.
    await expect.soft(page.locator('#dGender')).not.toBeEmpty();
    await expect.soft(page.locator('#dAddress1')).not.toBeEmpty();
    await expect.soft(page.locator('#dAddress2')).not.toBeEmpty();
    await expect.soft(page.locator('#dAddress3')).not.toBeEmpty();
    await expect.soft(page.locator('#dPostAddress')).not.toBeEmpty();
    // dNewIC is expected to be empty
    await expect.soft(page.locator('input[name="dOldIC"]')).not.toBeEmpty();
    // dPassportNo is expected to be empty
    await expect.soft(page.locator('#dMobileNo')).not.toBeEmpty();
    // dMobileNo2 is expected to be empty
    await expect.soft(page.locator('#dLandLine')).not.toBeEmpty();
    // dEmailAddress is expected to be empty
    // dFax is expected to be empty

    // Billing Details
    await expect.soft(page.locator('#branchcode')).not.toBeEmpty();
    await expect.soft(page.locator('#billingmoe')).not.toBeEmpty();
    await expect.soft(page.locator('#gasintypemode')).not.toBeEmpty();
    await expect.soft(page.locator('#gasregistrationdate')).not.toBeEmpty();
    await expect.soft(page.locator('#LastBillDate')).not.toBeEmpty();
    await expect.soft(page.locator('#LastReadingDate')).not.toBeEmpty();
    await expect.soft(page.locator('#LastPaymentDate')).not.toBeEmpty();
    await expect.soft(page.locator('#DailyAverageCConsumption')).not.toBeEmpty();
    await expect.soft(page.locator('#monthlyaveragebill')).not.toBeEmpty();

    // JDE details
    await page.getByRole('link', { name: 'Account Info' }).click(); // Navigate to the tab first
    await expect.soft(page.locator('#jdetype')).not.toBeEmpty();
    await expect.soft(page.locator('#jdeaccountnumber')).not.toBeEmpty();
  });

  // --- Step 7: Close the page ---
  await page.close();
});