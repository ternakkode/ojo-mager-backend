const { query, body } = require('express-validator');

const { User } = require('../../../database/models');
const wording = require('../../../utils/wording');

const passwordRequirement = (password) => {
    const containOneNumberLetterSpecialChar = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
    if (!password.match(containOneNumberLetterSpecialChar)) {
        return Promise.reject(wording.NOT_MEET_REQUIREMENT);
    }

    return true;
}

const editProfile = [
    body('name').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('password').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom(passwordRequirement).bail(),
    body('is_subscribe_newsletter').toBoolean()
];

const register = [
    body('name').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('email').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .isEmail().withMessage(wording.NOT_EMAIL_FORMATTED)
    .custom(email => {
        return User.findOne({
            where: { email }
        }).then(user => {
            if (user) {
                return Promise.reject(wording.ALREADY_TAKEN);
            }
        });
    }),
    body('password').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom(passwordRequirement).bail(),
    body('role').notEmpty().withMessage(wording.IS_EMPTY).bail() 
    .isIn(['admin', 'user']).withMessage(wording.NOT_IN_CHOICE)
];

const login = [
    body('email').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .isEmail().withMessage(wording.NOT_EMAIL_FORMATTED),
    body('password').notEmpty().withMessage(wording.IS_EMPTY).bail()
];

const newForgotPassword = [
    body('email')
        .notEmpty().withMessage(wording.IS_EMPTY).bail()
        .isEmail().withMessage(wording.NOT_EMAIL_FORMATTED),
];

const validateForgotPassword = [
    body('code')
        .notEmpty().withMessage(wording.IS_EMPTY).bail()
        
];

const saveForgotPassword = [
    body('code').notEmpty().withMessage(wording.IS_EMPTY).bail(),
    body('password').notEmpty().withMessage(wording.IS_EMPTY).bail()
    .custom(passwordRequirement).bail()
];

const newVerificationAccount = [
    body('user_id').notEmpty().withMessage(wording.IS_EMPTY).bail()
];

const verifyVerification = [
    body('code').notEmpty().withMessage(wording.IS_EMPTY).bail()
];

const favoritesProgram = [
    query('isPaginated').toBoolean()
];


module.exports = {
    editProfile,
    register,
    login,
    newForgotPassword,
    validateForgotPassword,
    saveForgotPassword,
    newVerificationAccount,
    verifyVerification,
    favoritesProgram
};