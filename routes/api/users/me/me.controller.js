const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler');
const userTransfomer = require('../../../../helpers/transformer/user')
const { successApi } = require('../../../../utils/response');

const profileInfo = async (req, res, next) => {
    try {
        res.json(
            successApi('successfully fetch user data', userTransfomer.detail(req.user.toJSON()))
        )
    } catch {
        next(err);
    }
}

const editProfile = async (req, res, next) => {
    try {
        const { user } = req;
        const { name, password, is_subscribe_newsletter } = req.body;

        user.name = name;
        user.password = password;
        user.is_subscribe_newsletter = is_subscribe_newsletter;
        await user.save();

        res.json(
            successApi('success update user information', userTransfomer.detail(user.toJSON()))
        )
    } catch {
        next(err);
    }
}

module.exports = {
    profileInfo,
    editProfile,
}