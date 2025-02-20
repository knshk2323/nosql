const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  readerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reader', required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, default: null },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['issued', 'returned'], default: 'issued' }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
