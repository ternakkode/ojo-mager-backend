const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const SendgridHelper = require('../../../helpers/SendgridHelper');
const { successApi } = require('../../../utils/response');

const base = async (req, res, next) => {
    try {
        const dummyData = {
            name: "dummy",
            age: "20",
            location: "asgardian"
        }
    
        res.json(
            successApi('sucessfully get example data', dummyData)
        );
    } catch (err) {
        next(err);
    }
}

const errors = async (req, res, next) => {
    try {
        throw new ApiErrorHandler(400, "i want to hack this website");
    } catch (err) {
        next(err)
    }
}

const sendgrid = async (req, res, next) => {
    try {
        const { target } = req.body

        const sendgridHelpers = new SendgridHelpers();
        await sendgridHelpers.sendTextMail(
            target,
            'Contoh Title Email',
            'Contoh Teks Body Email'
        );
    
        res.json(
            successApi('sucessfully sent an email')
        );
    } catch (err) {
        next(err);
    }
}

const validation = async (req, res, next) => {
    try {
        res.json(
            successApi('trust me you never can got here')
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    base,
    errors,
    sendgrid,
    validation
}