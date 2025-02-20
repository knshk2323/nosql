const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.render('index', { books });
});

router.post('/', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.redirect('/books');
});

module.exports = router;
