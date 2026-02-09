const { test, expect } = require('@playwright/test')
const allTestData = require('../test-data/injecting-nonEng-data.json')
test.describe('injecting-nonEng', () => {
    test.beforeEach(async ({page, context }) => {
        await context.grantPermissions(['clipboard-read', 'clipboard-write'])
        await page.goto('https://al-lubabah.vercel.app/auth')
        const registerPage = page.getByRole('button', { name: /create account|สร้างบัญชี/i })
        await registerPage.click()
    })
    for (const data of allTestData) {
        test(`${data.desc}`, async ({ page }) => {
            const emailBox = page.locator('input[type="email"]')
            await emailBox.fill(`${data.email}`)
            const pwdBox = page.locator('input[type="password"]')
            await pwdBox.fill(`${data.pwd}`)
            const createBtn = page.locator('button[type="submit"]')
            await createBtn.click()
            const validateMessage = await emailBox.evaluate(node => node.validationMessage)
            await expect(validateMessage).not.toBe('')
        })
    }
    test('inject emoji', async ({ page }) => {
        const emailBox = page.locator('input[type="email"]')
        await emailBox.fill('user🔥@gmail.com')
        const pwdBox = page.locator('input[type="password"]')
        await pwdBox.fill('pass🔑123')
        const createBtn = page.locator('button[type="submit"]')
        await createBtn.click()
        const inputEmailVal = await emailBox.inputValue()
        const validateMessage = await emailBox.evaluate(node => node.validationMessage)
        if (!validateMessage) {
            await expect(inputEmailVal).toBe('user@gmail.com')
        } else {
            await expect(validateMessage).not.toBe('')
        }
    });
    test('copy-paste bypass', async ({ page }) => {
        const emailBox = page.locator('input[type="email"]')
        const emailCopy = 'randomxgmail.com'
        await page.evaluate(text => navigator.clipboard.writeText(text), emailCopy)
        await emailBox.focus()
        await page.keyboard.press('Control+V')
        const pwdBox = page.locator('input[type="password"]')
        await pwdBox.fill('test1123456')
        const createBtn = page.locator('button[type="submit"]')
        await createBtn.click()
        const validateMessage = await emailBox.evaluate(node => node.validationMessage)
        await expect(validateMessage).not.toBe('')
    });
})