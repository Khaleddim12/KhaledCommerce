import { Router } from "express";

//STORAGE
import { categoryStorage } from "../utils/";


// Controller Functions
import {
  createCategory,
  getCategories,
  getCategoryBySlug,
  removeCategory,
  editCategory,
} from "../controllers";

//MIDDLEWARES
import { filter, result, categoryValidation } from "../middlewares";


const categoryRouter = Router();
categoryRouter
  .route("/")
  .get(filter("Category"), getCategories)
  .post(
    
    categoryStorage().single("image"),
    categoryValidation("create"),
    result(),
    createCategory
  );

categoryRouter
  .route("/:slug")
  .get(getCategoryBySlug)
  .put(categoryStorage().single("image"),categoryValidation("edit"), result(), editCategory)
  .delete(removeCategory);

export { categoryRouter };
