const { test, expect } = require('@playwright/test')
const { authPage } = require('../constants/urls')
const allTestData = require('../test-data/login-api-test-data.json')
const { apiUrlProfile, apiUrlPost } = require('../constants/api')
test.describe('Verify successful login with valid credentials via API', () => {
    var userId = null;
    for (const data of allTestData) {
        test(`${data.desc}`, async ({ request }) => {
            const respond = await request.post(apiUrlPost, {
                data: {
                    "email": `${data.email}`,
                    "password": `${data.pwd}`
                },
                headers: {
                    "Accept": "application/json",
                    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucHhkcm54cXZrcXVvbGRiZGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTIyNjAsImV4cCI6MjA4MjA2ODI2MH0._yN-SKf944LThmQHAh8xlYITJFHVdSVo_FYTxxPJlhU"
                }
            })
            const body = await respond.json()
            await expect(respond.status()).toBe(200)
            userId = body.user.id
            console.log(userId)
        })
    };
    test("Get User with no token", async ({ request }) => {
        const respond = await request.get(`${apiUrlProfile}?select=preferences&id=eq.${userId}`,{
            headers: {
            "Accept": "application/json",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucHhkcm54cXZrcXVvbGRiZGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTIyNjAsImV4cCI6MjA4MjA2ODI2MH0._yN-SKf944LThmQHAh8xlYITJFHVdSVo_FYTxxPJlhU"
        }})
        const body = await respond.json()
        console.log(userId)
        await expect(body.message).toBe("No API key found in request")
    });
    test('Update User with no token', async ({ request }) => {
        const respond = await request.put(`${apiUrlProfile}` + userId, {
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
        await expect(body.message).toBe('No API key found in request')
    });
    test('Delete User with no token', async ({ request }) => {
        const respond = await request.delete(`${apiUrlProfile}?id=eq.${userId}`,{
            headers: {
            "Accept": "application/json",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucHhkcm54cXZrcXVvbGRiZGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTIyNjAsImV4cCI6MjA4MjA2ODI2MH0._yN-SKf944LThmQHAh8xlYITJFHVdSVo_FYTxxPJlhU"
        }})
        const body = await respond.json()
        console.log(body)
        console.log(userId)
        await expect(body.message).toBe('No API key found in request')
    })
})