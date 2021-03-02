const { nanoid } = require("nanoid");

const { ProgramType } = require('../../../database/models')
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const { successApi } = require('../../../utils/response');

const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const programType = await ProgramType.create({
            id: nanoid(),
            name
        });

        res.status(200).json(
            successApi("successfulyl create Program Type", programType)
        )
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const programType = await ProgramType.findAll();
        if (!ProgramType) {
            throw new ApiErrorHandler("program type data not found")
        }

        res.json(
            successApi("successfuly fetch all program Types data", programType)
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
            throw new ApiErrorHandler(400, "program type data not found")
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
        const { name } = req.body;

        const programType = await ProgramType.update({ name }, { where: { id } });
        if (programType == 0) {
            throw new ApiErrorHandler(400, "program type data not found")
        }

        res.json(
            successApi(`successfuly update ${programType} program type data`)
        );
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedProgramType = await ProgramType.destroy({
            where: { id }
        })

        if (deletedProgramType == 0) {
            throw new ApiErrorHandler(400, "program type data not found")
        }

        res.json(
            successApi(`successfuly delete ${deletedProgramType} program type data`)
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