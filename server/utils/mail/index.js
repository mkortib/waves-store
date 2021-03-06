const mailer = require('nodemailer');
require('dotenv').config();

const { welcome } = require('./welcome-template');
const { orderDetails } = require('./odrer-details');
const { resetPass } = require('./reset-password');

const sendEmail = (to, name, token, type, actionData) => {
    const smtpTransport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const getEmailData = (to, name, token, template, addData) => {
        let data = null;

        switch (template) {
            case 'welcome':
                data = {
                    from: 'Waves <maxstudy20@gmail.com>',
                    to,
                    subject: `Welcome to waves ${name}`,
                    html: welcome(),
                };
                break;
            case 'order-details':
                data = {
                    from: 'Waves <maxstudy20@gmail.com>',
                    to,
                    subject: `Thanks for shopping with us ${name}`,
                    html: orderDetails(addData),
                };
                break;
            case 'reset-password':
                data = {
                    from: 'Waves <maxstudy20@gmail.com>',
                    to,
                    subject: `Hey ${name}, reset your password`,
                    html: resetPass(addData),
                };
                break;
            default:
                data;
        }

        return data;
    };

    const mail = getEmailData(to, name, token, type, actionData);

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        }
    });
};

module.exports = { sendEmail };
