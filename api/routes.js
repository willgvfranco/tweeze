import { elkSearch } from "./controllers/elk.controller";
import authJwt from "./middlewares/authJwt";
import {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
  tokenTest,
} from "./controllers/user.controller";
import {
  addWords,
  removeWords,
  updateWords,
  listWordsByUser,
} from "./controllers/words.controller";

import middlewares from "./middlewares";
import { signup, signin } from "./controllers/auth.controller";

export default function (app) {
  // ELK
  app.post("/api/search", elkSearch);

  // TEST
  app.get("/api/test/all", allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], userBoard);
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );
  app.get("/api/test/token", [authJwt.verifyToken], tokenTest);
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );

  // AUTH
  app.post("/api/auth/signin", signin);
  app.post(
    "/api/auth/signup",
    [
      middlewares.verifySignUp.checkDuplicateUsernameOrEmail,
      middlewares.verifySignUp.checkRolesExisted,
    ],
    signup,
    signin
  );

  // WORDS
  app.post("/api/words/add", addWords, listWordsByUser);
  app.post("/api/words/delete", removeWords, listWordsByUser);
  app.post("/api/words/update", updateWords, listWordsByUser);
  app.post("/api/words/list", listWordsByUser);
}
