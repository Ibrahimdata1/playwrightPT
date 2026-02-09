const {test,expect} = require('@playwright/test')
const {authPage} = require('../../constants/urls')
const allTestData = require('../../test-data/invalid-email-pattern-data.json')
test.describe('test invalid email pattern',()=>{
    test.beforeEach(async({page})=>{
        await page.goto(authPage)
    });
    for(const data of allTestData){
        test(`${data.desc}`,async({page})=>{
            const emailBox = page.locator('input[type="email"]')
            await emailBox.fill(`${data.email}`)
            const pwdBox = page.locator('input[type="password"]')
            await pwdBox.fill(`${data.pwd}`)
            const signinBtn = page.locator('button[type="submit"]')
            await signinBtn.click()
            const validateMessage = await emailBox.evaluate(node=>node.validationMessage)
            await expect(validateMessage).not.toBe('')
        });
    }
})