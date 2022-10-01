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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const async_1 = require("./async");
const errorResponse_1 = require("../utils/error response/errorResponse");
const errorMessages_1 = require("../utils/messages/errorMessages");
const models_1 = require("../models/");
exports.authenticate = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    if (!token)
        return next(new errorResponse_1.ErrorResponse((0, errorMessages_1.errorMessages)("auth", "user"), 401));
    try {
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        let user;
        if (typeof decoded !== "string") {
            user = yield models_1.User.findById(decoded.id);
            if (!user)
                return next(new errorResponse_1.ErrorResponse((0, errorMessages_1.errorMessages)("auth", "user"), 401));
            req.user = user;
            next();
        }
    }
    catch (error) {
        return next(new errorResponse_1.ErrorResponse((0, errorMessages_1.errorMessages)("auth", "user"), 401));
    }
}));
