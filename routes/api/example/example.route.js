const exampleRoute = require('express').Router();
const exampleController = require('./example.controller');
const exampleValidationRule = require('../../../helpers/validation/rules/example');
const requestValidationMiddleware = require('../../../middleware/requestValidation');

exampleRoute.get('/base', exampleController.base);
exampleRoute.get('/errors', exampleController.errors);
exampleRoute.post('/sendgrid', exampleController.sendgrid);
exampleRoute.post(
    '/validation', 
    exampleValidationRule.endpointName, 
    requestValidationMiddleware, 
    exampleController.validation
);

module.exports = exampleRoute;