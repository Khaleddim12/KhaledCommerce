import { Request, Response, NextFunction } from "express";
import slugify from "slugify";

//INTERFACES
import { IProduct, IFilterResponse, IAuthRequest } from "../interfaces";

//UTILS
import { ErrorResponse, errorMessages, arrify } from "../utils";

//MIDDLEWARES
import { asyncHandler, filter } from "../middlewares";

//MODELS
import { Review, Product } from "../models";

//SERVICES
import { getProduct } from "../services";

//user creates review on certain product
export const addReview = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const rating = req.body.rating
    const comment = req.body.comment

    const slug = req.params.productSlug;

    //check if product exist
    const product: any = await getProduct(slug);
    if (!product)
      return next(new ErrorResponse(errorMessages("exist", "product"), 404));
    
    let review = await Review.create(req.body);
    
    review.user = req.user._id
    review.product= product._id
    review.name = req.user.username
    product.reviews.push(review)
    await review.save({ validateBeforeSave: false })
    let avg = 0;

    //get 
    product.reviews.forEach((rev: any) => {
      avg += rev.rating;
    });

    
    product.ratings = avg / product.reviews.length;
    
    
    await product.save({ validateBeforeSave: false });
       
    res.status(200).json({
      success: true,
      product: product,
    });
  }
);

// Get All Reviews of a product
export const getReviews = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const slug = req.params.productSlug;
    const product = await getProduct(slug);
    if (!product)
      return next(new ErrorResponse(errorMessages("exist", "product"), 404));

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
);

//delete Revie
export const deleteReview = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const slug = req.params.productSlug;
    let product = await getProduct(slug);
    if (!product)
      return next(new ErrorResponse(errorMessages("exist", "product"), 404));

    
    const review = await Review.findOne({
      _id:req.params.reviewId
    })
    if(!review){
      return next(new ErrorResponse(errorMessages("exist", "review"), 404));
    }
    if(review.user.toString() !== req.user._id.toString()){
      return next(new ErrorResponse("can't delete someone's else comment~", 404));
    }    
    await Product.findOneAndUpdate(
      { slug: slug },
      {
        updatedAt: Date.now(),
        $pull: { reviews: { "_id": req.params.reviewId } },
      },
      { new: true, upsert: false, projection: {} }
    );

    product = await getProduct(slug);

    
    let avg = 0;
    product!.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    //RECALCULATE THE PRODUCT RATING AFTER REVIEW DELETION
    let ratings = avg / product!.reviews.length;

    const numOfReviews = product!.reviews.length;
    product!.numOfReviews = numOfReviews


    //DELETE REVIEW FROM REVIEWS MODEL
    await Review.deleteOne({_id:req.params.reviewId});
    
    
    //update the ratings
    await product!.updateOne({
      ratings:ratings
    })

    res.status(200).json({
      success: true,
      message: `Review Deleted Successfuly`,
    });
  }
);
