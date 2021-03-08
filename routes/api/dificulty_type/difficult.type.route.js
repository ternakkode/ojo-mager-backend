const difficultyTypesRoute = require('express').Router();

const difficultyTypesController = require('./difficult.type.controller');
const difficultTypeValidationRule = require('../../../helpers/validation/rules/difficultes')
const requestValidationMiddleware = require('../../../middleware/requestValidation')
const isVerified = require('../../../middleware/isVerified')
const jwtMiddleware = require('../../../middleware/jwtPassport');
const verifyRoles = require('../../../middleware/verifiyRoles');

difficultyTypesRoute.post('/',
    jwtMiddleware,
    isVerified,
    verifyRoles(['admin']),
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
    verifyRoles(['admin']),
    difficultTypeValidationRule.update,
    requestValidationMiddleware,
    difficultyTypesController.putDifficulitiesById
);
    
difficultyTypesRoute.delete('/:id',
    jwtMiddleware,
    isVerified,
    verifyRoles(['admin']),
    difficultyTypesController.deleteDifficulitiesById,
);


module.exports = difficultyTypesRoute;