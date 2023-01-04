import { Request, Response, NextFunction } from "express";
import { Schema } from "mongoose";
import slugify from "slugify";
import { IAuthRequest, ICart, ICategory, IFilterResponse } from "../interfaces";

// Middleware
import { asyncHandler } from "../middlewares";
import { Cart, Product } from "../models";

//SERVICES
import { getCart, createCart, deleteCart, getProduct } from "../services";

//CONTROLLERS
import { ErrorResponse, errorMessages, arrify } from "../utils";

// @desc  Get Cart by Slug
// @route GET /api/cart/:slug
export const getCartBySlug = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const cartSlug = slugify(req.user.username + " cart");
    const cart = await getCart(cartSlug);
    if (!cart)
      return next(new ErrorResponse(errorMessages("exist", "cart"), 404));

    res.status(200).json({
      success: true,
      data: cart,
    });
  }
);

//add product to cart
// @route POST /api/productSlug
export const addProductToCart = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user)
      return next(new ErrorResponse(errorMessages("auth", "user"), 404));

    const cartSlug = slugify(req.user.username + " cart");
    const productSlug = req.params.productSlug;
    
    //check if product exist
    const product = await getProduct(productSlug);
    if (!product)
      return next(new ErrorResponse(errorMessages("exist", "product"), 404));

    //create cart for new user orders
    let cart = await getCart(cartSlug);

    if (!cart)
      return next(new ErrorResponse(errorMessages("exist", "cart"), 404));
    
    let productsList = cart!.items;

    if(productsList.length ==0 ){
      productsList.push(product);
      cart.save();
    }
    console.log(productsList)
    res.status(201).json({
      success: true,
      data: cart,
      message: "Product added to cart",
    });
  }
);

//delete product from cart
// @route Delete /api/cart/productSlug

export const deleteProductFromCart = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user)
      return next(new ErrorResponse(errorMessages("auth", "user"), 404));

    const productSlug = req.params.productSlug;

    const cartSlug = slugify(req.user.username + " cart");
    let cart = await getCart(cartSlug);

    // get list of products from cart
    let productsList = cart!.items;

    //check if productsList is an array and if not make it as an array
    arrify(productsList);

    for (const p of productsList) {
      //find product to delete
      const product = await Product.findOne({ _id: p });
      if (!product)
        return next(new ErrorResponse(errorMessages("exist", p), 404));

      //check if the productList contains this product
      if (!productsList.includes(p)) {
        return next(new ErrorResponse(errorMessages("exist", p), 404));
      }

      //delete prodcuct from cart
      cart = await Cart.findOneAndUpdate(
        { slug: cartSlug },
        { $pull: { items: p } },
        { new: true, upsert: false, projection: {} }
      );

    }
  }
);
