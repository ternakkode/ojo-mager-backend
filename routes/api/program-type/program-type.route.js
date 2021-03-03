const programTypeRoute = require('express').Router();

const isAdmin = require('../../../middleware/isAdmin');
const programTypeController = require('./program-type.controller');
const programtypeValidationRule = require('../../../helpers/validation/rules/program-types')
const jwtPassport = require('../../../middleware/jwtPassport');
const requestValidationMiddleware = require('../../../middleware/requestValidation');

programTypeRoute.post(
    '/',
    jwtPassport,
    isAdmin,
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
    isAdmin,
    programtypeValidationRule.update,
    requestValidationMiddleware,
    programTypeController.update
);
programTypeRoute.delete(
    '/:id',
    jwtPassport,
    isAdmin,
    programTypeController.remove
);

module.exports = programTypeRoute;