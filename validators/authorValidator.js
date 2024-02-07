const { body, validationResult } = require('express-validator');

const validateAuthor = [
    body('surname').isString().isLength({ min: 2, max: 30 }),
    body('name').isString().isLength({ min: 2, max: 30 }),
    body('birthday').isDate(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateAuthor;
