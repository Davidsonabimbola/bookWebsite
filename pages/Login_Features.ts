import {test,expect, Page, Locator} from "@playwright/test"


class LoginFeatures{

private page : Page
private loginButton : Locator
private userName_field : Locator
private password_field : Locator


constructor(page:Page){
this.page = page
this.loginButton = this.page.getByRole('button',{name:'Login'})
this.userName_field = this.page.locator('input[formcontrolname="username"]')
this.password_field = this.page.locator('input[formcontrolname="password"]')
}


async clickLogin(){
    await this.loginButton.click()
}

async enter_UserName(username:string){
    await this.userName_field.fill(username)
}

async enter_Password(password:any){
    await this.password_field.fill(password)
}

async clickLogin_again(){
    await this.loginButton.nth(1).click()
}



}
export default LoginFeatures