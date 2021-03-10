const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler');
const { successApi } = require('../../../../utils/response');

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

module.exports = {
    profileInfo,
    editProfile,
}