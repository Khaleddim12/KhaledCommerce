"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
//STORAGE
const utils_1 = require("../utils/");
// Controller Functions
const controllers_1 = require("../controllers");
//MIDDLEWARES
const middlewares_1 = require("../middlewares");
const categoryRouter = (0, express_1.Router)();
exports.categoryRouter = categoryRouter;
categoryRouter
    .route("/")
    .get((0, middlewares_1.filter)("Category"), controllers_1.getCategories)
    .post((0, utils_1.categoryStorage)().single("image"), (0, middlewares_1.categoryValidation)("create"), (0, middlewares_1.result)(), controllers_1.createCategory);
categoryRouter
    .route("/:slug")
    .get(controllers_1.getCategoryBySlug)
    .put((0, utils_1.categoryStorage)().single("image"), (0, middlewares_1.categoryValidation)("edit"), (0, middlewares_1.result)(), controllers_1.editCategory)
    .delete(controllers_1.removeCategory);
