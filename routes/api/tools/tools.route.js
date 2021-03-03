const toolsRoute = require('express').Router();

const toolsController = require('./tools.controller');
const toolsValidationRule = require('../../../helpers/validation/rules/tools')
const requestValidationMiddleware = require('../../../middleware/requestValidation')
const isAdmin = require('../../../middleware/isAdmin');
const isVerified = require('../../../middleware/isVerified')
const jwtMiddleware = require('../../../middleware/jwtPassport');

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
    isAdmin,
    toolsValidationRule.create,
    requestValidationMiddleware,
    toolsController.create
);
toolsRoute.put(
    '/:id',
    jwtMiddleware,
    isVerified,
    isAdmin,
    toolsValidationRule.update,
    requestValidationMiddleware,
    toolsController.update
);
toolsRoute.delete(
    '/:id',
    jwtMiddleware,
    isVerified,
    isAdmin,
    toolsController.remove
);

module.exports = toolsRoute;