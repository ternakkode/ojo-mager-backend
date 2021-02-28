const ApiErrorHandler = require('../helpers/ApiErrorHandler');

const isVerified = async (req, res, next) => {
    const { user } = req;
    if (!user) {
        throw new ApiErrorHandler(400, 'user not found');
    }

    if (!user.is_verified) {
        throw new ApiErrorHandler(400, 'you need to verify your account first!');
    }

    next();
}

module.exports = isVerified;