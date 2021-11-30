"use strict";
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const PDFDocument = require("pdfkit");
const { promisify } = require("util");
const path = require("path");
const fs = require("fs");

const {selectedNewsId, newsObj} = require("../assets/data/mockNews");

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

const month = {
  0: "Janeiro",
  1: "Fevereiro",
  2: "Março",
  3: "Abril",
  4: "Maio",
  5: "Junho",
  6: "Julho",
  7: "Agosto",
  8: "Setembro",
  9: "Outubro",
  10: "Novembro",
  11: "Dezembro",
};

const formatedDate = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()} de ${
    month[dateObj.getMonth()]
  } de ${dateObj.getFullYear()}`;
};

export async function testEmailWithPdf(req, res) {
  const doc = new PDFDocument({ size: "A4" });
  const docPath = path.join(__dirname, "../pdf/file.pdf");
  const logoPath = path.join(__dirname, "../assets/images/logo_twz_azul.png");
  const footerLogoPath = path.join(
    __dirname,
    "../assets/images/logo_tweeze_branco.png"
  );
  const fontRegularPath = path.join(
    __dirname,
    "../assets/fonts/NunitoSans-Regular.ttf"
  );
  const fontExtraBoldPath = path.join(
    __dirname,
    "../assets/fonts/NunitoSans-ExtraBold.ttf"
  );
  const fontBoldPath = path.join(
    __dirname,
    "../assets/fonts/NunitoSans-Bold.ttf"
  );
  const fontLightItalicPath = path.join(
    __dirname,
    "../assets/fonts/NunitoSans-LightItalic.ttf"
  );

  // A receber do req.body
  const username = "Renan Oliveira";
  const beginDate = 1637714221659;
  const endDate = 1637714221659;

  doc.pipe(fs.createWriteStream(docPath));

  // CAPA RELATÓRIO
  const leftMargin = 60;
  doc.rect(0, 0, 700, 900).fill("#09407e");
  doc.circle(550, 830, 200, 200).fill("#fff");
  doc.image(logoPath, 400, 690, { width: 200 });

  doc
    .font(fontBoldPath)
    .fontSize(52)
    .text("Relatório de Clipping personalizado", leftMargin, 220)
    .strokeColor("#fff");
  doc
    .font(fontRegularPath)
    .fontSize(24)
    .text(username, leftMargin, 470)
    .strokeColor("#fff");
  doc
    .fontSize(18)
    .text(
      `Período selecionado: ${formatedDate(beginDate)} até ${formatedDate(
        endDate
      )}`,
      leftMargin,
      520
    )
    .strokeColor("#fff");
  doc
    .fontSize(18)
    .text(
      `${selectedNewsId?.length} notícia(s) selecionada(s)`,
      leftMargin,
      590
    )
    .strokeColor("#fff");

  // NOTÍCIAS
  doc.addPage();
  doc
    .font(fontExtraBoldPath)
    .fillColor("#09407e")
    .fontSize(34)
    .text("Listagem das matérias principais", 30, 50, { width: 350 })
    .moveDown();

  selectedNewsId.forEach((news) => {
    doc
      .font(fontBoldPath)
      .fillColor("#000")
      .fontSize(18)
      .text(newsObj[news]?._source.title, 45)
      .moveDown()
      .font(fontRegularPath)
      .fontSize(14)
      .text(
        newsObj[news]?._source.description
          ? newsObj[news]?._source.description
          : null,
        45
      )
      .moveDown()
      .font(fontLightItalicPath)
      .fillColor("#09407e")
      .fontSize(12)
      .text(newsObj[news]?._source.source, 45)
      .moveDown()
      .moveDown();
  });

  // FINAL / FOOTER
  doc.addPage();
  doc.rect(0, 0, 700, 900).fill("#09407e");
  doc
    .fillColor("#fff")
    .font(fontExtraBoldPath)
    .fontSize(56)
    .text("Essas foram as suas métricas.", leftMargin, 220)
    .strokeColor("#fff");
  doc
    .font(fontBoldPath)
    .fontSize(20)
    .text("Você aparece, a gente pinça. Simples assim", leftMargin, 420)
    .strokeColor("#fff");
  doc.image(footerLogoPath, 200, 700, { width: 220 });
  doc
    .font(fontRegularPath)
    .fontSize(14)
    .text("@2021. Termos legais e legendas aqui", 190, 750)
    .strokeColor("#fff");

  doc.end();
  res.sendStatus(200);
}
