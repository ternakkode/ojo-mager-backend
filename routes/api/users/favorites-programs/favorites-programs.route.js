const favoritesProgramsRoute = require('express').Router();
const favoritesProgramsController = require('./favorites-programs.controller');

const usersValidationRule = require('../../../../helpers/validation/rules/users');
const requestValidationMiddleware = require('../../../../middleware/requestValidation');

const jwtMiddleware = require('../../../../middleware/jwtPassport');
const isVerified = require('../../../../middleware/isVerified');

favoritesProgramsRoute.post(
    '/:program_id',
    jwtMiddleware,
    isVerified,
    favoritesProgramsController.addFavoritesPrograms
);
favoritesProgramsRoute.get(
    '/',
    jwtMiddleware,
    isVerified,
    usersValidationRule.favoritesProgram,
    requestValidationMiddleware,
    favoritesProgramsController.getFavoritesPrograms
);
favoritesProgramsRoute.delete(
    '/:program_id',
    jwtMiddleware,
    isVerified,
    favoritesProgramsController.deleteFavoritesPrograms
);

module.exports = favoritesProgramsRoute;