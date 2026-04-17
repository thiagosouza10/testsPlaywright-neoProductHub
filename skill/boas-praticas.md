# Boas práticas e checklist

## Nomenclatura

- **`test.describe`**: agrupe por área — ex.: `Backend - Login`, `Frontend - Produtos`.
- **`test('...')`**: “Deve …” para cenários positivos e “Não deve …” para cenários negativos, em português que o padrão do time.
- **Arquivos**: `*.spec.js` ao lado da pasta `tests/frontend` ou `tests/backend`; nomeie pelo domínio (`login.spec.js`, `produtos.spec.js`).

## Isolamento e determinismo

- Cada teste deve poder rodar **sozinho** e em **paralelo** (`fullyParallel: true` no config).
- Evite dependência de ordem entre testes.
- Para dados mutáveis, prefira setup explícito (API, seed) ou IDs únicos; documente se a suíte assumir estado na base.

## Segurança

- Não commitar senhas, tokens ou chaves em specs ou em `playwright.env` com valores de produção.
- Em CI, usar **GitHub Secrets** (como `SENHA` no workflow atual).

## Organização do código

- Paths de API em **`utils/paths/`**, um módulo por domínio ou recurso.
- **Frontend**: interações repetidas por tela em **`pages/<nome-kebab>.js`** (ex.: `login-page.js`), classe em PascalCase (`LoginPage`), instância no spec com `new LoginPage(page)`.
- Lógica repetida que não for “uma tela” pode ir para **`utils/`** como funções puras ou pequenos helpers — sem acoplar ao `test` global desnecessariamente.

## Depuração local

- Rodar um project: `npx playwright test --project=backend` ou `--project=frontend`.
- UI mode: `npx playwright test --ui`.
- Trace já está `on-first-retry` no config — útil após primeira falha intermitente.

## Relatórios

- O projeto usa **Allure** (`allure-playwright` + pasta `allure-results`).
- Anexos via `testInfo.attach` melhoram o diagnóstico em APIs.

## CI

- O job espera a aplicação em `http://localhost:8080` antes dos testes; se a API for obrigatória para o frontend, garantir que o `npm run dev` da app também levante o backend necessário (conforme o monorepo `neo-product-hub`).

## Checklist antes de abrir PR

- [ ] Spec novo no `testDir` correto (frontend vs backend).
- [ ] Novo fluxo de UI com page object em `pages/` quando fizer sentido (nome kebab-case + import com o mesmo casing).
- [ ] Nenhum segredo novo hardcoded.
- [ ] Endpoints centralizados em `utils/paths` quando reutilizados.
- [ ] Asserts estáveis (sem sleeps fixos desnecessários).
- [ ] Teste executado localmente nos projects afetados.
