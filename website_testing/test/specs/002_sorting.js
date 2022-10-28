const {sortedNumbers, sortedStrings, areAllElementsAtEnd} = require('../utils/commons');
const {searchProduct, selectSortingOption} = require('../utils/product_helper');

describe('TC_002 Search results sorting', ()=>{

    async function getProductsList () {
        let productList = await $('#product_list');
        return await productList.$$('li.ajax_block_product');
    }

    async function getPricesList (productList) {
        let priceList = [];
        for(let index = 0; index < productList.length; index++) {
            const product = productList[index];
            const price = await product.$('.product-price').getHTML(false);
            priceList[index] = price.trim().replace('$','');
        } 
        return priceList;
    }

    async function getNamesList (productList) {
        let nameList = [];
        for(let index = 0; index < productList.length; index++) {
            const product = productList[index];
            const name = await product.$('.product-name').getHTML(false);
            nameList[index] = name.trim();
        } 
        return nameList;
    }

    async function getStockLevelList (productList) {
        let stockLevels = [];
        for(let index = 0; index < productList.length; index++) {
            const product = productList[index];
            const stockInfo = await product.$('.right-block .availability > span').getText();
            stockLevels[index] = stockInfo.trim();
        } 
        return stockLevels;
    }

    it("Should 'Sort by' field contain 8 options", async ()=>{
        await browser.url("/");

        //Search for a dress
        await searchProduct('dress');

        //Check Sort by options
        const sort = await $('#selectProductSort')
        await sort.waitForExist({ timeout: 5000 });
        const options = await sort.$$('option');
        await expect(options).toBeElementsArrayOfSize({ eq: 8 });
    });

    it("Should 'Price: lowest first' sort correctly", async ()=>{
        //Remember product count
        let productList = await getProductsList();
        const productCount = productList.length;

        //Select 'Price: lowest first' option
        await selectSortingOption('price:asc');

        //Same number of product as before sorting
        productList = await getProductsList();
        await expect(productList).toBeDisplayed();
        await expect(productList).toBeElementsArrayOfSize({ eq: productCount });

        //Check if products are sorted by price ascending 
        let priceList = await getPricesList(productList);
        const isSorted = sortedNumbers(priceList, true);
        await expect(isSorted).toBe(true);
    });   

    it("Should 'Price: highest first' sort correctly", async ()=>{

        //Select 'Price: highest first' option
        await selectSortingOption('price:desc');
    
        //Check if products are sorted by price descending 
        productList = await getProductsList();
        let priceList = await getPricesList(productList);
        const isSorted = sortedNumbers(priceList, false);
        await expect(isSorted).toBe(true);
    }); 

    it("Should 'Product name: A to Z' sort correctly", async ()=>{

        //Select 'Product name: A to Z' option
        await selectSortingOption('name:asc');
    
        //Check if products are sorted by name ascending 
        productList = await getProductsList();
        let namesList = await getNamesList(productList);
        const isSorted = sortedStrings(namesList, true);
        await expect(isSorted).toBe(true);
    }); 

    it("Should 'Product name: Z to A' sort correctly", async ()=>{

        //Select 'Product name: Z to A' option
        await selectSortingOption('name:desc');
    
        //Check if products are sorted by name descending 
        productList = await getProductsList();
        let namesList = await getNamesList(productList);
        const isSorted = sortedStrings(namesList, false);
        await expect(isSorted).toBe(true);
    }); 

    it("Should 'In stock' sort correctly", async ()=>{

        //Select 'In stock' option
        await selectSortingOption('quantity:desc');
    
        //Check if products are sorted by stock level descending (out of stock products are at the end) 
        productList = await getProductsList();
        let namesList = await getStockLevelList(productList);
        const allAtEnd = areAllElementsAtEnd(namesList, 'out of stock');
        await expect(allAtEnd).toBe(true);
    });    

});