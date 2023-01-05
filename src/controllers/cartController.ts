import { Request, Response, NextFunction } from "express";
import { Schema } from "mongoose";
import slugify from "slugify";
import { IAuthRequest, ICart, ICategory, IFilterResponse } from "../interfaces";

// Middleware
import { asyncHandler } from "../middlewares";
import { Cart, Product, User } from "../models";

//SERVICES
import { getCart, createCart, deleteCart, getProduct } from "../services";

//CONTROLLERS
import { ErrorResponse, errorMessages, arrify } from "../utils";

// @desc  Get Cart by Slug
// @route GET /api/cart/:slug
export const getUserCart = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    //get logged in user
    const user = await User.findOne({
      _id: req.user._id,
    });
    if (!user)
      return next(new ErrorResponse(errorMessages("auth", "user"), 404));

    const cartSlug = slugify(user.username + " cart");
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

    let ids = [];
    for (const item of cart.items) {
      ids.push(item._id.toString());
    }

    if (ids.includes(product._id.toString())) {
      return next(
        new ErrorResponse("Product Already Exists In Your Cart", 403)
      );
    }
    await Cart.findOneAndUpdate(
      { slug: cartSlug },
      {
        $push: { items: product },
        updatedAt: Date.now(),
      },
      { new: true, upsert: false, projection: {} }
    );
    cart = await getCart(cartSlug);
    let items = cart!.items;
    cart!.totalQty = items.length;
    let sum: number = 0;
    for (let item of items) {
      sum += item.price;
    }

    cart!.totalCost = sum;
    cart!.save();
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

    //check if product exist
    const product = await getProduct(productSlug);
    if (!product)
      return next(new ErrorResponse(errorMessages("exist", "product"), 404));

    const cartSlug = slugify(req.user.username + " cart");
    let cart = await getCart(cartSlug);

    if (!cart)
      return next(new ErrorResponse(errorMessages("exist", "cart"), 404));

    let ids = [];
    for (const item of cart.items) {
      ids.push(item._id.toString());
    }

    if (!ids.includes(product._id.toString())) {
      return next(new ErrorResponse("Product Does Not Exist In Cart", 403));
    }

    //delete prodcuct from cart
    await Cart.findOneAndUpdate(
      { slug: cartSlug },
      {
        $pull: { items: {_id:product._id} },
        updatedAt: Date.now(),
      },
      { new: true, upsert: false, projection: {} }
    );

    cart = await getCart(cartSlug);
    let items = cart!.items;
    cart!.totalQty = items.length;
    let sum: number = 0;
    for (let item of items) {
      sum += item.price;
    }

    cart!.totalCost = sum;
    cart!.save();
    res.status(201).json({
      success: true,
      data: cart,
      message: "Product Deleted From Cart",
    });
  }
);
