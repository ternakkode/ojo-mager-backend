const successApi = (message, data = {}) => {
    return {
        success: true,
        message,
        data
    }
}

const failedApi = (errors) => {
    return {
        success: false,
        errors
    }
}

module.exports = {
    successApi,
    failedApi
}