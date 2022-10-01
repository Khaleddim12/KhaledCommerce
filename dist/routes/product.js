"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
//STORAGE
const utils_1 = require("../utils/");
//CONTROLLER FUNCTIONS
const productController_1 = require("../controllers/productController");
//MIDDLEWARES
const middlewares_1 = require("../middlewares");
const productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
productRouter
    .route("/")
    .get((0, middlewares_1.filter)("Product"), productController_1.getProducts)
    .post((0, utils_1.productStorage)().any(), (0, middlewares_1.productValidate)("create"), (0, middlewares_1.result)(), productController_1.createProduct);
productRouter
    .route("/:slug")
    .get(productController_1.getProductBySlug)
    .delete(productController_1.deleteProduct)
    .put((0, utils_1.productStorage)().any(), (0, middlewares_1.productValidate)("edit"), (0, middlewares_1.result)(), productController_1.editProduct);
productRouter.route("/:slug/editcount").put((0, middlewares_1.productValidate)("assign"), (0, middlewares_1.result)(), productController_1.editCount);
