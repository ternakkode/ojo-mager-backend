const { nanoid } = require("nanoid");
const { Op, Sequelize } = require("sequelize");

const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const articleTransformer = require('../../../helpers/transformer/article');
const generateSlug = require('../../../utils/slug');
const wording = require('../../../utils/wording');
const { getOffset, getNextPage, getPreviousPage } = require('../../../helpers/paginate');

const { Article, ArticleCategory, User } = require('../../../database/models')
const { successApi } = require('../../../utils/response')

const create = async (req, res, next) => {
    try {
        const { user } = req;
        const { title, category_id, image_url, content } = req.body;

        const article = await Article.create({
            id: nanoid(),
            slug: generateSlug(title),
            user_id: user.id,
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
        const { title, category, page, limit, isPaginated, isRandom } = req.query;
        
        let params = {}

        params.include = [
            {
                model: ArticleCategory,
                as: 'category' 
            },
            {
                model: User,
                as: 'publisher'
            }          
        ]

        let article = [];
        if (isPaginated) {
            const currentPage = parseInt(page) || 1;
            const currentLimit = parseInt(limit) || 9;

            if (title || category) {
                params.where = {
                    [Op.and]: []
                }
    
                if(title) params.where[Op.and].push({title: { [Op.iLike]: `%${title}%`}});
                if(category) params.where[Op.and].push({'$category.name$': category})
            }
            
            params.limit = currentLimit;
            params.offset = getOffset(currentPage, currentLimit);

            let {count, rows} = await Article.findAndCountAll(params);
            rows = articleTransformer.list(rows);
            
            article = {
                totalPage: Math.ceil(count / currentLimit),
                previousPage: getPreviousPage(currentPage),
                currentPage: currentPage,
                nextPage: getNextPage(currentPage, currentLimit, count),
                total: count,
                limit: currentLimit,
                data: rows
             }
        } else {
            if (title || category) {
                params.where = {
                    [Op.and]: []
                }
    
                if(title) params.where[Op.and].push({title: { [Op.iLike]: `%${title}%`}});
                if(category) params.where[Op.and].push({'$category.name$': category})
            }
    
            if (limit) {
                params.limit = limit;
            }
    
            if (isRandom) {
                params.order = Sequelize.literal('random()')
            }
    
            const articles = await Article.findAll(params);
    
            if (articles.length == 0) {
                throw new ApiErrorHandler(404, wording.ARTICLE_NOT_FOUND);
            }

            article = articleTransformer.list(articles)
        }

        res.json(
            successApi("sucessfully get article data", article)
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
            include: [
                {
                    model: ArticleCategory,
                    as: 'category'
                },
                {
                    model: User,
                    as: 'publisher'
                }
            ]
        });

        if (!article) {
            throw new ApiErrorHandler(404, wording.ARTICLE_NOT_FOUND);
        }

        res.json(
            successApi("successfully get article data", articleTransformer.detail(article.toJSON()))
        )
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, category_id, image_url, content } = req.body;

        const article = await Article.findByPk(id);
        if (!article) {
            throw new ApiErrorHandler(404, wording.ARTICLE_NOT_FOUND);
        }

        article.slug = generateSlug(title);
        article.title = title;
        article.category_id = category_id;
        article.image_url = image_url;
        article.content = content;
        await article.save();

        res.json(
            successApi('sucessfully update article data', article)
        );
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const article = await Article.findByPk(id);
        if (!article) {
            throw new ApiErrorHandler(404, wording.ARTICLE_NOT_FOUND);
        }

        await article.destroy();

        res.json(
            successApi('sucessfully delete article data', article)
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