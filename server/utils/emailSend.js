const nodemailer = require('nodemailer');
// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(sendTo, subject, text, html) {
  try {
    // console.log({email: process.env.ADMIN_EMAIL, pass: process.env.ADMIN_PASSWORD});
    // create reusable transporter object using the default SMTP transport
    // console.log({email: process.env.ADMIN_EMAIL, pass: process.env.ADMIN_PASSWORD, host: process.env.ADMIN_EMAIL_HOST});
    const transporter = nodemailer.createTransport({
      host: process.env.ADMIN_EMAIL_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.ADMIN_EMAIL, // generated ethereal user
        pass: process.env.ADMIN_PASSWORD, // generated ethereal password
      },
    });

    let to = '';
    for (let i = 0; i < sendTo.length; i += 1) {
      to += `${sendTo[i]}, `;
    }

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Ponditi: " <${process.env.ADMIN_EMAIL}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendEmail;