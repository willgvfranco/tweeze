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

export function recuperarSenha(req, res, next) {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
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
    req.body.to = req.body.email;
    req.body.subject = "Recuperação de Senha";
    var url = `https://beta.tweeze.com.br/recuperar-senha?auth=${token}`;
    req.body.text = `Clique aqui pra recuperar sua senha <a href='${url}'>aqui</>`;
    req.body.token = token;
    // req.body.nome = req.body.first_name + " " + req.body.last_name || "";

    next();
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

      if (!req.body.bypass) {
        var passwordIsValid = compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
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
        data_nascimento: user.data_nascimento,
        first_name: user.first_name,
        last_name: user.last_name,
        cpf: user.cpf,
        telefone: user.telefone,
        endereco: user.endereco,
        complemento: user.complemento,
        cep: user.cep,
        nome_empresarial: user.nome_empresarial,
        nome_fantasia: user.nome_fantasia,
        cnpj: user.cnpj,
        inscricao_estadual: user.inscricao_estadual,
        roles: authorities,
        accessToken: token,
        grupo_palavras: words_group,
      });
    });
}

export function changeUser(req, res, next) {
  User.findOne({
    id: req.id,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const body = req.body;
    if (body.first_name) {
      user.first_name = body.first_name;
    }
    if (body.last_name) {
      user.last_name = body.last_name;
    }

    if (body.cpf) {
      user.cpf = body.cpf;
    }
    if (body.inscricao_estadual) {
      user.inscricao_estadual = body.inscricao_estadual;
    }
    if (body.nome_empresarial) {
      user.nome_empresarial = body.nome_empresarial;
    }
    if (body.nome_fantasia) {
      user.nome_fantasia = body.nome_fantasia;
    }

    if (body.cnpj) {
      user.cnpj = body.cnpj;
    }

    if (body.password) {
      user.password = hashSync(body.password, 8);
    }

    if (body.endereco) {
      user.endereco = body.endereco;
    }

    if (body.complemento) {
      user.complemento = body.complemento;
    }

    if (body.cep) {
      user.cep = body.cep;
    }

    if (body.data_nascimento) {
      user.data_nascimento = body.data_nascimento;
    }
    if (body.telefone) {
      user.telefone = body.telefone;
    }
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log("user atualizado");
      req.body.bypass = true;
      next();
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

      if (req.body.password) {
        user.password = hashSync(req.body.password, 8);
        user.save();
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
        data_nascimento: user.data_nascimento,
        first_name: user.first_name,
        last_name: user.last_name,
        cpf: user.cpf,
        telefone: user.telefone,
        endereco: user.endereco,
        complemento: user.complemento,
        cep: user.cep,
        nome_empresarial: user.nome_empresarial,
        nome_fantasia: user.nome_fantasia,
        cnpj: user.cnpj,
        inscricao_estadual: user.inscricao_estadual,
        roles: authorities,
        accessToken: token,
        grupo_palavras: words_group,
      });
    });
}

export function socialLogin(req, res, next) {
  const email = req.body.email;
  if (!email) {
    res.sendStatus(422);
    return;
  }
  const provider = req.body.provider || "";

  if (!provider) {
    res.sendStatus(401);
    return;
  }

  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (!user) {
      user = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      });
      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("user criado");
        req.body.bypass = true;
        next();
      });
    } else {
      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        req.body.bypass = true;
        next();
      });
    }
  });
}
