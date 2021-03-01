const { nanoid } = require("nanoid");

const { ArticleCategory } = require('../../../database/models')
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const { successApi } = require('../../../utils/response');

const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const articleCategory = await ArticleCategory.create({
            id: nanoid(),
            name
        });

        res.status(200).json(
            successApi("successfulyl create article category", articleCategory)
        )
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const articleCategories = await ArticleCategory.findAll();
        if (!ArticleCategory) {
            throw new ApiErrorHandler("article category data not found")
        }

        res.json(
            successApi("successfuly fetch all article category data", articleCategories)
        );
    } catch (err) {
        next(err);
    }
}

const detail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const articleCategory = await ArticleCategory.findByPk(id);
        if (!articleCategory) {
            throw new ApiErrorHandler(400, "article category data not found")
        }
        
        res.json(
            successApi("successfuly fetch detail article category", articleCategory)
        );
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const articleCategory = await ArticleCategory.update({ name }, { where: { id } });
        if (articleCategory == 0) {
            throw new ApiErrorHandler(400, "article category data not found")
        }
    
        res.json(
            successApi(`successfuly update ${articleCategory} article category data`)
        );
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        const deletedArticleCategory = await ArticleCategory.destroy({
            where: { id }
        })
    
        if (deletedArticleCategory == 0) {
            throw new ApiErrorHandler(400, "article category data not found")   
        }
    
        res.json(
            successApi(`successfuly delete ${articleCategory} article category data`)
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
    remove
}