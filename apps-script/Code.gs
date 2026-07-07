/**
 * Webhook do formulário de contato — Do Valle Engenharia.
 * Recebe o POST do site, grava uma linha na planilha e (opcional) envia e-mail de aviso.
 *
 * Instalação: ver apps-script/TUTORIAL.md
 */

var NOME_ABA = 'Leads';
var EMAIL_AVISO = ''; // preencha com um e-mail para receber notificação a cada lead (deixe vazio pra não enviar)

function doPost(e) {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(NOME_ABA) || planilha.insertSheet(NOME_ABA);

  if (aba.getLastRow() === 0) {
    aba.appendRow(['Data/Hora', 'Nome', 'E-mail', 'Telefone', 'Empresa', 'Mensagem', 'Página']);
    aba.setFrozenRows(1);
  }

  var dados = JSON.parse(e.postData.contents);

  aba.appendRow([
    new Date(),
    dados.nome || '',
    dados.email || '',
    dados.telefone || '',
    dados.empresa || '',
    dados.mensagem || '',
    dados.url || '',
  ]);

  if (EMAIL_AVISO) {
    MailApp.sendEmail({
      to: EMAIL_AVISO,
      subject: 'Novo contato pelo site — ' + (dados.nome || 'sem nome'),
      body:
        'Nome: ' + (dados.nome || '') + '\n' +
        'E-mail: ' + (dados.email || '') + '\n' +
        'Telefone: ' + (dados.telefone || '') + '\n' +
        'Empresa: ' + (dados.empresa || '') + '\n' +
        'Mensagem: ' + (dados.mensagem || '') + '\n' +
        'Página: ' + (dados.url || ''),
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Teste manual: rode esta função pelo editor do Apps Script pra conferir se grava na planilha. */
function testeDoPost() {
  doPost({
    postData: {
      contents: JSON.stringify({
        nome: 'Teste',
        email: 'teste@teste.com',
        telefone: '(41) 90000-0000',
        empresa: 'Empresa Teste',
        mensagem: 'Mensagem de teste',
        url: 'https://donvalle.com.br/contato/',
      }),
    },
  });
}
