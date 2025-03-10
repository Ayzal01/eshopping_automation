class CartPage {

    constructor(page) {
        this.page = page;

        this.cartButton = this.page.locator('text =Cart');
        this.cartPage = this.page.locator('table.table-striped.cart-items');
        this.row = this.page.locator("//tr[@class='cart-item ng-scope']").first();
        this.price = this.page.locator('tr.cart-item.ng-scope td:nth-child(2).ng-binding');
        this.subTotal = this.page.locator('tbody td:nth-child(4).ng-binding');
        this.total = this.page.locator("//strong[@class='total ng-binding']");
        this.itemsName = this.page.locator("td:nth-child(1).ng-binding");

        // This is an array of objects that tells us which items and how many
        this.itemsToBuy = [{ name1: 'Stuffed Frog', counts: 2, selector: 'text=Buy' },
        { name1: 'Fluffy Bunny', counts: 5, selector: 'text=Buy' },
        { name1: 'Valentine Bear', counts: 3, selector: 'text=Buy' }];
    }

    async gotoCartPage() {
        await this.page.waitForLoadState('networkidle');
        await this.cartButton.click();
        await this.page.waitForLoadState('networkidle');
        console.log("Cart page loaded successfully.");
    }

    async verifyCart() {
        await this.page.waitForLoadState('networkidle');
        await this.cartPage.waitFor({ state: 'visible' });
        await this.row.waitFor({ state: 'visible' });

        const productNames = await this.itemsName.allTextContents();
        const productPrices = await this.price.allTextContents();
        const productsubtotals = await this.subTotal.allTextContents();
        const productsTotalAmount = await this.total.textContent();

        const displayedTotal = parseFloat(productsTotalAmount.replace('Total:', '').trim());

        return { productNames, productPrices, productsubtotals, displayedTotal };
    }
}

module.exports = CartPage;
