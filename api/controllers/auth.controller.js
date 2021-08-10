import { secret } from "../config/auth.config";
import Role from "../models/role.model.js";
import User from "../models/user.model.js";

import { sign } from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";

export function signup(req, res, next) {
  const body = req.body;
  const user = new User({
    email: body.email,
    password: hashSync(body.password, 8),
    data_nascimento: body.nascimento,
    first_name: body.first_name,
    last_name: body.last_name,
    cpf: body.cpf,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            next();

            // res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          // TODO: Enviar dados para login do cidadão

          next();
          // res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
}

export function signin(req, res) {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .populate("words", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(400).send({ message: "User Not found." });
        // return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = sign({ id: user.id }, secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      var words_group = [];

      for (let i = 0; i < user.words.length; i++) {
        // const wordId = user.words[i]

        words_group.push(user.words[i]);
      }
      res.status(200).send({
        id: user._id,
        email: user.email,
        data_nascimento: user.nascimento,
        first_name: user.first_name,
        last_name: user.last_name,
        cpf: user.cpf,
        roles: authorities,
        accessToken: token,
        grupo_palavras: words_group,
      });
    });
}

export function signinByToken(req, res) {
  User.findOne({
    id: req.id,
  })
    .populate("roles", "-__v")
    .populate("words", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(400).send({ message: "User Not found." });
        // return res.status(404).send({ message: "User Not found." });
      }

      var token = sign({ id: user.id }, secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      var words_group = [];

      for (let i = 0; i < user.words.length; i++) {
        // const wordId = user.words[i]

        words_group.push(user.words[i]);
      }
      res.status(200).send({
        id: user._id,
        email: user.email,
        data_nascimento: user.nascimento,
        first_name: user.first_name,
        last_name: user.last_name,
        cpf: user.cpf,
        roles: authorities,
        accessToken: token,
        grupo_palavras: words_group,
      });
    });
}
