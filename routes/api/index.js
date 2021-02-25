const api = require('express').Router();
const errorHandlingApi = require('../../middleware/errorHandlingApi');

api.use('/example', require('./example/example.route'));
api.use('/users', require('./users/users.route'));

api.use(errorHandlingApi);

module.exports = api;