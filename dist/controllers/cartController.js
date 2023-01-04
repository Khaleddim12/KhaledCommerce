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
exports.deleteProductFromCart = exports.addProductToCart = exports.getCartBySlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
// Middleware
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
//SERVICES
const services_1 = require("../services");
//CONTROLLERS
const utils_1 = require("../utils");
// @desc  Get Cart by Slug
// @route GET /api/cart/:slug
exports.getCartBySlug = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cartSlug = (0, slugify_1.default)(req.user.username + " cart");
    const cart = yield (0, services_1.getCart)(cartSlug);
    if (!cart)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "cart"), 404));
    res.status(200).json({
        success: true,
        data: cart,
    });
}));
//add product to cart
// @route POST /api/productSlug
exports.addProductToCart = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("auth", "user"), 404));
    const cartSlug = (0, slugify_1.default)(req.user.username + " cart");
    const productSlug = req.params.productSlug;
    //check if product exist
    const product = yield (0, services_1.getProduct)(productSlug);
    if (!product)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "product"), 404));
    //create cart for new user orders
    let cart = yield (0, services_1.getCart)(cartSlug);
    if (!cart)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "cart"), 404));
    let productsList = cart.items;
    if (productsList.length == 0) {
        productsList.push(product);
        cart.save();
    }
    console.log(productsList);
    res.status(201).json({
        success: true,
        data: cart,
        message: "Product added to cart",
    });
}));
//delete product from cart
// @route Delete /api/cart/productSlug
exports.deleteProductFromCart = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("auth", "user"), 404));
    const productSlug = req.params.productSlug;
    const cartSlug = (0, slugify_1.default)(req.user.username + " cart");
    let cart = yield (0, services_1.getCart)(cartSlug);
    // get list of products from cart
    let productsList = cart.items;
    //check if productsList is an array and if not make it as an array
    (0, utils_1.arrify)(productsList);
    for (const p of productsList) {
        //find product to delete
        const product = yield models_1.Product.findOne({ _id: p });
        if (!product)
            return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", p), 404));
        //check if the productList contains this product
        if (!productsList.includes(p)) {
            return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", p), 404));
        }
        //delete prodcuct from cart
        cart = yield models_1.Cart.findOneAndUpdate({ slug: cartSlug }, { $pull: { items: p } }, { new: true, upsert: false, projection: {} });
    }
}));
