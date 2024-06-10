const express = require('express');
const router = express.Router();
const Livro = require('../models/livros');

router.get('/', async (req, res) => {
  const pagina = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const livros = await Livro.find()
      .skip((pagina - 1) * limit)
      .limit(limit);
    
    const total = pagina * limit;
    const contador = await Livro.countDocuments();

    res.render('index', {
      books: livros,
      currentPage: pagina,
      totalPages: Math.ceil(contador / limit),
      totalBooks: contador,
      totalDisplayed: Math.min(total, contador)
    });
  } catch (erro) {
    console.log(erro)
  }
});

module.exports = router;
