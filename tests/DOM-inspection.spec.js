const {test,expect} = require('@playwright/test')
test.describe('DOM-inspection',()=>{
    test('Visual Masking Checked',async({page})=>{
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerPage = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await registerPage.click()
        const emailBox = page.locator('input[type="email"]')
        await emailBox.fill('example1@gmail.com')
        const pwdBox = page.locator('input[type="password"]')
        await pwdBox.fill('test123456')
        await expect(pwdBox).toHaveValue('test123456')
        await pwdBox.screenshot({path:'passwordMasked.png'})
        const outerHTML = await pwdBox.evaluate(node=>node.outerHTML)
        const pwdInputValue = await pwdBox.inputValue()
        await expect(outerHTML).not.toMatch(new RegExp(pwdInputValue,'i'))
    }),
    test('inspecting input type password',async({page})=>{
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerPage = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await registerPage.click()
        const emailBox = page.locator('input[type="email"]')
        await emailBox.fill('example1@gmail.com')
        const pwdBox = page.locator('input[type="password"]')
        await pwdBox.fill('passwordtest')
        await expect(pwdBox).toHaveValue('passwordtest')
        await expect(pwdBox).toHaveAttribute('type','password')
    });
    test('inspect data exposure while typing',async({page})=>{
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerPage = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await registerPage.click()
        const emailBox = page.locator('input[type="email"]')
        await emailBox.fill('example1@gmail.com')
        const pwdBox = page.locator('input[type="password"]')
        const passWord = 'passwordtest'
        let accomPwd = ''
        for(const char of passWord){
            await pwdBox.press(char)
            accomPwd += char
            const htmlVal =await pwdBox.getAttribute('value')
            await expect(htmlVal).not.toContain(accomPwd)
        }
        await expect(pwdBox).toHaveAttribute('type','password')
    });
    test('copy/cut masked dotted',async({page,context})=>{
        await context.grantPermissions(['clipboard-read','clipboard-write'])
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerPage = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await registerPage.click()
        const emailBox = page.locator('input[type="email"]')
        await emailBox.fill('example1@gmail.com')
        const pwdBox = page.locator('input[type="password"]')
        await pwdBox.fill('test123456')
        await pwdBox.focus()
        await page.keyboard.press('Control+A')
        await page.keyboard.press('Control+C')
        const clipBoardText =await page.evaluate(()=>navigator.clipboard.readText())
        await expect(clipBoardText).not.toMatch(/test123456/i)
    });
    test('toggle password',async({page})=>{
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerPage = page.getByRole('button',{name:/create account|สร้างบัญชี/i})
        await registerPage.click()
        const pwdBox = page.getByRole('textbox',{name:/••••••••/i})
        await pwdBox.fill('testpassword1234')
        const eyeBtn = page.getByRole('button',{name:/Show password|hide password/i})
        await expect(pwdBox).toHaveAttribute('type','password')
        await eyeBtn.click()
        await expect(pwdBox).toHaveAttribute('type','text')
        await eyeBtn.click()
        await expect(pwdBox).toHaveAttribute('type','password')
    })
})