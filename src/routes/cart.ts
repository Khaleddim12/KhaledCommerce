import { Router } from "express";

//controller functions
import {
    getUserCart,
    addProductToCart,
    deleteProductFromCart
} from '../controllers'


const cartRouter = Router();

cartRouter.route('/:productSlug').post(addProductToCart);

cartRouter.route('/').get(getUserCart)

cartRouter.route('/:productSlug').delete(deleteProductFromCart)

export{cartRouter}