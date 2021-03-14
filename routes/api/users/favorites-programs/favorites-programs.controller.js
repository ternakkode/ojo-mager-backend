const { Op } = require('sequelize');

const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler');
const programTransformer = require('../../../../helpers/transformer/program');
const wording = require('../../../../utils/wording');
const { User, Program, ProgramType } = require('../../../../database/models')
const { getOffset, getNextPage, getPreviousPage } = require('../../../../helpers/paginate');
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
        const { title, type, isPaginated, page, limit } = req.query;

        let params = {
            include: [
                {
                    model: ProgramType,
                    as: 'type',
                    required: true,
                },
                {
                    model: User,
                    as: 'users',
                    required: true,
                    where: {
                        id: user.id
                    }
                }
            ],
            where: {
                [Op.and]: []
            }
        }

        let program = [];
        if (isPaginated) {
            const currentPage = parseInt(page) || 1;
            const currentLimit = parseInt(limit) || 9;

            if (title) params.where[Op.and].push({ title: { [Op.iLike]: `%${title}%` } });
            if (type) params.where[Op.and].push({ '$type.name$': type });
            
            params.limit = currentLimit;
            params.offset = getOffset(currentPage, currentLimit);
            
            let {count, rows} = await Program.findAndCountAll(params);
            rows = programTransformer.list(rows);
            
            program = {
                totalPage: Math.ceil(count / currentLimit),
                 previousPage: getPreviousPage(currentPage),
                 currentPage: currentPage,
                 nextPage: getNextPage(currentPage, currentLimit, count),
                 total: count,
                 limit: currentLimit,
                 data: rows
             }
        } else { 
            if (title) params.where[Op.and].push({ title: { [Op.iLike]: `%${title}%` } });
            if (type) params.where[Op.and].push({ '$type.name$': type });
    
            const programs = await user.getPrograms(params)
    
            if (!programs) {
                throw new ApiErrorHandler(404, wording.PROGRAM_NOT_FOUND);
            }

            program = programTransformer.list(programs);
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
