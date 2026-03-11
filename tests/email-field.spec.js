// @ts-check
import { test, expect } from '@playwright/test';
import { Playground } from '../pages/playground';
import { EmailField } from '../pages/email-field';

test.beforeEach(async ({ page }) => {
  const playground = new Playground(page);
  await playground.navigateTo();
});

test('Email field - valid scenario', async ({ page }) => {
  const emailField = new EmailField(page);
  await expect(emailField.emailSection).toBeVisible();
  await emailField.fillEmailField('test@email.com');
  await emailField.clickSubmitButton();
  await expect(emailField.emailValidationField).toHaveText(emailField.successMessage);

});

test('Email field - only first part of email', async ({ page }) => {
  const emailField = new EmailField(page);
  await expect(emailField.emailSection).toBeVisible();
  await emailField.fillEmailField('test');
  await emailField.clickSubmitButton();
  await expect(emailField.emailValidationField).toHaveText(emailField.failureMessage);

});