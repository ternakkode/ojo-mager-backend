const { check } = require('express-validator');

const { Program, ProgramType, DifficultType } = require('../../../database/models');
const generateSlug = require('../../../utils/slug');

const create = [
    check('title')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
        .custom(title => {
            const slug = generateSlug(title);
            return Program.findOne({
                where: { slug }
            }).then(program => {
                if (program) {
                    return Promise.reject('this program already taken');
                }
            })
        }),
    check('image_url')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string'),
    check('video_url')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string'),
    check('duration')
        .notEmpty().withMessage('should not empty')
        .isInt().withMessage('should be integer'),
    check('program_type_id')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
        .custom(program_type_id => {
            return ProgramType.findOne({
                where: { id: program_type_id }
            }).then(programType => {
                if (!programType) {
                    return Promise.reject('program type not valid')
                }
            });
        })
]

const update = [
    check('title')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
        .custom(title => {
            const slug = generateSlug(title);
            return Program.findOne({
                where: { slug }
            }).then(program => {
                if (program) {
                    return Promise.reject('this program already taken');
                }
            })
        }),
    check('image_url')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string'),
    check('video_url')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string'),
    check('duration')
        .notEmpty().withMessage('should not empty')
        .isInt().withMessage('should be integer'),
    check('program_type_id')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
        .custom(program_type_id => {
            return ProgramType.findOne({
                where: { id: program_type_id }
            }).then(programType => {
                if (!programType) {
                    return Promise.reject('program type not valid')
                }
            });
        })
]

module.exports = {
    create,
    update
}