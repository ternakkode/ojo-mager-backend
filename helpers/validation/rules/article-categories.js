const { body } = require('express-validator');
const wording = require('../../../utils/wording');

const create = [
    body('name').notEmpty().withMessage(wording.IS_EMPTY).bail()      
];

const update = [
    body('name').notEmpty().withMessage(wording.IS_EMPTY).bail()
];

module.exports = {
    create, update
}