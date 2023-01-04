import { Types } from "mongoose";

interface IReview extends Document {
    user: Types.ObjectId;
    slug:string;
    comment:string;
    rating:number;
    name:string;
    createdAt: Date;
    updatedAt: Date;
    product:Types.ObjectId;

};

export{IReview};