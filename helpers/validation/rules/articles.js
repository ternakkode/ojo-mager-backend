const { check } = require('express-validator');

const { ArticleCategory, Article } = require('../../../database/models');
const generateSlug = require('../../../utils/slug')

const create = [
    check('title').notEmpty().isString().custom(title => {
        const slug = generateSlug(title);
        return Article.findOne({
            where: { slug }
        }).then(article => {
            if (article) {
                return Promise.reject('this article already taken');
            }
        })
    }),
    check('category_id').notEmpty().isString().custom(category_id => {
        return ArticleCategory.findOne({
            where: { id:category_id }
        }).then(articleCategory => {
            if (!articleCategory) {
                return Promise.reject('article category not valid');
            }
        });
    }),
    check('image_url').notEmpty().isString(),
    check('content').notEmpty().isString(),
];

const update = [
    check('title').isString().custom(title => {
        const slug = generateSlug(title);
        return Article.findOne({
            where: { slug }
        }).then(article => {
            if (article) {
                return Promise.reject('this article already taken');
            }
        })
    }),
    check('category_id').isString().custom(category_id => {
        return ArticleCategory.findOne({
            where: { id:category_id }
        }).then(articleCategory => {
            if (!articleCategory) {
                return Promise.reject('article category not valid');
            }
        });
    }),
    check('image_url').isString(),
    check('content').isString(),
];



module.exports = {
    create,
    update
};