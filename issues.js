const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Issue = require('../models/Issue'); // Убедитесь, что эта модель существует

// Выдача книги
router.post('/add', async (req, res) => {
    try {
        const { readerName, readerId, bookId } = req.body;
        
        // Проверяем, есть ли книга в базе данных
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        // Проверяем, не выдана ли книга
        if (book.issuedTo) {
            return res.status(400).send('Book is already issued');
        }

        // Создаём запись о выдаче
        const issue = new Issue({
            readerName,
            readerId,
            bookId,
            issueDate: new Date(),
            returnDate: null
        });
        await issue.save();

        // Обновляем книгу, указывая, кому она выдана
        book.issuedTo = readerName;
        await book.save();

        res.redirect('/books');
    } catch (err) {
        console.error('Error issuing book:', err);
        res.status(500).send('Error issuing book');
    }
});

module.exports = router;
