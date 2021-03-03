const { check } = require('express-validator');

const { User } = require('../../../database/models');

const register = [
    check('name')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string'),
    check('email')
        .notEmpty().withMessage('should not empty')
        .isEmail().withMessage('should be email format')
        .custom(email => {
            return User.findOne({
                where: { email }
            }).then(user => {
                if (user) {
                    return Promise.reject('already in use');
                }
            });
        }),
    check('password')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string'),
    check('role')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
        .isIn(['admin', 'user']).withMessage('not in choice')
]

const login = [
    check('email')
        .notEmpty().withMessage('should not empty')
        .isEmail().withMessage('should be email format'),
    check('password')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
]

const newForgotPassword = [
    check('email')
        .notEmpty().withMessage('should not empty')
        .isEmail().withMessage('should be email format'),
]

const validateForgotPassword = [
    check('code')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
]

const saveForgotPassword = [
    check('user_id')
        .notEmpty().withMessage('should not empty')
        .custom(value => {
            return User.findByPk(value).then(user => {
                if (!user) {
                    return Promise.reject('user not found');
                }
            });
        }),
    check('code')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string'),
    check('password')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
]

const verifyVerification = [
    check('code')
        .notEmpty().withMessage('should not empty')
        .isString().withMessage('should be string')
]

module.exports = {
    register,
    login,
    newForgotPassword,
    validateForgotPassword,
    saveForgotPassword,
    verifyVerification
};