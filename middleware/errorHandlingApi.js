const ApiErrorHandler = require('../helpers/ApiErrorHandler');
const { failedApi } = require('../utils/response')

const errorHandlingApi = async (err, req, res, next) => {
    if (err instanceof ApiErrorHandler) {
        const { statusCode, message, data } = err
        
        return res.status(statusCode).json(
            failedApi(statusCode, message, data)
        );
    }
    
    if(process.env.NODE_ENV === 'production') {
        return res.status(500).json(
            failedApi(500, "something went wrong")
        );
    }

    console.log(err);
    res.status(500).json(err);
}

module.exports = errorHandlingApi;