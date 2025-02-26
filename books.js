const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

//  фильтрация и поиск
router.get('/', async (req, res) => {
  try {
    const { search, genre, issueStart, issueEnd } = req.query;
    let query = {};

    if (search) query.$text = { $search: search };
    if (genre) query.genre = genre;
    if (issueStart || issueEnd) {
      query.issueDate = {};
      if (issueStart) query.issueDate.$gte = new Date(issueStart);
      if (issueEnd) query.issueDate.$lte = new Date(issueEnd);
    }

    const books = await Book.find(query);
    res.render('index', { books });
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Error fetching books');
  }
});

// add books
router.post('/add', async (req, res) => {
  try {
      console.log('Received data:', req.body); // Лог для проверки
      const { title, author, genre } = req.body;
      if (!title || !author || !genre) {
          return res.status(400).send('Missing required fields');
      }

      await Book.create({ title, author, genre });
      res.redirect('/books');
  } catch (err) {
      console.error('Error adding book:', err);
      res.status(500).send('Error adding book');
  }
});


// delete
router.post('/delete/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).send('Error deleting book');
  }
});

// edit
router.post('/update/:id', async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    await Book.findByIdAndUpdate(req.params.id, { title, author, genre });
    res.redirect('/books');
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).send('Error updating book');
  }
});

// issue


// Выдать книгу
router.post('/issues/add', async (req, res) => {
  try {
    const { readerName, readerId, bookId } = req.body;

    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send('Book not found');
    }

    if (book.issuedTo) {
      return res.status(400).send('Book is already issued');
    }

    book.issuedTo = readerName;
    book.issuedDate = new Date();
    book.returnDate = new Date(new Date().setDate(new Date().getDate() + 14)); 

    await book.save();
    res.redirect('/books');
  } catch (err) {
    console.error('Error issuing book:', err);
    res.status(500).send('Error issuing book');
  }
});


module.exports = router;