import { createUser, findUserByCreds } from "./auth.service";
import {
  deleteUser,
  getUserByCondition,
  getUserById,
  getUserBySlug,
} from "./user.service";
import { addProduct, removeProduct, getProduct } from "./product.services";
import {
  addCategory,
  deleteCategory,
  getCategory,
  getCategoryByCondititon,
} from "./category.services";

export {
  createUser,
  findUserByCreds,
  deleteUser,
  getUserById,
  getUserByCondition,
  addCategory,
  addProduct,
  removeProduct,
  getProduct,
  deleteCategory,
  getCategory,
  getCategoryByCondititon,
  getUserBySlug,
};
