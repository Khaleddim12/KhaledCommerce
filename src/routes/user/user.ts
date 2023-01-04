import { Router } from "express";

// Controller Functions
import {
  getUsers,
  deleteUserBySlug,
  editUser,
  getBySlug,
  getProfile,
  forgotPassword,
  resetPassword,
  deleteLoggedInUser
} from "../../controllers";

//middlewares
import { authValidation, filter, result, userValidator } from "../../middlewares";

const userRouter = Router();
userRouter.route("/").get(filter("User"), getUsers);
userRouter.route("/").delete(deleteLoggedInUser)
userRouter.route("/profile").get(getProfile);

userRouter.route("/forgotpassword").post(forgotPassword);

userRouter.route("/resetpassword/:token").post(authValidation("reset"), result(),resetPassword);
userRouter
  .route("/:slug")
  .get(getBySlug)
  .put(userValidator("edit"), result(), editUser)
  .delete(deleteUserBySlug);
export {userRouter}