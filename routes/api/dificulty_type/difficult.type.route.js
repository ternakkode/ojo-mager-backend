const difficultyTypesRoute = require('express').Router();

const difficultyTypesController = require('./difficult.type.controller');
const difficultTypeValidationRule = require('../../../helpers/validation/rules/difficultes')
const requestValidationMiddleware = require('../../../middleware/requestValidation')
const isAdmin = require('../../../middleware/isAdmin');
const isVerified = require('../../../middleware/isVerified')
const jwtMiddleware = require('../../../middleware/jwtPassport');

difficultyTypesRoute.post('/',
    jwtMiddleware,
    isVerified,
    isAdmin,
    difficultTypeValidationRule.create,
    requestValidationMiddleware,
    difficultyTypesController.createDifficultType,
);

difficultyTypesRoute.get('/',
    difficultyTypesController.getDifficulities,
);

difficultyTypesRoute.get('/:id',
    difficultyTypesController.getDifficulitiesById
);

difficultyTypesRoute.put('/:id',
    jwtMiddleware,
    isVerified,
    isAdmin,
    difficultTypeValidationRule.update,
    requestValidationMiddleware,
    difficultyTypesController.putDifficulitiesById
);
    
difficultyTypesRoute.delete('/:id',
    jwtMiddleware,
    isVerified,
    isAdmin,
    difficultyTypesController.deleteDifficulitiesById,
);


module.exports = difficultyTypesRoute;