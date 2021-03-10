const { body } = require('express-validator');

const { User } = require('../../../database/models');
const wording = require('../../../utils/wording');

const editProfile = [
    body('name').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('password').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('is_subscribe_nwesletter').toBoolean()
];

const register = [
    body('name').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('email').notEmpty().withMessage(wording.IS_EMPTY).bail()
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
    body('password').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('role').notEmpty().withMessage(wording.IS_EMPTY).bail() 
    .isIn(['admin', 'user']).withMessage('not in choice')
];

const login = [
    body('email').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .isEmail().withMessage('should be email format'),
    body('password').notEmpty().withMessage(wording.IS_EMPTY).bail()    
];

const newForgotPassword = [
    body('email')
        .notEmpty().withMessage(wording.IS_EMPTY).bail()
        .isEmail().withMessage('should be email format'),
];

const validateForgotPassword = [
    body('code')
        .notEmpty().withMessage(wording.IS_EMPTY).bail()
        
];

const saveForgotPassword = [
    body('code')
        .notEmpty().withMessage(wording.IS_EMPTY).bail()
        ,
    body('password')
        .notEmpty().withMessage(wording.IS_EMPTY).bail()      
];

const newVerificationAccount = [
    body('user_id')
    .notEmpty().withMessage(wording.IS_EMPTY).bail()
];

const verifyVerification = [
    body('code').notEmpty().withMessage(wording.IS_EMPTY).bail()
];

module.exports = {
    editProfile,
    register,
    login,
    newForgotPassword,
    validateForgotPassword,
    saveForgotPassword,
    newVerificationAccount,
    verifyVerification
};