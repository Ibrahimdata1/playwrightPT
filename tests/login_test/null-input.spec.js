const {test,expect} = require('@playwright/test')
const {authPage}= require('../../constants/urls')
test.describe('null-input',()=>{
    test('Leave the field blank',async({page})=>{
        await page.goto(authPage)
        const signinBtn = page.locator('button[type="submit"]')
        await signinBtn.click()
        const emailBox = page.locator('input[type="email"]')
        const validateMessage = await emailBox.evaluate(node=>node.validationMessage)
        await expect(validateMessage).not.toBe('')
    });
})