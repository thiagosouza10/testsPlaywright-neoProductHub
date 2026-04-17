# testsPlaywright-neoProductHub

Suíte de testes end-to-end e de API com [Playwright](https://playwright.dev/) para o projeto **neo-product-hub**. Este repositório contém apenas os testes; a aplicação sob teste fica em outro repositório (veja [CI](#ci-no-github-actions)).

---

## Pré-requisitos

- **Node.js** 20 ou superior (recomendado; alinhado ao workflow do GitHub Actions).
- **Git**.
- Aplicação **neo-product-hub** rodando localmente quando for executar testes na sua máquina:
  - UI: `http://localhost:8080` (project **frontend**).
  - API: `http://localhost:3001` (project **backend**).

---

## Passo a passo — uso local

### 1. Clonar o repositório

```bash
git clone https://github.com/thiagosouza10/testsPlaywright-neoProductHub.git
cd testsPlaywright-neoProductHub
```

(Substitua a URL pela do seu fork ou pelo remoto que utilizar.)

### 2. Instalar dependências Node

```bash
npm install
```

### 3. Instalar browsers do Playwright

```bash
npx playwright install
```

Para economizar espaço, pode instalar só o Chromium (usado no frontend):

```bash
npx playwright install chromium
```

### 4. Configurar variáveis de ambiente

O `playwright.config.js` carrega o arquivo **`playwright.env`** na raiz (via `dotenv`).

1. Crie o arquivo **`playwright.env`** na raiz do projeto (ele está no `.gitignore` e **não** acompanha o clone por padrão).
2. Defina pelo menos a variável **`SENHA`** (credencial usada nos testes de login na API e na UI).
3. Use o formato `CHAVE=valor` (sem espaços à volta do `=`).

Exemplo:

```env
SENHA=sua_senha_local
```

> Não commite senhas reais de produção.

### 5. Subir a aplicação neo-product-hub

Num terminal à parte, clone e inicie a app conforme a documentação do repositório [neo-product-hub](https://github.com/thiagosouza10/neo-product-hub), de forma a que:

- a interface responda em **http://localhost:8080**;
- a API responda em **http://localhost:3001** (necessária para os testes de backend e para o fluxo de login que a UI consome).

### 6. Executar os testes

Na pasta deste repositório:

| Objetivo | Comando |
|----------|---------|
| Todos os projects | `npx playwright test` |
| Só frontend | `npm run tests:frontend` ou `npx playwright test --project=frontend` |
| Só backend | `npm run tests:backend` ou `npx playwright test --project=backend` |
| Interface gráfica de debug | `npx playwright test --ui` |
| Relatório HTML do Playwright | `npx playwright show-report` (após execução com report configurado, se aplicável) |

---

## Estrutura do projeto (resumo)

| Pasta / arquivo | Função |
|------------------|--------|
| `tests/frontend/` | Testes de UI com fixture `page`. |
| `tests/backend/` | Testes de API com fixture `request`. |
| `pages/` | Page objects do frontend (ex.: `login-page.js`). |
| `utils/paths/` | Paths de API reutilizáveis. |
| `playwright.config.js` | Projects, `baseURL`, reporters, workers. |
| `playwright.env` | Variáveis carregadas nos testes. |
| `skill/` | Documentação interna de convenções e exemplos. |

Detalhes de convenções (page objects, API, checklist): veja os arquivos em **`skill/`**, começando por `skill/SKILL.md`.

---

## Relatórios Allure

Os testes geram resultados para **Allure** (`allure-results/`). Scripts em `package.json` usam comandos típicos de **Windows** (`xcopy`, `rmdir`):

- `npm run report:allure` — gera e abre relatório (requer Allure CLI instalado).
- `npm run tests` — executa testes e encadeia fluxo Allure (ver `package.json`).

Em **Linux/macOS**, adapte ou execute `npx allure generate ./allure-results -o ./allure-report --clean` conforme a [documentação do Allure](https://docs.qameta.io/allure/).

---

## CI no GitHub Actions

O workflow `.github/workflows/playwright.yml` está configurado para **`workflow_dispatch`** (execução manual):

1. Faz checkout da aplicação **neo-product-hub**, instala dependências e sobe `npm run dev`.
2. Faz checkout deste repositório de testes, instala dependências e browsers.
3. Executa `npx playwright test` com a secret **`SENHA`**.
4. Gera Allure e publica no GitHub Pages (URL indicada no final do job).

Configura no repositório GitHub: **Settings → Secrets and variables → Actions** a secret **`SENHA`** com o valor adequado.

---

## Licença

ISC (ver `package.json`).
