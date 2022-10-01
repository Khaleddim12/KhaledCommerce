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
exports.editCount = exports.editProduct = exports.createProduct = exports.deleteProduct = exports.getProductBySlug = exports.getProducts = void 0;
const slugify_1 = __importDefault(require("slugify"));
//UTILS
const utils_1 = require("../utils");
//MIDDLEWARES
const middlewares_1 = require("../middlewares");
//SERVICES
const services_1 = require("../services/");
const models_1 = require("../models");
// @desc  Get all Products
// @route GET /api/product/
exports.getProducts = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.filter.data = yield res.filter.data;
    res.status(200).send(res.filter);
}));
// @desc  GET PRODUCT BY SLUG
// @route GET /api/product/:slug
exports.getProductBySlug = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    //check if product exist
    const product = (0, services_1.getProduct)(slug);
    if (!product)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "product"), 404));
    res.status(200).json({
        success: true,
        data: product,
    });
}));
// @desc DELETE PRODUCT BASED ON SLUG
// @route DELETE /api/product/:slug
exports.deleteProduct = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    //get category by slug
    const product = yield (0, services_1.getProduct)(slug);
    if (!product)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "product"), 404));
    //delete category
    yield (0, services_1.removeProduct)(product._id);
    //status return
    res.status(200).json({
        success: true,
        message: "Prouduct deleted successfuly",
    });
}));
// @desc  Create Product
// @route POST /api/product/
exports.createProduct = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    //find category to assign to product
    const category = yield models_1.Category.findById(req.body.category);
    if (!category)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "category"), 404));
    if (req.files)
        console.log(req.files);
    //create Product
    const product = yield (0, services_1.addProduct)(productData);
    res.status(201).json({
        success: true,
        data: product,
        message: "product created successfully",
    });
}));
// @desc  Edit Product Details
// @route PUT /api/product/:slug
exports.editProduct = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const productName = req.body.name;
    //find product to edit
    let product = yield models_1.Product.findOne({ slug: slug });
    if (!product)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "product"), 404));
    let nameSlug = "";
    if (!productName)
        nameSlug = slug;
    else
        nameSlug = (0, slugify_1.default)(productName, { lower: true });
    //find category
    if (req.body.category) {
        let category = yield models_1.Category.findById(req.body.category);
        if (!category) {
            req.files = [];
            return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "category"), 404));
        }
    }
    let updatedProduct = yield models_1.Product.findOneAndUpdate({ slug: slug }, {
        name: productName,
        slug: nameSlug,
        category: req.body.category,
        price: req.body.price,
        count: req.body.count,
        description: req.body.description,
        updatedAt: Date.now(),
    }, { new: true, upsert: false, projection: {} });
    if (req.files)
        console.log(req.files);
    res.status(200).json({
        success: true,
        data: updatedProduct,
        images: req.files,
        message: "Product edited successfully",
    });
}));
exports.editCount = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    //find product to edit
    let product = yield models_1.Product.findOne({ slug: slug });
    if (!product)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "product"), 404));
    let updatedProduct = yield models_1.Product.findOneAndUpdate({ slug: slug }, {
        count: req.body.count,
        updatedAt: Date.now(),
    }, { new: true, upsert: false, projection: {} });
    res.status(200).json({
        success: true,
        data: updatedProduct,
        message: `Product amount now is ${req.body.amount}`,
    });
}));
