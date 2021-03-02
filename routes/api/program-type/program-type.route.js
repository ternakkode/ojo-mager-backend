const programTypeRoute = require('express').Router();

const programTypeController = require('./program-type.controller');
const programtypeValidationRule = require('../../../helpers/validation/rules/program-types')
const jwtPassport = require('../../../middleware/jwtPassport');
const requestValidationMiddleware = require('../../../middleware/requestValidation');

programTypeRoute.post(
    '/',
    jwtPassport,
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
    programtypeValidationRule.update,
    requestValidationMiddleware,
    programTypeController.update
);
programTypeRoute.delete(
    '/:id',
    jwtPassport,
    programTypeController.remove
);

module.exports = programTypeRoute;