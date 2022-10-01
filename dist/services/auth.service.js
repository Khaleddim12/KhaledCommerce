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
exports.createUser = exports.findUserByCreds = void 0;
// Models
const models_1 = require("../models");
const findUserByCreds = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({ username }).select("+password");
        if (!user)
            return false;
        const isPasswordMatched = user.matchPassword(password);
        if (!isPasswordMatched)
            return false;
        return user;
    }
    catch (error) {
        return false;
    }
});
exports.findUserByCreds = findUserByCreds;
const createUser = (data) => {
    return models_1.User.create(data);
};
exports.createUser = createUser;
