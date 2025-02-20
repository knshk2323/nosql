const express = require('express');
const router = express.Router();
const Reader = require('../models/reader');

router.post('/', async (req, res) => {
  try {
    const reader = new Reader(req.body);
    await reader.save();
    res.send('Reader added');
  } catch (err) {
    res.status(500).send('Error adding reader');
  }
});

module.exports = router;
