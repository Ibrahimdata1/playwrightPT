const { test, expect } = require('@playwright/test')

test.describe('bypass-email',() => {
    test.beforeEach(async({page})=>{
        await page.goto('https://al-lubabah.vercel.app/auth')
    });
    test('injecting multiple @', async ({ page }) => {
        const registerContext = page.locator('p button[type="button"]')
        await registerContext.click()
        const EmailBox = page.getByPlaceholder('your@email.com')
        await EmailBox.fill('test@@gmail.com',)
        const PwdBox = page.getByRole('textbox', { name: '••••••••' })
        await PwdBox.click()
        await PwdBox.fill('test123456')
        const CreateAccountBtn = page.getByRole('button', { name: /Create Account|สร้างบัญชี/i })
        await CreateAccountBtn.click()
        const validateMessage = await EmailBox.evaluate(node => node.validationMessage)
        await expect(validateMessage).not.toBe('')
    });
    test('apply leading wthitespace',async({page})=>{
        const registerContext = page.locator('p').getByRole('button',{name:/Create Account|สร้างบัญชี/i})
        await registerContext.click()
        const emailBox = page.getByPlaceholder('your@email.com')
        await emailBox.fill(' user@gmail.com')
        const pwdBox = page.locator('div input[type="password"]')
        await pwdBox.click()
        await pwdBox.fill('test123456')
        const createBtn = page.locator('div button[type="submit"]')
        await createBtn.click()
        const inputValue =await emailBox.inputValue()
        const validateMessage = await emailBox.evaluate(node=>node.validationMessage)
        if (validateMessage){
            await expect(validateMessage).not.toBe('')
        }else{
            await expect(inputValue).toBe('user@gmail.com')
        }
    });
    test('apply trailing whitespace',async({page})=>{
        const registerContext = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await registerContext.click()
        const emailBox = page.getByRole('textbox',{name:'your@email.com'})
        await emailBox.fill('user@gmail.com ')
        const pwdBox = page.locator('input[type="password"]')
        await pwdBox.click()
        await pwdBox.fill('test123456')
        const createBtn = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await createBtn.click()
        const inputValue =await emailBox.inputValue()
        await expect(inputValue).toBe('user@gmail.com')
    });
    test('boundary whitespace around @',async({page})=>{
        const registerContext = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await registerContext.click()
        const emailBox = page.getByRole('textbox',{name:'your@email.com'})
        await emailBox.fill('user @ gmail.com')
        const pwdBox = page.locator('input[type="password"]')
        await pwdBox.click()
        await pwdBox.fill('test123456')
        const createBtn = page.locator('button[type="submit"]')
        await createBtn.click()
        const inputValue =await emailBox.inputValue()
        const validateMessage =await emailBox.evaluate(node=>node.validationMessage)
        if(validateMessage){
            await expect(validateMessage).not.toBe('')
        }else{
            await expect(inputValue).toBe('user@gmail.com')
        }
    })
})
