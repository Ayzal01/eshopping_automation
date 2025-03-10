const { count, error } = require("console");

class ShoppingPage {


    constructor(page) {
        this.page = page;
        this.startShopping = this.page.locator("//a[@class='btn btn-success btn-large']");
        this.items = this.page.locator(".product.ng-scope");

        // This is an array of objects that tells us which items to buy and how many
        this.itemsToBuy = [{ name1: 'Stuffed Frog', counts: 2, selector: 'text=Buy' },
        { name1: 'Fluffy Bunny', counts: 5, selector: 'text=Buy' },
        { name1: 'Valentine Bear', counts: 3, selector: 'text=Buy' }]

    }


    async gotoShopingPage() {
        await this.page.goto("http://jupiter.cloud.planittesting.com");
        await this.startShopping.click();
    }

    async addItems() {
        await this.page.waitForLoadState('networkidle');

        for (const item of this.itemsToBuy) {
            const { name1, counts, selector } = item  // Destructuring
            console.log(`Preparing to add item: ${name1}, Quantity: ${counts}`);


            const itemCount = await this.items.count();
            console.log(`Found ${itemCount} items on the shopping page.`);

            for (let i = 0; i < itemCount; i++) {

                const itemName = await this.items.nth(i).locator('h4').textContent();
                const cleanItemName = itemName.trim()

                if (cleanItemName === name1) {
                    console.log(`Item '${name1}' found on the page. Adding to cart...`);
                    const buyItem = await this.items.nth(i).locator(selector);

                    for (let j = 0; j < counts; j++) {
                        await buyItem.scrollIntoViewIfNeeded();
                        await buyItem.click();
                        await this.page.waitForLoadState('networkidle');

                    }

                    break; // Stop the loop once the item is found and added


                }
            }

        }

    }



}

module.exports = ShoppingPage;