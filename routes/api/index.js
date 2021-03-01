const api = require('express').Router();

const errorHandlingApi = require('../../middleware/errorHandlingApi');
const jwtMiddleware = require('../../middleware/jwtPassport');

api.use('/articles', require('./articles/articles.route'));
api.use('/article-categories', require('./article-categories/article-categories.route'));
api.use('/example', jwtMiddleware, require('./example/example.route'));
api.use('/users', require('./users/users.route'));

api.use(errorHandlingApi);

module.exports = api;