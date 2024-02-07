const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');
const genreValidator = require('../validators/genreValidator');

router.get('/genres', genresController.getAllGenres);
router.post('/genres/add', genreValidator, genresController.addGenre);
router.put('/genres/:id/update', genreValidator, genresController.updateGenre);
router.delete('/genres/:id/delete', genresController.deleteGenre);

module.exports = router;
