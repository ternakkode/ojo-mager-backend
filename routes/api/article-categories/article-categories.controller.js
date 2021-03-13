const { nanoid } = require("nanoid");

const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const wording = require('../../../utils/wording');
const { ArticleCategory } = require('../../../database/models')
const { successApi } = require('../../../utils/response');

const create = async (req, res, next) => {
    try {
        const { name, button_color_code } = req.body;
        const articleCategory = await ArticleCategory.create({
            id: nanoid(),
            name,
            button_color_code
        });

        res.status(201).json(
            successApi("sucessfully create article category", articleCategory)
        )
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const articleCategories = await ArticleCategory.findAll();
        if (!articleCategories) {
            throw new ApiErrorHandler(404, wording.ARTICLE_CATEGORY_NOT_FOUND)
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
            throw new ApiErrorHandler(404, wording.ARTICLE_CATEGORY_NOT_FOUND)
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
        const { name, button_color_code } = req.body;

        const articleCategory = await ArticleCategory.findByPk(id);
        if (!articleCategory) {
            throw new ApiErrorHandler(404, wording.ARTICLE_CATEGORY_NOT_FOUND)
        }

        articleCategory.name = name;
        articleCategory.button_color_code = button_color_code;
        await articleCategory.save();
    
        res.json(
            successApi('sucessfully update article category data', articleCategory)
        );
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        const articleCategory = await ArticleCategory.findByPk(id);
        if (!articleCategory) {
            throw new ApiErrorHandler(404, wording.ARTICLE_CATEGORY_NOT_FOUND)
        }
        
        await articleCategory.destroy();
    
        res.json(
            successApi('sucessfully delete article category data', articleCategory)
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