const mongoose = require('mongoose');

const livroModel = new mongoose.Schema({
  titulo: String,   
  autor: String,   
  isbn: String,     
  paginas: Number,   
  ano: Number,     
  valor: Number     
});

module.exports = mongoose.model('Livro', livroModel);
