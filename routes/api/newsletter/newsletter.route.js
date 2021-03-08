const newsletterRoute = require('express').Router();

const newsletterController = require('./newsletter.controller');
const newsletterValidationRule = require('../../../helpers/validation/rules/newsletter');
const requestValidationMiddleware = require('../../../middleware/requestValidation');
const isVerified = require('../../../middleware/isVerified');
const jwtPassport = require('../../../middleware/jwtPassport');
const verifyRoles = require('../../../middleware/verifiyRoles');

newsletterRoute.post(
    '/subscribe',
    jwtPassport,
    isVerified,
    newsletterController.subscribe
)
newsletterRoute.post(
    '/unsubscribe', 
    jwtPassport,
    isVerified,
    newsletterController.unsubscribe
)
newsletterRoute.post(
    '/broadcast', 
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    newsletterValidationRule.broadcast,
    requestValidationMiddleware,
    newsletterController.broadcast
)

module.exports = newsletterRoute;