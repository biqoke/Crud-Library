const { body, validationResult } = require('express-validator');

const validateGenre = [
    body('name').isString().isLength({ min: 2, max: 30 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateGenre;
