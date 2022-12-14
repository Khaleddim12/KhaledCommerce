"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reivewRouter = exports.cartRouter = exports.productRouter = exports.categoryRouter = exports.authRouter = exports.userRouter = void 0;
const user_1 = require("./user/");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_1.userRouter; } });
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return user_1.authRouter; } });
const category_1 = require("./category");
Object.defineProperty(exports, "categoryRouter", { enumerable: true, get: function () { return category_1.categoryRouter; } });
const product_1 = require("./product");
Object.defineProperty(exports, "productRouter", { enumerable: true, get: function () { return product_1.productRouter; } });
const cart_1 = require("./cart");
Object.defineProperty(exports, "cartRouter", { enumerable: true, get: function () { return cart_1.cartRouter; } });
const review_1 = require("./review");
Object.defineProperty(exports, "reivewRouter", { enumerable: true, get: function () { return review_1.reivewRouter; } });
