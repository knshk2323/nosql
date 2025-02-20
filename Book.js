const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, index: 'text' },
  author: { type: String, required: true },
  genre: { type: String },
  issuedTo: { type: String },
  issueDate: { type: Date },
  returnDate: { type: Date },
  available: { type: Boolean, default: true } // Добавлено поле "Доступность"
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
