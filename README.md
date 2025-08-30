# Projeto de Testes Automatizados - NeoProductHub

Este repositório contém testes automatizados utilizando [Playwright](https://playwright.dev/) para o projeto NeoProductHub [https://github.com/thiagosouza10/neo-product-hub], com geração de relatórios detalhados via [Allure Report](https://docs.qameta.io/allure/).

## Estrutura do Projeto

```
.
├── tests/                  # Testes automatizados organizados por camada
│   ├── backend/
│   │   └── login.spec.js
│   └── frontend/
│       └── login.spec.js
├── tests-examples/         # Exemplos de testes
│   └── demo-todo-app.spec.js
├── playwright.config.js    # Configuração do Playwright
├── playwright.env          # Variáveis de ambiente para os testes
├── allure-report/          # Relatórios gerados pelo Allure
├── playwright-report/      # Relatórios padrão do Playwright
├── test-results/           # Resultados brutos dos testes
├── package.json            # Dependências e scripts do projeto
```

## Como executar os testes

1. Instale as dependências:
   ```powershell
   npm install
   ```

2. Execute os testes com report allure:
   ```powershell
   npm run tests
   ```

## Scripts úteis

- `arquivo package.json` 

## Sobre

- **Playwright**: Framework para automação de testes end-to-end.
- **Allure Report**: Ferramenta para geração de relatórios visuais dos testes.
- Os testes estão organizados por área (backend, frontend) para facilitar a manutenção.

---

Sinta-se à vontade para contribuir ou sugerir melhorias!