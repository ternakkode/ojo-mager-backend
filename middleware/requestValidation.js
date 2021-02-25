const ApiErrorHandler = require('../helpers/ApiErrorHandler');
const { validationResult } = require('express-validator');

module.exports = validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        next();
    } else {
        throw new ApiErrorHandler(422, 'error validating request data', errors.errors);
    }
}