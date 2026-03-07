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

  await expect(playground.timerButtonStatus).toHaveText("Waiting for click");

  await playground.clickTimerButton(true);
  await playground.clickTimerButton(false);
});

test("Button with timer - multiple click", async ({ page }) => {

  const playground = new Playground(page);

  await expect(playground.timerButtonStatus).toHaveText("Waiting for click");

    await playground.clickTimerButton(true);
    await playground.clickTimerButton(true);
});

test("Input - insert text and save", async ({page}) => {
  const playground = new Playground(page);

  await expect(playground.inputField).toBeEmpty();
  await playground.insertText(true);

  //await page.waitForTimeout(5000);

})

test("Input random - insert random text and save", async ({page}) => {
  const playground = new Playground(page);

  await expect(playground.inputField).toBeEmpty();
  await playground.fillWithRandomTextAndSubmit(true);

  //await page.waitForTimeout(5000);

})

test("Fill populate field", async ({page}) => {
  const playground = new Playground(page);

  await expect(playground.inputField).toBeEmpty();
  await playground.fillWithRandomTextAndSubmit(true);

  //await page.waitForTimeout(5000);

  await page.getByTestId('msg-input').fill('');

  await playground.fillWithRandomTextAndSubmit(true);
  //await page.waitForTimeout(5000);

})

test("Radiobutton - select radiobutton A", async ({page}) =>{
  const playground = new Playground(page);

  await playground.selectRadiobuttonA(true);

})

test("Radiobutton - select radiobutton B", async ({page}) =>{
  const playground = new Playground(page);

  await playground.selectRadiobuttonB(true);
})

test("Radiobutton - select radiobutton C", async ({page}) =>{
  const playground = new Playground(page);

  await playground.selectRadiobuttonC(true);
})

test("Radiobutton - select all radiobuttons one by one", async ({page}) =>{
  const playground = new Playground(page);

  await playground.selectRadiobuttonA(true);
  await playground.selectRadiobuttonB(true);
  await playground.selectRadiobuttonC(true);

})

test("Checkbox - select checkbox 1", async ({page}) =>{
  const playground = new Playground(page);

  await playground.selectCheckbox1(true);
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 1/3');
})

test("Checkbox - select checkbox 2", async ({page}) =>{
  const playground = new Playground(page);

  await playground.selectCheckbox2(true);
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 1/3');
})

test("Checkbox - select checkbox 3", async ({page}) =>{
  const playground = new Playground(page);

  await playground.selectCheckbox3(true);
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 1/3');
})

test("Checkbox - zaznacz dwa checkboxy", async({page}) =>{
  const playground = new Playground(page);

  await playground.selectCheckbox1(true);
  await playground.selectCheckbox3(true);

  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 2/3');
})

test("Checkbox - zaznacz wszystkie checkboxy", async({page}) =>{
  const playground = new Playground(page);

  await playground.selectCheckbox1(true);
  await playground.selectCheckbox3(true);
  await playground.selectCheckbox2(true);

  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 3/3');
})


