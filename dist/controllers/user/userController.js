"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.deleteUserBySlug = exports.getProfile = exports.editUser = exports.getBySlug = exports.getUsers = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Middleware
const middlewares_1 = require("../../middlewares");
//services
const user_service_1 = require("../../services/user.service");
//utils
const utils_1 = require("../../utils");
const slugify_1 = __importDefault(require("slugify"));
const models_1 = require("../../models");
// @desc    Get all users
// @route   GET /api/user
exports.getUsers = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.filter.data = yield res.filter.data;
    res.status(200).send(res.filter);
}));
// @desc    Get user by slug
// @route   GET /api/user/:slug
exports.getBySlug = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const user = yield (0, user_service_1.getUserBySlug)(slug);
    //check if user is found or not
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "user"), 404));
    res.status(200).json({
        success: true,
        data: user,
    });
}));
// @desc    Eidt User Based On Slug
// @route   PUT /api/user/:slug
exports.editUser = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    let user = yield (0, user_service_1.getUserBySlug)(slug);
    //check user availability
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "user"), 404));
    let nameSlug = "";
    if (!username)
        nameSlug = slug;
    else
        nameSlug = (0, slugify_1.default)(username, { lower: true });
    let updatedUser = yield models_1.User.findOneAndUpdate({ slug: slug }, {
        username: username,
        password: password,
        email: email,
        updatedAt: Date.now(),
        slug: nameSlug
    }, { new: true, upsert: false, projection: {} });
    if (password) {
        updatedUser.password = password;
    }
    updatedUser.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User edited successfully",
        newpassword: password
    });
}));
//* @desc Get profile of logged in User
//* @route GET /api/user
exports.getProfile = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.user.slug;
    const user = yield (0, user_service_1.getUserBySlug)(slug);
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("auth", "username/password"), 404));
    res.status(200).json({
        success: true,
        data: user,
    });
}));
//* @desc Delete User
//* @route DELETE /api/user/:slug
exports.deleteUserBySlug = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    // Get user by slug
    let user = yield (0, user_service_1.getUserBySlug)(slug);
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "user"), 404));
    // Delete user account
    yield (0, user_service_1.deleteUser)(user._id);
    //status return
    res.status(200).json({
        success: true,
        message: "user deleted successfuly"
    });
}));
// @desc    Forget Password
// @route   POST /api/user/forgotpassword
exports.forgotPassword = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get user by mail
    const user = yield models_1.User.findOne({
        email: req.user.email
    });
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "email"), 404));
    // get resetToken
    const resetToken = user.getResetPasswordToken();
    // Save hashed token
    yield user.save({ validateBeforeSave: false });
    try {
        // Send an email with a reset like to the user
        yield (0, utils_1.sendEmail)({
            email: user.email,
            subject: "Password reset token",
            template: "reset",
            value: `${req.protocol}://localhost:3000/reset/${resetToken}`,
        });
    }
    catch (error) {
        console.log(`error ${error} `);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        yield user.save({ validateBeforeSave: false });
        return next(new utils_1.ErrorResponse("Email could not be sent", 500));
    }
    res.status(200).json({
        success: true,
        message: "email sent successfuly",
    });
}));
exports.resetPassword = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const user = yield models_1.User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new utils_1.ErrorResponse("Invalid token", 400));
    }
    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    yield user.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Password Is Reset",
    });
}));
