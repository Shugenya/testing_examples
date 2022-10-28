describe('TC_001 Search product', ()=>{
    it('Should click on search field', async ()=>{
        await browser.url("/");
        
        const search = await $('#search_query_top');
        await search.click();
        await expect(search).toBeFocused();
    });

    it('Should verify suggestion list', async ()=>{
        const search = await $('#search_query_top');

        //Type ‘dress’
        await search.setValue('dress');
        const suggestions = await browser.waitUntil(async () => {
            const elems = await $$('.ac_results li');
            if (elems.length === 0) {
                return false;
            }
            return elems;
        }, 
        {
            timeoutMsg: 'Search suggestions were not found'
        }
        );
  
        //Check suggestion list size
        await expect(suggestions).toBeElementsArrayOfSize({ gte: 1 });
    });   

    it('Should click on search icon', async ()=>{

        const searchIcon = await $('.button-search'); 
        await searchIcon.click();
        const productList = await $('#product_list');
        await expect(productList).toBeDisplayed();
    }); 

    it('Should all products have image, name, price, color list and availability ', async ()=>{
        const productList = await $('#product_list');
        const products = await productList.$$('li.ajax_block_product');

        for(let index = 0; index < products.length; index++) {
            const product = products[index];

            //Product image
            const image = await product.$('img');
            await expect(image).toExist();

            //Product name
            const name = await product.$('.product-name');
            await expect(name).toExist();

            //Price
            const price = await product.$('.product-price');
            await expect(price).toExist();

            //Available color indicators
            const colorList = await product.$('.color_to_pick_list');
            await expect(colorList).toExist();
            
            //Availability label
            const availability = await product.$('.availability');
            await expect(availability).toExist();
        }
    }); 

    it('Should all products be dresses', async ()=>{
        const productList = await $('#product_list');
        const products = await productList.$$('li.ajax_block_product');

        for(let index = 0; index < products.length; index++) {
            const product = products[index];

            //Product name
            const name = await product.$('.product-name');
            await expect(name).toHaveTextContaining('dress', {ignoreCase: true});
         }
    }); 
});