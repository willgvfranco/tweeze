import mongoose from "mongoose";
// const moment = require("moment-timezone");
// FIXME: Data nao ta passando no timezone de sao paulo
// const dateSaoPaulo = moment.tz(Date.now(), "America/Sao_Paulo");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    first_name: String,
    last_name: String,
    endereco: String,
    complemento: String,
    facebook: String,
    telefone: String,
    cpf: String,
    cnpj: String,
    cep: String,
    reference: String,
    inscricao_estadual: String,
    google: Boolean,
    data_nascimento: Date,
    _created: { type: Date, default: Date.now },
    _updated: { type: Date, default: Date.now },
    words: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Words",
      },
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    // grupo_palavras: [String],
  })
);

// http://142.93.15.67:5000/search?positivo=bolsonaro&negativo=lula&qtd=1000

export default User;
