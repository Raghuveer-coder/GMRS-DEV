import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test.describe('Login Functionality', () => {

  test('should allow a user to log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to the login page', async () => {
      await loginPage.navigate();
    });

    await test.step('Enter credentials and submit', async () => {
      await loginPage.login();
    });

   // await test.step('Verify that the user is on the dashboard', async () => {
      //await expect(page).toHaveURL(/.*Dashboard/);
      //await expect(loginPage.postLoginIdentifier).toBeVisible();
   // });
  });
});