const { nanoid } = require('nanoid');

const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const generateSlug = require('../../../utils/slug');
const programTransformer = require('../../../helpers/transformer/program');
const wording = require('../../../utils/wording');
const { getOffset, getNextPage, getPreviousPage } = require('../../../helpers/paginate');
const { Op, Sequelize } = require('sequelize');
const { Program, ProgramType, Tool } = require('../../../database/models');
const { successApi } = require('../../../utils/response');

const create = async (req, res, next) => {
    try {
        const { title, description, image_url, video_url, duration, program_type_id, tools } = req.body;

        const program = await Program.create({
            id: nanoid(),
            slug: generateSlug(title),
            title,
            description,
            image_url,
            video_url,
            duration,
            program_type_id,
        });

        program.addTools(tools);

        res.status(201).json(
            successApi('successfully create program', program)
        );
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        let { title, type, page, limit, isPaginated, isRandom } = req.query;

        let params = {
            include: {
                model: ProgramType,
                as: 'type'
            },
        }

        let program = [];
        if (isPaginated ) {
            const currentPage = parseInt(page) || 1;
            const currentLimit = parseInt(limit) || 9;

            if (title || type) {
                params.where = {
                    [Op.and]: []
                }
    
                if (title) params.where[Op.and].push({ title: { [Op.iLike]: `%${title}%` } });
                if (type) params.where[Op.and].push({ '$type.name$': type });
            }
    
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
            if (title || type) {
                params.where = {
                    [Op.and]: []
                }
    
                if (title) params.where[Op.and].push({ title: { [Op.iLike]: `%${title}%` } });
                if (type) params.where[Op.and].push({ '$type.name$': type });
            }
    
            if (limit) {
                params.limit = limit;
            }
    
            if (isRandom) {
                params.order = Sequelize.literal('random()')
            }
    
            const programs = await Program.findAll(params);
    
            if (programs.lenght == 0) {
                throw new ApiErrorHandler(404, wording.PROGRAM_NOT_FOUND);
            }

            program = programTransformer.list(programs);
        }


        res.json(
            successApi("sucessfully get program data", program)
        );
    } catch (err) {
        next(err);
    }
}

const detail = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const program = await Program.findOne({
            where: {
                slug
            },
            include: [
                {
                    model: ProgramType,
                    as: 'type'
                },
                {
                    model: Tool,
                    as: 'tools'
                }
            ]
        });

        if (!program) {
            throw new ApiErrorHandler(404, wording.PROGRAM_NOT_FOUND)
        }

        res.json(
            successApi('Sucessfully find program by id', programTransformer.detail(
                { ...program.toJSON(), is_favorited: await req.user.hasProgram(program) }
            ))
        );
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, image_url, video_url, duration, program_type_id, tools } = req.body;

        const program = await Program.findByPk(id);
        if (!program) {
            throw new ApiErrorHandler(404, wording.PROGRAM_NOT_FOUND)
        }
        
        program.slug = generateSlug(title);
        program.title = title;
        program.description = description;
        program.image_url = image_url;
        program.video_url = video_url;
        program.duration = duration;
        program.program_type_id = program_type_id;
        await program.removeTools(await program.getTools());
        await program.setTools(tools);
        await program.save();

        res.json(
            successApi('successfully update program data', program)
        );
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const program = await Program.findByPk(id);
        if (!program) {
            throw new ApiErrorHandler(404, wording.PROGRAM_NOT_FOUND)
        }
        await program.destroy();

        res.json(
            successApi('successfully delete program data', program)
        );
    } catch (err) {
        next(err);
    }
}

const addToolInProgram = async (req, res, next) => {
    try {
        const { program_id, tool_id } = req.params;

        const program = await Program.findOne({
            where: { id: program_id }
        })

        if (!program) {
            throw new ApiErrorHandler(404, wording.PROGRAM_NOT_FOUND)
        }

        const tool = await Tool.findOne({
            where: { id: tool_id }
        })

        if (!tool) {
            throw new ApiErrorHandler(404, wording.TOOL_NOT_FOUND)
        }

        await program.addTools(tool);

        res.status(201).json(
            successApi('Sucessfully add program for tool')
        );
    } catch (err) {
        next(err);
    }
}

const deleteToolInProgram = async (req, res, next) => {
    try {
        const { program_id, tool_id } = req.params;

        const program = await Program.findOne({
            where: { id: program_id }
        })

        if (!program) {
            throw new ApiErrorHandler(404, wording.PROGRAM_NOT_FOUND)
        }

        const tool = await Tool.findOne({
            where: { id: tool_id }
        })

        if (!tool) {
            throw new ApiErrorHandler(404, wording.TOOL_NOT_FOUND)
        }

        await program.removeTools(tool);

        res.json(
            successApi('sucessfully delete program for tool')
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
    addToolInProgram,
    deleteToolInProgram,
}