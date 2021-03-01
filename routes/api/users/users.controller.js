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

        user.password = password;

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
        user.password = password;
        
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
        const forgotPasswordCode = cryptoHelper.generateRandomAccountCode('forgot-password', email);
        
        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            throw new ApiErrorHandler(400, "user not found")
        }
        
        const userCode = await UserCode.findOne({
            where: { user_id: user.id, type: "forgot-password" }
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
        sendgridHelper.sendTextMail(
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
        const { user_id, code, password } = req.body;
        const encryptedPassword = await bcryptHelper.encryptPassword(password);

        const userCode = await UserCode.findOne({
            where: {
                user_id,
                code,
                type: "forgot-password"
            }
        });

        if (!userCode || !userCode.is_available) {
            throw new ApiErrorHandler(400, "User codes not valid")
        }
        
        await User.update({
            password: encryptedPassword
        }, {
            where: {
                id: userCode.user_id
            }
        })

        await UserCode.update({
            is_available: false
        }, {
            where: {
                code
            }
        })

        res.json(
            successApi('sucessfully update password')
        );
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
            throw new ApiErrorHandler(400, "code is invalid");
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

const newVerificationAccount = async (req, res, next) => {
    try {
        const { user } = req;

        if(!user) {
            throw new ApiErrorHandler(400, "User not found");
        }

        if(user.is_verified) {
            throw new ApiErrorHandler(400, "User already verified");
        }

        const generatedVerificationCode = cryptoHelper.generateRandomAccountCode('verification', user.email);

        const existVerificationCode = await UserCode.findOne({
            where: { user_id : user.id, type: 'verification' }
        });
        
        if(!existVerificationCode) {
            await UserCode.create({
                id: nanoid(),
                user_id: user.id,
                type: 'verification',
                code: generatedVerificationCode,
                is_available: true
            })
        } else {
            await UserCode.update({
                code: generatedVerificationCode,
                is_available: true
            }, { where: { type: 'verification', user_id: user.id } });
        }

        const sendgridHelper = new SendgridHelper();
        sendgridHelper.sendTextMail(
            user.email,
            'Harap Verifikasi Akun Anda',
            `Berikut ini adalah kode untuk verifikasi akun : ${generatedVerificationCode}`
        );

        res.json(
            successApi('success send verificiation email')
        );
    } catch (err) {
        next(err);
    }
}

const verifyVerificationAccount = async (req, res, next) => {
    try {
        const { user } = req;
        const { code } = req.body;
        
        const verificationCode = await UserCode.findOne({
            where: { code, user_id: user.id }
        })
        
        if(!verificationCode) { 
            throw new ApiErrorHandler(400, "Verification code invalid");
        }

        await User.update({
            is_verified: true,
        }, { where: { id: user.id } });

        await UserCode.update({
            is_available: false
        }, { where: { id: verificationCode.id } });

        res.json(
            successApi("succesfully verifiy account")
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
    validateForgotPassword,
    newVerificationAccount,
    verifyVerificationAccount
}