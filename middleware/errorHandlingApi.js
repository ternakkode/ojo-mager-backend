const ApiErrorHandler = require('../helpers/ApiErrorHandler');
const { failedApi } = require('../utils/response')

const errorHandlingApi = async (err, req, res, next) => {
    if (err instanceof ApiErrorHandler) {
        const { statusCode, message, data } = err
        
        res.status(statusCode).json(
            failedApi(statusCode, message, data)
        );
    } else {
        res.status(500).json(
            failedApi(500, "something went wrong")
        );
    }
}

module.exports = errorHandlingApi;