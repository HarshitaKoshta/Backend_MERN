const nodemailer = require('nodemailer')

const sendEmail = async(to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
            user: 'harshitakoshta2111@gmail.com',
            pass: 'fgwp yolx zanf nkwh',
        },
    });

    const mailOptions = {
        from : 'harshitakoshta2111@gmail.com',
        to,
        subject,
        text,
    };
    await transporter.sendMail(mailOptions);
};
module.exports = {sendEmail}