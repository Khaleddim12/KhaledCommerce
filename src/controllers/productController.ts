import { Request, Response, NextFunction } from "express";
import slugify from "slugify";

//INTERFACES
import { IProduct, IFilterResponse } from "../interfaces";

//UTILS
import { ErrorResponse, errorMessages } from "../utils";

//MIDDLEWARES
import { asyncHandler, filter } from "../middlewares";
//SERVICES
import { addProduct, removeProduct, getProduct } from "../services/";
import { Category, Product } from "../models";

// @desc  Get all Products
// @route GET /api/product/
export const getProducts = asyncHandler(
  async (req: Request, res: IFilterResponse, next: NextFunction) => {
    res.filter.data = await res.filter.data;
    res.status(200).send(res.filter);
  }
);

// @desc  GET PRODUCT BY SLUG
// @route GET /api/product/:slug
export const getProductBySlug = asyncHandler(
  async (req: Request, res: IFilterResponse, next: NextFunction) => {
    const slug = req.params.slug;

    //check if product exist
    const product = getProduct(slug);
    if (!product)
      return next(new ErrorResponse(errorMessages("exist", "product"), 404));

    res.status(200).json({
      success: true,
      data: product,
    });
  }
);

// @desc DELETE PRODUCT BASED ON SLUG
// @route DELETE /api/product/:slug

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;

    //get category by slug
    const product = await getProduct(slug);
    if (!product)
      return next(new ErrorResponse(errorMessages("exist", "product"), 404));

    //delete category
    await removeProduct(product._id);

    //status return
    res.status(200).json({
      success: true,
      message: "Prouduct deleted successfuly",
    });
  }
);

// @desc  Create Product
// @route POST /api/product/
export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productData = req.body as IProduct;

    //find category to assign to product
    const category = await Category.findById(req.body.category);
    if (!category)
      return next(new ErrorResponse(errorMessages("exist", "category"), 404));

    if (req.files) console.log(req.files);

    //create Product
    const product = await addProduct(productData);

    res.status(201).json({
      success: true,
      data: product,
      message: "product created successfully",
    });
  }
);

// @desc  Edit Product Details
// @route PUT /api/product/:slug
export const editProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const productName = req.body.name;

    //find product to edit
    let product = await Product.findOne({ slug: slug });
    if (!product)
      return next(new ErrorResponse(errorMessages("exist", "product"), 404));

    let nameSlug = "";
    if (!productName) nameSlug = slug;
    else nameSlug = slugify(productName, { lower: true });

    //find category
    if (req.body.category) {
      let category = await Category.findById(req.body.category);
      if (!category) {
        req.files = [];
        return next(new ErrorResponse(errorMessages("exist", "category"), 404));
      }
    }

    let updatedProduct = await Product.findOneAndUpdate(
      { slug: slug },
      {
        name: productName,
        slug: nameSlug,
        category: req.body.category,
        price: req.body.price,
        count: req.body.count,
        description: req.body.description,
        updatedAt: Date.now(),
      },
      { new: true, upsert: false, projection: {} }
    );

    if (req.files) console.log(req.files);

    res.status(200).json({
      success: true,
      data: updatedProduct,
      images: req.files,
      message: "Product edited successfully",
    });
  }
);

export const editCount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    //find product to edit
    let product = await Product.findOne({ slug: slug });
    if (!product)
      return next(new ErrorResponse(errorMessages("exist", "product"), 404));

    let updatedProduct = await Product.findOneAndUpdate(
      { slug: slug },
      {
        count: req.body.count,
        updatedAt: Date.now(),
      },
      { new: true, upsert: false, projection: {} }
    );

    res.status(200).json({
      success: true,
      data: updatedProduct,

      message: `Product amount now is ${req.body.amount}`,
    });
  }
);
