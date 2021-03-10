const ApiErrorHandler = require('../helpers/ApiErrorHandler');
const wording = require('./../utils/wording');

const verifyRoles = (roles) => {
    return (req, res, next) => {
        const { role } = req.user;
        
        if(!roles.includes(role)){
            throw new ApiErrorHandler(403, wording.ROLE_NOT_ALLOWED)
        }

        next();
    }
}

module.exports = verifyRoles;