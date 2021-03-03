const ApiErrorHandler = require('../helpers/ApiErrorHandler');

const isAdmin = async (req, res, next) => {
    const { user } = req;
    if (!user) {
        throw new ApiErrorHandler(400, 'user not found');
    }

    if (user.role !== 'admin') {
        throw new ApiErrorHandler(403, 'you dont have access here');
    }

    next();
}

module.exports = isAdmin;