const sgMail = require('@sendgrid/mail');

const sendgridAPIkey = process.env.sendgridAPIkey;

sgMail.setApiKey(sendgridAPIkey);

const sendWelcomeEmail = (name, email, message) => {
    sgMail.send({
        to: 'deepgagan9336@gmail.com',
        from: 'deepgagan9336@gmail.com',
        subject: `Hey my name is ${name}`,
        text: `From: ${email}. Message: ${message}`
    }).then(() => {
        console.log('Email sent')
    })
        .catch((error) => {
            console.error(error)
        });
}

module.exports = {
    sendWelcomeEmail
}