import { test, expect } from '@playwright/test'

import ContactPage from '../pages/contactPage';

test("Verify Contact Page Validation", async ({ page }) => {

  console.log("Test started: Verifying contact page validation");


  const contact = new ContactPage(page); // Initialize the ContactPage class
  await contact.gotoContactPage();  // Navigate to contact page
  await contact.submitForm(); // Submit the form
  console.log("Submit form button clicked");

  // Validate all the error messages
  const foremanErrorMessage = await contact.getForenameErrorMessage();
  console.log(`Forename error message: ${foremanErrorMessage}`);

  await expect(foremanErrorMessage).toBe("Forename is required");

  const emailErrorMessage = await contact.getEmailErrorMessage();
  console.log(`Email error message: ${emailErrorMessage}`);

  await expect(emailErrorMessage).toBe('Email is required');

  const messageErrorText = await contact.getMessageError();
  console.log(`Message error message: ${messageErrorText}`);

  await expect(messageErrorText).toBe('Message is required');


  await contact.fillMandatoryFields('Aysha', 'ayshamoshin@gmail.com', 'Hi, its my assessment task'); //Fill the form with mandatory fields

  //// Ensure that errors are hidden after form is filled
  await expect(contact.forenameError).toBeHidden();
  await expect(contact.emailError).toBeHidden();
  await expect(contact.messageError).toBeHidden();


});





