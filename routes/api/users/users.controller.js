const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const SendgridHelper = require('../../../helpers/SendgridHelper');
const { User, UserCode } = require('../../../database/models')
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
        // masukkan logic codenya disini mas
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