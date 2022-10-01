import {  Document } from 'mongoose';

 interface ICategory extends Document{
    name:string,
    slug?:string,
    createdAt?:Date,
    updatedAt?:Date,
    imageURL: string;
}


export {ICategory}
