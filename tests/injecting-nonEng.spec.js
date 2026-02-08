const {test,expect}  = require('@playwright/test')

test.describe('injecting-nonEng',()=>{
    test('injecting Thai',async({page})=>{
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerPage = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await registerPage.click()
        const emailBox = page.getByPlaceholder("your@email.com")
        await emailBox.fill('ทดสอบ@gmail.com')
        const pwdBox = page.locator('input[type="password"]')
        await pwdBox.fill('รหัสผ่าน1234')
        const createBtn = page.locator('button[type="submit"]')
        await createBtn.click()
        const validateMessage =await emailBox.evaluate(node => node.validationMessage)
        await expect(validateMessage).not.toBe('')
    }),
    test('injecting Mix Language',async({page})=>{
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerPage = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await registerPage.click()
        const emailBox = page.locator('input[type="email"]')
        await emailBox.fill('user_ไทย@domain.com')
        const pwdBox = page.locator('input[type="password"]')
        await pwdBox.fill('Admin_ภาษาไทย')
        const createBtn = page.locator('button[type="submit"]')
        await createBtn.click()
        const validateMessage =await emailBox.evaluate(node=>node.validationMessage)
        await expect(validateMessage).not.toBe('')
    }),
    test('inject emoji',async({page})=>{
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerPage = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await registerPage.click()
        const emailBox  = page.locator('input[type="email"]')
        await emailBox.fill('user🔥@gmail.com')
        const pwdBox = page.locator('input[type="password"]')
        await pwdBox.fill('pass🔑123')
        const createBtn = page.locator('button[type="submit"]')
        await createBtn.click()
        const inputEmailVal =await emailBox.inputValue()
        const validateMessage =await emailBox.evaluate(node=>node.validationMessage)
        if(!validateMessage){
            await expect(inputEmailVal).toBe('user@gmail.com')
        }else{
            await expect(validateMessage).not.toBe('')
        }
    })
})