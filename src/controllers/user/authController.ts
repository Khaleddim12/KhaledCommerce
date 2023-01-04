import { Request, Response, NextFunction } from "express";

// Middlewares
import { asyncHandler } from "../../middlewares";

// Services
import { createUser, findUserByCreds } from "../../services/auth.service";

// Utils
import { ErrorResponse, errorMessages, sendEmail } from "../../utils";
import { IUser } from "../../interfaces/userInterface";
import { User, Cart } from "../../models";
import slugify from "slugify";
import { getCart } from "../../services";

// @desc    Login
// @route   POST /api/auth/login
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    // Get user by email and password
    const user = await User.findOne({ username }).select("+password");
    if (!user)
      return next(new ErrorResponse(errorMessages("exist", "user"), 400));

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return next(
        new ErrorResponse(`username or/ and password are incorrect`, 400)
      );

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
    });
  }
);

// @desc: Register user
// @route: POST /api/auth/register
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //creating user

    const { email, phoneNo, city, country, street, username, password } =
      req.body;
    const address: {
      city: string;
      country: string;
      street: string;
    } = {
      city,
      country,
      street,
    };

    const user = await User.create({
      username,
      password,
      email,
      phoneNo,
      address,
    });

    const cartName = user.username + " cart"
    
    const cart = await Cart.create({
      name:cartName
    });

    cart.user = user._id
    cart.save();
    res.status(201).json({
      success: true,
      data: user,
    });
  }
);
