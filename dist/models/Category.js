"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = exports.Category = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedAt: Date,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
});
exports.CategorySchema = CategorySchema;
CategorySchema.virtual('products', {
    ref: "Product",
    localField: '_id',
    foreignField: "category",
    justOne: false
});
CategorySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    this.slug = (0, slugify_1.default)(this.name, { lower: true });
    next();
});
CategorySchema.virtual("products", {
    ref: "Product",
    localField: '_id',
    foreignField: "category",
    justOne: false
});
const Category = (0, mongoose_1.model)("Category", CategorySchema);
exports.Category = Category;
