import { Request, Response, NextFunction } from "express";


// Middlewares
import { asyncHandler } from "../../middlewares";

// Services
import { createUser, findUserByCreds } from "../../services/auth.service";

// Utils
import { ErrorResponse, errorMessages, sendEmail } from "../../utils";
import { IUser } from "../../interfaces/userInterface";
import { User } from "../../models";

// @desc    Login
// @route   POST /api/auth/login
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const username: string = req.body.username;
    const password: string = req.body.password;


    // Get user by email and password
    const user = await User.findOne({ username }).select('+password');
    if (!user)
      return next(
        new ErrorResponse(errorMessages("exist","user"), 400)
      );
    
    const isMatch = await user.matchPassword(password);
    
    if(!isMatch)
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
    const userData = req.body as IUser;

    //creating user
    const user = await createUser(userData);

    res.status(201).json({
      success: true,
      data: user,
    });
  }
);
