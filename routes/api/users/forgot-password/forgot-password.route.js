const forgotPasswordRoute = require('express').Router();
const forgotPassowrdController = require('./forgot-password.controller');

const usersValidationRule = require('../../../../helpers/validation/rules/users');
const requestValidationMiddleware = require('../../../../middleware/requestValidation');

forgotPasswordRoute.post(
    '/new',
    usersValidationRule.newForgotPassword,
    requestValidationMiddleware, 
    forgotPassowrdController.newForgotPassword
);
forgotPasswordRoute.post(
    '/save', 
    usersValidationRule.saveForgotPassword,
    requestValidationMiddleware, 
    forgotPassowrdController.saveNewForgotPassword
);
forgotPasswordRoute.post(
    '/validate', 
    usersValidationRule.validateForgotPassword,
    requestValidationMiddleware,
    forgotPassowrdController.validateForgotPassword
);

module.exports = forgotPasswordRoute;