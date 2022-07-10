const sgMail = require('@sendgrid/mail');

const sendgridAPIkey = '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';

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