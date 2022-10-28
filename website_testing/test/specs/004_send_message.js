const path = require('path');
const filePath = path.join(__dirname, '../data/water_img.jpg');

describe('TC_004 Send message with attachment', ()=>{
    it('Should open contact us link', async ()=>{
        await browser.url("/");

        //Click contact us link
        const contactUs = await $('#contact-link');
        await contactUs.click();

        //Check url
        await expect(browser).toHaveUrl('http://automationpractice.multiformis.com/index.php?controller=contact');

    });

    it('Should Contact us page have all required elements', async ()=>{

        //Subject heading dropdown exists
        const subjectHeading = await $('#id_contact');
        await expect(subjectHeading).toExist();

        //Email field is displayed
        const email = await $('#email');
        await expect(email).toBeDisplayed();

        //Order reference field is displayed
        const orderRef = await $('#id_order');
        await expect(orderRef).toBeDisplayed();

        //File upload exists
        const fileUpload = await $('#fileUpload');
        await expect(fileUpload).toExist();

        //Message field is displayed
        const message = await $('#message');
        await expect(message).toBeDisplayed(); 

        //Submit Message button is displayed and clickable
        const button = await $('#submitMessage');
        await expect(button).toBeDisplayed();
        await expect(button).toBeClickable();
    });

    it('Should select subject heading', async ()=>{

        //Select subject heading option 'Customer service'
        const subjectHeading = await $('#id_contact');
        await subjectHeading.selectByAttribute('value', '2');

        //Correct name is displayed in selector field
        const selectorField = await $('#uniform-id_contact > span');
        await expect(selectorField).toHaveText('Customer service');
    });

    it('Should enter email address', async ()=>{
        const email = await $('#email');
        await email.setValue('test@test.com');
    });

    it('Should enter order reference', async ()=>{
        const selectorField = await $('#id_order');
        await selectorField.setValue('123');
    });

    it('Should enter message', async ()=>{
        const message = await $('#message');
        await message.setValue('test test test');
    });

    it('Should upload a file', async ()=>{
  
        //Upload a file
        const remoteFilePath = await browser.uploadFile(filePath);
        const fileUpload = await $('#fileUpload');
        await fileUpload.setValue(remoteFilePath);

        //Correct filename is displayed
        const filename = await $(".filename");
        await expect(filename).toHaveText("water_img.jpg");
    });

    it('Should send a message', async ()=>{
        
        //Click Send button
        const button = await $('#submitMessage');
        await button.click();

        //Contact form doesn't exist anymore
        const contactForm = await $('.contact-form-box')
        const isExisting = await contactForm.isExisting();
        await expect(isExisting).toBe(false);
    });

    it('Should display success message', async ()=>{
        const alertMessage = await $('.alert-success');
        await expect(alertMessage).toHaveTextContaining('successfully sent');
    });

});