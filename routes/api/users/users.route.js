const usersRoute = require('express').Router();
const usersController = require('./users.controller');
const jwtMiddleware = require('../../../middleware/jwtPassport');

usersRoute.post('/register', usersController.register);
usersRoute.post('/login', usersController.login);
usersRoute.post('/forgot-password/new', usersController.newForgotPassword);
usersRoute.post('/forgot-password/save', usersController.saveNewForgotPassword)
usersRoute.post('/forgot-password/validate', usersController.validateForgotPassword);
usersRoute.post('/verification/new', jwtMiddleware, usersController.newVerificationAccount);
usersRoute.post('/verification/verify', jwtMiddleware, usersController.verifyVerificationAccount);

module.exports = usersRoute;