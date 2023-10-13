const mysql = require('mysql2')

//Configuração e conexão com banco
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'aluno_medio',
  password: '@lunoSenai23.',
  database: 'livravia_db'
})

// É necessário exporta esse modulo
module.exports = conn;