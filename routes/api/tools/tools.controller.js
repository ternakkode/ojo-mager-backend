const { nanoid } = require('nanoid');

const { Tool } = require('../../../database/models');
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const { successApi } = require('../../../utils/response');

const index = async (req, res, next) => {
    try {
        const tool = await Tool.findAll();

        res.json(
            successApi('Sucessfully find all tool', tool)
        );
    } catch (err) {
        next(err);
    }
}

const detail = async (req, res, next) => {
    try {
        const toolById = await Tool.findOne({
            where: { id: req.params.id }
        });

        res.json(
            successApi('Sucessfully find tool by id', toolById)
        );
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const { name } = req.body;

        const tool = await Tool.create({
            id: nanoid(),
            name
        });

        res.json(
            successApi('Sucessfully create tool', tool)
        );
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const { name } = req.body
        const updateToolById = await Tool.update({
            name
        }, {
            where: { id: req.params.id }
        });

        res.json(
            successApi('Sucessfully update tool', { name })
        );
    } catch (err) {
        next(err);
    }
}

const deleteTool = async (req, res, next) => {
    try {
        const deleteToolById = await Tool.destroy({
            where: { id: req.params.id }
        });

        res.json(
            successApi('Sucessfully delete tool')
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    index,
    detail,
    update,
    deleteTool
};