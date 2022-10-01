"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const colors_1 = __importDefault(require("colors"));
const error = (err, req, res, next) => {
    console.log(colors_1.default.red.bold("Name: " + err.name + " Message: " + err.message + " Stack: " + err.stack));
    const statusCode = err.statusCode || 500;
    const response = {
        success: false,
        message: err.message,
    };
    res.status(statusCode).json(response);
};
exports.error = error;
