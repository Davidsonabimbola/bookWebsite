import { Locator, Page } from "@playwright/test";
import {test,expect} from "@playwright/test"


export class OrderFeatures{
    private page: Page
    private bookContainer : Locator
    private button : Locator
    private cart : Locator
    private shipping_nameField : Locator
    private shipping_address1Field : Locator
    private shipping_address2Field : Locator
    private shipping_zipCodeField : Locator
    private shipping_stateField : Locator

    



    constructor(page:Page){
        this.page = page
        this.bookContainer = this.page.locator('mat-card-content')
        this.button = this.page.locator('button')
        this.cart = this.page.locator('[id="mat-badge-content-0"]')
        this.shipping_nameField = this.page.locator('input').nth(1)
        this.shipping_address1Field = this.page.locator('input').nth(2)
        this.shipping_address2Field = this.page.locator('input').nth(3)
        this.shipping_zipCodeField = this.page.locator('input').nth(4)
        this.shipping_stateField = this.page.locator('input').nth(5)

    }

    async select_a_single_Book(bookTitle:string){
        const book_container = this.bookContainer.filter({hasText:bookTitle})
        const bookLink = await book_container.locator('a')
        await expect(bookLink).toContainText('Harry Potter and the Chamber of Secrets')
       console.log(await bookLink.textContent()) 
        const price_container = await book_container.locator('p')
        const amount = await price_container.textContent()
        console.log(await amount)

        // Remove non-numeric characters
        const numericPart = await amount?.replace(/[^0-9.]/g, '')

        console.log(await numericPart)
        const price = numericPart? parseFloat(numericPart): 0
        console.log(await price)

        await book_container.locator('button').click()

    }




    async checkCart_and_checkout(){
        const shoppingCart_button =  this.button.filter({hasText: /shopping_cart\d+/})
        await shoppingCart_button.click()
        const cartNumber = this.cart
        console.log(await cartNumber.textContent())
        const checkoutButton = await this.button.filter({hasText:'CheckOut'})
        expect(await checkoutButton).toBeVisible()
        await checkoutButton.click()
        await expect(await this.page.locator('mat-card-title').filter({hasText:'Shipping address'})).toBeVisible()
    }


    async select_multiple_books(books:string[],Price_total:number[]){

        for (const book of books) {
            
            // Locate the container for the current book
            const book_container = this.bookContainer.filter({ hasText: book });
    
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

    }


    async shipmentDetails(name:string,address_line1:string,address_line2:string,zipcode:string,state:string){

        const shipping_nameField = this.shipping_nameField
        await shipping_nameField.fill(name)
        
        const shipping_address1Field = this.shipping_address1Field
        await shipping_address1Field.fill(address_line1)


        const shipping_address2Field = this.shipping_address2Field
        await shipping_address2Field.fill(address_line2)


        const shipping_zipCodeField = this.shipping_zipCodeField
        await shipping_zipCodeField.fill(zipcode)

        const shipping_stateField = this.shipping_stateField
        await shipping_stateField.fill(state)

        
    }

    async placeOrder(){
        const placeOrderButton = this.button.filter({hasText:' Place Order '})
        await placeOrderButton.click()

        await expect(await this.page.locator('mat-card-title').filter({hasText:'My Orders'})).toBeVisible()

    }


}
//export default OrderFeatures