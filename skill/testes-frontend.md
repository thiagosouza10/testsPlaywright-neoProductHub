# Testes de Frontend (UI) com Playwright

Testes do project **frontend** usam o fixture **`page`** e o **`baseURL`** definido no `playwright.config.js`, permitindo navegação relativa (ex.: `page.goto('/login')` dentro do page object).

## Page Object Model (`pages/`)

Fluxos de UI reutilizáveis ficam em **`pages/`**, em arquivo **kebab-case** alinhado à tela (ex.: `login-page.js`). A classe exportada usa **PascalCase** (ex.: `LoginPage`).

- **Locators e ações** da tela ficam na classe; o spec importa a classe, instancia com `new NomeDaPage(page)` e chama métodos como `fazerLogin(...)`.
- **Divisão de asserts**: o page object pode validar transições críticas do próprio fluxo (ex.: tela carregada após login); asserts de negócio ou mensagens específicas do cenário podem permanecer no **spec** com `expect(page....)`.
- **Import**: use o caminho exatamente como o nome do ficheiro (`../../pages/login-page`) para evitar avisos de casing em ambientes case-sensitive (Linux no CI).

### Referência: login

`pages/login-page.js` exporta `LoginPage` com propriedades para elementos (`labelUsuario`, `inputUsuario`, `inputSenha`, `btnEntrar`) e o método `fazerLogin(usuario, senha)`, que navega para `/login`, valida o texto de credenciais, preenche campos com `fill`, submete e confirma um estado pós-login (`Novo Produto`).

`tests/frontend/login.spec.js` instancia `new LoginPage(page)`, chama `fazerLogin('admin', process.env.SENHA)` e faz asserts adicionais no spec (ex.: mensagem de boas-vindas).

## Estrutura mínima de um spec (com page object)

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';

test.describe('Frontend - Login', () => {
  test('Deve efetuar login com sucesso', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.fazerLogin('admin', process.env.SENHA);
    await expect(page.getByText('Bem-vindo, Administrador')).toBeVisible();
  });
});
```

## Locators (ordem de preferência)

1. **`getByRole`** com nome acessível — reflete como o usuário enxerga a UI.
2. **`getByLabel`, `getByPlaceholder`, `getByText`** — quando roles não forem suficientes.
3. **`locator('#id')`** — aceitável quando IDs são estáveis e únicos.

Evite seletores frágeis (XPath profundo, CSS dependente de hierarquia inteira) quando houver alternativa semântica.

## Ações e esperas

- Preferir **asserts com auto-retry**: `expect(locator).toBeVisible()`, `toHaveURL()`, etc.
- **`fill`** é adequado para campos simples; use **`pressSequentially`** só quando a UI depender de eventos por tecla.
- Após navegação ou submit, aguardar estado estável via `expect`, não `waitForTimeout` fixo, salvo exceção documentada.

## `expect` dentro do page object

Se a page importar `expect` de `@playwright/test` (como em `login-page.js`), mantenha asserts curtos e ligados ao fluxo daquela tela; evite acoplar o page object a cenários muito específicos de um único teste — nesse caso, prefira o assert no spec.

## Ambiente

- Garantir que a aplicação esteja servida na URL configurada em `baseURL` (ex.: `http://localhost:8080`).
- O workflow em `.github/workflows/playwright.yml` sobe a app antes de rodar os testes.

## Dados sensíveis

Usar `process.env.SENHA` (ou variáveis específicas por ambiente), nunca senhas em claro no spec.

## Referência no repositório

Ver `tests/frontend/login.spec.js` e `pages/login-page.js`.
