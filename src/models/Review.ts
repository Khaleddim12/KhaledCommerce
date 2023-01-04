import { Schema, model } from "mongoose";
import slugify from "slugify";

import { IReview } from "../interfaces";

const ReviewSchema = new Schema<IReview>({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    
    comment:{type:String},
    rating:{type:Number},
    name:{type:String},
    createdAt:{
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedAt: Date,
},);



ReviewSchema.pre('save', function(next){
    this.updatedAt = new Date();
    next();
});

const Review = model<IReview>("Review", ReviewSchema);
export{Review,ReviewSchema}