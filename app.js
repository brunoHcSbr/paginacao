const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Livro = require('./models/livros');
const fs = require('fs');
const cors = require('cors');
const arqController = require('./controller/index');



const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = 'mongodb://localhost:27017/livros';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {

 

  const adicionarLivros = async () => {
    const livrosBanco = JSON.parse(fs.readFileSync('livros.json', 'utf8'));

    
    const inserindoValoresModel = livrosBanco.map(livro => ({
      titulo: livro.titulo,
      autor: livro.autor,
      isbn: livro.isbn,
      paginas: livro.paginas,
      ano: livro.ano,
      valor: livro.valor,
    }));

   
    const deletarCollection = async () => {
      try {
        await Livro.deleteMany({});
      } catch (erro) {
        console.log(erro);
      }
    };
  
    await deletarCollection();

    
    try {
      await Livro.insertMany(inserindoValoresModel);
      
    } catch (erro) {
      
    }
  };

  
  await adicionarLivros();
}).catch(erro => {
  console.error('Erro ao conectar com o banco de dados:', erro.message);
});

app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', arqController);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
