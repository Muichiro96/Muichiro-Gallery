const express = require("express");
const { hasReview, createReview, getAverageRate } = require("../controllers/reviewController");
const reviewRouter = express.Router();
reviewRouter.route("/has/:id").get(hasReview);
reviewRouter.route("/avg/:id").get(getAverageRate);
reviewRouter.route("/publish").post(createReview);
exports.reviewRouter=reviewRouter;