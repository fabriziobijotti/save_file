
// Importa o módulo Express
const express = require('express');

// Importa o módulo File System
const fs = require('fs');

// Cria uma instância do aplicativo Express
const app = express();

// Configura o middleware para processar as requisições com dados codificados como URL
app.use(express.urlencoded({ extended: true }));

// Define uma rota para a página inicial do aplicativo
app.get('/', (req, res) => {
  // Envia o arquivo HTML com o cabeçalho e o formulário para o cliente
  const html = fs.readFileSync(__dirname + '/index.html');
  res.write(html);
  res.end();
});

// Define uma rota para receber os dados do formulário
app.post('/salvarDados', (req, res) => {
  // Obtém o nome e telefone enviados pelo formulário
  const nome = req.body.nome;
  const telefone = req.body.telefone;

  // Formata os dados em uma string
  const dados = `Nome: ${nome}\nTelefone: ${telefone}\n`;

  // Adiciona os dados ao arquivo "dadospessoais.txt"
  fs.appendFile('dadospessoais.txt', dados, (err) => {
    // Verifica se ocorreu algum erro ao escrever no arquivo
    if (err) throw err;
    // Se não houve erros, exibe a mensagem "Dados salvos com sucesso!" e redireciona para a página inicial
    console.log('Dados salvos com sucesso!');
    res.redirect('/');
  });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000!');
});