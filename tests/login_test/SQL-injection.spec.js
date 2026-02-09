const { test, expect } = require('@playwright/test')
const { authPage } = require('../../constants/urls')
const allTestData = require('../../test-data/SQL-injection-data.json')
test.describe('SQL Injection on Login Field', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(authPage)
    });
    for (const data of allTestData) {
        test(`${data.desc}`, async ({ page }) => {
            const emailBox = page.locator('input[type="email"]')
            await emailBox.fill(`${data.email}`)
            const pwdBox = page.locator('input[type="password"]')
            await pwdBox.fill(`${data.pwd}`)
            const signinBtn = page.locator('button[type="submit"]')
            const validationError = page.locator('li[role="status"]>>div.font-semibold', { hasText: /Validation Error|ข้อผิดพลาดในการตรวจสอบ|خطأ في التحقق/i })
            let isRequest = false
            let request = null
            page.on('request', req => {
                if (req.url().includes('/auth/v1/token')) {
                    isRequest = true;
                    request = req;
                }
            })
            await signinBtn.click()
            await expect(page.locator('li[role="status"]')).toBeVisible()
            if (isRequest) {
                const postData = await JSON.parse(request.postData())
                await expect(typeof postData.email).toBe('string')
                const dashboardInfo = page.locator('h3', { hasText: /Are you fasting today?|วันนี้คุณถือศีลอดหรือไม่?|هل أنت صائم اليوم؟/i })
                await expect(dashboardInfo).not.toBeVisible({ timeout: 5000 })
                const validateMessage = page.locator('li[role="status"]>>div.font-semibold', { hasText: /Login Failed|เข้าสู่ระบบไม่สำเร็จ|فشل تسجيل الدخول/i })
                await expect(validateMessage).toBeVisible()
            } else {
                await expect(validationError).toBeVisible()
            }
        })
    }
})