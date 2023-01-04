//INTERFACES
import {ICart} from '../interfaces/'

//MODELS
import {Cart} from '../models/'

//GET CART BY SLUG
export const getCart = async (slug: string) =>{
    return Cart.findOne({ slug: slug});
};

//delete cart
export const deleteCart = async (_id:string) => {
    return Cart.findByIdAndDelete(_id);
};

//create new cart
export const createCart = async(data:ICart):Promise<ICart>=>{
    return Cart.create(data);
}
