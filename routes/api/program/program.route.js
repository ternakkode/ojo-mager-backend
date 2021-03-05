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
    programsController.detail
);
programsRoute.post(
    '/',
    jwtPassport,
    isAdmin,
    programsValidationRule.create,
    requestValidationMiddleware,
    programsController.create
);
programsRoute.post(
    '/:program_id/tools/:tool_id',
    programsController.addToolInProgram
)
programsRoute.put(
    '/:id',
    programsController.update
);
programsRoute.delete(
    '/:id',
    programsController.remove
)

module.exports = programsRoute;