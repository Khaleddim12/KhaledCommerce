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
exports.removeCategory = exports.editCategory = exports.createCategory = exports.getCategoryBySlug = exports.getCategories = void 0;
const slugify_1 = __importDefault(require("slugify"));
// Middleware
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
//SERVICES
const category_services_1 = require("../services/category.services");
const utils_1 = require("../utils");
// @desc  Get all Categories
// @route GET /api/category/
exports.getCategories = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.filter.data = yield res.filter.data;
    res.status(200).send(res.filter);
}));
// @desc  Get Category by Slug
// @route GET /api/category/:slug
exports.getCategoryBySlug = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const category = yield (0, category_services_1.getCategory)(slug);
    if (!category)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "category"), 404));
    res.status(200).json({
        success: true,
        data: category,
    });
}));
// @desc  Create Category
// @route POST /api/category/
exports.createCategory = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.file);
    if (!req.file) {
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("upload", "image"), 404));
    }
    //create category
    const category = yield (0, category_services_1.addCategory)(req.body);
    if (req.file) {
        category.imageURL = req.file.filename;
    }
    res.status(201).json({
        success: true,
        data: category,
        message: "Category created successfully",
    });
}));
// @desc  Edit Category Details
// @route PUT /api/category/:slug
exports.editCategory = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const categoryName = req.body.name;
    //find category to edit
    let category = yield models_1.Category.findOne({ slug: slug });
    if (!category)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "category"), 404));
    let nameSlug = "";
    if (!categoryName)
        nameSlug = slug;
    else
        nameSlug = (0, slugify_1.default)(categoryName, { lower: true });
    let updatedCategory = yield models_1.Category.findOneAndUpdate({ slug: slug }, {
        name: categoryName,
        updatedAt: Date.now(),
        slug: nameSlug,
    }, { new: true, upsert: false, projection: {} });
    if (req.file) {
        updatedCategory.imageURL = req.file.filename;
    }
    res.status(200).json({
        success: true,
        data: updatedCategory,
        message: "Category edited successfully",
    });
}));
// @desc  deletr category
// @route DELETE /api/category/:slug
exports.removeCategory = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    //get category by slug
    const category = yield (0, category_services_1.getCategory)(slug);
    if (!category)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "category"), 404));
    //delete category
    yield (0, category_services_1.deleteCategory)(category._id);
    //status return
    res.status(200).json({
        success: true,
        message: "category deleted successfuly",
    });
}));
