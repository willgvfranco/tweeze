import middlewares from "../middlewares";
import { signup, signin } from "../controllers/auth.controller";

export default function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      middlewares.verifySignUp.checkDuplicateUsernameOrEmail,
      middlewares.verifySignUp.checkRolesExisted,
    ],
    signup
  );

  app.post("/api/auth/signin", signin);
}
