const { nanoid } = require('nanoid');

const { Program, ProgramType, ProgramTool, Tool } = require('../../../database/models');
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const generateSlug = require('../../../utils/slug');
const { successApi } = require('../../../utils/response');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

const create = async (req, res, next) => {
    try {
        const { title, description, image_url, video_url, duration, program_type_id, difficulty_type_id } = req.body;

        const program = await Program.create({
            id: nanoid(),
            slug: generateSlug(title),
            title,
            description,
            image_url,
            video_url,
            duration,
            program_type_id,
            difficulty_type_id
        });

        res.status(201).json(
            successApi('Successfully create program', program)
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

        const tool = await Tool.findOne({
            where: { id: tool_id }
        })

        await program.addProgramsForTool(tool, { through: {} });

        res.status(201).json(
            successApi('Sucessfully add program for tool', program)
        );
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const { title, type, limit, isRandom, tool } = req.query;

        let params = {}

        params.include = [
            {
                model: ProgramType,
                as: 'type'
            },
            {
                model: Tool,
                as: 'ProgramsForTool'
            }
        ]

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

        const program = await Program.findAll(params);

        if (program.lenght == 0) {
            throw new ApiErrorHandler(400, "program not found");
        }

        res.status(201).json(
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
            include: {
                model: ProgramType,
                as: 'type'
            }
        });
        if (!program) {
            throw new ApiErrorHandler(400, "Program data not found")
        }

        res.json(
            successApi('Sucessfully find program by id', program)
        );
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, image_url, video_url, duration, program_type_id, difficulty_type_id } = req.body;

        const program = await Program.update({
            slug: generateSlug(title),
            title,
            description,
            image_url,
            video_url,
            duration,
            program_type_id,
            difficulty_type_id
        }, {
            where: { id }
        });

        if (program == 0) {
            throw new ApiErrorHandler(400, "Program type data not found")
        }

        res.json(
            successApi(`Sucessfully update ${program} program data`)
        );
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedProgram = await Program.destroy({
            where: { id }
        });

        if (deletedProgram == 0) {
            throw new ApiErrorHandler(400, "Program data not found")
        }

        res.json(
            successApi(`Sucessfully delete ${deletedProgram} program data`)
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    addToolInProgram,
    index,
    detail,
    update,
    remove
}