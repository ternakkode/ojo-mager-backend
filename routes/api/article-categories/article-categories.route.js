const articleCategoriesRoute = require('express').Router();

const articleCategoriesController = require('./article-categories.controller');
const articleCategoriesValidationRule = require('../../../helpers/validation/rules/article-categories')
const isAdmin = require('../../../middleware/jwtPassport');
const jwtPassport = require('../../../middleware/jwtPassport');
const requestValidationMiddleware = require('../../../middleware/requestValidation');

articleCategoriesRoute.post(
    '/',
    jwtPassport,
    isAdmin,
    articleCategoriesValidationRule.create,
    requestValidationMiddleware,
    articleCategoriesController.create
);
articleCategoriesRoute.get(
    '/', 
    articleCategoriesController.index
);
articleCategoriesRoute.get(
    '/:id', 
    articleCategoriesController.detail
);
articleCategoriesRoute.put(
    '/:id', 
    jwtPassport,
    isAdmin,
    articleCategoriesValidationRule.update,
    requestValidationMiddleware,
    articleCategoriesController.update
);
articleCategoriesRoute.delete(
    '/:id', 
    jwtPassport,
    isAdmin,
    articleCategoriesController.remove
);

module.exports = articleCategoriesRoute;