"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    totalQty: {
        type: Number,
        default: 0,
        required: true,
    },
    totalCost: {
        type: Number,
        default: 0,
        required: true,
    },
    items: [{
            type: mongoose_1.Schema.Types.ObjectId
        }],
    address: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedAt: Date,
}, { versionKey: false, id: false });
exports.CartSchema = CartSchema;
const Cart = (0, mongoose_1.model)("Cart", CartSchema);
exports.Cart = Cart;
