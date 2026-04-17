# Testes de API com Playwright

Playwright expõe o fixture **`request`**: um `APIRequestContext` que reutiliza `baseURL` e opções do project (aqui, project **backend**).

## Estrutura básica de um spec

```javascript
// @ts-check
import { test, expect } from '@playwright/test';
import { endpointsLogin } from '../../utils/paths/login';

test.describe('Backend - Nome do domínio', () => {
  test('deve retornar sucesso', async ({ request }, testInfo) => {
    const response = await request.post(endpointsLogin.pathLogin(), {
      data: { username: 'admin', password: process.env.SENHA },
    });
    const body = await response.json();
    await testInfo.attach('Response', { body: JSON.stringify(body, null, 2) });
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Login realizado com sucesso');
  });
});
```

## Boas práticas específicas de API

1. **Endpoints**: centralizar em `utils/paths/` para evitar strings duplicadas e facilitar mudanças de versão ou prefixo.
2. **Corpo e headers**: usar `data` para JSON; usar `headers` para `Authorization`, `Content-Type`, etc.
3. **Status e corpo**: assertar `response.status()` antes de assumir formato; usar `response.json()` ou `response.text()` conforme o contrato.
4. **Evidências**: `testInfo.attach` ajuda no Allure e na depuração (como no exemplo de login do repo).
5. **Dados sensíveis**: nunca fixar senhas reais no código; usar `process.env.*` alinhado ao `playwright.env` / CI.

## Métodos comuns do `request`

- `get(url, options)`, `post`, `put`, `patch`, `delete`
- Opções úteis: `data`, `form`, `multipart`, `headers`, `params`, `timeout`

## Erros típicos

- **Connection refused**: API não está no ar ou `baseURL` do project backend incorreto.
- **404 em path**: path não bate com o servidor; conferir `utils/paths` e rotas reais da aplicação.
- **401/403**: credenciais ou token ausente; alinhar com o fluxo de auth da API.

## Referência no repositório

Ver implementação real em `tests/backend/login.spec.js` e paths em `utils/paths/login.js`.
