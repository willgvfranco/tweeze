"use strict";
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const { promisify } = require("util");
const path = require("path");
const fs = require("fs");

const readFile = promisify(fs.readFile);

// Email Logo
const imgPath = path.join(__dirname, "../assets/images/tweeze_azul.png");

// Email Ícones
const facebookIconPath = path.join(__dirname, "../assets/icons/facebook.png");
const twitterIconPath = path.join(__dirname, "../assets/icons/twitter.png");
const instagramIconPath = path.join(__dirname, "../assets/icons/insta.png");
const emailIconPath = path.join(__dirname, "../assets/icons/email.png");
const phoneIconPath = path.join(__dirname, "../assets/icons/fone.png");
const emailConfigIconPath = path.join(
  __dirname,
  "../assets/icons/emailConfig.png"
);
const newsIconPath = path.join(__dirname, "../assets/icons/news.png");
const clickHereIconPath = path.join(__dirname, "../assets/icons/clickHere.png");

const emailBaseAttachments = [
  {
    filename: "tweeze_azul.png",
    path: imgPath,
    cid: "tweeze_logo",
  },
  {
    filename: "facebook.png",
    path: facebookIconPath,
    cid: "facebook_icon",
  },
  {
    filename: "twitter.png",
    path: twitterIconPath,
    cid: "twitter_icon",
  },
  {
    filename: "insta.png",
    path: instagramIconPath,
    cid: "instagram_icon",
  },
  {
    filename: "email.png",
    path: emailIconPath,
    cid: "email_icon",
  },
  {
    filename: "fone.png",
    path: phoneIconPath,
    cid: "phone_icon",
  },
];

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

export async function welcomeMessage(req, res) {
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

  const emailPath = path.join(__dirname, "../templates/emailBase.html");
  const signinPath = path.join(
    __dirname,
    "../templates/confirmacaoCadastro.html"
  );

  const mailSchema = await readFile(emailPath, "utf-8");
  const email = handlebars.compile(mailSchema);

  const signinSchema = await readFile(signinPath, "utf-8");
  const content = handlebars.compile(signinSchema);

  handlebars.registerPartial("content", content);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Tweeze 👻" <no-reply@tweeze.com.br>', // sender address
    to: "ren.moura.oliveira@gmail.com", // list of receivers
    subject: "Teste de Email", // Subject line
    html: email({ username: "Renan" }), // html body
    attachments: [...emailBaseAttachments],
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.sendStatus(200);
}

export async function cancelSubscription(req, res) {
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

  const emailPath = path.join(__dirname, "../templates/emailBase.html");
  const cancelPath = path.join(
    __dirname,
    "../templates/cancelamentoPlano.html"
  );

  const mailSchema = await readFile(emailPath, "utf-8");
  const email = handlebars.compile(mailSchema);

  const cancelSchema = await readFile(cancelPath, "utf-8");
  const content = handlebars.compile(cancelSchema);

  handlebars.registerPartial("content", content);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Tweeze 👻" <no-reply@tweeze.com.br>', // sender address
    to: "ren.moura.oliveira@gmail.com", // list of receivers
    subject: "Teste de Email", // Subject line
    html: email(), // html body
    attachments: [
      ...emailBaseAttachments,
      {
        filename: "emailConfig.png",
        path: emailConfigIconPath,
        cid: "email_config_icon",
      },
      {
        filename: "news.png",
        path: newsIconPath,
        cid: "news_icon",
      },
      {
        filename: "clickHere.png",
        path: clickHereIconPath,
        cid: "click_icon",
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.sendStatus(200);
}
