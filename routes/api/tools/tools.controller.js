const { nanoid } = require('nanoid');

const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const wording = require('../../../utils/wording');
const { Tool } = require('../../../database/models');
const { successApi } = require('../../../utils/response');

const index = async (req, res, next) => {
    try {
        const tool = await Tool.findAll();
        if(tool == 0) {
            throw new ApiErrorHandler(404, wording.TOOL_NOT_FOUND)
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
            throw new ApiErrorHandler(404, wording.TOOL_NOT_FOUND)
        }

        res.json(
            successApi('sucessfully find tool by id', toolById)
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

        const tool = await Tool.findByPk(id);
        if (!tool) {
            throw new ApiErrorHandler(404, wording.TOOL_NOT_FOUND)
        }

        tool.name = name;
        tool.save();

        res.json(
            successApi('sucessfully update tool data', tool)
        );
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tool = await Tool.findByPk(id);
        if (!tool) {
            throw new ApiErrorHandler(404, wording.TOOL_NOT_FOUND)
        }

        tool.destroy();

        res.json(
            successApi('sucessfully delete tool data', tool)
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