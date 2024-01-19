const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const bookValidator = require('../validators/bookValidator');

router.get('/books', booksController.getAllBooks);
router.post('/books/add', bookValidator, booksController.addBook);
router.put('/books/:id/update', bookValidator, booksController.updateBook);
router.delete('/books/:id/delete', booksController.deleteBook);

module.exports = router;
