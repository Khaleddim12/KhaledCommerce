import {Response} from 'express'


//error interface
interface IError {
    message:string;
    value?:string;
    field?:string;
}

//response interface 
 interface IResponse{
    success: boolean;
    message:string;
    data?:Object;
    errors?:IError[];
}
 export {IResponse}