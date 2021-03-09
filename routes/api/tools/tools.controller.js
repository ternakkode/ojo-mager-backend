const { nanoid } = require('nanoid');

const { Tool } = require('../../../database/models');
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const { successApi } = require('../../../utils/response');

const index = async (req, res, next) => {
    try {
        const tool = await Tool.findAll();
        if(tool == 0) {
            throw new ApiErrorHandler(400, "Tool data not found")
        }

        res.status(201).json(
            successApi('Sucessfully find all tool', tool)
        );
    } catch (err) {
        next(err);
    }
}

const detail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const toolById = await Tool.findOne({
            where: { id }
        });
        if(!toolById) {
            throw new ApiErrorHandler(400, "Tool data not found")
        }

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
        const { id } = req.params;
        const { name } = req.body;

        const updateToolById = await Tool.update({
            name
        }, {
            where: { id }
        });

        if(updateToolById == 0) {
            throw new ApiErrorHandler(400, "Tool data not found")
        }

        res.json(
            successApi(`Sucessfully update ${updateToolById} tool data`)
        );
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteToolById = await Tool.destroy({
            where: { id }
        });

        if (deleteToolById == 0) {
            throw new ApiErrorHandler(400, "Tool data not found")
        }

        res.json(
            successApi(`Sucessfully delete ${deleteToolById} tool data`)
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
    remove,
};