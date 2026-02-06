const {test,expect} = require('@playwright/test')
const {chromium,firefox,webkit}= require('playwright')
test('check google now',async()=>{
    const userDataDir  = 'C:/Users/ibrahimken/automation_test_profile'
    //chromeTest 
    const chromeContext =await chromium.launchPersistentContext(userDataDir,{
        headless:false,
    })
    const pageChrome = chromeContext.pages()[0]
    await pageChrome.goto('https://www.google.com')
    const dismissButton = pageChrome.getByRole('button',{name: /ไม่สนใจ|No thanks/i})
     try {
        await dismissButton.waitFor({state:'visible',timeout:1000})
        if(dismissButton.isVisible()){
        await dismissButton.click()
    }
    } catch (error) {
        console.log(error)
    }
    
    const searchBoxChrome = pageChrome.locator('textarea[name="q"]')
    await searchBoxChrome.hover()
    await searchBoxChrome.click()
    await searchBoxChrome.pressSequentially('parrot',{delay:200})
    await pageChrome.waitForTimeout(1000)
    await searchBoxChrome.press('Enter')
    await pageChrome.getByRole('link',{name:/Image|รูปภาพ/i}).first().click()
    await pageChrome.waitForTimeout(1000)
    const firstImgChrome =pageChrome.locator('img[alt*="parrot" i]').first()
    await firstImgChrome.click()
    await pageChrome.waitForTimeout(5000)
    await chromeContext.close()
    //firefoxTest
    const ffContext =await firefox.launchPersistentContext(userDataDir+'_ff',{
        headless:false,
        firefoxUserPrefs: {
        'dom.webdriver.enabled': false,
        'useAutomationExtension': false,
    },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0'
    })
    const ffPage = ffContext.pages()[0]
    await ffPage.goto('https://google.com')
    const searchBoxFF = ffPage.locator('textarea[name="q"]')
    await searchBoxFF.hover()
    await searchBoxFF.click()
    await searchBoxFF.pressSequentially('parrot',{delay:200})
    await ffPage.waitForTimeout(1000)
    await searchBoxFF.press('Enter')
    await ffPage.getByRole('link',{name:/Image|รูปภาพ/i}).first().click()
    const firstImgFF = ffPage.locator('img[alt*="parrot" i]').first()
    await firstImgFF.click()
    await ffPage.waitForTimeout(5000)
    await ffContext.close()
    //webkit
    const webkitContext =await webkit.launchPersistentContext(userDataDir+'_wk',{
        headless:false
    })
    const webkitPage = webkitContext.pages()[0]
    await webkitPage.goto('https://google.com')
    const searchBoxWebkit = webkitPage.locator('textarea[name="q"]')
    await searchBoxWebkit.hover()
    await searchBoxWebkit.click()
    await searchBoxWebkit.pressSequentially('parrot',{delay:200})
    await webkitPage.waitForTimeout(1000)
    await searchBoxWebkit.press('Enter')
    await webkitPage.getByRole('link',{name:/parrot/i}).first().click()
    const firstImgWebkit = webkitPage.locator('img[alt*="parrot" i]').first()
    await firstImgWebkit.click()
    await webkitPage.waitForTimeout(5000)
    await webkitContext.close()
})