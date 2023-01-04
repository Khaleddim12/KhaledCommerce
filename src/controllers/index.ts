import {
  getUsers,
  deleteUserBySlug,
  getBySlug,
  getProfile,
  editUser,
  forgotPassword,
  login,
  register,
  resetPassword,
  deleteLoggedInUser
} from "./user";

import {
  createCategory,
  getCategories,
  editCategory,
  getCategoryBySlug,
  removeCategory,
} from "./categoryController";

import {
  addProductToCart,
  getCartBySlug,
  deleteProductFromCart
} from './cartController'

export {
  getUsers,
  deleteUserBySlug,
  getBySlug,
  getProfile,
  editUser,
  forgotPassword,
  login,
  register,
  resetPassword,
  createCategory,
  getCategories,
  getCategoryBySlug,
  editCategory,
  removeCategory,
  getCartBySlug,
  addProductToCart,
  deleteProductFromCart,
  deleteLoggedInUser
};
