import {test,expect} from '@playwright/test';
import { Http2ServerResponse } from 'http2';

test ("Test API - GET", async({request}) => {
    const response = await request.get('/api/index.php?endpoint=products');
    
    expect(response.status()).toBe(200);
    console.log(await response.text())
})

test("Test API - Get single item", async({request}) => {
    const response = await request.get('/api/index.php?endpoint=products&id=3');

    expect(response.status()).toBe(200);

    expect(await response.text()).toContain("{\"id\":3,\"name\":\"Peleryna Maskująca\",\"price\":349,\"currency\":\"PLN\",\"display_price\":\"349.00 zł\"}");
})

test('Test API - POST', async ({ request }) => {

    const response = await request.post('/api/index.php?endpoint=products', {
        data: {
            "name": "Testowy produkt",
            "price": 777,
            "currency": "EUR"
        }
    });

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    console.log(await response.text())
    expect(await response.text()).toContain('"created (mock)\",\"product\":{\"name\":\"Testowy produkt\"')


})

test("Test API - PUT", async({request}) => {
    const response = await request.put('/api/index.php?endpoint=products&id=3',{
    data: {
        "name": "Zmieniony", "price": 111.11
    }});

    expect(response.status()).toBe(200);

    expect(await response.text()).toContain('"replaced (mock)\",\"product\":{\"id\":3,\"name\":\"Zmieniony\",\"price\":111.11},\"note\":\"No persistence. This is a mock response.\"')
})

test("Test API - PATCH", async({request}) => {
    const response = await request.patch('/api/index.php?endpoint=products&id=3',{
    data: { "price": 222.22 }});

    expect(response.status()).toBe(200);

    expect(await response.text()).toContain('{\"message\":\"updated (mock)\",\"changes\":{\"price\":222.22},\"product\":{\"id\":3,\"price\":222.22},\"note\":\"No persistence. This is a mock response.\"}')
})

test("Test API - DELETE", async({request}) => {
    const response = await request.delete('/api/index.php?endpoint=products&id=3');

    expect(response.status()).toBe(204);
    expect(response.ok()).toBeTruthy();

   expect(await response.text()).toContain("")
})