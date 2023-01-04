"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = exports.Review = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
    },
    comment: { type: String },
    rating: { type: Number },
    name: { type: String },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedAt: Date,
});
exports.ReviewSchema = ReviewSchema;
ReviewSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
const Review = (0, mongoose_1.model)("Review", ReviewSchema);
exports.Review = Review;
