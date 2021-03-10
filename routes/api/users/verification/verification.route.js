const verificationRoute = require('express').Router();
const verificationController = require('./verification.controller');

const usersValidationRule = require('../../../../helpers/validation/rules/users');
const requestValidationMiddleware = require('../../../../middleware/requestValidation');

verificationRoute.post(
    '/verification/new', 
    usersValidationRule.newVerificationAccount,
    requestValidationMiddleware,
    verificationController.newVerificationAccount
);
verificationRoute.post(
    '/verification/verify', 
    usersValidationRule.verifyVerification,
    requestValidationMiddleware,
    verificationController.verifyVerificationAccount
);

module.exports = verificationRoute;