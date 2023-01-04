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
exports.createCart = exports.deleteCart = exports.getCart = void 0;
//MODELS
const models_1 = require("../models/");
//GET CART BY SLUG
const getCart = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Cart.findOne({ slug: slug });
});
exports.getCart = getCart;
//delete cart
const deleteCart = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Cart.findByIdAndDelete(_id);
});
exports.deleteCart = deleteCart;
//create new cart
const createCart = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Cart.create(data);
});
exports.createCart = createCart;
