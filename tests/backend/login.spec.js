// @ts-check
import { test, expect } from '@playwright/test';
import { endpointsLogin } from '../../utils/paths/login';

test.describe('Backend - Login', () => {
  test('Deve efetuar login com sucesso', async ({ request }) => {
    const response = await request.post(endpointsLogin.pathLogin(), {
      data: {
        username: "admin",
        password: process.env.SENHA
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe("Login realizado com sucesso");
  });
});  