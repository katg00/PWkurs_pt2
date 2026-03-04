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

  async multipleClickOnTimerButton(multiple) {
    const buttonLoadTimeout = 7000;
    if (multiple) {
      await expect(this.timerButton).toBeVisible();
      await expect(this.timerButtonStatus).toHaveText(
        "Waiting for click",
      );

      await this.timerButton.click();
      await expect(this.timerButtonStatus).toHaveText("Processing...");
      await expect(this.timerButtonStatus).toHaveText("Complete", {
        timeout: buttonLoadTimeout,
      });
    } else {
      await expect(this.timerButtonStatus).toHaveText("Complete");
      await this.timerButton.click();
      await expect(this.timerButtonStatus).toHaveText("Processing...");
      await expect(this.timerButtonStatus).toHaveText("Complete", {
        timeout: buttonLoadTimeout,
      });
    }
  }
}

module.exports = { Playground };
