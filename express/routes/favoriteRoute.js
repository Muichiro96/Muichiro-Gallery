const express = require("express");
const { favoriteBtn, getUserFavorites } = require("../controllers/favoriteController");
const routeFavorite = express.Router();

routeFavorite.route("/handle").post(favoriteBtn);
routeFavorite.route("/list").get(getUserFavorites);
exports.routeFavorite=routeFavorite;
