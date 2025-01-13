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
        await order.checkCart_and_checkout()
        await order.shipmentDetails(receiverDetails.name, receiverDetails.address_line1,
                 receiverDetails.address_line2,receiverDetails.zipcode, receiverDetails.state)
        await order.placeOrder()
   

    })




    test('successful multiple ordering', async ({ page }) => {

        let Price_total: number[] = []
        await order.select_multiple_books(books.bookName,Price_total)
        await order.checkCart_and_checkout()
        await order.shipmentDetails(receiverDetails.name, receiverDetails.address_line1,
            receiverDetails.address_line2,receiverDetails.zipcode, receiverDetails.state)
        await order.placeOrder()
        
    });
    
    
    



   

})

