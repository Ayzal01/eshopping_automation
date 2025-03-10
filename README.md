Automated Testing for Web Application
Overview
This repository contains automated tests for a web application hosted at Jupiter Cloud Testing. The tests cover various user flows on the site, such as interacting with the contact form and performing shopping cart validation. These tests aim to verify the correctness of the website's functionality and ensure a smooth user experience.

Test Cases
Test Case 1: Contact Form Error Handling

Objective: Ensure error messages are correctly displayed when mandatory fields are not filled in.
From the home page, navigate to the contact page.
Click the submit button without filling in the mandatory fields.
Verify that the appropriate error messages are displayed for the empty fields.
Populate the mandatory fields with valid data.
Validate that the error messages are gone after filling in the required fields.

Test Case 2: Contact Form Successful Submission
Objective: Verify that the contact form can be successfully submitted when all required fields are populated.
From the home page, navigate to the contact page.
Populate all mandatory fields with valid data.
Click the submit button.
Validate that a successful submission message is displayed.
Note: Run this test 5 times to ensure a 100% pass rate.

Test Case 3: Shopping Cart Validation
Objective: Verify that the cart totals are correctly calculated and match the sum of individual product prices.
Add 2 Stuffed Frogs, 5 Fluffy Bunnies, and 3 Valentine Bears to the cart.
Navigate to the cart page.
Verify that the subtotal for each product is correct.
Verify the price for each product matches the expected price.
Ensure that the total matches the sum of the individual product subtotals.

Test Automation Setup
Prerequisites
To run these automated tests, you will need the following:

Node.js and npm (Node Package Manager) installed on your machine.
Playwright framework (for automating browser interactions).
A modern web browser (e.g., Google Chrome, Mozilla Firefox, or Microsoft Edge).
Installation Steps
Install Node.js and npm
If you don't have Node.js installed, you can download it from here.

Clone this repository to your local machine:

bash
Copy
git clone https://github.com/Ayzal01/eshopping_automation.git
Navigate to the project directory:

bash
Copy
cd your-repository
Install the necessary dependencies: First, you'll need to install Playwright along with any additional dependencies. Run the following command:

bash
Copy
npm install playwright
This will install Playwright and its dependencies for browser automation.

Install Playwright browsers: After installing Playwright, you need to download the necessary browser binaries (Chromium, Firefox, and WebKit). You can do this by running:

bash
Copy
npx playwright install
Run the tests using Chromium: To execute the tests using Chromium and with a single worker (to run tests sequentially), run the following command:

bash
Copy
npx playwright test --project=chromium --workers=1 --headed
Notes:
If you want to run the tests on a different browser (e.g., Firefox or WebKit), you can adjust the --project flag:
For Firefox: --project=firefox
For WebKit: --project=webkit

Playwright will run the tests in headless mode by default, which means the browser runs without a GUI, making it suitable for CI/CD pipelines.
Reporting
Test execution results will be displayed in the terminal or browser console. For any failures, a detailed error log will be available to help troubleshoot the issue.

Contributing
If you'd like to contribute to this project, please fork the repository and create a pull request. Ensure that your changes do not break existing functionality, and include relevant test cases for any new features.




