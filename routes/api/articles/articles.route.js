const articlesRoute = require('express').Router();

const articlesController = require('./articles.controller');
const articlesValidationRule = require('../../../helpers/validation/rules/articles')
const isAdmin = require('../../../middleware/jwtPassport');
const jwtPassport = require('../../../middleware/jwtPassport');
const requestValidationMiddleware = require('../../../middleware/requestValidation');

articlesRoute.post(
    '/',
    jwtPassport,
    isAdmin,
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
    isAdmin,
    articlesValidationRule.update,
    requestValidationMiddleware,
    articlesController.update
);
articlesRoute.delete(
    '/:id',
    jwtPassport,
    isAdmin,
    articlesController.remove
);

module.exports = articlesRoute;