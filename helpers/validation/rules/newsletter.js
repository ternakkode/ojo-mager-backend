const { body } = require('express-validator');

const wording = require('../../../utils/wording');

const broadcast = [
    body('title').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('message').notEmpty().withMessage(wording.IS_EMPTY).bail()
];

module.exports = {
    broadcast
}