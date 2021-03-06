const articleCategoriesRoute = require('express').Router();

const articleCategoriesController = require('./article-categories.controller');
const articleCategoriesValidationRule = require('../../../helpers/validation/rules/article-categories')
const isVerified = require('../../../middleware/isVerified');
const jwtPassport = require('../../../middleware/jwtPassport');
const requestValidationMiddleware = require('../../../middleware/requestValidation');
const verifyRoles = require('../../../middleware/verifiyRoles');

articleCategoriesRoute.post(
    '/',
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
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
    isVerified,
    verifyRoles(['admin']),
    articleCategoriesValidationRule.update,
    requestValidationMiddleware,
    articleCategoriesController.update
);
articleCategoriesRoute.delete(
    '/:id', 
    jwtPassport,
    isVerified,
    verifyRoles(['admin']),
    articleCategoriesController.remove
);

module.exports = articleCategoriesRoute;