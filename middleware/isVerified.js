const ApiErrorHandler = require('../helpers/ApiErrorHandler');
const wording = require('./../utils/wording');

const isVerified = async (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
            throw new ApiErrorHandler(404, 'user not found');
        }
        
        if (!user.is_verified) {
            throw new ApiErrorHandler(403, wording.USER_NEED_EMAIL_VERIFICATION);
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = isVerified;