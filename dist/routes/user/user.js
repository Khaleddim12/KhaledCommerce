"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
// Controller Functions
const controllers_1 = require("../../controllers");
//middlewares
const middlewares_1 = require("../../middlewares");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.route("/").get((0, middlewares_1.filter)("User"), controllers_1.getUsers);
userRouter.route("/").delete(controllers_1.deleteLoggedInUser);
userRouter.route("/profile").get(controllers_1.getProfile);
userRouter.route("/forgotpassword").post(controllers_1.forgotPassword);
userRouter.route("/resetpassword/:token").post((0, middlewares_1.authValidation)("reset"), (0, middlewares_1.result)(), controllers_1.resetPassword);
userRouter
    .route("/:slug")
    .get(controllers_1.getBySlug)
    .put((0, middlewares_1.userValidator)("edit"), (0, middlewares_1.result)(), controllers_1.editUser)
    .delete(controllers_1.deleteUserBySlug);
