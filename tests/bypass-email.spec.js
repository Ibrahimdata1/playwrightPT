const { test, expect } = require('@playwright/test')
const allTestData = require('../test-data/bypass-email-data.json')
test.describe('bypass-email', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerContext = page.getByRole('button', { name: /Create Account|สร้างบัญชี/i })
        await registerContext.click()
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
    for (const data of allTestData) {
        test(`${data.desc}`, async ({ page }) => {
            const emailBox = page.locator('input[type="email"]')
            await emailBox.fill(`${data.email}`)
            const pwdBox = page.locator('input[type="password"]')
            await pwdBox.fill(`${data.pwd}`)
            const createBtn = page.locator('div button[type="submit"]')
            await createBtn.click()
            const inputValue = await emailBox.inputValue()
            const validateMessage = await emailBox.evaluate(node => node.validationMessage)
            if (validateMessage) {
                await expect(validateMessage).not.toBe('')
            } else {
                await expect(inputValue).toBe(`${data.expected}`)
            }
        });
    }

})
