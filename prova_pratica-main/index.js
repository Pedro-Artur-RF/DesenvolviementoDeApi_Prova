const express = require('express');
const exphbs = require('express-handlebars');
const DBconfig = require("./db/conn.js");

const PORT = 3333;

const books = [];

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


//Middleware para arquivos estáticos
app.post('/cadastrar', (req, res) => {
  const { name, category, description, price, quant} = req.body

  const inserirMysql = `INSERT INTO livros(name, category, description, price, quant) VALUES('${name}, ${category}, ${description}, ${price}, ${quant});`

  DBconfig.query(inserirMysql, () =>{
    return res.json();
  });
});

app.get('/', (req, res)=>{
  return res.render('home');
});

app.get('/view', (req, res)=>{
  return res.render('view');
});

app.get('/cadastrar', (req, res)=>{
  return res.render('cadastrar');
});

app.get('/update', (req, res)=>{
  return res.render('update');
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, quant} = req.body

  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
      return console.log("Livro não encontrado");
  }

  const produto_atualizado = {
      id,
      name,
      category,
      description,
      price,
      quant
  };

  books[index] = produto_atualizado;

  return produto_atualizado;
});

app.delete('/delete/:id', (req, res) =>{
  return console.log('Livro excluido')
});

DBconfig.connect((error) => {
  if(error) {
    console.log(error);
  }

  console.log("mysql conectado")

  app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT} 🔵🔵🔵`);
  });
})