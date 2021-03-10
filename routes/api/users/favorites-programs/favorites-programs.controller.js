const { Op } = require('sequelize');

const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler');
const { Program } = require('../../../../database/models')
const { successApi } = require('../../../../utils/response');

const addFavoritesPrograms = async (req, res, next) => {
    try {
        const { user } = req;
        const { program_id } = req.params;

        const program = await Program.findOne({
            where: { id : program_id }
        });

        if (!program) {
            throw new ApiErrorHandler(404, 'program not found');
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
            throw new ApiErrorHandler(404, 'program not found');
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
            scope: 'list',
        }

        if (title || type) {
            params.where = {
                [Op.and]: [] 
            }

            if (title) params.where[Op.and].push({ title: { [Op.iLike]: `%${title}%` } });
            if (type) params.where[Op.and].push({ '$type.name$': type });
        }

        const program = await user.getPrograms(params)

        if (!program) {
            throw new ApiErrorHandler(404, 'program not found');
        }

        res.json(
            successApi('sucefully get favorite program', program)
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
