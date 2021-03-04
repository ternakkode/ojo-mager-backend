const { check } = require('express-validator');

const { Program, ProgramType, DifficultType } = require('../../../database/models');
const generateSlug = require('../../../utils/slug');

const create = [
    // check('slug')
    //     .notEmpty().withMessage('should not empty')
    //     .isString().withMessage('should be string'),
    check('title').notEmpty().isString().custom(title => {
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
    check('program_type_id').notEmpty().isString().custom(program_type_id => {
        return ProgramType.findOne({
            where: { id: program_type_id }
        }).then(programType => {
            if (!programType){
                return Promise.reject('program type not valid')
            }
        });
    })
    // check('difficulty_type_id').isEmpty().isString().custom(difficult_type_id => {
    //     return DifficultType.findOne({
    //         where: { id: difficult_type_id }
    //     }).then(difficultType => {
    //         if(!difficultType){
    //             return Promise.reject('difficult type not valid')
    //         }
    //     })
    // })
]

const update = [
    // check('slug')
    //     .notEmpty().withMessage('should not empty')
    //     .isString().withMessage('should be string'),
    check('title').notEmpty().isString().custom(title => {
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
    check('program_type_id').notEmpty().isString().custom(program_type_id => {
        return ProgramType.findOne({
            where: { id: program_type_id }
        }).then(programType => {
            if (!programType) {
                return Promise.reject('program type not valid')
            }
        });
    }),
    check('difficulty_type_id').isEmpty().isString().custom(difficult_type_id => {
        return DifficultType.findOne({
            where: { id: difficult_type_id }
        }).then(difficultType => {
            if (!difficultType) {
                return Promise.reject('difficult type not valid')
            }
        })
    })
]

module.exports = {
    create,
    update
}