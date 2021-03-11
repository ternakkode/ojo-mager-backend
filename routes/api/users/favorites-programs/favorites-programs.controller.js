const { Op } = require('sequelize');

const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler');
const programTransformer = require('../../../../helpers/transformer/program');
const wording = require('../../../../utils/wording');
const { Program, ProgramType } = require('../../../../database/models')
const { successApi } = require('../../../../utils/response');

const addFavoritesPrograms = async (req, res, next) => {
    try {
        const { user } = req;
        const { program_id } = req.params;

        const program = await Program.findOne({
            where: { id : program_id }
        });

        if (!program) {
            throw new ApiErrorHandler(404, wording.PROGRAM_NOT_FOUND);
        }

        await user.addProgram(program);
        
        res.status(201).json(
            successApi('sucessfully add favorite program')
        );
    } catch (err) {
        next(err);
    }
}

const deleteFavoritesPrograms = async (req, res, next) => {
    try {
        const { user } = req;
        const { program_id }  =  req.params;

        const program = await Program.findOne({
            where: { id : program_id }
        });

        if (!program) {
            throw new ApiErrorHandler(404, wording.PROGRAM_NOT_FOUND);
        }

        await user.removeProgram(program);

        res.json(
            successApi('sucessfully delete favorite program')
        );
    } catch (err) {
        next(err);
    }
}

const getFavoritesPrograms = async (req, res, next) => {
    try { 
        const { user } = req;
        const { title, type } = req.query;

        let params = {
            include: [{
                model: ProgramType,
                as: 'type'
            }],
        }

        if (title || type) {
            params.where = {
                [Op.and]: [] 
            }

            if (title) params.where[Op.and].push({ title: { [Op.iLike]: `%${title}%` } });
            if (type) params.where[Op.and].push({ '$type.name$': type });
        }

        const programs = await user.getPrograms(params)

        if (!programs) {
            throw new ApiErrorHandler(404, wording.PROGRAM_NOT_FOUND);
        }

        res.json(
            successApi('sucefully get favorite program', programTransformer.list(programs))
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addFavoritesPrograms,
    deleteFavoritesPrograms,
    getFavoritesPrograms
}
