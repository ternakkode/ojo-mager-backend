const successApi = (message, data = {}) => {
    let rest = {
        success: true,
        message
    }

    if (Object.keys(data).length > 0) {
        rest.data = data;
    }

    return {
        success: true,
        message,
        data
    }
}

const failedApi = (code, message, data = []) => {
    let rest = {
        success: false,
        error: {
            code,
            message
        }
    }

    if (data.length > 0) {
        rest.error.errors = data;
    }

    return rest;
}

module.exports = {
    successApi,
    failedApi
}