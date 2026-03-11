import { expect } from "@playwright/test";
export class EmailField {
    constructor(page) {
        this.page = page;
        this.emailSection = this.page.getByRole('region', { name: 'Email Input' })
        this.emailField = this.page.getByTestId('email-input');
        this.emailSubmitButton = this.page.getByTestId('email-submit');
        this.emailValidationField = this.page.getByTestId('email-validation');
        this.successMessage = 'Poprawny email';
        this.failureMessage = 'Niepoprawny email';
    }
    async fillEmailField(email) {
        await this.emailField.fill(email);
    }
    async clickSubmitButton() {
        await this.emailSubmitButton.click();
    }

}
module.exports = { EmailField }