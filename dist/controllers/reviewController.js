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
exports.deleteReview = exports.getReviews = exports.addReview = void 0;
//UTILS
const utils_1 = require("../utils");
//MIDDLEWARES
const middlewares_1 = require("../middlewares");
//MODELS
const models_1 = require("../models");
//SERVICES
const services_1 = require("../services");
//user creates review on certain product
exports.addReview = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rating = req.body.rating;
    const comment = req.body.comment;
    const slug = req.params.productSlug;
    //check if product exist
    const product = yield (0, services_1.getProduct)(slug);
    if (!product)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "product"), 404));
    let review = yield models_1.Review.create(req.body);
    review.user = req.user._id;
    review.product = product._id;
    review.name = req.user.username;
    product.reviews.push(review);
    yield review.save({ validateBeforeSave: false });
    let avg = 0;
    //get 
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;
    yield product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        product: product,
    });
}));
// Get All Reviews of a product
exports.getReviews = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.productSlug;
    const product = yield (0, services_1.getProduct)(slug);
    if (!product)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "product"), 404));
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
}));
//delete Revie
exports.deleteReview = (0, middlewares_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.productSlug;
    let product = yield (0, services_1.getProduct)(slug);
    if (!product)
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "product"), 404));
    const review = yield models_1.Review.findOne({
        _id: req.params.reviewId
    });
    if (!review) {
        return next(new utils_1.ErrorResponse((0, utils_1.errorMessages)("exist", "review"), 404));
    }
    if (review.user.toString() !== req.user._id.toString()) {
        return next(new utils_1.ErrorResponse("can't delete someone's else comment~", 404));
    }
    yield models_1.Product.findOneAndUpdate({ slug: slug }, {
        updatedAt: Date.now(),
        $pull: { reviews: { "_id": req.params.reviewId } },
    }, { new: true, upsert: false, projection: {} });
    product = yield (0, services_1.getProduct)(slug);
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    //RECALCULATE THE PRODUCT RATING AFTER REVIEW DELETION
    let ratings = avg / product.reviews.length;
    const numOfReviews = product.reviews.length;
    product.numOfReviews = numOfReviews;
    //DELETE REVIEW FROM REVIEWS MODEL
    yield models_1.Review.deleteOne({ _id: req.params.reviewId });
    //update the ratings
    yield product.updateOne({
        ratings: ratings
    });
    res.status(200).json({
        success: true,
        message: `Review Deleted Successfuly`,
    });
}));
