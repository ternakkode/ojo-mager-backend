const usersRoute = require('express').Router();

usersRoute.use('/auth', require('./auth/auth.route'));
usersRoute.use('/favorites-programs', require('./favorites-programs/favorites-programs.route'));
usersRoute.use('/forgot-password', require('./forgot-password/forgot-password.route'));
usersRoute.use('/me', require('./me/me.route'));
usersRoute.use('/verification', require('./verification/verification.route'));

module.exports = usersRoute;