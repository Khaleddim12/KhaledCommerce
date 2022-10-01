import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// Middleware
import { asyncHandler } from "../../middlewares";

//services
import {
  getUserBySlug,
  deleteUser,
} from "../../services/user.service";

//utils
import { errorMessages,  ErrorResponse, sendEmail } from "../../utils";

//interfaces

import { IAuthRequest, IFilterResponse, IUser } from "../../interfaces";
import slugify from "slugify";
import { User } from "../../models";

// @desc    Get all users
// @route   GET /api/user
export const getUsers = asyncHandler(
  async (req: Request, res: IFilterResponse, next: NextFunction) => {
    res.filter.data = await res.filter.data;
    res.status(200).send(res.filter);
  }
);

// @desc    Get user by slug
// @route   GET /api/user/:slug
export const getBySlug = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const user = await getUserBySlug(slug);

    //check if user is found or not
    if (!user)
      return next(new ErrorResponse(errorMessages("exist", "user"), 404));

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

// @desc    Eidt User Based On Slug
// @route   PUT /api/user/:slug

export const editUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    let user = await getUserBySlug(slug);

    
    //check user availability
    if (!user)
      return next(new ErrorResponse(errorMessages("exist", "user"), 404));
    let nameSlug=""
    if(!username)
      nameSlug = slug
    else
      nameSlug = slugify(username , { lower:true});
    
    
    let updatedUser = await User.findOneAndUpdate({slug:slug},{
      username:username,
      password:password,
      email:email,
      updatedAt:Date.now(),
      slug: nameSlug
    },{new: true, upsert: false,  projection: {}})

    if(password)
    {
      updatedUser!.password = password;
      
    }
    updatedUser!.save({validateBeforeSave:false})
     
    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User edited successfully",
      newpassword: password
    });
  }
);


//* @desc Get profile of logged in User
//* @route GET /api/user
export const getProfile = asyncHandler(async(req: IAuthRequest, res: Response, next: NextFunction)=>{
    const slug = req.user.slug ;
    const user = await getUserBySlug(slug);

    if (!user)
      return next(new ErrorResponse(errorMessages("auth","username/password"),404));
    
    res.status(200).json({
    success: true,
    data: user,
    });
});

//* @desc Delete User
//* @route DELETE /api/user/:slug
export const deleteUserBySlug =  asyncHandler(
    async (req: IAuthRequest, res: Response, next: NextFunction) => {
        const slug = req.params.slug;
        // Get user by slug
        let user = await getUserBySlug(slug);
        if (!user)
            return next(new ErrorResponse(errorMessages("exist", "user"), 404));
        
    // Delete user account
    await deleteUser(user._id);

    //status return
    res.status(200).json({
        success: true,
        message: "user deleted successfuly"
        });
});


// @desc    Forget Password
// @route   POST /api/user/forgotpassword
export const forgotPassword = asyncHandler(async(req: IAuthRequest, res: Response, next: NextFunction)=> {  
  //get user by mail
  const user = await User.findOne({
    email:req.user.email
  })

  if (!user)
    return next(new ErrorResponse(errorMessages("exist", "email"), 404));

  // get resetToken
  const resetToken = user.getResetPasswordToken();

  // Save hashed token
  await user.save({ validateBeforeSave: false });

  try {
    // Send an email with a reset like to the user
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      template: "reset",
      value: `${req.protocol}://localhost:3000/reset/${resetToken}`,
    });
  } catch (error) {
    console.log(`error ${error} `);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }
  res.status(200).json({
    success: true,
    message: "email sent successfuly",
  });
}
);

export const resetPassword = asyncHandler(
async (req: Request, res: Response, next: NextFunction) => {
  const password = req.body.password;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  
  // Set new password
  user.password = password

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Password Is Reset",
  });
}
);
