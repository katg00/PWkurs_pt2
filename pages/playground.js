import { expect } from "@playwright/test";

export class Playground {
  constructor(page) {
    this.page = page;
    this.url = "playground/";
    this.clickableButtonInitialState = this.page.getByRole("button", {
      name: "Click me",
    });
    this.clickableButtonClickState = this.page.getByRole("button", {
      name: "clicked",
    });
    this.clickablenButtonState = this.page.getByTestId("btn-state");

    this.initialStatus = "Status: clicked";
    this.clickedStatus = "Status: idle";

    this.timerButton = this.page.getByTestId("timer-btn");
    this.timerButtonStatus = this.page.getByTestId("timer-result");

    this.inputField = this.page.getByTestId("msg-input");
    this.inputButton = this.page.getByTestId("msg-send");
    this.outputMessage = this.page.getByTestId("msg-output");

    this.radiobuttonA = this.page.getByTestId('radio-a');
    this.radiobuttonB = this.page.getByTestId('radio-b');
    this.radiobuttonC = this.page.getByTestId('radio-c');
    this.radiobuttonOutput = this.page.getByTestId('radio-output');

    this.checkbox1 = this.page.getByTestId('chk-1');
    this.checkbox2 = this.page.getByTestId('chk-2');
    this.checkbox3 = this.page.getByTestId('chk-3');
    this.checkboxOutput = this.page.getByTestId('checkbox-count');
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  async clickButtonInGivenStatus(initial) {
    if (initial) {
      await this.clickableButtonInitialState.click();
      await expect(this.clickablenButtonState).toContainText(
        this.initialStatus,
      );
    } else {
      await this.clickableButtonClickState.click();
      await expect(this.clickablenButtonState).toContainText(
        this.clickedStatus,
      );
    }
  }

  async clickTimerButton(first) {
    const buttonLoadTimeout = 7000;
     
      await this.timerButton.click();
      await expect(this.timerButtonStatus).toHaveText("Processing...");

      await expect(this.timerButtonStatus).toHaveText("Complete", {timeout: buttonLoadTimeout});
  }

  async insertText(text) {

    await this.inputField.fill("test");

    await this.inputButton.click(); 

    await expect(this.outputMessage).toContainText('Wprowadzono: test');
  }

  async fillWithRandomTextAndSubmit(length = 10) {
    const randomText = Math.random().toString(36).substring(2, 2 + length);
    await this.inputField.fill(randomText);
    await this.inputButton.click();
    return randomText; // Zwracamy tekst, żeby test wiedział co zostało wpisane
  }

  async selectRadioButton(option) {
    await this.page.getByTestId(`radio-${option}`).check();

    const optionToUpperCase = option.toUpperCase();
        
    await expect(this.page.getByTestId('radio-output')).toContainText(`Wybrano: Opcja ${optionToUpperCase}`);
  }

  async selectOneCheckbox(option) {
    await expect(this.page.getByTestId(`chk-${option}`)).not.toBeChecked();
    await this.page.getByTestId(`chk-${option}`).check();

    await expect(this.page.getByTestId(`chk-${option}`)).toBeChecked();
  }

  async unselectCheckbox(option) {
    await expect(this.page.getByTestId(`chk-${option}`)).toBeChecked();
    await this.page.getByTestId(`chk-${option}`).uncheck();
    await expect(this.page.getByTestId(`chk-${option}`)).not.toBeChecked();
  }
}

module.exports = { Playground };
