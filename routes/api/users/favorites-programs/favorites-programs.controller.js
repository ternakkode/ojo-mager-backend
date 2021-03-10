const { Op, Sequelize } = require('sequelize');

const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler');
const { Program, ProgramType, User } = require('../../../../database/models')
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
        const { title, type, limit, isRandom } = req.query;

        let params = {
            include: [
                {
                    model: ProgramType,
                    as: 'type'
                },
                {
                    model: User,
                }
            ],
            where: {
                [Op.and]: [
                    { '$Users.id$': user.id }
                ]
            }
        }

        if (title || type) {
            if (title) params.where[Op.and].push({ title: { [Op.iLike]: `%${title}%` } });
            if (type) params.where[Op.and].push({ '$type.name$': type });
        }

        if (limit) {
            params.limit = limit;
        }

        if (isRandom) {
            params.order = Sequelize.literal('random()')
        }

        const program = await Program.findAll(params);
        
        if (!program) {
            throw new ApiErrorHandler(400, 'program not found');
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
