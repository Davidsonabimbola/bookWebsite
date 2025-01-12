import {test,expect,Page} from '@playwright/test'
import LoginFeatures from '../pages/Login_Features'
import Credentials from '../Utilities/Credentials'
import { Shipment } from '../Utilities/ShippingDetails'
import { OrderFeatures } from '../pages/Order_Features'
//import {orderFeatures} from '../pages/Order_Features'
const book_Names = require('../Utilities/data/book_names.json')
let page :Page
let login : LoginFeatures
let order: OrderFeatures
let receiverDetails = Shipment.generateShipmentDetails()


type products = {
    bookName : string[]
}

//  const books:products = {
//     bookName : [
//         "Harry Potter and the Chamber of Secrets",
//         "Harry Potter and the Prisoner of Azkaban",
//         "Harry Potter and the Order of the Phoenix"
    
//     ]
//  }



const books:products = {
    bookName : book_Names.map((item:{book_name:string}) => item.book_name)
 }


 

test.beforeEach(async({page})=>{
    login = new LoginFeatures(page)
    order = new OrderFeatures(page)
    const validCreds = Credentials.validCredentials()
    await page.goto('/');
    await login.clickLogin()
    await login.enter_UserName(validCreds.username)
    await login.enter_Password(validCreds.password)
    await login.clickLogin_again()
    

})

test.describe('Place order functionality',()=>{
    test('successful single ordering',async({page})=>{
        
        let bookTitle = 'Harry Potter and the Chamber of Secrets'
        await order.select_a_single_Book(bookTitle)
   

        const shoppingCart_button =  page.locator('button').filter({hasText: /shopping_cart\d+/})
        await shoppingCart_button.click()
        const cartNumber = page.locator('[id="mat-badge-content-0"]')
        console.log(await cartNumber.textContent())
        const checkoutButton = await page.locator('button').filter({hasText:'CheckOut'})
        expect(await checkoutButton).toBeVisible()

        // checkout button
        await checkoutButton.click()
        await expect(await page.locator('mat-card-title').filter({hasText:'Shipping address'})).toBeVisible()


        const shipping_nameField = page.locator('input').nth(1)
        await shipping_nameField.fill(receiverDetails.name)
        
        const shipping_address1Field = page.locator('input').nth(2)
        await shipping_address1Field.fill(receiverDetails.address_line1)


        const shipping_address2Field = page.locator('input').nth(3)
        await shipping_address2Field.fill(receiverDetails.address_line2)


        const shipping_zipCodeField = page.locator('input').nth(4)
        await shipping_zipCodeField.fill(receiverDetails.zipcode)

        const shipping_stateField = page.locator('input').nth(5)
        await shipping_stateField.fill(receiverDetails.state)

        const placeOrderButton = page.locator('button').filter({hasText:' Place Order '})
        await placeOrderButton.click()

        await expect(await page.locator('mat-card-title').filter({hasText:'My Orders'})).toBeVisible()
        //await expect(await page.locator('input[placeholder="Search"]')).toBeVisible()

    })




    test('successful multiple ordering', async ({ page }) => {

        let Price_total: number[] = []
        for (const book of books.bookName) {
            
            // Locate the container for the current book
            const book_container = page.locator('mat-card-content').filter({ hasText: book });
    
            // Assert the book link contains the correct text
            const bookLink = book_container.locator('a');
            await expect(bookLink).toContainText(book);
            console.log(`Book Link Text: ${await bookLink.textContent()}`);
    
            // Log the price for the current book
            const price_container = book_container.locator('p');



            const amount = await price_container.textContent()

            if (!amount){
                console.log(`Price content is null for "${book}"`)
                continue
            }
            // Remove non-numeric characters
            const numericPart = await amount?.replace(/[^0-9.]/g, '')
 

        console.log(await numericPart)
        const price = numericPart? parseFloat(numericPart): 0
        console.log(`Price for "${book}": ${price}`)


        Price_total.push(price)

        
            // Click the button to add the book to the cart
            await book_container.locator('button').click();
            console.log(`Added "${book}" to the cart.`);


            const finalPrice = Price_total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
         console.log(`Final Total Price: ${finalPrice}`);
    
        }

        


        // regular expression is used as d+ because the number of items is always displayed after shopping_cart
        const shoppingCart_button =  page.locator('button').filter({hasText: /shopping_cart\d+/})
        await shoppingCart_button.click()
        const cartNumber = page.locator('[id="mat-badge-content-0"]')
        console.log(await cartNumber.textContent())
        const checkoutButton = await page.locator('button').filter({hasText:'CheckOut'})
        expect(await checkoutButton).toBeVisible()

        // checkout button
        await checkoutButton.click()
        await expect(await page.locator('mat-card-title').filter({hasText:'Shipping address'})).toBeVisible()


        const shipping_nameField = page.locator('input').nth(1)
        await shipping_nameField.fill(receiverDetails.name)
        
        const shipping_address1Field = page.locator('input').nth(2)
        await shipping_address1Field.fill(receiverDetails.address_line1)


        const shipping_address2Field = page.locator('input').nth(3)
        await shipping_address2Field.fill(receiverDetails.address_line2)


        const shipping_zipCodeField = page.locator('input').nth(4)
        await shipping_zipCodeField.fill(receiverDetails.zipcode)

        const shipping_stateField = page.locator('input').nth(5)
        await shipping_stateField.fill(receiverDetails.state)

        const placeOrderButton = page.locator('button').filter({hasText:' Place Order '})
        await placeOrderButton.click()

        await expect(await page.locator('mat-card-title').filter({hasText:'My Orders'})).toBeVisible()
        await expect(await page.locator('input[placeholder="Search"]')).toBeVisible()


    });
    
    
    



   

})

