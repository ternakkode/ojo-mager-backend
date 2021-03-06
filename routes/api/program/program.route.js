const programsRoute = require('express').Router();

const programsController = require('./program.controller');
const programsValidationRule = require('../../../helpers/validation/rules/programs');
const requestValidationMiddleware = require('../../../middleware/requestValidation');
const isAdmin = require('../../../middleware/isAdmin');
const isVerified = require('../../../middleware/isVerified');
const jwtPassport = require('../../../middleware/jwtPassport');

programsRoute.get(
    '/',
    programsController.index
);
programsRoute.get(
    '/:slug',
    jwtPassport,
    isVerified,
    programsController.detail
);
programsRoute.post(
    '/',
    jwtPassport,
    isAdmin,
    isVerified,
    programsValidationRule.create,
    requestValidationMiddleware,
    programsController.create
);
programsRoute.post(
    '/:program_id/tools/:tool_id',
    jwtPassport,
    isAdmin,
    isVerified,
    programsController.addToolInProgram
)
programsRoute.put(
    '/:id',
    jwtPassport,
    isAdmin,
    isVerified,
    programsValidationRule.update,
    requestValidationMiddleware,
    programsController.update
);
programsRoute.delete(
    '/:id',
    jwtPassport,
    isAdmin,
    isVerified,
    programsController.remove
)

module.exports = programsRoute;