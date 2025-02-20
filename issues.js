const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Issue = require('../models/Issue'); // Модель для коллекции issues

router.post('/add', async (req, res) => {
  try {
    const { bookId, readerId, issueDate, dueDate } = req.body;

    const newIssue = new Issue({
      bookId: new mongoose.Types.ObjectId(bookId),
      readerId: new mongoose.Types.ObjectId(readerId),
      issueDate: new Date(issueDate),
      dueDate: new Date(dueDate),
      returnDate: null,
      status: 'issued'
    });

    await newIssue.save();

    res.redirect('/issues'); // Или куда тебе нужно
  } catch (err) {
    console.error(err);
    res.status(500).send('Error issuing the book');
  }
});

module.exports = router;
