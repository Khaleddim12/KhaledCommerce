import { Schema, model } from "mongoose";

import { ICart } from "../interfaces/cartInterface";
const CartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
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
    items:[{
      type: Schema.Types.ObjectId
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
  },
  { versionKey: false, id: false }
);

const Cart = model<ICart>("Cart", CartSchema);
export { Cart, CartSchema };
