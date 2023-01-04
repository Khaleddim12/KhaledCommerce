import { Router } from "express";

//STORAGE
import { productStorage } from "../utils/";

//CONTROLLER FUNCTIONS
import {
  getProductBySlug,
  getProducts,
  createProduct,
  deleteProduct,
  editProduct,
  editCount,
} from "../controllers/productController";  

//MIDDLEWARES
import { filter, result, productValidate } from "../middlewares";

const productRouter = Router();

productRouter
  .route("/")
  .get(filter("Product"), getProducts)
  .post(
    productStorage().any(),
    productValidate("create"),
    result(),
    createProduct
  );
productRouter
  .route("/:slug")
  .get(getProductBySlug)
  .delete(deleteProduct)
  .put(productStorage().any(), productValidate("edit"), result(), editProduct)
  
productRouter.route("/:slug/editcount").put(productValidate("assign"), result(), editCount);


export { productRouter };
