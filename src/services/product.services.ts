//MODELS
import {Product} from '../models'

//INTERFACES
import {IProduct} from '../interfaces'

//GET PRODUCT BY SLUG
export const getProduct = async(slug:string)=>{
    return Product.findOne({slug:slug})
}

//DELETE PRODUCT
export const removeProduct = async (_id:string) => {
    return Product.findOneAndDelete({_id:_id})
}


//ADD PRODUCT 
export const addProduct = async(data:IProduct):Promise<IProduct>=>{
    return Product.create(data);
}