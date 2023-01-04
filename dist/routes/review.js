"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reivewRouter = void 0;
const express_1 = require("express");
//CONTROLLER FUNCTIONS
const reviewController_1 = require("../controllers/reviewController");
//MIDDLEWARES
const middlewares_1 = require("../middlewares");
const reivewRouter = (0, express_1.Router)();
exports.reivewRouter = reivewRouter;
reivewRouter.route("/:productSlug").post((0, middlewares_1.reviewValidate)("addReview"), (0, middlewares_1.result)(), reviewController_1.addReview);
reivewRouter.route("/:productSlug").get(reviewController_1.getReviews);
reivewRouter.route("/:productSlug/:reviewId").delete(reviewController_1.deleteReview);
