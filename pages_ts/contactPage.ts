import { Locator, Page } from "playwright";
export class ContactPage {
    Page: Page;
    forenameField: Locator;
    emailField: Locator;
    messageField: Locator;
    forenameError: Locator;
    emailError: Locator;
    messageError: Locator;
    contactButton: Locator;
    submitButton: Locator;
    successMessage: Locator;
    state: string;



    constructor(Page: Page) {

        this.Page = Page;
        this.forenameField = this.Page.locator('#forename');
        this.emailField = this.Page.locator('#email');
        this.messageField = this.Page.locator('#message');
        this.forenameError = this.Page.locator('#forename-err');
        this.emailError = this.Page.locator('#email-err');
        this.messageError = this.Page.locator('#message-err');
        this.contactButton = this.Page.locator('text=Contact');
        this.submitButton = this.Page.locator('text=Submit');
        this.successMessage = this.Page.locator('.alert.alert-success');
    }

    async gotoContactPage() {
        await this.Page.goto("http://jupiter.cloud.planittesting.com");
        await this.contactButton.click();
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async getForenameErrorMessage() {
        return await this.forenameError.textContent();
    }

    async getEmailErrorMessage() {
        return await this.emailError.textContent();
    }

    async getMessageError() {
        return await this.messageError.textContent();
    }

    async fillMandatoryFields(name, email, message) {
        await this.forenameField.fill(name);
        await this.emailField.fill(email);
        await this.messageField.fill(message);
        await this.Page.waitForTimeout(500); // Add a brief wait to simulate user interaction.
    }


    async validateSuccessfullSubmitionMessage() {
        await this.successMessage.waitFor({ state: 'visible', timeout: 250000 });
        const successMessage = await this.successMessage.textContent();
        return successMessage;
    }

}
export default ContactPage;
