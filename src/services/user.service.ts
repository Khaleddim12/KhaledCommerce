// INTERFACES
import { IUser } from "../interfaces";

//MODELS
import { User } from "../models/";

// Get single user by id
export const getUserById = async (_id: string) => {
    
    return User.findOne({ _id:_id });
};
// Get single user by slug
export const getUserBySlug = async (slug: string) => {
  
  return User.findOne({ slug:slug });
};


export const getUserByCondition = async (
    condition: Object,
    
  ) => {
    
    return User.findOne(condition)
  };

  export const deleteUser = async (_id:string) => {
    return User.findByIdAndDelete(_id);
  };
  