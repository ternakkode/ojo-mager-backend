const { check } = require('express-validator');

const { User } = require('../../../database/models');

const register = [
    check('name').notEmpty().isString(),
    check('email').notEmpty().isEmail().custom(email => {
        return User.findOne({
            where: { email }
        }).then(user => {
            if (user) {
                return Promise.reject('e-mail already in use');
            }
        });
    }),
    check('password').notEmpty().isString(),
    check('role').notEmpty().isString().isIn(['admin', 'user'])
]

const login = [
    check('email').notEmpty().isEmail(),
    check('password').notEmpty().isString(),
]

const newForgotPassword = [
    check('email').notEmpty().isEmail()
]

const validateForgotPassword = [
    check('code').notEmpty().isString()
]

const saveForgotPassword = [
    check('user_id').notEmpty().custom(value => {
        return User.findByPk(value).then(user => {
            if (!user) {
                return Promise.reject('user not found');
            }
        });
    }),
    check('code').notEmpty().isString(),
    check('password').notEmpty().isString(),
]

const verifyVerification = [
    check('code').notEmpty().isString()
]

module.exports = {
    register,
    login,
    newForgotPassword,
    validateForgotPassword,
    saveForgotPassword,
    verifyVerification
};