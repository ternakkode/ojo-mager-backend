const { body, query } = require('express-validator');

const { Tool, Program, ProgramType } = require('../../../database/models');

const generateSlug = require('../../../utils/slug');
const wording = require('../../../utils/wording');

const index = [
    query('isRandom').toBoolean(),
    query('isPaginated').toBoolean()
];

const create = [
    body('title').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom(title => {
        const slug = generateSlug(title);
        return Program.findOne({
            where: { slug }
        }).then(program => {
            if (program) {
                return Promise.reject(wording.ALREADY_TAKEN);
            }
        })
    }),
    body('description').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('image_url').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('video_url').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('duration').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('program_type_id').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom(program_type_id => {
        return ProgramType.findOne({
            where: { id: program_type_id }
        }).then(programType => {
            if (!programType) {
                return Promise.reject(wording.NOT_FOUND)
            }
        });
    }),
    body('tools').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .isArray().withMessage(wording.NOT_ARRAY).bail()
    .custom(tools => {
        return Tool.findAll({
            where: {
                id: tools,
            }
        }).then(result => {
            if (result.length != tools.length) {
                return Promise.reject(wording.NOT_FOUND)
            }
        });
    }).bail()
];

const update = [
    body('title').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom((title, { req }) => {
        const slug = generateSlug(title);
        
        return Program.findOne({
            where: { slug }
        }).then(program => {
            if (program && req.params.id !== program.id) {
                return Promise.reject(wording.ALREADY_TAKEN);
            }
        })
    }),
    body('description').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('image_url').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('video_url').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('duration').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('program_type_id').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom(program_type_id => {
        return ProgramType.findOne({
            where: { id: program_type_id }
        }).then(programType => {
            if (!programType) {
                return Promise.reject(wording.NOT_FOUND)
            }
        });
    }),
    body('tools').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .isArray().withMessage(wording.NOT_ARRAY).bail()
    .custom(tools => {
        return Tool.findAll({
            where: {
                id: tools,
            }
        }).then(result => {
            if (result.length != tools.length) {
                return Promise.reject(wording.NOT_FOUND)
            }
        });
    }).bail()
];

module.exports = {
    index,
    create,
    update
}