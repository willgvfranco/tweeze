// // SDK do Mercado Pago
// const mercadopago = require("mercadopago");
// // Adicione as credenciais
// mercadopago.configure({
//   access_token:
//     "TEST-6509143103427068-081701-92a51eef0ec7eb13b048be86261f47c5-180597816",
// });

// // Cria um objeto de preferência
// let preference = {
//   items: [
//     {
//       title: "Tweeze",
//       unit_price: 49.9,
//       quantity: 1,
//     },
//   ],
// };

// mercadopago.preferences
//   .create(preference)
//   .then(function (response) {
//     // Este valor substituirá a string "<%= global.id %>" no seu HTML
//     global.id = response.body.id;
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
export async function newPayment(req, res) {
  console.log(req.body);
  res.status(200).send({ message: "ok" });
}
