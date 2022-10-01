"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = exports.Product = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const errorMessages_1 = require("../utils/messages/errorMessages");
const productSchema = new mongoose_1.Schema({
    name: String,
    slug: String,
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, (0, errorMessages_1.errorMessages)("required", "category")],
    },
    available: {
        type: Boolean,
        default: true,
    },
    count: Number,
    price: {
        type: Number,
        required: true,
    },
    imageURL: String,
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
}, { versionKey: false });
exports.productSchema = productSchema;
productSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    this.slug = (0, slugify_1.default)(this.name, { lower: true });
    next();
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.Product = Product;
