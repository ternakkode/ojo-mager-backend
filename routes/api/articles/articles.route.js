const articlesRoute = require('express').Router();

const articlesController = require('./articles.controller');
const articlesValidationRule = require('../../../helpers/validation/rules/articles')
const requestValidationMiddleware = require('../../../middleware/requestValidation');
const isVerified = require('../../../middleware/isVerified');
const jwtPassport = require('../../../middleware/jwtPassport');
const verifyRoles = require('../../../middleware/verifiyRoles');

articlesRoute.post(
    '/',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    articlesValidationRule.create,
    requestValidationMiddleware,
    articlesController.create
);
articlesRoute.get(
    '/',
    articlesValidationRule.index,
    articlesController.index
);
articlesRoute.get(
    '/:slug',
    articlesController.detail
);
articlesRoute.put(
    '/:id',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    articlesValidationRule.update,
    requestValidationMiddleware,
    articlesController.update
);
articlesRoute.delete(
    '/:id',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    articlesController.remove
);

module.exports = articlesRoute;