// @ts-check
import { test, expect } from '@playwright/test';


test.describe('Backend - Login', () => {
  test('Deve efetuar login com sucesso', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: {
        username: "admin",
        password: "admin"
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe("Login realizado com sucesso");
  });
});  