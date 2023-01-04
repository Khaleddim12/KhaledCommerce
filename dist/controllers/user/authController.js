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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
// Middlewares
const middlewares_1 = require("../../middlewares");
// Utils
const utils_1 = require("../../utils");
const models_1 = require("../../models");
// @desc    Login
// @route   POST /api/auth/login
exports.login = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    // Get user by email and password
    const user = yield models_1.User.findOne({ username }).select("+password");
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "user"), 400));
    const isMatch = yield user.matchPassword(password);
    if (!isMatch)
        return next(new utils_1.ErrorResponse(`username or/ and password are incorrect`, 400));
    const token = user.getSignedJwtToken();
    res.status(200).json({
        success: true,
        token,
    });
}));
// @desc: Register user
// @route: POST /api/auth/register
exports.register = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //creating user
    const { email, phoneNo, city, country, street, username, password } = req.body;
    const address = {
        city,
        country,
        street,
    };
    const user = yield models_1.User.create({
        username,
        password,
        email,
        phoneNo,
        address,
    });
    const cartName = user.username + " cart";
    const cart = yield models_1.Cart.create({
        name: cartName
    });
    cart.user = user._id;
    cart.save();
    res.status(201).json({
        success: true,
        data: user,
    });
}));
