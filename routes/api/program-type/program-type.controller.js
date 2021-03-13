const { nanoid } = require("nanoid");

const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const wording = require('../../../utils/wording');
const { ProgramType } = require('../../../database/models')
const { successApi } = require('../../../utils/response');

const create = async (req, res, next) => {
    try {
        const { name, button_color_code } = req.body;
        const programType = await ProgramType.create({
            id: nanoid(),
            name,
            button_color_code
        });

        res.status(201).json(
            successApi("sucessfully create program type", programType)
        )
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const programType = await ProgramType.findAll();
        if (!programType) {
            throw new ApiErrorHandler(404, wording.PROGRAM_TYPE_NOT_FOUND)
        }

        res.json(
            successApi("successfuly fetch all program type data", programType)
        );
    } catch (err) {
        next(err);
    }
}

const detail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const programType = await ProgramType.findByPk(id);
        if (!programType) {
            throw new ApiErrorHandler(404, wording.PROGRAM_TYPE_NOT_FOUND)
        }

        res.json(
            successApi("successfuly fetch detail program type", programType)
        );
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, button_color_code } = req.body;

        const programType = await ProgramType.findByPk(id);
        if (!programType) {
            throw new ApiErrorHandler(404, wording.PROGRAM_TYPE_NOT_FOUND)
        }

        programType.name = name;
        programType.button_color_code = button_color_code;
        await programType.save();

        res.json(
            successApi('sucessfully update program type data', programType)
        );
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const programType = await ProgramType.findByPk(id);
        if (!programType) {
            throw new ApiErrorHandler(404, wording.PROGRAM_TYPE_NOT_FOUND)
        }

        await programType.destroy();

        res.json(
            successApi('sucessfully delete program type data')
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
    remove
}