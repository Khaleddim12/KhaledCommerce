import { Schema, model } from "mongoose";
import slugify from "slugify";

import { ICart } from "../interfaces/cartInterface";
import{User} from "./User"

import {productSchema}from './Product'
const CartSchema = new Schema<ICart>(
  {
    name:{
      type:String,
      
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    slug:String,
    totalQty: {
      type: Number,
      default: 0,
      
    },
    totalCost: {
      type: Number,
      default: 0,
      
    },
    items: [
      {
        type:productSchema,
      },
    ],
    
    createdAt: {
      type: Date,
      immutable: true,
      default: () => new Date(),
    },
    updatedAt: {
      type:Date,
      default: () => Date.now(),
    },
  },
  { versionKey: false, id: false }
);

CartSchema.pre('save', function(next){
  this.updatedAt = new Date();
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Cart = model<ICart>("Cart", CartSchema);
export { Cart, CartSchema };
