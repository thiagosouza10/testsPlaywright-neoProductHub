import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.labelUsuario = this.page.getByText('Use credenciais cadastradas no sistema');
    this.inputUsuario = this.page.locator('#username');
    this.inputSenha = this.page.locator('#password');
    this.btnEntrar = this.page.getByRole('button', { name: 'Entrar' });
  }

  async fazerLogin(usuario, senha) {
    await expect(this.labelUsuario).toBeVisible();
    await this.inputUsuario.fill(usuario);
    await this.inputSenha.fill(senha);
    await this.btnEntrar.click();
    await expect(this.page.getByText('Novo Produto')).toBeVisible();
  }
}