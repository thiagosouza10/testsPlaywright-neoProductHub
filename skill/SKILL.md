# Skill: Testes automatizados com Playwright (API + Frontend)

Use esta pasta quando for **criar, estender ou depurar** testes neste repositório (`testsPlaywright-neoProductHub`). O objetivo é manter o mesmo padrão de organização (specs, **page objects** em `pages/`), variáveis de ambiente e CI já adotados no projeto.

## Quando usar

- Implementar novos cenários em `tests/backend` (API via `request`).
- Implementar novos cenários em `tests/frontend` (navegador via `page`).
- Centralizar URLs de endpoint em `utils/paths/`.
- Configurar ou revisar `playwright.config.js`, `playwright.env` e CI.

## Documentos desta skill

| Arquivo | Conteúdo |
|---------|----------|
| [projeto-estrutura.md](./projeto-estrutura.md) | Layout do repo, projects, scripts npm, variáveis |
| [testes-api.md](./testes-api.md) | Testes de API com Playwright (`request`, asserts, anexos) |
| [testes-frontend.md](./testes-frontend.md) | UI, locators, `baseURL`, page objects em `pages/` |
| [boas-praticas.md](./boas-praticas.md) | Padrões de nome, isolamento, dados sensíveis, relatórios |

## Leitura rápida (contexto do repo)

- **Config**: `playwright.config.js` define dois **projects**: `frontend` (`tests/frontend`, `baseURL` localhost:8080, Chrome) e `backend` (`tests/backend`, `baseURL` localhost:3001).
- **Env**: `playwright.env` é carregado no config via `dotenv`; credenciais como `SENHA` não devem ser commitadas com valores reais em produção.
- **Exemplos vivos**: `tests/backend/login.spec.js`, `tests/frontend/login.spec.js`, `pages/login-page.js`, `utils/paths/login.js`.

Comece por **projeto-estrutura.md** se estiver mapeando o repositório; use **testes-api.md** ou **testes-frontend.md** conforme o tipo de teste.
