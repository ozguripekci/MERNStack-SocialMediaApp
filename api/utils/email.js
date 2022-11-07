const nodemailer = require('nodemailer');
// const pug = require('pug')
const htmlToText = require('html-to-text')

module.exports = class Email {
    constructor(user,url) {
        this.to = user.email;
        this.firstName = user.name.split()[0];
        this.url = url;
        this.from = `Ozgur Ipekci <${process.env.EMAIL_FROM}>`
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // sendgrid
            return 1;
        }

        return nodemailer.createTransport({
            host : process.env.EMAIL_HOST,
            port : process.env.EMAIL_PORT,
            auth : {
                user:process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD
            }
        })
    }

/*     // send the actual email.
    async send(template, subject) {
        // 1) Render HTML based on apug template
        const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`,
        {
            firstName: this.firstName,
            url:this.url,
            subject
        })

        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html),

        }

        // 3) create a trasport, send email
        await this.newTransporter().sendMail(mailOptions)

    } */

    async sendWelcome() {
        await this.send('Welcome', 'Welcome to the Natours Family!')
    }
}