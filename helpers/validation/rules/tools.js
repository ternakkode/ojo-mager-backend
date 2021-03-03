const { check } = require('express-validator');

const { Tool } = require('../../../database/models');

const create = [
    check('name')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
]

const update = [
    check('name')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
]

module.exports = {
    create,
    update
}