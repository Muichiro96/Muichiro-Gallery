const express = require("express");
const { hasReview, createReview, getAverageRate, getReviews } = require("../controllers/reviewController");
const reviewRouter = express.Router();
reviewRouter.route("/has/:id").get(hasReview);
reviewRouter.route("/avg/:id").get(getAverageRate);
reviewRouter.route("/publish").post(createReview);
reviewRouter.route("/list/:id").get(getReviews);
exports.reviewRouter=reviewRouter;