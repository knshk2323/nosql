const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Получить все книги с фильтрацией и поиском
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

// Добавить книгу
router.post('/add', async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    await Book.create({ title, author, genre });
    res.redirect('/books');
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).send('Error adding book');
  }
});

// Удалить книгу
router.post('/delete/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).send('Error deleting book');
  }
});

// Обновить книгу
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

// Учёт выдачи книги
router.post('/issue/:id', async (req, res) => {
  try {
    const { issuedTo, issueDate, returnDate } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      console.error('Book not found:', req.params.id);
      return res.status(404).send('Book not found');
    }

    book.issuedTo = issuedTo;
    book.issueDate = issueDate;
    book.returnDate = returnDate;
    await book.save();

    res.redirect('/books');
  } catch (err) {
    console.error('Error issuing book:', err);
    res.status(500).send('Error issuing book');
  }
});

// Выдать книгу
router.post('/issues/add', async (req, res) => {
  try {
    const { readerName, readerId, bookId } = req.body;

    // Найти книгу по ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send('Book not found');
    }

    // Проверить, что книга не выдана
    if (book.issuedTo) {
      return res.status(400).send('Book is already issued');
    }

    // Обновить книгу, добавив информацию о выдаче
    book.issuedTo = readerName;
    book.issuedDate = new Date();
    book.returnDate = new Date(new Date().setDate(new Date().getDate() + 14)); // Возврат через 14 дней

    await book.save();
    res.redirect('/books');
  } catch (err) {
    console.error('Error issuing book:', err);
    res.status(500).send('Error issuing book');
  }
});


module.exports = router;