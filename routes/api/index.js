const api = require('express').Router();

api.use('/example', require('./example/example.route'))

module.exports = api