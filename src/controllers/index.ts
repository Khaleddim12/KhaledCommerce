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
  getUserCart,
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
  getUserCart,
  addProductToCart,
  deleteProductFromCart,
  deleteLoggedInUser
};
