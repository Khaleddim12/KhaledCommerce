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
exports.deleteUser = exports.getUserByCondition = exports.getUserBySlug = exports.getUserById = void 0;
//MODELS
const models_1 = require("../models/");
// Get single user by id
const getUserById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.User.findOne({ _id: _id });
});
exports.getUserById = getUserById;
// Get single user by slug
const getUserBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.User.findOne({ slug: slug });
});
exports.getUserBySlug = getUserBySlug;
const getUserByCondition = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.User.findOne(condition);
});
exports.getUserByCondition = getUserByCondition;
const deleteUser = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.User.findByIdAndDelete(_id);
});
exports.deleteUser = deleteUser;
