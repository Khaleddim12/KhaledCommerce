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
exports.addProduct = exports.removeProduct = exports.getProduct = void 0;
//MODELS
const models_1 = require("../models");
//GET PRODUCT BY SLUG
const getProduct = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Product.findOne({ slug: slug });
});
exports.getProduct = getProduct;
//DELETE PRODUCT
const removeProduct = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Product.findOneAndDelete({ _id: _id });
});
exports.removeProduct = removeProduct;
//ADD PRODUCT 
const addProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Product.create(data);
});
exports.addProduct = addProduct;
