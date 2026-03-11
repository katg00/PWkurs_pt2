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

  await expect(playground.outputMessage).toContainText('Wprowadzono: test');

  //await page.waitForTimeout(5000);

})

test("Input random - insert random text and save", async ({page}) => {
  const playground = new Playground(page);

  await expect(playground.inputField).toBeEmpty();
  await playground.fillWithRandomTextAndSubmit();

  //await page.waitForTimeout(5000);

})

test("Fill populate field", async ({page}) => {
  const playground = new Playground(page);

  await expect(playground.inputField).toBeEmpty();
  await playground.fillWithRandomTextAndSubmit();

  //await page.waitForTimeout(5000);

  await page.getByTestId('msg-input').fill('');

  await playground.fillWithRandomTextAndSubmit();
  //await page.waitForTimeout(5000);

})

test('check radio buttons', async ({ page }) => {
    const playground = new Playground(page);

    await playground.selectRadioButton('a');
    await playground.selectRadioButton('b');
    await playground.selectRadioButton('c');

});

test("Checkbox - select one checkbox", async ({page}) =>{
  const playground = new Playground(page);

  await playground.selectOneCheckbox('1');
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 1/3');

  await playground.unselectCheckbox('1');
  await expect(playground.page.getByTestId('checkbox-count')).toContainText(`Zaznaczone: 0/3`);

    await playground.selectOneCheckbox('2');
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 1/3');

  await playground.unselectCheckbox('2');
  await expect(playground.page.getByTestId('checkbox-count')).toContainText(`Zaznaczone: 0/3`);

    await playground.selectOneCheckbox('3');
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 1/3');

  await playground.unselectCheckbox('3');
  await expect(playground.page.getByTestId('checkbox-count')).toContainText(`Zaznaczone: 0/3`);
})

test("Checkbox - select all checkboxes", async ({page}) =>{
  const playground = new Playground(page);

  await playground.selectOneCheckbox('1');
  await playground.selectOneCheckbox('2');
  await playground.selectOneCheckbox('3');
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 3/3');
})

test("Checkbox - select two checkboxes", async({page}) =>{
  const playground = new Playground(page);

  await playground.selectOneCheckbox('1');
  await playground.selectOneCheckbox('2');
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 2/3');

  await playground.unselectCheckbox('2');
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 1/3');
  await playground.selectOneCheckbox('3');
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 2/3');

  await playground.unselectCheckbox('1');
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 1/3');
  await playground.selectOneCheckbox('2');
  await expect(playground.checkboxOutput).toContainText('Zaznaczone: 2/3');
})



