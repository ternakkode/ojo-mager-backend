const { User } = require('../../../database/models')
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler');
const SendgridHelper = require('../../../helpers/SendgridHelper');
const { successApi } = require('../../../utils/response');

const subscribe = async (req, res, next) => {
    try {
        const { user } = req;
        if (user.is_subscribe_newsletter) {
            throw new ApiErrorHandler(400, "already subscribe newsletter");
        }

        const updatedUser = await User.update({is_subscribe_newsletter : true}, { where: { id: user.id } });

        res.json(
            successApi("successfully subscribe newsletter")
        );
    } catch (err) {
        next(err);
    }
}

const unsubscribe = async (req, res, next) => {
    try {
        const { user } = req;
        if (!user.is_subscribe_newsletter) {
            throw new ApiErrorHandler(400, "already already not subscribe newsletter");
        }

        await User.update({
            is_subscribe_newsletter : false
        }, { where: { id: user.id } });

        res.json(
            successApi("successfully unsubscribe newsletter")
        );
    } catch (err) {
        next(err);
    }
}

const broadcast = async (req, res, next) => {
    try {
        const { title, message } = req.body;
        const users = await User.findAll(
            { where: { is_subscribe_newsletter: true } }
        )

        const sendgridHelper = new SendgridHelper();
        users.forEach(user => {
            sendgridHelper.sendTextMail(user.email, title, message);
        })

        res.json(
            successApi("successfully send newsletter to subscriber")
        )
    } catch (err) {
        next(err);
    }
}

module.exports = {
    subscribe,
    unsubscribe,
    broadcast,
}