import{Document} from 'mongoose';

interface IUser extends Document{
    username: string;
    slug: string;
    password: string;
    email: string;
    address: {};
    phoneNo:number;
    resetPasswordToken?: string;
    resetPasswordExpire?: string;
    createdAt?: Date;
    updatedAt?: Date;
  
    getSignedJwtToken(): string;
    matchPassword(enteredPassword: string): boolean;
    getResetPasswordToken(): string;
  }
  interface IUserDocument extends Document, IUser {}

export { IUser, IUserDocument };