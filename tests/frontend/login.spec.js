import { test, expect } from '@playwright/test';


test.describe('Frontend - Login', () => {
  test('Deve efetuar login com sucesso', async ({ page }) => {
    await page.goto('/login');
    await page.getByText('Use credenciais cadastradas no sistema').isVisible();
    await page.locator('#username').pressSequentially('admin');
    await page.locator('#password').pressSequentially('admin');
    await page.getByRole('button', { name: 'Entrar' }).click();
    await expect(page.getByRole('heading', { name: 'Sistema de Produtos' })).toBeVisible();
    await expect(page.getByText('Bem-vindo, Administrador')).toBeVisible();
  });
});  