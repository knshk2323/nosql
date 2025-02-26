const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Issue = require('../models/Issue'); 

router.post('/add', async (req, res) => {
    try {
        const { readerName, readerId, bookId } = req.body;
        
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        if (book.issuedTo) {
            return res.status(400).send('Book is already issued');
        }

        const issue = new Issue({
            readerName,
            readerId,
            bookId,
            issueDate: new Date(),
            returnDate: null
        });
        await issue.save();

        book.issuedTo = readerName;
        await book.save();

        res.redirect('/books');
    } catch (err) {
        console.error('Error issuing book:', err);
        res.status(500).send('Error issuing book');
    }
});

module.exports = router;
