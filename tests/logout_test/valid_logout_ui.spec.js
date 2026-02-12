const { test, expect } = require('@playwright/test')
const { authPage } = require('../../constants/urls')
const validEmailPWd = require('../../test-data/valid-email-pattern-data.json')
test.describe.serial('Logout via UI Interactions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(authPage)
        const {email,pwd} = validEmailPWd[0]
        await page.locator('input[type="email"]').fill(email)
        await page.locator('input[type="password"]').fill(pwd)
        await page.locator('button[type="submit"]').click()
        const invalidLoginSign = page.getByRole('status', { name: /Login Failed|فشل تسجيل الدخول|เข้าสู่ระบบไม่สำเร็จ/i })
        await expect(invalidLoginSign).not.toBeVisible()
    })
    test('Logout via the main navigation sidebar', async ({ page }) => {
        await page.getByLabel('Settings').click()
        const signoutBtn = page.locator('span',{hasText:/Sign Out|تسجيل الخروج|ออกจากระบบ/i})
        await signoutBtn.click()
        const logoutSuccessSign = page.locator('span',{ hasText: /ออกจากระบบแล้ว|Signed Out/i })
        await expect(logoutSuccessSign).toBeVisible()
        await expect(page).toHaveURL(authPage)
    })
})