import axios from "axios";

export async function createSession(req, res) {
  const email = "williamgvfranco@gmail.com";
  const pvtToken =
    "5ed39c32-abba-41e1-a3ad-cf068d63e200f0df0d5541f4b7db605ed8b78bf3472a56b7-76f4-495c-a5a3-e13ca5d0786c";

  const url = `https://ws.pagseguro.uol.com.br/v2/sessions?email=${email}&token=${pvtToken}`;

  axios.get(url).then((response) => {
    console.log(response);
  });
}

export async function signPlan(req, res) {}

export async function getCardToken(req, res) {}

export async function checkPayment(req, res) {}

export async function newPayment(req, res) {
  console.log(req.body);
  res.status(200).send({ message: "ok" });
}
