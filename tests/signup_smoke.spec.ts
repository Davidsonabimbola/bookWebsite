import {test,expect, Page} from '@playwright/test'
import {faker} from '@faker-js/faker'
import FakerGenerator from '../Utilities/FakerGenerator'
import RegisterFeatures from '../pages/Registration_Feature'
import { before } from 'node:test'



interface oldUser_credentials{
    username: string,
    password: string
}

// const regUser: oldUser_credentials ={
//     username : 'Fredg',
//     password: '12.Nopassword.12'
//   }


enum LoginErrors{
    USERNAME_ERROR = 'Username is required',
    PASSWORD_ERROR = 'Password is required',
    FIRSTNAME_ERROR = 'First Name is required',
    LASTNAME_ERROR = 'Last Name is required'
  }

  let page:Page
  let new_user = FakerGenerator.generateUserDetails()
  let signup : RegisterFeatures

  test.beforeEach(async({page})=>{
    signup = new RegisterFeatures(page)
  })


test.describe('Smoke test for the core functionalities',()=>{
    test.only(' successful new user registration ', async ({ page }) => {
        //signup = new RegisterFeatures(page)
        await page.goto('/');
        await signup.clickLogin()
        await signup.registerButton()
        await signup.firstname_fill(new_user.firstName)
        await signup.lastname_fill(new_user.lastName)
        await signup.username_fill(new_user.userName)
        await signup.password_fill(new_user.password)
        await signup.verify_password_fill(new_user.password)
        await signup.male_radioButton()
        await signup.registerButton()

    })


    test('validate error message for first name filed during registration ', async ({ page }) => {
        //signup = new RegisterFeatures(page)
        await page.goto('/');
        await signup.clickLogin()
        await signup.registerButton()
        await signup.firstnameField_error(LoginErrors.FIRSTNAME_ERROR)
    })


    test('validate error message for unfilled filled during registration ', async ({ page }) => {
        //signup = new RegisterFeatures(page)
        await page.goto('/');
        await signup.clickLogin()
        await signup.registerButton()
        await signup.all_Field_error(LoginErrors.FIRSTNAME_ERROR,LoginErrors.LASTNAME_ERROR,LoginErrors.USERNAME_ERROR,LoginErrors.PASSWORD_ERROR)
        await signup.registerButton()
    })


})