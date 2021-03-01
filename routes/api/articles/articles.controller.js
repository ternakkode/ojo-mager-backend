const { nanoid } = require("nanoid");
const { Op } = require("sequelize");

const { Article, ArticleCategory } = require('../../../database/models')
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const generateSlug = require('../../../utils/slug')
const { successApi } = require('../../../utils/response')

const create = async (req, res, next) => {
    try {
        const { title, category_id, image_url, content } = req.body;

        const article = await Article.create({
            id: nanoid(),
            slug: generateSlug(title),
            title,
            category_id,
            image_url,
            content
        });

        res.status(201).json(
            successApi("sucessfully create article data", article)
        );
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const { title, category, limit } = req.query;
        
        let params = {}
        
        params.include = {
            model: ArticleCategory,
            as: 'category'
        }

        if (title || category) {
            params.where = {
                [Op.and]: []
            }

            if(title) params[Op.and].push({title: { [Op.iLike]: `%${title}%`}});
            if(category) params[Op.and].push({'$category.name$': category})
        }

        if (limit) {
            params.limit = limit;
        }

        const articles = await Article.findAll(params);

        if (articles.length == 0) {
            throw new ApiErrorHandler(400, "article not found");
        }

        res.status(201).json(
            successApi("sucessfully get article data", articles)
        );
    } catch (err) {
        next(err);
    }
}

const detail = async (req, res, next) => {
    try {
        const { slug } = req.params;
        
        const article = await Article.findOne({
            where: {
                slug
            },
            include: {
                model: ArticleCategory,
                as: 'category'
            }
        });

        if (!article) {
            throw new ApiErrorHandler(400, "article data not found");
        }

        res.json(
            successApi("successfully get article data", article)
        )
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, category_id, image_url, content } = req.body;

        const article = await Article.update({ 
            slug: generateSlug(title), title, category_id, image_url, content
         }, { where: { id } });

        if (article == 0) {
            throw new ApiErrorHandler(400, "article category data not found")
        }

        res.json(
            successApi(`successfuly update ${article} article data`)
        );
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedArticle = await Article.destroy({
            where: { id }
        });

        if (deletedArticle == 0) {
            throw new ApiErrorHandler(400, "article category data not found")   
        }

        res.json(
            successApi(`successfuly delete ${deletedArticle} article data`)
        )
    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    index,
    detail,
    update,
    remove
}