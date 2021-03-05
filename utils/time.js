const ApiErrorHandler = require('../helpers/ApiErrorHandler');

const indonesianDateFormat = (date) => {
    const day = date.getDate();
    const month = toIndonesianMonth(date.getMonth())
    const year = date.getFullYear()

    return `${day} ${month} ${year}`;
}

const toIndonesianMonth = (month) => {
    if (month > 12 || month < 1) {
        throw new ApiErrorHandler(400, "invalid month data given");
    }

    const indonesianMonth = [
        undefined, "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    return indonesianMonth[month];
}

module.exports = {
    indonesianDateFormat
}