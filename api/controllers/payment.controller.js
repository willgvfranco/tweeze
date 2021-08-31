import axios from "axios";
import { parseString } from "xml2js";
import qs from "qs";

let sessionID = "";
let cardToken = "";

export async function createSession(req, res, next) {
  const email = "williamgvfranco@gmail.com";
  const pvtToken =
    "5ed39c32-abba-41e1-a3ad-cf068d63e200f0df0d5541f4b7db605ed8b78bf3472a56b7-76f4-495c-a5a3-e13ca5d0786c";

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

export async function getCardToken(req, res) {
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
  var config = {
    method: "post",
    url: "https://df.uol.com.br/v2/cards",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  // console.log("data", config.data);
  axios(config)
    .then(function (response) {
      cardToken = response.data.token;
      console.log("Card Token gerado", cardToken);
      res.sendStatus(200);
      return;
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    });
}

export async function signPlan(req, res) {
  const cpf = request.body.cpf;
  const cardCpf = request.body.cardCpf;
  const name = request.body.name;
  console.log(req.body);
  res.status(200).send({ message: req.body });
  return;
  var data = JSON.stringify({
    plan: "283E610A404050C4448C0F86A13484D4",
    reference: "ID-CND",
    sender: {
      name: "Will Franco",
      email: "williamgvfranco@yahoo.com.br",
      ip: "192.168.0.1",
      hash: "r34fsdfsefw",
      phone: {
        areaCode: "21",
        number: "972732940",
      },
      address: {
        street: "Av. Brigadeira Faria Lima",
        number: "1384",
        complement: "3 andar",
        district: "Jd. Paulistano",
        city: "São Paulo",
        state: "SP",
        country: "BRA",
        postalCode: "01452002",
      },
      documents: [
        {
          type: "CPF",
          value: "12727035764",
        },
      ],
    },
    paymentMethod: {
      type: "CREDITCARD",
      creditCard: {
        token: cardToken,
        holder: {
          name: "William G V Franco",
          birthDate: "05/07/1992",
          documents: [
            {
              type: "CPF",
              value: "12727035764",
            },
          ],
          billingAddress: {
            street: "Av. Brigadeiro Faria Lima",
            number: "1384",
            complement: "3 andar",
            district: "Jd. Paulistano",
            city: "São Paulo",
            state: "SP",
            country: "BRA",
            postalCode: "01452002",
          },
          phone: {
            areaCode: "21",
            number: "972732940",
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
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function checkPayment(req, res) {}

export async function newPayment(req, res) {
  console.log(req.body);
  res.status(200).send({ message: "ok" });
}
