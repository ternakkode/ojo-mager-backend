const newsletterRoute = require('express').Router();

const isAdmin = require('../../../middleware/isAdmin');
const isVerified = require('../../../middleware/isVerified');
const jwtPassport = require('../../../middleware/jwtPassport');
const newsletterController = require('./newsletter.controller');
const newsletterValidationRule = require('../../../helpers/validation/rules/newsletter');
const requestValidationMiddleware = require('../../../middleware/requestValidation');

newsletterRoute.post(
    '/subscribe',
    jwtPassport,
    newsletterController.subscribe
)
newsletterRoute.post(
    '/unsubscribe', 
    jwtPassport,
    newsletterController.unsubscribe
)
newsletterRoute.post(
    '/broadcast', 
    jwtPassport,
    isAdmin,
    isVerified,
    newsletterValidationRule.broadcast,
    requestValidationMiddleware,
    newsletterController.broadcast
)

module.exports = newsletterRoute;