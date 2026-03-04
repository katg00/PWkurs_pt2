// @ts-check
import { test, expect } from "@playwright/test";
import { Playground } from "../pages/playground";

test.beforeEach(async ({ page }) => {
  const playground = new Playground(page);
  await playground.navigateTo();
});

test("Button section - button displays correct status after clicking", async ({
  page,
}) => {
  const playground = new Playground(page);

  await playground.clickButtonInGivenStatus(true);
  await playground.clickButtonInGivenStatus(false);
});

test("Button with timer - single click", async ({ page }) => {
  const buttonLoadTimeout = 7000; // button can be updated between 3 and 7 sec

  const playground = new Playground(page);

  await playground.multipleClickOnTimerButton(true);
});

test("Button with timer - multiple click", async ({ page }) => {
  // button can be updated between 3 and 7 sec

  const playground = new Playground(page);

  await playground.multipleClickOnTimerButton(true);
  await playground.multipleClickOnTimerButton(false);
});
