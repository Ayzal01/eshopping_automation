import { test, expect } from '@playwright/test';
import ShoppingPage from '../pages/shopping';
import CartPage from '../pages/cartPage';

test("Verify Cart Page Pricing and Total Calculation", async ({ page }) => {

    const shopingpageobject = new ShoppingPage(page);  // Initialize the ShoppingPage class
    await shopingpageobject.gotoShopingPage();   // Navigate to the shopping page
    await shopingpageobject.addItems();          // Add items to the cart
   

    const cartPageObject = new CartPage(page);  // Initialize the CartPage class
    await cartPageObject.gotoCartPage();       // Navigate to the CartPage

    const { productNames, productPrices, productsubtotals, displayedTotal } = await cartPageObject.verifyCart(); // Capture the cart details
   

    let totalCalculated = 0;
    let totalExpected = 0;

    // Loop through the cart items and validate their prices and subtotals
    for (let i = 0; i < cartPageObject.itemsToBuy.length; i++) {

        const item = cartPageObject.itemsToBuy[i];

        const productName = await productNames[i].trim();
        const productPrice = parseFloat(productPrices[i].replace('$', '').trim());
        const productSubtotal = parseFloat(productsubtotals[i].replace('$', '').trim());

        // Log the product details for debugging purposes (simplified)
        console.log(`Validating item: ${productName}, Price: ${productPrice}, Subtotal: ${productSubtotal}`);

        expect(productName).toBe(item.name1);  // Validate product name
        expect(productPrice * item.counts).toBe(productSubtotal);  // Validate subtotal

        totalExpected += productPrice * item.counts;
        totalCalculated += productSubtotal;
    }

    // Validate total price
    expect(displayedTotal).toBe(totalCalculated);    

    console.log("Validation complete. Total Expected = ", totalExpected, " Total Calculated = ", totalCalculated);
});
