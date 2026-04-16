// @ts-check
import { test, expect } from '@playwright/test';
import { endpointsLogin } from '../../utils/paths/login';

test.describe('Backend - Login', () => {
  test('Deve efetuar login com sucesso', async ({ request }, testInfo) => {
    const response = await request.post(endpointsLogin.pathLogin(), {
      data: {
        username: "admin",
        password: process.env.SENHA
      }
    });
    const body = await response.json();
    await testInfo.attach(`Response POST Login:`, { body: JSON.stringify(body, null, 2) });
    expect(response.status()).toBe(200);
    expect(body.message).toBe("Login realizado com sucesso");
  });
});  