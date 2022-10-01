"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
// Middlewares
const middlewares_1 = require("../../middlewares");
const authController_1 = require("../../controllers/user/authController");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.route("/");
authRouter.route("/login").post((0, middlewares_1.authValidation)("login"), (0, middlewares_1.result)(), authController_1.login);
authRouter
    .route("/register")
    .post((0, middlewares_1.authValidation)("register"), (0, middlewares_1.result)(), authController_1.register);
