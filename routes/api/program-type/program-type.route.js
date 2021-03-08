const programTypeRoute = require('express').Router();

const programTypeController = require('./program-type.controller');
const programtypeValidationRule = require('../../../helpers/validation/rules/program-types')
const requestValidationMiddleware = require('../../../middleware/requestValidation');
const isVerified = require('../../../middleware/isVerified');
const jwtPassport = require('../../../middleware/jwtPassport');
const verifyRoles = require('../../../middleware/verifiyRoles');

programTypeRoute.post(
    '/',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    programtypeValidationRule.create,
    requestValidationMiddleware,
    programTypeController.create
);
programTypeRoute.get(
    '/',
    programTypeController.index
);
programTypeRoute.get(
    '/:id',
    programTypeController.detail
);
programTypeRoute.put(
    '/:id',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    programtypeValidationRule.update,
    requestValidationMiddleware,
    programTypeController.update
);
programTypeRoute.delete(
    '/:id',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    programTypeController.remove
);

module.exports = programTypeRoute;