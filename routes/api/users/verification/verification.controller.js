const { nanoid } = require('nanoid');

const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler');
const cryptoHelper = require('../../../../helpers/crypto')
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5000';
const SendgridHelper = require('../../../../helpers/SendgridHelper');
const { successApi } = require('../../../../utils/response');
const { User, UserCode, } = require('../../../../database/models')

const newVerificationAccount = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        const user = await User.findByPk(user_id);

        if(!user) {
            throw new ApiErrorHandler(404, 'user not found');
        }

        if(user.is_verified) {
            throw new ApiErrorHandler(400, 'user already verified');
        }

        const verificationCode = cryptoHelper.generateRandomAccountCode('verification', user.email);

        const existVerificationCode = await UserCode.findOne({
            where: { user_id : user_id, type: 'verification' }
        });
        
        if(existVerificationCode) {
            existVerificationCode.code = verificationCode;
            existVerificationCode.is_available = true;
            await existVerificationCode.save();
        } else {
            await UserCode.create({
                id: nanoid(),
                user_id: user_id,
                type: 'verification',
                code: verificationCode,
                is_available: true
            });
        }

        const sendgridHelper = new SendgridHelper();
        sendgridHelper.sendTextMail(
            user.email,
            'Harap Verifikasi Akun Anda',
            `Silahkan verifikasi akun anda melalui url berikut : ${frontendUrl}/verification/process?code=${verificationCode}`
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
        const { code } = req.body;
        
        const verificationCode = await UserCode.findOne({
            where: { code },
            include: {
                model: User,
                as: 'user'
            }
        })

        if(!verificationCode) { 
            throw new ApiErrorHandler(404, 'verification code invalid');
        }

        await verificationCode.user.update({is_verified: true});
        verificationCode.is_available = false;
        await verificationCode.save();

        res.json(
            successApi('succesfully verifiy account')
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    newVerificationAccount,
    verifyVerificationAccount,
}