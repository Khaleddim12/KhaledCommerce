import { Types } from "mongoose";
import { IProduct } from "./productInterface";

interface ICart extends Document {
  name:string
  user: Types.ObjectId;
  slug:string;
  totalQty: number;
  totalCost: number;
  items: any[];
  createdAt: Date;
  updatedAt: Date;
  taxPrice:number;
  shippingPrice:number;
}

export { ICart };
