import { Locator, Page } from "@playwright/test";
import {test,expect} from "@playwright/test"


export class OrderFeatures{
    private page: Page
    private bookContainer : Locator
    private button : Locator
    private cart : Locator

    



    constructor(page:Page){
        this.page = page
        this.bookContainer = this.page.locator('mat-card-content')
        this.button = this.page.locator('button')
        this.cart = this.page.locator('[id="mat-badge-content-0"]')

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
    }


}
//export default OrderFeatures