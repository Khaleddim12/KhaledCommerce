import { Router } from "express";

//controller functions
import {
    getCartBySlug,
    addProductToCart,
    deleteProductFromCart
} from '../controllers'


const cartRouter = Router();

cartRouter.route('/:productSlug').post(addProductToCart);

cartRouter.route('/:slug').get(getCartBySlug)

cartRouter.route('/:productSlug').delete(deleteProductFromCart)

export{cartRouter}