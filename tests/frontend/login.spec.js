import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';

test.describe('Frontend - Login', () => {
  test('Deve efetuar login com sucesso', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    // Act
    await loginPage.fazerLogin('admin', process.env.SENHA);
    // Assert
    await expect(page.getByText('Bem-vindo, Administrador')).toBeVisible();
  });
});
