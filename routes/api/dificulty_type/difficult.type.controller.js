const { nanoid } = require("nanoid");
const { DifficultType } = require('../../../database/models');
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const { successApi } = require('../../../utils/response');



const createDifficultType = async (req, res, next) => {
    try {
        const { name } = req.body
        const difficult = await DifficultType.create({
            id: nanoid(),
            name
        })
        res.json(
            successApi('sucessfully create', difficult)
        );
    } catch (err) {
        next(err);
    }
}

const getDifficulities = async (req, res, next) => {
    try {
        const difficult = await DifficultType.findAll()
        res.json(
        successApi('sucessfully find all Difficulties', difficult)
        );
    }   catch (err) {
        next(err);
    }
}

const getDifficulitiesById = async (req, res, next) => {
    try {
        const difficult = await DifficultType.findOne({
            where: { id: req.params.id }
        })
        
        res.json(
        successApi('sucessfully find Difficulties', difficult)
        );
    }   catch (err) {
        next(err);
    }
}

const putDifficulitiesById = async (req, res, next) => {
    try {
        const { name } = req.body
        const difficult = await DifficultType.update({
            name
        },{
            where: { id: req.params.id }
        });

        
        res.json(
        successApi('sucessfully update', difficult)
        );
    }   catch (err) {
        next(err);
    }
}
const deleteDifficulitiesById = async (req, res, next) => {
    try {
        const  difficult = await DifficultType.destroy({
            where: { id: req.params.id }
        });
        
        res.json(
        successApi('sucessfully delete', difficult)
        );
    }   catch (err) {
        next(err);
    }
}

module.exports = {
    createDifficultType,
    getDifficulities,
    getDifficulitiesById,
    putDifficulitiesById,
    deleteDifficulitiesById
}