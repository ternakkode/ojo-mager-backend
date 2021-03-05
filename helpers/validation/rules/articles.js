const { check, query } = require('express-validator');

const { ArticleCategory, Article } = require('../../../database/models');
const generateSlug = require('../../../utils/slug')

const index = [
    query('isRandom').toBoolean()
]

const create = [
    check('title')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
        .custom(title => {
            const slug = generateSlug(title);
            return Article.findOne({
                where: { slug }
            }).then(article => {
                if (article) {
                    return Promise.reject('already taken');
                }
            })
    }),
    check('category_id')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
        .custom(category_id => {
            return ArticleCategory.findOne({
                where: { id:category_id }
            }).then(articleCategory => {
                if (!articleCategory) {
                    return Promise.reject('category not valid');
                }
            });
        }),
    check('image_url')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string'),
    check('content')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
];

const update = [
    check('title')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
        .custom(title => {
            const slug = generateSlug(title);
            return Article.findOne({
                where: { slug }
            }).then(article => {
                if (article) {
                    return Promise.reject('this article already taken');
                }
            })
        }),
    check('category_id')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
        .custom(category_id => {
            return ArticleCategory.findOne({
                where: { id:category_id }
            }).then(articleCategory => {
                if (!articleCategory) {
                    return Promise.reject('article category not valid');
                }
            });
        }),
    check('image_url')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string'),
    check('content')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
];



module.exports = {
    index,
    create,
    update
};