import { Router } from "express";

//CONTROLLER FUNCTIONS
import {addReview,getReviews,deleteReview} from '../controllers/reviewController'

//MIDDLEWARES
import { filter, result, reviewValidate } from "../middlewares";


const reivewRouter = Router();

reivewRouter.route("/:productSlug").post(reviewValidate("addReview"),result(),addReview)

reivewRouter.route("/:productSlug").get(getReviews)

reivewRouter.route("/:productSlug/:reviewId").delete(deleteReview)


export {reivewRouter}