const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  const issues = await Issue.find();
  res.send(issues);
});

router.post('/', async (req, res) => {
  try {
    const issue = new Issue(req.body);
    await issue.save();
    await Book.findByIdAndUpdate(req.body.bookId, { available: false });
    res.redirect('/books');
  } catch (err) {
    res.status(500).send('Error issuing book');
  }
});

module.exports = router;
