const { check } = require('express-validator');

const endpointName = [
    check('input1').notEmpty(),
    check('input2').notEmpty()
]

module.exports = {
    endpointName
};