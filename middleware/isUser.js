const ApiErrorHandler = require('../helpers/ApiErrorHandler');

const isUser = async (req, res, next) => {
    const { user } = req;
    if (!user) {
        throw new ApiErrorHandler(400, 'user not found');
    }

    if (user.role !== 'user') {
        throw new ApiErrorHandler(403, 'you dont have access here');
    }

    next();
}

module.exports = isUser;