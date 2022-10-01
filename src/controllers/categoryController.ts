import { Request, Response, NextFunction } from "express";
import slugify from "slugify";
import {  ICategory, IFilterResponse } from "../interfaces";

// Middleware
import { asyncHandler } from "../middlewares";
import { Category } from "../models";

//SERVICES
import {
  addCategory,
  deleteCategory,
  getCategory,
} from "../services/category.services";
import { ErrorResponse, errorMessages } from "../utils";

// @desc  Get all Categories
// @route GET /api/category/
export const getCategories = asyncHandler(
  async (req: Request, res: IFilterResponse, next: NextFunction) => {
    res.filter.data = await res.filter.data;
    res.status(200).send(res.filter);
  }
);

// @desc  Get Category by Slug
// @route GET /api/category/:slug
export const getCategoryBySlug = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const category = await getCategory(slug);
    if (!category)
      return next(new ErrorResponse(errorMessages("exist", "category"), 404));

    res.status(200).json({
      success: true,
      data: category,
    });
  }
);

// @desc  Create Category
// @route POST /api/category/
export const createCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);

    if (!req.file) {
      return next(new ErrorResponse(errorMessages("upload", "image"), 404));
    }

    //create category
    const category = await addCategory(req.body as ICategory);

    if (req.file) {
      category.imageURL = req.file.filename;
    }

    res.status(201).json({
      success: true,
      data: category,
      message: "Category created successfully",
    });
  }
);

// @desc  Edit Category Details
// @route PUT /api/category/:slug
export const editCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const categoryName = req.body.name;

    //find category to edit
    let category = await Category.findOne({ slug: slug });

    if (!category)
      return next(new ErrorResponse(errorMessages("exist", "category"), 404));
    let nameSlug = "";
    if (!categoryName) nameSlug = slug;
    else nameSlug = slugify(categoryName, { lower: true });

    let updatedCategory = await Category.findOneAndUpdate(
      { slug: slug },
      {
        name: categoryName,
        updatedAt: Date.now(),
        slug: nameSlug,
      },
      { new: true, upsert: false, projection: {} }
    );
    if (req.file) {
      updatedCategory!.imageURL = req.file.filename;
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
      message: "Category edited successfully",
    });
  }
);

// @desc  deletr category
// @route DELETE /api/category/:slug
export const removeCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;

    //get category by slug
    const category = await getCategory(slug);
    if (!category)
      return next(new ErrorResponse(errorMessages("exist", "category"), 404));

    //delete category
    await deleteCategory(category._id);

    //status return
    res.status(200).json({
      success: true,
      message: "category deleted successfuly",
    });
  }
);
