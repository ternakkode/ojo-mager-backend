const { nanoid } = require("nanoid");

const { User, UserCode } = require('../../../database/models');
const bcryptHelper = require('../../../helpers/bcrypt');
const cryptoHelper = require('../../../helpers/crypto');
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
        await sendgridHelper.sendTextMail(
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