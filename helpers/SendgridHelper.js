const sgMail = require('@sendgrid/mail');

class SendgridHelper {
    constructor() {
        this.apikey = process.env.SENDGRID_APIKEY || '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';
        this.sender = sender = 'no-reply@sportapps.co.id';
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