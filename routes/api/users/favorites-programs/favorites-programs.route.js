const favoritesProgramsRoute = require('express').Router();
const favoritesProgramsController = require('./favorites-programs.controller');

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
    favoritesProgramsController.getFavoritesPrograms
);
favoritesProgramsRoute.delete(
    '/:program_id',
    jwtMiddleware,
    isVerified,
    favoritesProgramsController.deleteFavoritesPrograms
);

module.exports = favoritesProgramsRoute;