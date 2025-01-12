import {test,expect,Page} from '@playwright/test'
import LoginFeatures from '../pages/Login_Features'
import Credentials from '../Utilities/Credentials'
const book_Names = require('../Utilities/data/book_names.json')
let page :Page
let login : LoginFeatures


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
    const validCreds = Credentials.validCredentials()
    await page.goto('/');
    await login.clickLogin()
    await login.enter_UserName(validCreds.username)
    await login.enter_Password(validCreds.password)
    await login.clickLogin_again()

})

test.describe('Place order functionality',()=>{
    test('successful single ordering',async({page})=>{
        const book_container = page.locator('mat-card-content').filter({hasText:'Harry Potter and the Chamber of Secrets'})
        const bookLink = await book_container.locator('a')
        await expect(bookLink).toContainText('Harry Potter and the Chamber of Secrets')
       console.log(await bookLink.textContent()) 
        const price_container = await book_container.locator('p')
        console.log(await price_container.textContent())
        await book_container.locator('button').click()

    })





    test('successful multiple ordering', async ({ page }) => {
        for (const book of books.bookName) {
            // Locate the container for the current book
            const book_container = page.locator('mat-card-content').filter({ hasText: book });
    
            // Assert the book link contains the correct text
            const bookLink = book_container.locator('a');
            await expect(bookLink).toContainText(book);
            console.log(`Book Link Text: ${await bookLink.textContent()}`);
    
            // Log the price for the current book
            const price_container = book_container.locator('p');
            console.log(`Price for "${book}": ${await price_container.textContent()}`);
    
            // Click the button to add the book to the cart
            await book_container.locator('button').click();
            console.log(`Added "${book}" to the cart.`);
        }
        // regular expression is used as d+ because the number of items is always displayed after shopping_cart
        const shoppingCart_button =  page.locator('button').filter({hasText: /shopping_cart\d+/})
        await shoppingCart_button.click()
        const cartNumber = page.locator('[id="mat-badge-content-0"]')
        console.log(await cartNumber.textContent())
        const checkoutButton = await page.locator('button').filter({hasText:'CheckOut'})
        expect(await checkoutButton).toBeVisible()
    });
    
    
    



   

})

