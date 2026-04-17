// @ts-check
import { test, expect } from '@playwright/test';
import { endpointsLogin } from '../../utils/paths/login';

const dataRegex = /^\d{4}-\d{2}-\d{2}T/

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
    expect(body).toEqual(expect.objectContaining({
      success: true,
      message: "Login realizado com sucesso",
      user: {
        id: "1",
        name: "Administrador",
        username: "admin",
        role: "admin",
        active: true,
        createdAt: expect.stringMatching(dataRegex),
        lastLogin: expect.stringMatching(dataRegex)
      }
    }))
  });
});  