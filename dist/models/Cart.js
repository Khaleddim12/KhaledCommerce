"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const CartSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    slug: String,
    totalQty: {
        type: Number,
        default: 0,
    },
    totalCost: {
        type: Number,
        default: 0,
    },
    items: [{
            product: mongoose_1.Schema.Types.ObjectId,
            count: Number
        }],
    taxPrice: {
        type: Number,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        default: 0,
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
}, { versionKey: false, id: false });
exports.CartSchema = CartSchema;
CartSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    this.slug = (0, slugify_1.default)(this.name, { lower: true });
    next();
});
const Cart = (0, mongoose_1.model)("Cart", CartSchema);
exports.Cart = Cart;
