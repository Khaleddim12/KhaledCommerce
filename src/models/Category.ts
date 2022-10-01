import{Schema, model} from'mongoose';
import {errorMessages} from '../utils/messages/errorMessages'
import {ICategory} from '../interfaces/'
import slugify from "slugify";
const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
       
    },
    slug: {
        type: String,
    },
    imageURL:{
        type: String,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
      },
      updatedAt: Date,
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
});
CategorySchema.virtual('products',{
    ref:"Product",
    localField: '_id',
    foreignField: "category",
    justOne: false
})

CategorySchema.pre('save', function(next){
    this.updatedAt = new Date();
    this.slug = slugify(this.name, { lower: true });
    next();
});

CategorySchema.virtual("products",{
    ref: "Product",
    localField: '_id',
    foreignField: "category",
    justOne: false
});

const Category = model<ICategory>("Category",CategorySchema);
export {Category,CategorySchema};