const ApiErrorHandler = require('../helpers/ApiErrorHandler');

const verifyRoles = (roles) => {
    return (req, res, next) => {
        const { role } = req.user;
        if(!roles.includes(role)){
            throw new ApiErrorHandler(403, 'user not allowed')
        }

        next();
    }
}

module.exports = verifyRoles;