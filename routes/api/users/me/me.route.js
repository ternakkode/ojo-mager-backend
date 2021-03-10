const meRoute = require('express').Router();
const meController = require('./me.controller');

const usersValidationRule = require('../../../../helpers/validation/rules/users');
const requestValidationMiddleware = require('../../../../middleware/requestValidation');

const jwtMiddleware = require('../../../../middleware/jwtPassport');
const isVerified = require('../../../../middleware/isVerified');

meRoute.get(
    '/',
    jwtMiddleware,
    isVerified,
    meController.profileInfo,
);
meRoute.put(
    '/',
    jwtMiddleware,
    isVerified,
    usersValidationRule.editProfile,
    requestValidationMiddleware,
    meController.editProfile
);

module.exports = meRoute;