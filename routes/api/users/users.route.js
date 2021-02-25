const usersRoute = require('express').Router();
const usersController = require('./users.controller');

usersRoute.get('/register', usersController.register);
usersRoute.get('/login', usersController.login);
usersRoute.get('/forgot-password/new', usersController.newForgotPassword);
usersRoute.get('/forgot-password/save', usersController.saveNewForgotPassword)
usersRoute.get('/forgot-password/validate', usersController.validateForgotPassword);

module.exports = usersRoute;