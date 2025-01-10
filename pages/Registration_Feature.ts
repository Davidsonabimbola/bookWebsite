import { Locator, Page } from "@playwright/test";
import {test,expect} from "@playwright/test"


class RegisterFeatures{
   private  page: Page
   private firstName_field : Locator
   private lastName_field : Locator
   private userName_field : Locator
   private password_field : Locator
   private verify_password_field : Locator
   private male_radio_button : Locator
   private registerButton_field : Locator
   

   constructor(page:Page){
    this.page = page;
    this.firstName_field = this.page.locator('[id="mat-input-2"]');
    this.lastName_field = this.page.locator('[id="mat-input-3"]')
    this.userName_field = this.page.locator('[id="mat-input-4"]')
    this.password_field = this.page.locator('[id="mat-input-5"]')
    this.verify_password_field = this.page.locator('[id="mat-input-6"]')
    this.male_radio_button  = this.page.locator('[id="mat-radio-2-input"]')
    this.registerButton_field = this.page.getByRole('button',{name: ' Register '})
    
    
   }


   async clickLogin(){
    console.log('Checking if Login button is visible...')
    const loginButton = this.page.getByRole('button',{name: ' Login '})
    await expect( await loginButton).toBeVisible()
    await loginButton.click()
   }

   async registerButton(){
    const registerButton = this.registerButton_field
  await expect( await registerButton).toBeVisible()
  await registerButton.click()
  console.log('Register button clicked...');
   }


   async firstname_fill(firstName:string){
   await this.firstName_field.fill(firstName)
    console.log('field filled successfully...');
   }

  
   async lastname_fill(lastName:string){
    await this.lastName_field.fill(lastName)
    console.log('field filled successfully...');
    
   }

   async username_fill(userName:string){
        await this.userName_field.fill(userName)
        console.log('field filled successfully...');
   }

   async password_fill(password:string){
    await this.password_field.fill(password)
        console.log('field filled successfully...');
        await this.page.locator('mat-icon[matSuffix=""][data-mat-icon-type="font"]:has-text("visibility_off")').nth(0).click()
   }


   async verify_password_fill(password:string){
    await this.verify_password_field.fill(password)
    console.log('field filled successfully...');
   }

   async male_radioButton(){
    this.male_radio_button.check()
   }

   async firstnameField_error(errorMessage){
    await this.firstName_field.click()
    await this.lastName_field.click()
    const firstnameError = await this.page.getByText(errorMessage)
    expect(firstnameError).toBeVisible()
   }



   async all_Field_error(errorMessage_firstname,errorMessage_lastname,errorMessage_username,errorMessage_password){
    await this.firstName_field.click(errorMessage_firstname)
    await this.lastName_field.click(errorMessage_lastname)
    await this.userName_field.click(errorMessage_username)
    await this.password_field.click(errorMessage_password)
    await this.verify_password_field.click(errorMessage_password)
    await this.registerButton_field.click()
   }




}
export default RegisterFeatures

