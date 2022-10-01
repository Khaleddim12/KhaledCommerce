import { Router } from "express";

// Middlewares
import { authValidation, result } from "../../middlewares";

import { login, register } from "../../controllers/user/authController";

const authRouter = Router();

authRouter.route("/");

authRouter.route("/login").post(authValidation("login"), result(), login);

authRouter
  .route("/register")
  .post(authValidation("register"), result(), register);

export { authRouter };
