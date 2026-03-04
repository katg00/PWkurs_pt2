// @ts-check
import { test, expect } from '@playwright/test';

test('main page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Testowy Sklep – Strona główna/);
  // await expect(page.getByRole('heading',{name: 'Strona główna'})).toBeVisible();
  // await expect(page.getByRole('heading',{name: 'Strona główna'})).toContainText('Strona główna');
});
