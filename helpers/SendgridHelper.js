const sgMail = require('@sendgrid/mail');

class SendgridHelper {
    apikey = process.env.SENDGRID_APIKEY || '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';
    sender = 'no-reply@sportapps.co.id';

    constructor() {
        sgMail.setApiKey(this.apikey);
    }

    async sendTextMail(to, subject, text) {
        try {
            await sgMail.send({
                from: this.sender,
                to,
                subject,
                text
            })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = SendgridHelper;