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
        if (difficult == 0) {
            throw new ApiErrorHandler(400, "Difficult data not found")   
        }
        res.status(201).json(
            successApi('Sucessfully create difficulties', difficult)
        );
    } catch (err) {
        next(err);
    }
}

const getDifficulities = async (req, res, next) => {
    try {
        const difficult = await DifficultType.findAll()
        res.json(
        successApi('Sucessfully find all difficulties', difficult)
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
        successApi('Sucessfully find difficulties', difficult)
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
        successApi('Sucessfully update difficulties', difficult)
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
        if (difficult == 0) {
            throw new ApiErrorHandler(400, "Difficult data not found")   
        }
        res.json(
            successApi('Sucessfully delete difficulties', difficult)
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