// Models
import { User } from "../models";

// Interface
import { IUser } from "../interfaces/userInterface";

export const findUserByCreds = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) return false;
    const isPasswordMatched =  user.matchPassword(password);
    if (!isPasswordMatched) return false;
    return user;
  } catch (error: unknown) {
    return false;
  }
};

export const createUser = (data: IUser): Promise<IUser> => {
  return User.create(data);
};
