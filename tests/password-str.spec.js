const { test, expect } = require('@playwright/test')
const allTestData = require('../test-data/password-str-data.json')
test.describe('Password Strength & Complexity Requirements', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerPage = page.getByRole('button', { name: /create account|สร้างบัญชี/i })
        await registerPage.click()
    });
    for (const data of allTestData) {
        test(`${data.desc}`, async ({ page }) => {
            const emailBox = page.locator('input[type="email"]')
            await emailBox.fill(`${data.email}`)
            const pwdBox = page.locator('input[type="password"]')
            await pwdBox.fill(`${data.pwd}`)
            const createBtn = page.locator('button[type="submit"]')
            await createBtn.click()
            const validateMessage = await pwdBox.evaluate(node => node.validationMessage)
            if (`${data.type}` === "positive") {
                await expect(validateMessage).toBe('')
            } else {
                await expect(validateMessage).not.toBe('')
            }
        });
    }
})