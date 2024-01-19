const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');
const authorValidator = require('../validators/authorValidator');

router.get('/authors', authorsController.getAllAuthors);
router.post('/authors/add', authorValidator, authorsController.addAuthor);
router.put('/authors/:id/update', authorValidator, authorsController.updateAuthor);
router.delete('/authors/:id/delete', authorsController.deleteAuthor);

module.exports = router;
