const { nanoid } = require('nanoid');

const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler');
const cryptoHelper = require('../../../../helpers/crypto')
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5000';
const SendgridHelper = require('../../../../helpers/SendgridHelper');
const { successApi } = require('../../../../utils/response');
const { User, UserCode, } = require('../../../../database/models')

const newForgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const forgotPasswordCode = cryptoHelper.generateRandomAccountCode('forgot-password', email);
        
        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            throw new ApiErrorHandler(404, 'user not found')
        }
        
        const existForgotPasswordCode = await UserCode.findOne({
            where: { user_id: user.id, type: 'forgot-password' }
        });
        
        if (existForgotPasswordCode) {
            existForgotPasswordCode.code = forgotPasswordCode;
            existForgotPasswordCode.is_available =  true;
            await existForgotPasswordCode.save();
        } else {
            await UserCode.create({
                id: nanoid(),
                is_available: true,
                code: forgotPasswordCode,
                type: 'forgot-password',
                user_id: user.id
            });
        }

        const sendgridHelper = new SendgridHelper();
        sendgridHelper.sendTextMail(
            email,
            'Kode untuk reset password.',
            `Silahkan reset password anda melalui url berikut : ${frontendUrl}/forgot-password/save?code=${forgotPasswordCode}`
        );

        res.json(
            successApi('Berhasil Mengirim Email')
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
            throw new ApiErrorHandler(404, 'code is invalid');
        }
        
        res.json(
            successApi('sucessully validate request password data', userCode)
        );
    } catch (err) {
        next(err);
    }
}

const saveNewForgotPassword = async (req, res, next) => {
    try {
        const { code, password } = req.body;

        const userCode = await UserCode.findOne({
            where: {
                code,
                type: 'forgot-password'
            },
            include: {
                model: User,
                as: 'user'
            }
        });

        if (!userCode || !userCode.is_available) {
            throw new ApiErrorHandler(404, 'User codes not valid')
        }
        
        userCode.is_available = false;
        await userCode.user.update({password});
        await userCode.save();

        res.json(
            successApi('sucessfully update password')
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    newForgotPassword,
    saveNewForgotPassword,
    validateForgotPassword,
}