import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { TariffPage } from '../pages/tariff-page';
import * as path from 'path';
import tariffData from '../test-data/tariff-data.json';

test.describe('Tariff Management', () => {
  let loginPage: LoginPage;
  let tariffPage: TariffPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    tariffPage = new TariffPage(page);

    await loginPage.navigate();
    await loginPage.login();
  }); 

  test('P1: should show validation message when creating a tariff code without a tariff', async ({ page }) => {
    await test.step('Navigate to Tariff Management', async () => {
      await tariffPage.gotoTariffManagement();
    });

    await test.step('Attempt to create a new tariff code and verify validation', async () => {
      await tariffPage.createTariffCode(tariffData.newTariffCode);
      await expect(tariffPage.validationMessage).toBeVisible();
    });
    
  });
});