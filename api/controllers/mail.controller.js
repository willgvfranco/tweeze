"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

export async function sendMail(req, res) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "tweeze.bot@gmail.com", // generated ethereal user
      pass: "5EyAA6FXQ8eBz6S&%fYy", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Tweeze 👻" <no-reply@tweeze.com.br>', // sender address
    to: req.body.to || "williamgvfranco@gmail.com, cristiano781@gmail.com", // list of receivers
    subject: req.body.subject || "Tweeze dando Oi", // Subject line
    html: req.body.text || "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.sendStatus(200);
}
