const toolsRoute = require('express').Router();

const toolsController = require('./tools.controller');
const toolsValidationRule = require('../../../helpers/validation/rules/tools')
const requestValidationMiddleware = require('../../../middleware/requestValidation')
const isVerified = require('../../../middleware/isVerified')
const jwtMiddleware = require('../../../middleware/jwtPassport');
const verifyRoles = require('../../../middleware/verifiyRoles');

toolsRoute.get(
    '/',
    toolsController.index
);
toolsRoute.get(
    '/:id',
    toolsController.detail
);
toolsRoute.post(
    '/',
    jwtMiddleware,
    isVerified,
    verifyRoles(['admin']),
    toolsValidationRule.create,
    requestValidationMiddleware,
    toolsController.create
);
toolsRoute.put(
    '/:id',
    jwtMiddleware,
    isVerified,
    verifyRoles(['admin']),
    toolsValidationRule.update,
    requestValidationMiddleware,
    toolsController.update
);
toolsRoute.delete(
    '/:id',
    jwtMiddleware,
    isVerified,
    verifyRoles(['admin']),
    toolsController.remove
);

module.exports = toolsRoute;