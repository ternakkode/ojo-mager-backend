const usersRoute = require('express').Router();

const usersController = require('./users.controller');
const usersValidationRule = require('../../../helpers/validation/rules/users');
const requestValidationMiddleware = require('../../../middleware/requestValidation');
const jwtMiddleware = require('../../../middleware/jwtPassport');
const isVerified = require('../../../middleware/isVerified');

usersRoute.get(
    '/',
    jwtMiddleware,
    isVerified,
    usersController.profileInfo,
);
usersRoute.post(
    '/',
    jwtMiddleware,
    isVerified,
    usersValidationRule.editProfile,
    requestValidationMiddleware,
    usersController.editProfile
);
usersRoute.post(
    '/register', 
    usersValidationRule.register,
    requestValidationMiddleware,
    usersController.register
);
usersRoute.post(
    '/login',
    usersValidationRule.login,
    requestValidationMiddleware, 
    usersController.login
);
usersRoute.post(
    '/forgot-password/new',
    usersValidationRule.newForgotPassword,
    requestValidationMiddleware, 
    usersController.newForgotPassword
);
usersRoute.post(
    '/forgot-password/save', 
    usersValidationRule.saveForgotPassword,
    requestValidationMiddleware, 
    usersController.saveNewForgotPassword
);
usersRoute.post(
    '/forgot-password/validate', 
    usersValidationRule.validateForgotPassword,
    requestValidationMiddleware,
    usersController.validateForgotPassword
);
usersRoute.post(
    '/verification/new', 
    usersController.newVerificationAccount
);
usersRoute.post(
    '/verification/verify', 
    usersValidationRule.verifyVerification,
    requestValidationMiddleware,
    usersController.verifyVerificationAccount
);

module.exports = usersRoute;