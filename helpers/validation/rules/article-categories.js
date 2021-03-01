const { check } = require('express-validator');

const create = [
    check('name').notEmpty().isString()
];

const update = [
    check('name').notEmpty().isString()
];

module.exports = {
    create, update
}