# Estrutura do projeto e convenções

Este documento descreve como o repositório está organizado para que novos testes sigam o mesmo desenho.

## Árvore relevante

- `playwright.config.js` — configuração global e **projects** (frontend vs backend).
- `playwright.env` — variáveis locais carregadas por `dotenv` (ex.: `SENHA`). Preferir não versionar segredos reais; em CI usar secrets.
- `tests/frontend/` — especificações que usam navegador (`page`).
- `tests/backend/` — especificações que usam cliente HTTP (`request`).
- `pages/` — **page objects** do frontend (um arquivo por tela ou fluxo principal, ver [testes-frontend.md](./testes-frontend.md)).
- `utils/paths/` — funções que montam paths de API (ex.: `endpointsLogin.pathLogin()`).
- `utils/utils.js` — utilitários compartilhados (expandir conforme necessidade).
- `.github/workflows/playwright.yml` — pipeline que sobe a app `neo-product-hub`, instala Playwright e roda `npx playwright test`.

## Projects no Playwright

O arquivo `playwright.config.js` separa:

- **frontend**: `testDir: ./tests/frontend`, `use.baseURL` apontando para a UI, device Desktop Chrome.
- **backend**: `testDir: ./tests/backend`, `use.baseURL` apontando para a API.

Requisições em testes de backend usam `request.post('/api/...')` com path relativo ao `baseURL` do project **backend**. A UI em frontend usa `page.goto('/login')` relativo ao `baseURL` do project **frontend**.

## Scripts npm (`package.json`)

- `npm run tests:backend` — `playwright test --project=backend`
- `npm run tests:frontend` — `playwright test --project=frontend-*`
- Fluxo com Allure — ver scripts `allure:*` e `tests` no `package.json`

## Variáveis de ambiente

- **`SENHA`**: usada nos testes de login (API e UI). No GitHub Actions é injetada via `secrets.SENHA`.
- Formato recomendado em arquivos `.env`: `CHAVE=valor` (sem espaços ao redor do `=`), uma variável por linha.

## Onde colocar código novo

| Tipo | Local |
|------|--------|
| Novo fluxo na API | `tests/backend/*.spec.js` |
| Novo fluxo na UI | `tests/frontend/*.spec.js` |
| Page object (UI) | `pages/<nome-da-tela>.js` (arquivo em **kebab-case**, ex.: `login-page.js`) |
| Path ou query reutilizável | `utils/paths/<domínio>.js` exportando objeto com funções |
| Helpers genéricos | `utils/utils.js` ou novo módulo em `utils/` |
