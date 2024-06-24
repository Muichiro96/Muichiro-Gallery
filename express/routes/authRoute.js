const express = require("express");
const route = express.Router();
const auth = require("../controllers/authController");
const verifyToken = require("../middlewares/authJwt");
route.route("/signUp").post(auth.signUp);
route.route("/signIn").post(auth.signIn);


exports.route = route;