import {test,expect,Page} from '@playwright/test'
import LoginFeatures from '../pages/Login_Features'
import Credentials from '../Utilities/Credentials'

let page: Page
let login : LoginFeatures
let credentials = Credentials

test.beforeEach(async({page})=>{
    login = new LoginFeatures(page)
  })

test.describe('to validate login features',()=>{
    test('successful login with valid credentials',async({page})=>{
    const validCreds = credentials.validCredentials()
    await page.goto('/');
    await login.clickLogin()
    await login.enter_UserName(validCreds.username)
    await login.enter_Password(validCreds.password)
    await login.clickLogin_again()
    })


    test('unsuccessful login with invalid credentials',async({page})=>{
      const invalidCreds = credentials.invalidCredentials()
      await page.goto('/');
      await login.clickLogin()
      await login.enter_UserName(invalidCreds.username)
      await login.enter_Password(invalidCreds.password)
      await login.clickLogin_again()
      })



})