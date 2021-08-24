import { verify } from "jsonwebtoken";
import { secret } from "../config/auth.config.js";
import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import { sign } from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const renewToken = (req, res, next) => {
  const userId = req.id;
  sign({ id: userId }, secret, {
    expiresIn: 15, // 24 hours
    // expiresIn: 86400, // 24 hours
  });
  res.status(200).send({
    accessToken: token,
    id: userId,
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
export default authJwt;
