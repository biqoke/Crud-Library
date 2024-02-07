const { body, validationResult } = require('express-validator');

const validateBook = [
    body('name').isString().isLength({ min: 2, max: 30 }),
    body('author').isString().isLength({ min: 2, max: 30 }),
    body('publisherYear').isInt({ min: 1900, max: 2024 }),
    body('pagesCount').isInt({ min: 3, max: 1300 }),
    body('price').isFloat({ min: 0, max: 150000 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateBook;
