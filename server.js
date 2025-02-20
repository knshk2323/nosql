const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Подключение middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Подключение статических файлов (CSS и т.д.)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/books');
  }); 
// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Импорт маршрутов
const bookRoutes = require('./routes/books');
const readerRoutes = require('./routes/readers');
const issueRoutes = require('./routes/issues');

// Использование маршрутов
app.use('/books', bookRoutes);
app.use('/readers', readerRoutes);
app.use('/issues', issueRoutes);

// Главная страница
app.get('/', (req, res) => {
  res.render('index');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
