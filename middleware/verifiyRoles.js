const ApiErrorHandler = require('../helpers/ApiErrorHandler');
const wording = require('./../utils/wording');

const verifyRoles = (roles) => {
    return (req, res, next) => {
        try {
            const { role } = req.user;

            if(!roles.includes(role)){
                throw new ApiErrorHandler(403, wording.ROLE_NOT_ALLOWED)
            }

            next();
        } catch (err) {
            next(err);
        }

    }
}

module.exports = verifyRoles;