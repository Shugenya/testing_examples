module.exports = {
    searchProduct: async function ( searchString){
        let search = await $('#search_query_top');
        await search.click();
        await search.setValue(searchString);
        let searchIcon = await browser.$('.button-search'); 
        await searchIcon.click();
    },
    selectSortingOption: async function (sortionOption){
        const sort = await $('#selectProductSort');
        await sort.waitForExist({ timeout: 5000 });
        await sort.selectByAttribute('value', sortionOption);
    }
};