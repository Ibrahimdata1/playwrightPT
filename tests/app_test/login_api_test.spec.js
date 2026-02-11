const { test, expect } = require('@playwright/test')
const allTestData = require('../../test-data/login-api-test-data.json')
const { apiUrlProfile, apiUrlPost } = require('../../constants/api')
test.describe.serial('Verify successful login with valid credentials via API', () => {
    let userId = null
    for (let i = 0; i < allTestData.title.length; i++) {
        const dataTitle = allTestData.title[i]
        const dataAuth = allTestData.auth[i]
        test(`${dataTitle.desc}`, async ({ request }) => {
            const respond = await request.post(apiUrlPost, {
                data: {
                    "email": `${dataAuth.email}`,
                    "password": `${dataAuth.pwd}`
                },
                headers: {
                    "Accept": "application/json",
                    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucHhkcm54cXZrcXVvbGRiZGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTIyNjAsImV4cCI6MjA4MjA2ODI2MH0._yN-SKf944LThmQHAh8xlYITJFHVdSVo_FYTxxPJlhU"
                }
            })
            const body = await respond.json()
            if (respond.ok()) {
                userId = body.user.id
            } else {
                throw body.msg
            }
            console.log('userId positive case', userId)
        })
    };
    for (let i = 0; i < allTestData.backendTest.length; i++) {
        test(`${allTestData.backendTest[i].desc}`, async ({ request }) => {
            console.log('backendTestTitle', allTestData.backendTest[i].desc)
            const email = allTestData.backendTest[i].email
            const pwd = allTestData.backendTest[i].pwd
            const respond = await request.post(apiUrlPost, {
                data: {
                    "email": email,
                    "password": pwd
                },
                headers: {
                    "Accept": "application/json",
                    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucHhkcm54cXZrcXVvbGRiZGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTIyNjAsImV4cCI6MjA4MjA2ODI2MH0._yN-SKf944LThmQHAh8xlYITJFHVdSVo_FYTxxPJlhU"
                }
            })
            await expect(respond).not.toBeOK()
        })
    }
    test("Get User with no token", async ({ request }) => {
        console.log('userId Get User', userId)
        const respond = await request.get(`${apiUrlProfile}?select=preferences&id=eq.${userId}`, {
            headers: {
                "Accept": "application/json",
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucHhkcm54cXZrcXVvbGRiZGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTIyNjAsImV4cCI6MjA4MjA2ODI2MH0._yN-SKf944LThmQHAh8xlYITJFHVdSVo_FYTxxPJlhU"
            }
        })
        const body = await respond.json()
        await expect(body.msg).toBe("No API key found in request")
    });
    test('Update User with no token', async ({ request }) => {
        const respond = await request.put(`${apiUrlProfile}?id=eq.${userId}`, {
            headers: {
                "Accept": "application/json",
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucHhkcm54cXZrcXVvbGRiZGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTIyNjAsImV4cCI6MjA4MjA2ODI2MH0._yN-SKf944LThmQHAh8xlYITJFHVdSVo_FYTxxPJlhU"
            },
            data: {
                "email": "failedexample@gmail.com",
                "password": "test12345"
            }
        })
        const body = await respond.json()
        console.log(body)
        await expect(body.msg).toBe('No API key found in request')
    });
    test('Delete User with no token', async ({ request }) => {
        const respond = await request.delete(`${apiUrlProfile}?id=eq.${userId}`, {
            headers: {
                "Accept": "application/json",
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucHhkcm54cXZrcXVvbGRiZGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTIyNjAsImV4cCI6MjA4MjA2ODI2MH0._yN-SKf944LThmQHAh8xlYITJFHVdSVo_FYTxxPJlhU"
            }
        })
        const body = await respond.json()
        console.log(body)
        console.log('userIdDelete',userId)
        await expect(body.msg).toBe('No API key found in request')
    })
})