const exampleRoute = require('express').Router();
const exampleController = require('./example.controller')

exampleRoute.get('/', exampleController.index)

module.exports = exampleRoute