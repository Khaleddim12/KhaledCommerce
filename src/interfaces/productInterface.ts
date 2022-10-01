import { Document ,Types} from "mongoose";

 interface IProduct extends Document {
    name: string;
    slug?: string;
    category: Types.ObjectId;
    price: number;
    imageURL: string;
    count:number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    available:Boolean;
    
};


export{IProduct}