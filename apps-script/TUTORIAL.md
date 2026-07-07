# Tutorial — Webhook do formulário com Google Apps Script

Isso cria um "backend grátis": toda submissão do formulário de contato vira uma linha numa planilha do Google Sheets (e pode disparar e-mail de aviso).

## 1. Criar a planilha

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha nova.
2. Dê um nome, tipo "Leads Site Do Valle Engenharia".

## 2. Abrir o Apps Script

1. Na planilha, vá em **Extensões → Apps Script**.
2. Vai abrir um editor de código numa aba nova, com um arquivo `Code.gs` vazio.
3. Apague o conteúdo padrão e cole o código do arquivo [`Code.gs`](./Code.gs) deste projeto.
4. (Opcional) Se quiser receber e-mail a cada lead, preencha a linha:
   ```js
   var EMAIL_AVISO = 'seuemail@dominio.com';
   ```
5. Salve (ícone de disquete ou `Ctrl+S`).

## 3. Testar antes de publicar

1. No topo do editor, no seletor de função (ao lado do botão "Executar"/"Run"), escolha `testeDoPost`.
2. Clique em **Executar**.
3. Primeira vez vai pedir autorização — clique em **Revisar permissões**, escolha sua conta Google, clique em **Avançado** → **Acessar [nome do projeto] (não seguro)** → **Permitir**. (É seguro — é seu próprio script, o aviso é padrão do Google para scripts não publicados na loja.)
4. Volte na planilha: deve ter aparecido uma linha "Teste" na aba **Leads**. Se apareceu, tá funcionando.

## 4. Publicar como Web App

1. No editor do Apps Script, clique em **Implantar → Nova implantação** (canto superior direito).
2. Clique no ícone de engrenagem ao lado de "Selecionar tipo" → escolha **App da Web**.
3. Configure:
   - **Descrição**: "Webhook formulário site" (o que quiser)
   - **Executar como**: `Eu (seu e-mail)`
   - **Quem pode acessar**: `Qualquer pessoa` — **importante**, senão o site não consegue enviar dado nenhum
4. Clique em **Implantar**.
5. Vai pedir autorização de novo (mesma tela do passo 3) — autorize.
6. Vai aparecer uma **URL do app da Web** (algo tipo `https://script.google.com/macros/s/AKfycb.../exec`). **Copie essa URL inteira.**

## 5. Colar a URL no site

Abra `assets/js/main.js`, ache a linha:

```js
const WEBHOOK_DO_PROJETO = 'COLE_AQUI_A_URL_DO_APPS_SCRIPT';
```

Troque `'COLE_AQUI_A_URL_DO_APPS_SCRIPT'` pela URL que você copiou, salve. Pronto — o formulário de `/contato/` já grava na planilha e ainda abre o WhatsApp com os dados preenchidos.

## 6. Testar de verdade

1. Abra o site, vá em Contato, preencha o formulário e envie.
2. Confira se a linha apareceu na planilha (pode levar 1-2 segundos).
3. O WhatsApp deve abrir em seguida com a mensagem pronta.

## Atualizar o script depois

Se editar o `Code.gs` de novo (ex: mudar `EMAIL_AVISO`), você precisa **criar uma nova implantação** (ou editar a existente em **Implantar → Gerenciar implantações → editar (lápis) → Nova versão → Implantar**) pra mudança valer. Só salvar o arquivo não atualiza a URL já publicada.

## Por que `mode: 'no-cors'` e `Content-Type: text/plain` no fetch?

Apps Script Web Apps não respondem certo a *preflight* CORS (`OPTIONS`). Usando `text/plain` o navegador manda a requisição como "simples" (sem preflight), e o Apps Script lê `e.postData.contents` e faz `JSON.parse` normalmente — mesmo o corpo sendo JSON de verdade. Com `no-cors` o site não consegue ler a resposta (não precisa: quem confirma o envio pro usuário é a abertura do WhatsApp).
