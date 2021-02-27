const usersRoute = require('express').Router();
const usersController = require('./users.controller');
const jwtMiddleware = require('../../../middleware/jwtPassport');

usersRoute.post('/register', usersController.register);
usersRoute.post('/login', usersController.login);
usersRoute.get('/forgot-password/new', usersController.newForgotPassword);
usersRoute.get('/forgot-password/save', usersController.saveNewForgotPassword)
usersRoute.get('/forgot-password/validate', usersController.validateForgotPassword);
usersRoute.post('/verification/new', jwtMiddleware, usersController.newVerificationAccount);
usersRoute.post('/verification/verify', jwtMiddleware, usersController.verifyVerificationAccount);

module.exports = usersRoute;