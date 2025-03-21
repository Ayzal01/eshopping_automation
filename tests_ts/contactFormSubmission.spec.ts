import { test, expect } from '@playwright/test';
import fs from 'fs';  // Importing Node's file system module
import ContactPage from '../pages_ts/contactPage';

// Read users data from the JSON file
const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));  // Read and parse JSON data

test('Submit contact form for multiple users', async ({ page }) => {
  test.setTimeout(60000); //// Setting a timeout for the entire test

  const contactPage = new ContactPage(page); // Initialize the ContactPage class

  for (const user of users) {  // Loop through all users in the array

    await contactPage.gotoContactPage();  // Navigate to the contact page
    console.log(`Navigated to the contact page for user: ${user.name}`);

    await contactPage.fillMandatoryFields(user.name, user.email, user.message); // Fill the form fields with the current user's data
    console.log(`Filled form with Name: ${user.name}, Email: ${user.email}, Message: ${user.message}`);

    await contactPage.submitForm();  // Submit the form
    console.log(`Form submitted for user: ${user.name}`);

    const successMessage = await contactPage.validateSuccessfullSubmitionMessage();  // Validate the success message

    expect(successMessage?.trim() ?? '').toBe(`Thanks ${user.name}, we appreciate your feedback.`);      // Expect the success message to match the user's name

    console.log(`Thanks ${user.name}, we appreciate your feedback.`); // Log for all 5 users who submitted the contact form

  }
});
