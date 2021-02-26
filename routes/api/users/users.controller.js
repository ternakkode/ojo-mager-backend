const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid');
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const SendgridHelper = require('../../../helpers/SendgridHelper');
const { User } = require('../../../database/models')
const { successApi } = require('../../../utils/response');

const register = async (req, res, next) => {
    try {
        // masukkan logic codenya disini mas
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({
            where : { email }
        });

        if(!user) {
            throw new ApiErrorHandler(400, "user not found");
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new ApiErrorHandler(400, "password doesnt match");
        }
        
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);

         res.json(
            successApi('sucessfully login', { user, token })
        );
    } catch (err) {
        next(err);
    }
}

const newForgotPassword = async (req, res, next) => {
    try {
        // masukkan logic codenya disini mas
    } catch (err) {
        next(err);
    }
}

const saveNewForgotPassword = async (req, res, next) => {
    try {
        // masukkan logic codenya disini mas
    } catch (err) {
        next(err);
    }
}

const validateForgotPassword = async (req, res, next) => {
    try {
        // masukkan logic codenya disini mas
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login,
    newForgotPassword,
    saveNewForgotPassword,
    validateForgotPassword
}