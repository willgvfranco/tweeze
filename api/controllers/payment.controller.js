import axios from "axios";
import { parseString } from "xml2js";
import qs from "qs";
import Role from "../models/role.model.js";
import User from "../models/user.model.js";
let sessionID = "";
let cardToken = "";
import mongoose from "mongoose";

var ObjectId = mongoose.Types.ObjectId;

const email = "williamgvfranco@gmail.com";
const pvtToken =
  "5ed39c32-abba-41e1-a3ad-cf068d63e200f0df0d5541f4b7db605ed8b78bf3472a56b7-76f4-495c-a5a3-e13ca5d0786c";

const roleVipId = Role.findOne({ name: "VIP" }, (err, role) => {
  if (err) {
    return;
  }
  console.log(role);
  return role._id;
});

export async function createSession(req, res, next) {
  var data = "";
  var config = {
    method: "post",
    url: `https://ws.pagseguro.uol.com.br/v2/sessions?email=${email}&token=${pvtToken}`,
    headers: {},
    data: data,
  };
  axios(config)
    .then(function (response) {
      parseString(response.data, (err, result) => {
        if (result) {
          sessionID = result.session.id[0];
          console.log("Session ID gerado:", sessionID);
          next();
        } else {
          console.log("Error generating SessionID", err);
          res.sendStatus(401);
          return;
        }
      });
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    });
}

export async function getCardToken(req, res, next) {
  const cardNumber = req.body.cardNumber;
  const cardBrand = req.body.cardBrand;
  const cardCvv = req.body.cardCvv;
  const cardExpirationMonth = req.body.cardExpirationMonth;
  const cardExpirationYear = req.body.cardExpirationYear;

  var data = qs.stringify({
    sessionId: sessionID,
    cardNumber: cardNumber,
    cardBrand: cardBrand,
    cardCvv: cardCvv,
    cardExpirationMonth: cardExpirationMonth,
    cardExpirationYear: cardExpirationYear,
  });
  console.log("infos do cards", data);
  var config = {
    method: "post",
    url: "https://df.uol.com.br/v2/cards",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      cardToken = response.data.token;
      console.log("Card Token gerado", cardToken);
      req.cardToken = response.data.token;
      next();
      // return;
    })
    .catch(function (error) {
      console.log(error);
      res.status(406).send({ message: "Dados do cartão estão incorretos." });
      return;
    });
}

export async function signPlan(req, res, next) {
  const userId = req.userId;

  const cardName = req.body.cardName;
  const cardCpf = req.body.cardCpf;
  const birthday = req.body.birthday;
  const ip = req.body.ip;
  //

  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const cpf = req.body.cpf;
  const areaCode = req.body.areaCode;
  const phone = req.body.phone;
  const cardToken = req.cardToken;

  console.log(req.body);
  // res.status(200).send({ message: req.body });
  // return;
  var data = JSON.stringify({
    plan: "283E610A404050C4448C0F86A13484D4",
    reference: "ID-CND",
    sender: {
      name: userName,
      email: userEmail,
      ip: "192.168.0.1",
      hash: "r34fsdfsefw",
      phone: {
        areaCode: areaCode,
        number: phone,
      },
      address: {
        street: "Bloco A-N 130",
        number: "6 floor",
        complement: "Quadra",
        district: "Setor Comercial Sul",
        city: "Brasília",
        state: "DF",
        country: "BRA",
        postalCode: "70306901",
      },
      documents: [
        {
          type: "CPF",
          value: cpf,
        },
      ],
    },
    paymentMethod: {
      type: "CREDITCARD",
      creditCard: {
        token: cardToken,
        holder: {
          name: cardName,
          birthDate: birthday,
          documents: [
            {
              type: "CPF",
              value: cardCpf,
            },
          ],
          billingAddress: {
            street: "Bloco A-N 130",
            number: "6 floor",
            complement: "Quadra",
            district: "Setor Comercial Sul",
            city: "Brasília",
            state: "DF",
            country: "BRA",
            postalCode: "70306901",
          },
          phone: {
            areaCode: areaCode,
            number: phone,
          },
        },
      },
    },
  });

  var config = {
    method: "post",
    url: "https://ws.pagseguro.uol.com.br/pre-approvals?email=williamgvfranco@gmail.com&token=5ed39c32-abba-41e1-a3ad-cf068d63e200f0df0d5541f4b7db605ed8b78bf3472a56b7-76f4-495c-a5a3-e13ca5d0786c",
    headers: {
      Accept: " application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      User.findOne({
        _id: new ObjectId(req.body.userId),
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.reference = response.data.code;
        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          console.log("user atualizado");
          next();
        });
      });

      next();
    })
    .catch(function (error) {
      console.log(error);
      res.status(401).send({ message: error });
    });
}

export async function giveUserVipRole(req, res) {
  User.findOne({
    _id: new ObjectId(req.body.userId),
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(400).send({ message: "User Not found." });
    }
    console.log(user.roles);
    // FIXME: TRABALHRA DAQUI
    // user.roles.push(roleVipId);
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: "Pagamento concluído." });
    });
  });
}

export async function checkPayment(req, res, next) {
  let reference = "";
  User.findOne({
    _id: new ObjectId(req.body.userId),
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(user);
      console.log(user.reference);

      reference = user.reference;
      console.log(reference);

      var config = {
        method: "get",
        url: `https://ws.pagseguro.uol.com.br/pre-approvals/${reference}?email=${email}&token=${pvtToken}`,
        headers: {
          Accept:
            " application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1",
        },
      };

      console.log(config.url);

      axios(config)
        .then(function (response) {
          const status = response.data.status;
          console.log(status);
          if (status !== "ACTIVE") {
            User.findOne({
              _id: new ObjectId(req.body.userId),
            })
              .populate("roles", "-__v")
              .exec((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                roles = user.reference || "";
              });

            // Tirar o "VIP" dele
            const index = array.indexOf(roleVipId);
            if (index > -1) {
              user.roles.splice(index, 1);
            }

            res.status(403).send({ message: "Assinatura não ativa." });
            return;
          } else {
            next();
            // res.status(200).send({ message: "Assinatura OK" });
            // return;
          }
        })
        .catch(function (error) {
          // console.log(error);
          return res.status(403).send({ message: "Assinatura não ativa." });
        });
    });
}

export async function newPayment(req, res) {
  console.log(req.body);
  res.status(200).send({ message: "ok" });
}
