const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  bookId: mongoose.Schema.Types.ObjectId,
  readerId: mongoose.Schema.Types.ObjectId,
  issueDate: { type: Date, default: Date.now },
  returnDate: Date
});

module.exports = mongoose.model('Issue', issueSchema);
