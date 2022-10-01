import { IUser } from "./";
import { Request } from "express";

// An inteface for holding req.user
interface IAuthRequest extends Request {
  user: IUser;
}

export {IAuthRequest}