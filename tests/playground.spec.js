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

  const playground = new Playground(page);

  await playground.firstClickOnTimerButton(true);
  await playground.firstClickOnTimerButton(false);
});

test("Button with timer - multiple click", async ({ page }) => {

  const playground = new Playground(page);

  await playground.firstClickOnTimerButton(true);
  await playground.secondClickOnTimerButton(true);

  await playground.firstClickOnTimerButton(false);
  await playground.secondClickOnTimerButton(false);
});
