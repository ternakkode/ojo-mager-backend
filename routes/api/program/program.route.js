const programsRoute = require('express').Router();

const programsController = require('./program.controller');
const programsValidationRule = require('../../../helpers/validation/rules/programs');
const requestValidationMiddleware = require('../../../middleware/requestValidation');
const isVerified = require('../../../middleware/isVerified');
const jwtPassport = require('../../../middleware/jwtPassport');
const verifyRoles = require('../../../middleware/verifiyRoles');

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
    isVerified,
    verifyRoles(['admin']),
    programsValidationRule.create,
    requestValidationMiddleware,
    programsController.create
);
programsRoute.post(
    '/:program_id/tools/:tool_id',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    programsController.addToolInProgram
);
programsRoute.delete(
    '/:program_id/tools/:tool_id',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    programsController.deleteToolInProgram
);
programsRoute.put(
    '/:id',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    programsValidationRule.update,
    requestValidationMiddleware,
    programsController.update
);
programsRoute.delete(
    '/:id',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    programsController.remove
)

module.exports = programsRoute;