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
exports.addCategory = exports.deleteCategory = exports.getCategoryByCondititon = exports.getCategory = void 0;
//MODELS
const Category_1 = require("../models/Category");
//GET CATEGORY BY SLUG
const getCategory = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return Category_1.Category.findOne({ slug: slug });
});
exports.getCategory = getCategory;
const getCategoryByCondititon = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    return Category_1.Category.findOne(condition);
});
exports.getCategoryByCondititon = getCategoryByCondititon;
const deleteCategory = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return Category_1.Category.findByIdAndDelete(_id);
});
exports.deleteCategory = deleteCategory;
//create new category
const addCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return Category_1.Category.create(data);
});
exports.addCategory = addCategory;
