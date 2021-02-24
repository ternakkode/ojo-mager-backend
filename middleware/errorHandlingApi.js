const { failedApi } = require('../utils/response')

const errorHandlingApi = async (err, req, res, next) => {
    const { statusCode, message, data } = err

    res.status(statusCode).json(
        failedApi(statusCode, message, data)
    );
}

module.exports = errorHandlingApi;