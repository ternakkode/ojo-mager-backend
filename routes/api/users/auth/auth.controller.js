const { nanoid } = require('nanoid');

const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler');
const bcryptHelper = require('../../../../helpers/bcrypt');
const jwtHelper = require('../../../../helpers/jwt');
const { successApi } = require('../../../../utils/response');
const { User} = require('../../../../database/models')

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
            throw new ApiErrorHandler(404, 'user not found');
        }

        const comparePassword = await bcryptHelper.comparePassword(password, user.password);
        if (!comparePassword) {
            throw new ApiErrorHandler(401, 'password doesnt match');
        }

        const token = jwtHelper.generateJwtToken(user.id)

        res.json(
            successApi('sucessfully login', {user, token })
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    login,
    register
}