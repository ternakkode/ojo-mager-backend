const usersRoute = require('express').Router();
const usersController = require('./users.controller');

usersRoute.post('/register', usersController.register);
usersRoute.post('/login', usersController.login);
usersRoute.post('/forgot-password/new', usersController.newForgotPassword);
usersRoute.get('/forgot-password/save', usersController.saveNewForgotPassword)
usersRoute.post('/forgot-password/validate', usersController.validateForgotPassword);

module.exports = usersRoute;