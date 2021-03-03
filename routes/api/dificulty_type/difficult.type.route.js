const difficultyTypesRoute = require('express').Router();
const difficultyTypesController = require('./difficult.type.controller');


difficultyTypesRoute.post('/', difficultyTypesController.createDifficultType);
difficultyTypesRoute.get('/', difficultyTypesController.getDifficulities);
difficultyTypesRoute.get('/:id', difficultyTypesController.getDifficulitiesById);
difficultyTypesRoute.put('/:id', difficultyTypesController.putDifficulitiesById);
difficultyTypesRoute.delete('/:id', difficultyTypesController.deleteDifficulitiesById);




module.exports = difficultyTypesRoute;