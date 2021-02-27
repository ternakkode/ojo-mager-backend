const { nanoid } = require("nanoid");

const { User, UserCode } = require('../../../database/models')
const bcryptHelper = require('../../../helpers/bcrypt');
const cryptoHelper = require('../../../helpers/crypto')
const jwtHelper = require('../../../helpers/jwt');
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const SendgridHelper = require('../../../helpers/SendgridHelper');
const { successApi } = require('../../../utils/response');

const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body
        const encryptedPassword = await bcryptHelper.encryptPassword(password);

        const user = await User.create({
            id: nanoid(),
            name,
            email,
            password: encryptedPassword,
            role,
            is_verified: false
        });

        res.json(
            successApi('sucessfully register', user)
        );
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            throw new ApiErrorHandler(400, "user not found");
        }

        const comparePassword = await bcryptHelper.comparePassword(password, user.password);
        if (!comparePassword) {
            throw new ApiErrorHandler(400, "password doesnt match");
        }

        const token = jwtHelper.generateJwtToken(user.id)

        res.json(
            successApi('sucessfully login', { user, token })
        );
    } catch (err) {
        next(err);
    }
}

const newForgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const forgotPasswordCode = "iuefbofbieubuiebieb"
        
        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            throw new ApiErrorHandler(400, "user not found")
        }
        
        const userCode = await UserCode.findOne({
            where: { user_id: user.id }
        });
        
        if (!userCode) {
            await UserCode.create({
                id: nanoid(),
                is_available: true,
                code: forgotPasswordCode,
                type: "forgot-password",
                user_id: user.id
            });
        } else {
            await UserCode.update({
                code: forgotPasswordCode,
                is_available: true
            }, {
                where: {
                    user_id: user.id,
                    type: "forgot-password"
                }
            })
        }

        const sendgridHelper = new SendgridHelper();
        await sendgridHelper.sendTextMail(
            email,
            'Code lupa password',
            `Ini Code lupa password kamu ya !, click untuk merubah password : ${forgotPasswordCode}`
        );

        res.json(
            successApi('Berhasil Mengirim Email')
        );
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
        
        const { code } = req.body;
        const userCode = await UserCode.findOne({
            where: { code }
        })
        if (!userCode) {
            throw new ApiErrorHandler(400, "user not found");
        }
        res.json(
            successApi('sucessully validate request password data', {
                userCode,
                code
            })
        );
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