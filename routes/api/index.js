const api = require('express').Router();

const errorHandlingApi = require('../../middleware/errorHandlingApi');
const jwtMiddleware = require('../../middleware/jwtPassport');

api.use('/articles', require('./articles/articles.route'));
api.use('/article-categories', require('./article-categories/article-categories.route'));
api.use('/example', jwtMiddleware, require('./example/example.route'));
api.use('/newsletter', require('./newsletter/newsletter.route'));
api.use('/programs', require('./program/program.route'));
api.use('/program-difficulties', require('./dificulty_type/difficult.type.route'));
api.use('/program-types', require('./program-type/program-type.route'));
api.use('/tools', require('./tools/tools.route'));
api.use('/users', require('./users/users.route'));

api.use(errorHandlingApi);

module.exports = api;