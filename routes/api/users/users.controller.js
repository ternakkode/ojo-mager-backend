const { nanoid } = require('nanoid');
const { Op, Sequelize } = require('sequelize');

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5000';
const { Program, ProgramType, User, UserCode, } = require('../../../database/models')
const bcryptHelper = require('../../../helpers/bcrypt');
const cryptoHelper = require('../../../helpers/crypto')
const jwtHelper = require('../../../helpers/jwt');
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const SendgridHelper = require('../../../helpers/SendgridHelper');
const { successApi } = require('../../../utils/response');

const profileInfo = async (req, res, next) => {
    try {
        res.json(
            successApi('successfully fetch user data', req.user)
        )
    } catch {
        next(err);
    }
}

const editProfile = async (req, res, next) => {
    try {
        const { user } = req;
        const { name, password, is_subscribe_newsletter } = req.body;

        await User.update({
            name, password, is_subscribe_newsletter
        }, { where: { id: user.id } });

        res.json(
            successApi('success update user information')
        )
    } catch {
        next(err);
    }
}

const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body

        const user = await User.create({
            id: nanoid(),
            name,
            email,
            password,
            role,
            is_verified: false,
            is_subscribe_newsletter: false
        });

        res.status(201).json(
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
            throw new ApiErrorHandler(400, 'user not found');
        }

        const comparePassword = await bcryptHelper.comparePassword(password, user.password);
        if (!comparePassword) {
            throw new ApiErrorHandler(400, 'password doesnt match');
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
        const forgotPasswordCode = cryptoHelper.generateRandomAccountCode('forgot-password', email);
        
        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            throw new ApiErrorHandler(400, 'user not found')
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
            `Silahkan reset password anda melalui url berikut : ${frontendUrl}/change-password?code=${forgotPasswordCode}`
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
            throw new ApiErrorHandler(400, 'code is invalid');
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
            throw new ApiErrorHandler(400, 'User codes not valid')
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

const newVerificationAccount = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        const user = await User.findByPk(user_id);

        if(!user) {
            throw new ApiErrorHandler(400, 'User not found');
        }

        if(user.is_verified) {
            throw new ApiErrorHandler(400, 'User already verified');
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
            `Silahkan verifikasi akun anda melalui url berikut : ${frontendUrl}/verification?code=${verificationCode}`
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
            throw new ApiErrorHandler(400, 'Verification code invalid');
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

const addFavoritesPrograms = async (req, res, next) => {
    try {
        const { user } = req;
        const { program_id } = req.params;

        const program = await Program.findOne({
            where: { id : program_id }
        });

        if (!program) {
            throw new ApiErrorHandler(400, 'program not found');
        }

        await user.addProgram(program);
        
        res.status(201).json(
            successApi('sucessfully add favorite program')
        );
    } catch (err) {
        next(err);
    }
}

const deleteFavoritesPrograms = async (req, res, next) => {
    try {
        const { user } = req;
        const { program_id }  =  req.params;

        const program = await Program.findOne({
            where: { id : program_id }
        });

        if (!program) {
            throw new ApiErrorHandler(400, 'program not found');
        }

        await user.removeProgram(program);

        res.json(
            successApi('sucessfully delete favorite program')
        );
    } catch (err) {
        next(err);
    }
}

const getFavoritesPrograms = async (req, res, next) => {
    try { 
        const { user } = req;
        const { title, type, limit, isRandom } = req.query;

        let params = {
            include: [
                {
                    model: ProgramType,
                    as: 'type'
                },
                {
                    model: User,
                }
            ],
            where: {
                [Op.and]: [
                    { '$Users.id$': user.id }
                ]
            }
        }

        if (title || type) {
            if (title) params.where[Op.and].push({ title: { [Op.iLike]: `%${title}%` } });
            if (type) params.where[Op.and].push({ '$type.name$': type });
        }

        if (limit) {
            params.limit = limit;
        }

        if (isRandom) {
            params.order = Sequelize.literal('random()')
        }

        const program = await Program.findAll(params);
        
        if (!program) {
            throw new ApiErrorHandler(400, 'program not found');
        }

        res.json(
            successApi('sucefully get favorite program', program)
        );
    } catch (err) {
        next(err);
    }
 } 

module.exports = {
    profileInfo,
    editProfile,
    register,
    login,
    newForgotPassword,
    saveNewForgotPassword,
    validateForgotPassword,
    newVerificationAccount,
    verifyVerificationAccount,
    addFavoritesPrograms,
    deleteFavoritesPrograms,
    getFavoritesPrograms
}