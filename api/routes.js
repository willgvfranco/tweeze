import { elkSearch } from "./controllers/elk.controller";
import { sendMail } from "./controllers/mail.controller";
import {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
} from "./controllers/test.controller";
import {
  addWords,
  removeWords,
  updateWords,
  listWordsByUser,
} from "./controllers/words.controller";

import {
  createSession,
  signPlan,
  getCardToken,
  checkPayment,
  newPayment,
} from "./controllers/payment.controller";

import authJwt from "./middlewares/authJwt";
import verifySignUp from "./middlewares/verifySignUp";
import {
  signup,
  signin,
  signinByToken,
  socialLogin,
  recuperarSenha,
  changeUser,
} from "./controllers/auth.controller";

export default function (app) {
  // ELK
  app.post("/api/search", elkSearch);

  // TEST
  app.get("/api/test/all", allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], userBoard);
  app.get(
    "/api/test/mod",
    authJwt.verifyToken,
    authJwt.isModerator,
    moderatorBoard
  );
  app.get("/api/test/admin", authJwt.verifyToken, authJwt.isAdmin, adminBoard);

  // AUTH
  app.post("/api/auth/signin", signin);
  app.post(
    "/api/auth/signup",
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    signup,
    signin
  );
  app.get("/api/auth/token", [authJwt.verifyToken], signinByToken);
  app.post("/api/auth/social", socialLogin, signin);
  app.post("/api/auth/dados", [authJwt.verifyToken], changeUser, signinByToken);
  app.post("/api/auth/password", recuperarSenha, sendMail);
  app.post("/api/auth/password/new", [authJwt.verifyToken], signinByToken);

  // WORDS
  app.post("/api/words/add", addWords, listWordsByUser);
  app.post("/api/words/delete", removeWords, listWordsByUser);
  app.post("/api/words/update", updateWords, listWordsByUser);
  app.post("/api/words/list", listWordsByUser);

  // EMAIL
  app.post("/api/mail/send", sendMail);

  // PAYMENT
  app.post("/api/payment", newPayment);
  app.get("/api/session", createSession);
}
