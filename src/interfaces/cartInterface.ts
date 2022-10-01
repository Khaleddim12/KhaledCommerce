import { Types } from "mongoose";
import { IProduct } from "./productInterface";

interface ICart extends Document {
  user: Types.ObjectId;

  totalQty: number;
  totalCost: number;
  items: Types.ObjectId[];
  address: String;
  createdAt: Date;
  updatedAt: Date;
}

export { ICart };
