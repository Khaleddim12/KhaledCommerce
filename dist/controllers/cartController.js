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
exports.deleteProductFromCart = exports.addProductToCart = exports.getUserCart = void 0;
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
exports.getUserCart = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get logged in user
    const user = yield models_1.User.findOne({
        _id: req.user._id,
    });
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("auth", "user"), 404));
    const cartSlug = (0, slugify_1.default)(user.username + " cart");
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
    let ids = [];
    for (const item of cart.items) {
        ids.push(item._id.toString());
    }
    if (ids.includes(product._id.toString())) {
        return next(new utils_1.ErrorResponse("Product Already Exists In Your Cart", 403));
    }
    yield models_1.Cart.findOneAndUpdate({ slug: cartSlug }, {
        $push: { items: product },
        updatedAt: Date.now(),
    }, { new: true, upsert: false, projection: {} });
    cart = yield (0, services_1.getCart)(cartSlug);
    let items = cart.items;
    cart.totalQty = items.length;
    let sum = 0;
    for (let item of items) {
        sum += item.price;
    }
    cart.totalCost = sum;
    cart.save();
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
    //check if product exist
    const product = yield (0, services_1.getProduct)(productSlug);
    if (!product)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "product"), 404));
    const cartSlug = (0, slugify_1.default)(req.user.username + " cart");
    let cart = yield (0, services_1.getCart)(cartSlug);
    if (!cart)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "cart"), 404));
    let ids = [];
    for (const item of cart.items) {
        ids.push(item._id.toString());
    }
    if (!ids.includes(product._id.toString())) {
        return next(new utils_1.ErrorResponse("Product Does Not Exist In Cart", 403));
    }
    //delete prodcuct from cart
    yield models_1.Cart.findOneAndUpdate({ slug: cartSlug }, {
        $pull: { items: { _id: product._id } },
        updatedAt: Date.now(),
    }, { new: true, upsert: false, projection: {} });
    cart = yield (0, services_1.getCart)(cartSlug);
    let items = cart.items;
    cart.totalQty = items.length;
    let sum = 0;
    for (let item of items) {
        sum += item.price;
    }
    cart.totalCost = sum;
    cart.save();
    res.status(201).json({
        success: true,
        data: cart,
        message: "Product Deleted From Cart",
    });
}));
