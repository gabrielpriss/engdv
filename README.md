# Do Valle Engenharia — Site Institucional

Site estático em **HTML5 + Tailwind CSS (CDN) + AOS**.

## Estrutura

```
engdv/
├── public/                  ← isso é o que vai pro ar (Cloudflare Pages)
│   ├── index.html
│   ├── sobre-nos/index.html
│   ├── solucoes/index.html
│   ├── projetos/index.html
│   ├── contato/index.html
│   ├── _headers
│   ├── _redirects
│   └── assets/
│       ├── css/custom.css
│       ├── js/main.js
│       ├── fonts/*.woff2
│       └── *.webp, favicon.png
├── apps-script/             ← código do webhook (não publicado)
├── wrangler.jsonc
└── design-system-marko.md
```

Páginas ficam em pastas próprias (`/sobre-nos/`, `/solucoes/`, etc.) pra servidor resolver `index.html` da pasta e a URL não mostrar `.html`. Todos os links e assets usam caminho absoluto (`/assets/...`, `/sobre-nos/`), funciona em qualquer profundidade.

Só o conteúdo de `public/` é publicado — `wrangler.jsonc` aponta `pages_build_output_dir` pra lá, então README, design-system e apps-script ficam fora do site ao vivo.

## Como visualizar

Abra `index.html` no navegador ou use um servidor local:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Funcionalidades

- Dark mode por padrão, toggle claro/escuro (persiste no `localStorage`)
- Menu hamburger com drawer lateral pela direita (mobile)
- WhatsApp flutuante (canto inferior direito, desktop/tablet)
- Animações AOS no scroll
- Popup LGPD (canto inferior esquerdo)
- Carrossel de depoimentos e projetos (home)
- Barra de scroll customizada na cor do projeto

## Cores (Figma)

| Token | Hex |
|---|---|
| Primary | `#6EC1E4` |
| Navy | `#0E1947` |
| Surface | `#263A99` |
| Cream | `#F0EBE5` |

## Fontes

- **Big Shoulders Display** — títulos
- **Archivo** — corpo

## Deploy (Cloudflare Workers — static assets)

Push em `main` dispara deploy automático (Workers Builds, roda `npx wrangler deploy`). Manual:

```bash
npx wrangler deploy
```

Worker: **engdv** (conta CONCEITO PRIME) — https://engdv.conceito-prime.workers.dev

`wrangler.jsonc` aponta `assets.directory` pra `public/` (sem entry-point de Worker — só assets estáticos).

## Formulário de contato / Webhook

Submit grava o lead numa planilha do Google Sheets via Google Apps Script e depois abre o WhatsApp com os dados preenchidos.

Configure `WEBHOOK_DO_PROJETO` em `assets/js/main.js` com a URL do seu Apps Script — passo a passo completo em [`apps-script/TUTORIAL.md`](./apps-script/TUTORIAL.md) (código pronto em [`apps-script/Code.gs`](./apps-script/Code.gs)).
