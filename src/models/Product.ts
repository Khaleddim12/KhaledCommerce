import mongoose, { Schema, model } from "mongoose";
import slugify from "slugify";
import { IProduct } from "../interfaces/productInterface";
import {ReviewSchema} from './Review'
import { errorMessages } from "../utils/messages/errorMessages";


const productSchema = new Schema<IProduct>(
  {
    name: String,
    slug: String,
    
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, errorMessages("required", "category")],
    },
    available: {
      type: Boolean,
      default: true,
    },
    count:Number,
    price: {
      type: Number,
      required: true,
    },
    imageURL: String,
    description: { 
      type: String,
    },
    reviews: [
      {
        type:ReviewSchema,
      },
    ],
    ratings:{
      type: Number,
    },
    numOfReviews:{
      type: Number,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
},
);



productSchema.pre('save', function(next){
  this.updatedAt = new Date();
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = model<IProduct>("Product", productSchema);
export {Product,productSchema}
