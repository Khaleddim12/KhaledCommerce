"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
//controller functions
const controllers_1 = require("../controllers");
const cartRouter = (0, express_1.Router)();
exports.cartRouter = cartRouter;
cartRouter.route('/:productSlug').post(controllers_1.addProductToCart);
cartRouter.route('/:slug').get(controllers_1.getCartBySlug);
cartRouter.route('/:productSlug').delete(controllers_1.deleteProductFromCart);
