const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    readerName: { type: String, required: true },
    readerId: { type: Number, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    issueDate: { type: Date, default: Date.now },
    returnDate: { type: Date }
});

module.exports = mongoose.model('Issue', issueSchema);
