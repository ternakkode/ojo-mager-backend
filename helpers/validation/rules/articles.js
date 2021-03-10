const { body, query } = require('express-validator');

const { ArticleCategory, Article } = require('../../../database/models');
const generateSlug = require('../../../utils/slug');
const wording = require('../../../utils/wording');

const index = [
    query('isRandom').toBoolean()
];

const create = [
    body('title').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom(title => {
        const slug = generateSlug(title);
        
        return Article.findOne({
            where: { slug }
        }).then(article => {
            if (article) {
                return Promise.reject(wording.ALREADY_TAKEN);
            }
        });
    }),
    body('category_id').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom(category_id => {
        return ArticleCategory.findOne({
            where: { id:category_id }
        }).then(articleCategory => {
            if (!articleCategory) {
                return Promise.reject(wording.NOT_FOUND);
            }
        });
    }).bail(),
    body('image_url').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('content').notEmpty().withMessage(wording.IS_EMPTY).bail()
];

const update = [
    body('title').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom((title, { req }) => {
        const slug = generateSlug(title);
        
        return Article.findOne({
            where: { slug }
        }).then(article => {
            if (article && article.id !== req.params.id) {
                return Promise.reject(wording.ALREADY_TAKEN);
            }
        })
    }).bail(),
    body('category_id').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom(category_id => {
        return ArticleCategory.findOne({
            where: { id:category_id }
        }).then(articleCategory => {
            if (!articleCategory) {
                return Promise.reject(wording.NOT_FOUND);
            }
        });
    }).bail(),
    body('image_url').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('content').notEmpty().withMessage(wording.IS_EMPTY).bail()
];



module.exports = {
    index,
    create,
    update
};