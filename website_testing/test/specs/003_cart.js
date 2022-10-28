describe('TC_003 Add product to the cart', ()=>{
    let productName = "";
    let reference = "";

    it('Should open product detail', async ()=>{
        await browser.url("/");

        //Click the Women tab.
        const firstTab = await $('#block_top_menu > .sf-menu > li');
        await firstTab.click();

        //Click on Dresses
        const dresses = await $('#subcategories > ul').$('aria/Dresses')
        await dresses.click();

        //Click on Summer Dresses
        const summer = await $('#subcategories > ul').$('aria/Summer Dresses')
        await summer.click();

        //Remember product name
        productName = await $('.product-container').$('.product-name').getText();

        //Click on the first available color
        const color = await $('.color_to_pick_list > li');
        await color.click();

        //Check url
        await expect(browser).toHaveUrlContaining('http://automationpractice.multiformis.com/index.php?id_product=');
    
        //Check product name is the same
        const name = await $('[itemprop=name]');
        const text = await name.getText();
        await expect(text).toBe(productName);

        //Remember reference
        reference = await $('#product_reference > span').getText();    
    });

    it('Should click on ‘Add to cart’ button', async ()=>{
        const addToCart = await $('#add_to_cart');
        await addToCart.waitForDisplayed({ timeout: 5000 });
        const button = await addToCart.$('[role=button]');
        await button.click();

        //Pop up displays
        const overlay = await $('#layer_cart');
        await expect(overlay).toBeDisplayed();

        //Success message is displayed
        const title = await $('span.title');
        await expect(title).toHaveTextContaining('successful');

        //Close pop up
        const closeButton = await overlay.$('.cross');
        await closeButton.click();
    });

    it('Should shopping cart have 1 item', async ()=>{
        const cart = await $('.shopping_cart');
        const quantity = await cart.$('.ajax_cart_quantity');
        await expect(quantity).toHaveText('1');
    }); 
    
    it('Should open shopping cart details', async ()=>{
        const cart = await $('.shopping_cart');
        await cart.click();

        //Check url
        await expect(browser).toHaveUrl('http://automationpractice.multiformis.com/index.php?controller=order');

    }); 

    it('Should shopping cart summary have one product', async ()=>{
        const summary = await $('#cart_summary');
        const rows = await summary.$('tbody').$$('tr');

        //Check cart summary has one row
        await expect(rows).toBeElementsArrayOfSize(1);
        const row = rows[0];

        //Check quantity is 1
        const quantity = await row.$('.cart_quantity_input');
        await expect(quantity).toHaveValue("1");

        //Check product name is same
        const name = await row.$('.product-name > a');
        await expect(name).toHaveText(productName);

        //Check product reference is same
        const ref = await row.$('.cart_ref');
        await expect(ref).toHaveTextContaining(reference);
    }); 

    
});