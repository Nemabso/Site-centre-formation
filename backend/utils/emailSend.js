const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: false, //true for 456 et false pour les autres ports
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        const mailOption = {
            from: process.env.USER,
            to: email,
            subject: `(Verification) Hello ${subject}!`, text: `Hello !`, html: `<b> clickez sur le lien pour verifiez votre mail ! </b> ${text}`
        }
        await transporter.sendMail(mailOption)
        console.log('email sent successfuly');
    } catch (error) {
        console.log('email not sent');
    }
}

module.exports = sendEmail

// from: process.env.USER,
// to: email,
// subject: "subject test", subject,
// text: "some text for trying to send email", text