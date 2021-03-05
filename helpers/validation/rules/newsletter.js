const { check } = require('express-validator');

const broadcast = [
    check('title')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string'),
    check('message')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
];

module.exports = {
    broadcast
}